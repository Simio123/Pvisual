import { useState } from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { ShoppingItem } from '../App';

type AddItemProps = {
  listId: string;
  onBack: () => void;
  onAdd: (listId: string, item: Omit<ShoppingItem, 'id'>) => void;
};

const CATEGORIES = [
  'Frutas',
  'Verduras',
  'Carnes',
  'Laticínios',
  'Padaria',
  'Bebidas',
  'Grãos',
  'Temperos',
  'Limpeza',
  'Higiene',
  'Congelados',
  'Outros'
];

const UNITS = ['unidades', 'kg', 'litros', 'pacote', 'caixa', 'lata', 'gramas'];

const SUGGESTIONS = [
  { name: 'Leite', category: 'Laticínios', unit: 'litros' },
  { name: 'Pão', category: 'Padaria', unit: 'unidades' },
  { name: 'Arroz', category: 'Grãos', unit: 'kg' },
  { name: 'Feijão', category: 'Grãos', unit: 'kg' },
  { name: 'Banana', category: 'Frutas', unit: 'kg' },
  { name: 'Maçã', category: 'Frutas', unit: 'kg' },
  { name: 'Tomate', category: 'Verduras', unit: 'kg' },
  { name: 'Alface', category: 'Verduras', unit: 'unidades' },
  { name: 'Frango', category: 'Carnes', unit: 'kg' },
  { name: 'Carne Moída', category: 'Carnes', unit: 'kg' },
];

export function AddItem({ listId, onBack, onAdd }: AddItemProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [unit, setUnit] = useState(UNITS[0]);
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && quantity) {
      onAdd(listId, {
        name: name.trim(),
        quantity: parseFloat(quantity),
        unit,
        category,
        purchased: false,
        price: price ? parseFloat(price) : undefined
      });
      setName('');
      setQuantity('1');
      setPrice('');
    }
  };

  const handleSuggestionClick = (suggestion: typeof SUGGESTIONS[0]) => {
    setName(suggestion.name);
    setCategory(suggestion.category);
    setUnit(suggestion.unit);
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
          <h1 className="text-gray-900">Adicionar Item</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Suggestions */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-blue-500" />
            <h2 className="text-gray-700">Sugestões</h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
            {SUGGESTIONS.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="flex-shrink-0 bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm text-gray-700 border border-gray-100"
              >
                {suggestion.name}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-2">
              Nome do Item
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex: Maçã"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>

          {/* Quantity and Unit */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-2">
              Quantidade
            </label>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                step="0.01"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="1"
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {UNITS.map(u => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-2">
              Categoria
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price (Optional) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <label className="block text-gray-700 mb-2">
              Preço Estimado (Opcional)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                R$
              </span>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!name.trim() || !quantity}
            className="w-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white py-4 rounded-2xl shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Adicionar Item
          </button>
        </form>
      </div>
    </div>
  );
}
