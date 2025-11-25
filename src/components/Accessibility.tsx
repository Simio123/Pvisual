import { ArrowLeft, Eye, Type, Contrast, Zap, Volume2, MousePointer } from 'lucide-react';
import { User } from '../App';

type AccessibilityProps = {
  user: User;
  onBack: () => void;
  onUpdate: (updates: Partial<User>) => void;
};

const COLOR_BLIND_MODES = [
  { id: 'normal', name: 'Normal', description: 'Cores padrão' },
  { id: 'protanopia', name: 'Protanopia', description: 'Dificuldade com vermelho' },
  { id: 'deuteranopia', name: 'Deuteranopia', description: 'Dificuldade com verde' },
  { id: 'tritanopia', name: 'Tritanopia', description: 'Dificuldade com azul' },
  { id: 'achromatopsia', name: 'Acromatopsia', description: 'Sem percepção de cores' }
];

const FONT_SIZES = [
  { id: 'small', name: 'Pequeno', value: 14 },
  { id: 'medium', name: 'Médio', value: 16 },
  { id: 'large', name: 'Grande', value: 18 },
  { id: 'xlarge', name: 'Extra Grande', value: 20 }
];

export function Accessibility({ user, onBack, onUpdate }: AccessibilityProps) {
  const accessibility = user.preferences.accessibility || {
    colorBlindMode: 'normal',
    fontSize: 'medium',
    highContrast: false,
    reduceMotion: false,
    screenReader: false,
    largerTouchTargets: false
  };

  const handleUpdateAccessibility = (key: string, value: any) => {
    onUpdate({
      preferences: {
        ...user.preferences,
        accessibility: {
          ...accessibility,
          [key]: value
        }
      }
    });
  };

  const applyColorBlindMode = (mode: string) => {
    handleUpdateAccessibility('colorBlindMode', mode);
    // Apply CSS filter to root element
    const root = document.documentElement;
    root.setAttribute('data-colorblind-mode', mode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            aria-label="Voltar"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Acessibilidade</h1>
            <p className="text-sm text-gray-500">Ajustes para melhor experiência</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Color Blind Modes */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-purple-600" />
              <h3 className="text-gray-900">Modo Daltonismo</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Ajuste as cores para melhor visualização
            </p>
          </div>
          <div className="p-4 space-y-2">
            {COLOR_BLIND_MODES.map(mode => (
              <button
                key={mode.id}
                onClick={() => applyColorBlindMode(mode.id)}
                className={`w-full p-4 rounded-xl text-left transition-all ${
                  accessibility.colorBlindMode === mode.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={accessibility.colorBlindMode === mode.id}
              >
                <p className={accessibility.colorBlindMode === mode.id ? 'text-white' : 'text-gray-900'}>
                  {mode.name}
                </p>
                <p className={`text-sm ${accessibility.colorBlindMode === mode.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {mode.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Type className="w-5 h-5 text-blue-600" />
              <h3 className="text-gray-900">Tamanho da Fonte</h3>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Ajuste o tamanho do texto
            </p>
          </div>
          <div className="p-4 space-y-2">
            {FONT_SIZES.map(size => (
              <button
                key={size.id}
                onClick={() => {
                  handleUpdateAccessibility('fontSize', size.id);
                  document.documentElement.style.fontSize = `${size.value}px`;
                }}
                className={`w-full p-4 rounded-xl text-left transition-all flex items-center justify-between ${
                  accessibility.fontSize === size.id
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                }`}
                aria-pressed={accessibility.fontSize === size.id}
              >
                <div>
                  <p className={accessibility.fontSize === size.id ? 'text-white' : 'text-gray-900'}>
                    {size.name}
                  </p>
                  <p className={`text-sm ${accessibility.fontSize === size.id ? 'text-white/80' : 'text-gray-500'}`}>
                    {size.value}px
                  </p>
                </div>
                <span style={{ fontSize: `${size.value}px` }}>Aa</span>
              </button>
            ))}
          </div>
        </div>

        {/* Toggle Options */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Opções Visuais</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {/* High Contrast */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center">
                    <Contrast className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-900">Alto Contraste</p>
                    <p className="text-sm text-gray-500">Aumenta o contraste das cores</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newValue = !accessibility.highContrast;
                    handleUpdateAccessibility('highContrast', newValue);
                    document.documentElement.setAttribute('data-high-contrast', String(newValue));
                  }}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    accessibility.highContrast ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={accessibility.highContrast}
                  aria-label="Alto contraste"
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      accessibility.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Reduzir Animações</p>
                    <p className="text-sm text-gray-500">Minimiza movimentos na tela</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newValue = !accessibility.reduceMotion;
                    handleUpdateAccessibility('reduceMotion', newValue);
                    document.documentElement.setAttribute('data-reduce-motion', String(newValue));
                  }}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    accessibility.reduceMotion ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={accessibility.reduceMotion}
                  aria-label="Reduzir animações"
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      accessibility.reduceMotion ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Larger Touch Targets */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <MousePointer className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Áreas de Toque Maiores</p>
                    <p className="text-sm text-gray-500">Botões maiores e mais fáceis de tocar</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newValue = !accessibility.largerTouchTargets;
                    handleUpdateAccessibility('largerTouchTargets', newValue);
                    document.documentElement.setAttribute('data-larger-touch', String(newValue));
                  }}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    accessibility.largerTouchTargets ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={accessibility.largerTouchTargets}
                  aria-label="Áreas de toque maiores"
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      accessibility.largerTouchTargets ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Screen Reader */}
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Volume2 className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-900">Otimizar para Leitor de Tela</p>
                    <p className="text-sm text-gray-500">Melhora compatibilidade com leitores</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const newValue = !accessibility.screenReader;
                    handleUpdateAccessibility('screenReader', newValue);
                    document.documentElement.setAttribute('data-screen-reader', String(newValue));
                  }}
                  className={`relative w-12 h-7 rounded-full transition-colors ${
                    accessibility.screenReader ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={accessibility.screenReader}
                  aria-label="Otimizar para leitor de tela"
                >
                  <div
                    className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                      accessibility.screenReader ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-3">Prévia</h3>
          <div className="bg-white rounded-xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl" />
              <div className="flex-1">
                <p className="text-gray-900">Exemplo de Título</p>
                <p className="text-sm text-gray-500">Este é um texto de exemplo</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 py-2 bg-blue-500 text-white rounded-lg">
                Botão Primário
              </button>
              <button className="flex-1 py-2 bg-gray-200 text-gray-700 rounded-lg">
                Botão Secundário
              </button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-3">💡 Dicas de Acessibilidade</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Use o modo de alto contraste em ambientes muito claros</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Reduza animações se você tem sensibilidade a movimentos</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Aumente o tamanho da fonte para melhor legibilidade</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span>Todas as configurações são salvas automaticamente</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
