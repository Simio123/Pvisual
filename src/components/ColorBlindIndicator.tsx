import { Eye } from 'lucide-react';
import { useEffect, useState } from 'react';

type ColorBlindIndicatorProps = {
  mode?: string;
};

export function ColorBlindIndicator({ mode }: ColorBlindIndicatorProps) {
  const [isColorBlind, setIsColorBlind] = useState(false);

  useEffect(() => {
    const checkColorBlindMode = () => {
      const root = document.documentElement;
      const domMode = root.getAttribute('data-colorblind-mode');
      setIsColorBlind(domMode === 'deuteranopia' || mode === 'deuteranopia');
    };

    // Check initially
    checkColorBlindMode();

    // Check periodically
    const interval = setInterval(checkColorBlindMode, 500);

    return () => clearInterval(interval);
  }, [mode]);

  if (!isColorBlind) return null;

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-fade-in">
        <Eye className="w-4 h-4" />
        <span className="text-sm">Modo Daltonismo Ativo</span>
      </div>
    </div>
  );
}