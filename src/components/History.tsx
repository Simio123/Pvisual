import { ArrowLeft, Archive, RotateCcw, Trash2, ShoppingCart, Calendar } from 'lucide-react';
import { ShoppingList } from '../App';

type HistoryProps = {
  lists: ShoppingList[];
  onBack: () => void;
  onRestoreList: (id: string) => void;
};

export function History({ lists, onBack, onRestoreList }: HistoryProps) {
  const archivedLists = lists.filter(list => list.archived);
  const completedLists = lists.filter(list => {
    const allPurchased = list.items.length > 0 && list.items.every(item => item.purchased);
    return allPurchased && !list.archived;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-slate-100">
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
            <h1 className="text-gray-900">Histórico</h1>
            <p className="text-sm text-gray-500">Listas concluídas e arquivadas</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <Archive className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Listas Arquivadas</p>
            <p className="text-3xl text-gray-900">{archivedLists.length}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <ShoppingCart className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-sm text-gray-500 mb-1">Listas Completas</p>
            <p className="text-3xl text-gray-900">{completedLists.length}</p>
          </div>
        </div>

        {/* Completed Lists */}
        {completedLists.length > 0 && (
          <div className="mb-6">
            <h2 className="text-gray-900 mb-3">Listas Concluídas</h2>
            <div className="space-y-3">
              {completedLists.map(list => {
                const totalSpent = list.items.reduce((sum, item) => sum + (item.price || 0), 0);
                return (
                  <div
                    key={list.id}
                    className="bg-white rounded-2xl p-5 shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: list.color + '20' }}
                        >
                          <ShoppingCart className="w-6 h-6" style={{ color: list.color }} />
                        </div>
                        <div>
                          <h3 className="text-gray-900">{list.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(list.updatedAt)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        ✓ Completa
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{list.items.length} itens</span>
                      {totalSpent > 0 && (
                        <span className="text-green-600">R$ {totalSpent.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Archived Lists */}
        {archivedLists.length > 0 ? (
          <div>
            <h2 className="text-gray-900 mb-3">Listas Arquivadas</h2>
            <div className="space-y-3">
              {archivedLists.map(list => {
                const totalSpent = list.items.reduce((sum, item) => sum + (item.price || 0), 0);
                const purchasedCount = list.items.filter(item => item.purchased).length;
                
                return (
                  <div
                    key={list.id}
                    className="bg-white rounded-2xl p-5 shadow-md"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center opacity-60"
                          style={{ backgroundColor: list.color + '20' }}
                        >
                          <Archive className="w-6 h-6" style={{ color: list.color }} />
                        </div>
                        <div>
                          <h3 className="text-gray-900">{list.name}</h3>
                          <p className="text-sm text-gray-500 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(list.createdAt)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-gray-600">
                        {purchasedCount}/{list.items.length} itens comprados
                      </span>
                      {totalSpent > 0 && (
                        <span className="text-gray-600">R$ {totalSpent.toFixed(2)}</span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onRestoreList(list.id)}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                      >
                        <RotateCcw className="w-4 h-4" />
                        Restaurar
                      </button>
                      <button className="px-4 py-2 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          completedLists.length === 0 && (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <Archive className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">Nenhuma lista no histórico</p>
              <p className="text-sm text-gray-400">
                Listas concluídas e arquivadas aparecerão aqui
              </p>
            </div>
          )
        )}

        {/* Timeline Summary */}
        {(archivedLists.length > 0 || completedLists.length > 0) && (
          <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-gray-900 mb-3">📊 Resumo do Mês</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Total de listas concluídas:</span>
                <span className="text-gray-900">{completedLists.length + archivedLists.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Itens comprados:</span>
                <span className="text-gray-900">
                  {[...completedLists, ...archivedLists].reduce((sum, list) => 
                    sum + list.items.filter(item => item.purchased).length, 0
                  )}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gasto total:</span>
                <span className="text-green-600">
                  R$ {[...completedLists, ...archivedLists].reduce((sum, list) => 
                    sum + list.items.reduce((itemSum, item) => itemSum + (item.price || 0), 0), 0
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
