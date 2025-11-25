import { useState } from 'react';
import { ShoppingList, ShoppingItem } from '../App';
import { ArrowLeft, Plus, Trash2, MoreVertical, Check, Edit2, DollarSign, Share2, Archive } from 'lucide-react';

type ListDetailProps = {
  list: ShoppingList;
  onBack: () => void;
  onAddItem: () => void;
  onToggleItem: (itemId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onDeleteList: () => void;
  onUpdateItem: (itemId: string, updates: Partial<ShoppingItem>) => void;
  onShare: () => void;
  onArchive: () => void;
};

export function ListDetail({
  list,
  onBack,
  onAddItem,
  onToggleItem,
  onDeleteItem,
  onDeleteList,
  onUpdateItem,
  onShare,
  onArchive
}: ListDetailProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [editingItem, setEditingItem] = useState<string | null>(null);
  const [editPrice, setEditPrice] = useState('');

  const completedItems = list.items.filter(item => item.purchased);
  const pendingItems = list.items.filter(item => !item.purchased);
  const totalPrice = list.items.reduce((sum, item) => sum + (item.price || 0), 0);
  const purchasedPrice = completedItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleSavePrice = (itemId: string) => {
    const price = parseFloat(editPrice);
    if (!isNaN(price)) {
      onUpdateItem(itemId, { price });
    }
    setEditingItem(null);
    setEditPrice('');
  };

  const categoryGroups = pendingItems.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, ShoppingItem[]>);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-gray-900">{list.name}</h1>
                <p className="text-sm text-gray-500">
                  {list.items.length} {list.items.length === 1 ? 'item' : 'itens'}
                </p>
              </div>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <MoreVertical className="w-5 h-5 text-gray-700" />
              </button>
              
              {showMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-20">
                    <button
                      onClick={() => {
                        onShare();
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      Compartilhar Lista
                    </button>
                    <button
                      onClick={() => {
                        onArchive();
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                    >
                      <Archive className="w-4 h-4" />
                      Arquivar Lista
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('Tem certeza que deseja excluir esta lista?')) {
                          onDeleteList();
                        }
                        setShowMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" />
                      Excluir Lista
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Price Summary */}
          {totalPrice > 0 && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3">
                <p className="text-xs text-green-700 mb-1">Já Comprado</p>
                <p className="text-green-900">R$ {purchasedPrice.toFixed(2)}</p>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3">
                <p className="text-xs text-blue-700 mb-1">Total Estimado</p>
                <p className="text-blue-900">R$ {totalPrice.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Pending Items */}
        {pendingItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-700 mb-3">A Comprar</h2>
            <div className="space-y-4">
              {Object.entries(categoryGroups).map(([category, items]) => (
                <div key={category}>
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">
                    {category}
                  </p>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-4 shadow-sm"
                      >
                        <div className="flex items-start gap-3">
                          <button
                            onClick={() => onToggleItem(item.id)}
                            className="w-6 h-6 rounded-lg border-2 border-gray-300 flex items-center justify-center flex-shrink-0 hover:border-blue-500 transition-colors mt-0.5"
                            style={{ borderColor: list.color }}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.quantity} {item.unit}
                            </p>
                            {editingItem === item.id ? (
                              <div className="flex items-center gap-2 mt-2">
                                <input
                                  type="number"
                                  step="0.01"
                                  value={editPrice}
                                  onChange={(e) => setEditPrice(e.target.value)}
                                  placeholder="Preço"
                                  className="w-24 px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  autoFocus
                                />
                                <button
                                  onClick={() => handleSavePrice(item.id)}
                                  className="p-1 bg-green-500 text-white rounded-lg hover:bg-green-600"
                                >
                                  <Check className="w-4 h-4" />
                                </button>
                              </div>
                            ) : item.price ? (
                              <p className="text-sm text-green-600 mt-1">
                                R$ {item.price.toFixed(2)}
                              </p>
                            ) : (
                              <button
                                onClick={() => {
                                  setEditingItem(item.id);
                                  setEditPrice(item.price?.toString() || '');
                                }}
                                className="text-xs text-blue-500 mt-1 flex items-center gap-1 hover:text-blue-600"
                              >
                                <DollarSign className="w-3 h-3" />
                                Adicionar preço
                              </button>
                            )}
                          </div>
                          <button
                            onClick={() => onDeleteItem(item.id)}
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Items */}
        {completedItems.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-700 mb-3">Comprados</h2>
            <div className="space-y-2">
              {completedItems.map(item => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl p-4 shadow-sm opacity-60"
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => onToggleItem(item.id)}
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: list.color }}
                    >
                      <Check className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 line-through">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} {item.unit}
                      </p>
                      {item.price && (
                        <p className="text-sm text-gray-500 mt-1">
                          R$ {item.price.toFixed(2)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {list.items.length === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">Nenhum item adicionado ainda</p>
            <button
              onClick={onAddItem}
              className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600 transition-colors"
            >
              Adicionar primeiro item
            </button>
          </div>
        )}
      </div>

      {/* Floating Add Button */}
      {list.items.length > 0 && (
        <button
          onClick={onAddItem}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          style={{ backgroundColor: list.color }}
        >
          <Plus className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}