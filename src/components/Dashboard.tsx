import { ShoppingList, User } from '../App';
import { ShoppingCart, Plus, BarChart3, FolderOpen, ChevronRight, User as UserIcon, Bell, History, Utensils, Wallet, Settings } from 'lucide-react';
import { ThemeSwitcher } from './ThemeSwitcher';

type DashboardProps = {
  lists: ShoppingList[];
  user: User | null;
  onSelectList: (id: string) => void;
  onCreateList: () => void;
  onNavigate: (screen: 'statistics' | 'categories' | 'profile' | 'settings' | 'budget' | 'history' | 'recipes' | 'notifications') => void;
  onUpdateUser: (updates: Partial<User>) => void;
};

export function Dashboard({ lists, user, onSelectList, onCreateList, onNavigate, onUpdateUser }: DashboardProps) {
  const totalItems = lists.reduce((acc, list) => acc + list.items.length, 0);
  const purchasedItems = lists.reduce((acc, list) => 
    acc + list.items.filter(item => item.purchased).length, 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">Olá, {user?.name?.split(' ')[0] || 'Usuário'}! 👋</h1>
                <p className="text-sm text-gray-500">Bem-vindo de volta</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onNavigate('notifications')}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors relative"
                aria-label="Notificações"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <ThemeSwitcher user={user} onUpdate={onUpdateUser} />
              <button
                onClick={() => onNavigate('profile')}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:opacity-90 transition-opacity overflow-hidden"
                aria-label="Perfil"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <UserIcon className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-4 shadow-lg text-white">
            <p className="text-sm text-blue-100 mb-1">Listas Ativas</p>
            <p className="text-3xl">{lists.length}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-4 shadow-lg text-white">
            <p className="text-sm text-green-100 mb-1">Progresso</p>
            <p className="text-3xl">{totalItems > 0 ? Math.round((purchasedItems/totalItems) * 100) : 0}%</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3">Ações Rápidas</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={onCreateList}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Nova Lista</span>
            </button>
            <button
              onClick={() => onNavigate('statistics')}
              className="bg-white text-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <BarChart3 className="w-6 h-6 text-purple-500" />
              <span className="text-sm">Estatísticas</span>
            </button>
            <button
              onClick={() => onNavigate('recipes')}
              className="bg-white text-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Utensils className="w-6 h-6 text-orange-500" />
              <span className="text-sm">Receitas</span>
            </button>
            <button
              onClick={() => onNavigate('budget')}
              className="bg-white text-gray-700 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Wallet className="w-6 h-6 text-green-500" />
              <span className="text-sm">Orçamento</span>
            </button>
          </div>
        </div>

        {/* More Options */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => onNavigate('categories')}
            className="bg-white text-gray-700 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2">
              <FolderOpen className="w-5 h-5 text-amber-500" />
              <span className="text-sm">Categorias</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={() => onNavigate('history')}
            className="bg-white text-gray-700 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-500" />
              <span className="text-sm">Histórico</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Lists */}
        <div>
          <h2 className="text-gray-900 mb-4">Minhas Listas</h2>
          
          {lists.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">Nenhuma lista criada ainda</p>
              <button
                onClick={onCreateList}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all"
              >
                Criar primeira lista
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {lists.map(list => {
                const completedItems = list.items.filter(item => item.purchased).length;
                const totalItems = list.items.length;
                const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

                return (
                  <button
                    key={list.id}
                    onClick={() => onSelectList(list.id)}
                    className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-xl transition-all text-left hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
                          style={{ backgroundColor: list.color + '20' }}
                        >
                          <ShoppingCart className="w-6 h-6" style={{ color: list.color }} />
                        </div>
                        <div>
                          <h3 className="text-gray-900">{list.name}</h3>
                          <p className="text-sm text-gray-500">
                            {totalItems} {totalItems === 1 ? 'item' : 'itens'}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>

                    {/* Progress Bar */}
                    {totalItems > 0 && (
                      <div>
                        <div className="flex justify-between text-xs text-gray-500 mb-2">
                          <span>{completedItems} de {totalItems} comprados</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-300 shadow-sm"
                            style={{
                              width: `${progress}%`,
                              backgroundColor: list.color
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}