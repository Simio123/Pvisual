import { Sun, Moon, Eye, Check } from 'lucide-react';
import { useState } from 'react';
import { User } from '../App';

type ThemeSwitcherProps = {
  user: User | null;
  onUpdate: (updates: Partial<User>) => void;
};

type ThemeMode = 'light' | 'dark' | 'colorblind';

const THEME_OPTIONS = [
  { 
    id: 'light' as ThemeMode, 
    name: 'Modo Claro', 
    icon: Sun,
    gradient: 'from-blue-400 to-blue-600',
    description: 'Interface clara e vibrante'
  },
  { 
    id: 'dark' as ThemeMode, 
    name: 'Modo Escuro', 
    icon: Moon,
    gradient: 'from-gray-700 to-gray-900',
    description: 'Reduz a fadiga ocular'
  },
  { 
    id: 'colorblind' as ThemeMode, 
    name: 'Modo Daltonismo', 
    icon: Eye,
    gradient: 'from-purple-500 to-pink-500',
    description: 'Cores otimizadas'
  }
];

export function ThemeSwitcher({ user, onUpdate }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Detect current theme from DOM and user preferences
  const getThemeFromDOM = (): ThemeMode => {
    const root = document.documentElement;
    if (root.getAttribute('data-colorblind-mode') === 'deuteranopia') {
      return 'colorblind';
    }
    if (root.classList.contains('dark')) {
      return 'dark';
    }
    return 'light';
  };
  
  const [currentTheme, setCurrentTheme] = useState<ThemeMode>(getThemeFromDOM());
  const currentIcon = THEME_OPTIONS.find(opt => opt.id === currentTheme)?.icon || Sun;
  const CurrentIcon = currentIcon;

  const handleThemeChange = (theme: ThemeMode) => {
    if (!user) return;
    
    // Apply theme to document first
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      root.removeAttribute('data-colorblind-mode');
      onUpdate({
        preferences: {
          ...user.preferences,
          theme: 'dark'
        }
      });
    } else if (theme === 'colorblind') {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'colorblind');
      root.setAttribute('data-colorblind-mode', 'deuteranopia');
      onUpdate({
        preferences: {
          ...user.preferences,
          theme: 'light',
          accessibility: {
            ...(user.preferences.accessibility || {}),
            colorBlindMode: 'deuteranopia'
          }
        }
      });
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      root.removeAttribute('data-colorblind-mode');
      onUpdate({
        preferences: {
          ...user.preferences,
          theme: 'light',
          accessibility: {
            ...(user.preferences.accessibility || {}),
            colorBlindMode: 'normal'
          }
        }
      });
    }

    setCurrentTheme(theme);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all"
        aria-label="Mudar tema"
        aria-expanded={isOpen}
      >
        <CurrentIcon className="w-5 h-5" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-12 z-50 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
              <h3 className="text-gray-900 dark:text-white">Esquema de Cores</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">Escolha seu tema preferido</p>
            </div>
            
            <div className="p-2">
              {THEME_OPTIONS.map(option => {
                const OptionIcon = option.icon;
                const isActive = currentTheme === option.id;
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleThemeChange(option.id)}
                    className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
                      isActive 
                        ? 'bg-gradient-to-r ' + option.gradient + ' text-white shadow-md' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-white/20' : 'bg-gray-100 dark:bg-gray-600'
                    }`}>
                      <OptionIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600 dark:text-gray-300'}`} />
                    </div>
                    
                    <div className="flex-1 text-left">
                      <p className={isActive ? 'text-white' : 'text-gray-900 dark:text-white'}>
                        {option.name}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                        {option.description}
                      </p>
                    </div>
                    
                    {isActive && (
                      <Check className="w-5 h-5 text-white" />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="p-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                💡 Você pode ajustar mais opções em Configurações
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}