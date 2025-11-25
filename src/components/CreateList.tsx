import { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';

type CreateListProps = {
  onBack: () => void;
  onCreate: (name: string, color: string) => void;
};

const COLORS = [
  { name: 'Verde', value: '#10b981' },
  { name: 'Azul', value: '#3b82f6' },
  { name: 'Roxo', value: '#8b5cf6' },
  { name: 'Rosa', value: '#ec4899' },
  { name: 'Laranja', value: '#f59e0b' },
  { name: 'Vermelho', value: '#ef4444' },
  { name: 'Ciano', value: '#06b6d4' },
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Esmeralda', value: '#10b981' },
  { name: 'Âmbar', value: '#f59e0b' },
  { name: 'Lima', value: '#84cc16' },
  { name: 'Fúcsia', value: '#d946ef' },
  { name: 'Violeta', value: '#7c3aed' },
  { name: 'Azul Claro', value: '#0ea5e9' },
  { name: 'Verde Claro', value: '#22c55e' },
  { name: 'Laranja Escuro', value: '#ea580c' },
];

export function CreateList({ onBack, onCreate }: CreateListProps) {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState(COLORS[0].value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreate(name.trim(), selectedColor);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <h1 className="text-gray-900">Nova Lista</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-2">
              Nome da Lista
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Compras da Semana"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Color Picker */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-4">
              Escolha uma Cor
            </label>
            <div className="grid grid-cols-4 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className="relative aspect-square rounded-xl transition-transform hover:scale-105"
                  style={{ backgroundColor: color.value }}
                >
                  {selectedColor === color.value && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5" style={{ color: color.value }} />
                      </div>
                    </div>
                  )}
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-4">
              Prévia
            </label>
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl"
                style={{ backgroundColor: selectedColor }}
              />
              <div>
                <p className="text-gray-900">
                  {name || 'Nome da Lista'}
                </p>
                <p className="text-sm text-gray-500">0 itens</p>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-4 rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Criar Lista
          </button>
        </form>
      </div>
    </div>
  );
}