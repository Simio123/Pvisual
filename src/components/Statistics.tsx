import { ShoppingList } from '../App';
import { ArrowLeft, TrendingUp, ShoppingBag, DollarSign, Package } from 'lucide-react';

type StatisticsProps = {
  lists: ShoppingList[];
  onBack: () => void;
};

export function Statistics({ lists, onBack }: StatisticsProps) {
  const totalLists = lists.length;
  const totalItems = lists.reduce((acc, list) => acc + list.items.length, 0);
  const purchasedItems = lists.reduce((acc, list) => 
    acc + list.items.filter(item => item.purchased).length, 0
  );
  const totalSpent = lists.reduce((acc, list) => 
    acc + list.items.filter(item => item.purchased).reduce((sum, item) => sum + (item.price || 0), 0), 0
  );

  // Category statistics
  const categoryStats = lists.reduce((stats, list) => {
    list.items.forEach(item => {
      if (!stats[item.category]) {
        stats[item.category] = { total: 0, purchased: 0 };
      }
      stats[item.category].total++;
      if (item.purchased) {
        stats[item.category].purchased++;
      }
    });
    return stats;
  }, {} as Record<string, { total: number; purchased: number }>);

  const topCategories = Object.entries(categoryStats)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 5);

  // Most purchased items
  const itemFrequency = lists.reduce((freq, list) => {
    list.items.forEach(item => {
      const name = item.name.toLowerCase();
      freq[name] = (freq[name] || 0) + 1;
    });
    return freq;
  }, {} as Record<string, number>);

  const topItems = Object.entries(itemFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const completionRate = totalItems > 0 ? (purchasedItems / totalItems) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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
            <h1 className="text-gray-900">Estatísticas</h1>
            <p className="text-sm text-gray-500">Seus hábitos de compras</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-sm text-gray-500">Listas</p>
            </div>
            <p className="text-gray-900">{totalLists}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-sm text-gray-500">Itens</p>
            </div>
            <p className="text-gray-900">{totalItems}</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-sm text-gray-500">Taxa de Conclusão</p>
            </div>
            <p className="text-gray-900">{completionRate.toFixed(0)}%</p>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-sm text-gray-500">Gasto Total</p>
            </div>
            <p className="text-gray-900">R$ {totalSpent.toFixed(2)}</p>
          </div>
        </div>

        {/* Completion Progress */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-gray-900 mb-4">Progresso Geral</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Itens comprados</span>
              <span className="text-gray-900">{purchasedItems} de {totalItems}</span>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>
          </div>
        </div>

        {/* Top Categories */}
        {topCategories.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
            <h2 className="text-gray-900 mb-4">Categorias Mais Compradas</h2>
            <div className="space-y-3">
              {topCategories.map(([category, stats], index) => {
                const percentage = stats.total > 0 ? (stats.purchased / stats.total) * 100 : 0;
                const colors = [
                  'bg-blue-500',
                  'bg-green-500',
                  'bg-purple-500',
                  'bg-orange-500',
                  'bg-pink-500'
                ];
                return (
                  <div key={category}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-gray-500">{stats.total} itens</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${colors[index % colors.length]} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Top Items */}
        {topItems.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-gray-900 mb-4">Itens Mais Frequentes</h2>
            <div className="space-y-3">
              {topItems.map(([item, count], index) => (
                <div key={item} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white">
                      {index + 1}
                    </div>
                    <span className="text-gray-900 capitalize">{item}</span>
                  </div>
                  <span className="text-sm text-gray-500">{count}x</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {totalItems === 0 && (
          <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
            <TrendingUp className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">
              Comece a adicionar itens às suas listas para ver estatísticas
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
