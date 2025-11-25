import { ArrowLeft, Bell, ShoppingCart, Users, TrendingUp, Gift, AlertCircle, Check } from 'lucide-react';

type NotificationsProps = {
  onBack: () => void;
};

const NOTIFICATIONS = [
  {
    id: '1',
    type: 'list',
    title: 'Lista "Compras da Semana" atualizada',
    message: 'João Pedro adicionou 3 novos itens',
    time: '5 min atrás',
    unread: true,
    icon: ShoppingCart,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: '2',
    type: 'budget',
    title: 'Alerta de Orçamento',
    message: 'Você atingiu 85% do seu orçamento mensal',
    time: '1 hora atrás',
    unread: true,
    icon: AlertCircle,
    color: 'from-yellow-500 to-orange-600'
  },
  {
    id: '3',
    type: 'share',
    title: 'Nova colaboração',
    message: 'Ana Costa aceitou o convite para "Churrasco"',
    time: '2 horas atrás',
    unread: true,
    icon: Users,
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: '4',
    type: 'achievement',
    title: 'Nova conquista desbloqueada! 🎉',
    message: 'Você completou 10 listas. Continue assim!',
    time: '1 dia atrás',
    unread: false,
    icon: Gift,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: '5',
    type: 'reminder',
    title: 'Lembrete de Compras',
    message: 'Você tem itens pendentes na lista "Compras da Semana"',
    time: '2 dias atrás',
    unread: false,
    icon: Bell,
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: '6',
    type: 'tips',
    title: 'Dica de Economia',
    message: 'Compare preços antes de comprar para economizar até 30%',
    time: '3 dias atrás',
    unread: false,
    icon: TrendingUp,
    color: 'from-indigo-500 to-blue-600'
  }
];

export function Notifications({ onBack }: NotificationsProps) {
  const unreadCount = NOTIFICATIONS.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-700" />
              </button>
              <div>
                <h1 className="text-gray-900">Notificações</h1>
                {unreadCount > 0 && (
                  <p className="text-sm text-gray-500">{unreadCount} não lidas</p>
                )}
              </div>
            </div>
            {unreadCount > 0 && (
              <button className="text-sm text-blue-600 hover:text-blue-700">
                Marcar todas como lidas
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
            <Bell className="w-5 h-5 text-blue-500" />
            <span className="text-sm text-gray-700">Todas</span>
            <span className="ml-auto w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs">
              {NOTIFICATIONS.length}
            </span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all">
            <AlertCircle className="w-5 h-5 text-orange-500" />
            <span className="text-sm text-gray-700">Não Lidas</span>
            <span className="ml-auto w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs">
              {unreadCount}
            </span>
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {NOTIFICATIONS.map(notification => {
            const Icon = notification.icon;
            return (
              <button
                key={notification.id}
                className={`w-full bg-white rounded-2xl p-4 shadow-md hover:shadow-lg transition-all text-left ${
                  notification.unread ? 'border-2 border-blue-200' : ''
                }`}
              >
                <div className="flex gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${notification.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="text-gray-900 pr-2">{notification.title}</h3>
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Empty State Alternative */}
        {NOTIFICATIONS.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-gray-900 mb-2">Nenhuma notificação</h3>
            <p className="text-gray-500 text-sm">
              Você está em dia! Não há notificações no momento.
            </p>
          </div>
        )}

        {/* Settings */}
        <div className="mt-6 bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-gray-900 mb-4">Preferências de Notificação</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="text-gray-900 text-sm">Atualizações de Listas</p>
                  <p className="text-xs text-gray-500">Mudanças nas suas listas</p>
                </div>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-blue-500">
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="text-gray-900 text-sm">Alertas de Orçamento</p>
                  <p className="text-xs text-gray-500">Avisos sobre gastos</p>
                </div>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-blue-500">
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-purple-500" />
                <div>
                  <p className="text-gray-900 text-sm">Atividades Sociais</p>
                  <p className="text-xs text-gray-500">Compartilhamentos e colaborações</p>
                </div>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-blue-500">
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-gray-900 text-sm">Conquistas</p>
                  <p className="text-xs text-gray-500">Badges e recompensas</p>
                </div>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-blue-500">
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-5 h-5 text-indigo-500" />
                <div>
                  <p className="text-gray-900 text-sm">Dicas e Sugestões</p>
                  <p className="text-xs text-gray-500">Conselhos para economizar</p>
                </div>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-gray-300">
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
