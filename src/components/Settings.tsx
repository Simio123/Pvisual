import { ArrowLeft, Bell, Globe, Moon, DollarSign, Shield, HelpCircle, Info, ChevronRight, Eye } from 'lucide-react';
import { User } from '../App';

type SettingsProps = {
  user: User;
  onBack: () => void;
  onUpdate: (updates: Partial<User>) => void;
  onNavigateToAccessibility?: () => void;
};

export function Settings({ user, onBack, onUpdate, onNavigateToAccessibility }: SettingsProps) {
  const handleToggleNotifications = () => {
    onUpdate({
      preferences: {
        ...user.preferences,
        notifications: !user.preferences.notifications
      }
    });
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
          <h1 className="text-gray-900">Configurações</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Notifications */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Notificações</h3>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900">Notificações Push</p>
                  <p className="text-sm text-gray-500">Receba lembretes e atualizações</p>
                </div>
              </div>
              <button
                onClick={handleToggleNotifications}
                className={`relative w-12 h-7 rounded-full transition-colors ${
                  user.preferences.notifications ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              >
                <div
                  className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                    user.preferences.notifications ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Aparência</h3>
          </div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center">
                <Moon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Tema</p>
                <p className="text-sm text-gray-500">Claro</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Language & Region */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Idioma e Região</h3>
          </div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Globe className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Idioma</p>
                <p className="text-sm text-gray-500">Português (Brasil)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-amber-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Moeda</p>
                <p className="text-sm text-gray-500">Real (R$)</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Privacy & Security */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Privacidade e Segurança</h3>
          </div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Alterar Senha</p>
                <p className="text-sm text-gray-500">Última alteração há 3 meses</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Privacidade de Dados</p>
                <p className="text-sm text-gray-500">Gerenciar dados pessoais</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Support */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Suporte</h3>
          </div>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Central de Ajuda</p>
                <p className="text-sm text-gray-500">Perguntas frequentes e tutoriais</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Sobre o App</p>
                <p className="text-sm text-gray-500">Versão 2.0.1</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Info className="w-5 h-5 text-orange-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Termos de Uso</p>
                <p className="text-sm text-gray-500">Políticas e condições</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Accessibility */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900">Acessibilidade</h3>
          </div>
          <button
            onClick={onNavigateToAccessibility}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Eye className="w-5 h-5 text-gray-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900">Configurações de Acessibilidade</p>
                <p className="text-sm text-gray-500">Ajustes para melhorar a experiência</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* App Info */}
        <div className="text-center text-gray-500 text-sm pb-6">
          <p>Lista Inteligente v2.0.1</p>
          <p className="mt-1">Feito com ❤️ para você</p>
        </div>
      </div>
    </div>
  );
}