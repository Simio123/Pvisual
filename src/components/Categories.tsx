import { ShoppingList } from '../App';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

type CategoriesProps = {
  lists: ShoppingList[];
  onBack: () => void;
};

export function Categories({ lists, onBack }: CategoriesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Group all items by category
  const categoryGroups = lists.reduce((groups, list) => {
    list.items.forEach(item => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push({
        ...item,
        listName: list.name,
        listColor: list.color,
        listId: list.id
      });
    });
    return groups;
  }, {} as Record<string, Array<any>>);

  const categories = Object.keys(categoryGroups).sort();

  const categoryIcons: Record<string, string> = {
    'Frutas': '🍎',
    'Verduras': '🥬',
    'Carnes': '🥩',
    'Laticínios': '🥛',
    'Padaria': '🍞',
    'Bebidas': '🥤',
    'Grãos': '🌾',
    'Temperos': '🧂',
    'Limpeza': '🧹',
    'Higiene': '🧴',
    'Congelados': '❄️',
    'Outros': '📦'
  };

  if (selectedCategory) {
    const items = categoryGroups[selectedCategory];
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
            <button
              onClick={() => setSelectedCategory(null)}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-gray-900">{selectedCategory}</h1>
              <p className="text-sm text-gray-500">{items.length} itens</p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={`${item.listId}-${item.id}-${index}`} className="bg-white rounded-xl p-4 shadow-sm">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <p className="text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.quantity} {item.unit}
                    </p>
                  </div>
                  {item.price && (
                    <p className="text-sm text-green-600">
                      R$ {item.price.toFixed(2)}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: item.listColor }}
                  />
                  <p className="text-xs text-gray-500">{item.listName}</p>
                  {item.purchased && (
                    <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Comprado
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-gray-900">Categorias</h1>
            <p className="text-sm text-gray-500">Organize por tipo de produto</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {categories.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <p className="text-gray-500">
              Nenhum item nas suas listas ainda
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {categories.map(category => {
              const items = categoryGroups[category];
              const totalItems = items.length;
              const purchasedItems = items.filter(item => item.purchased).length;
              const totalPrice = items.reduce((sum, item) => sum + (item.price || 0), 0);
              
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-amber-100 rounded-xl flex items-center justify-center text-2xl">
                        {categoryIcons[category] || '📦'}
                      </div>
                      <div>
                        <h3 className="text-gray-900">{category}</h3>
                        <p className="text-sm text-gray-500">
                          {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      {purchasedItems} de {totalItems} comprados
                    </span>
                    {totalPrice > 0 && (
                      <span className="text-green-600">
                        R$ {totalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  {totalItems > 0 && (
                    <div className="mt-3 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-300"
                        style={{ width: `${(purchasedItems / totalItems) * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
