import { useState } from 'react';
import { ArrowLeft, Camera, Mail, User as UserIcon, Calendar, Award, ShoppingBag, TrendingUp, LogOut } from 'lucide-react';
import { User } from '../App';

type ProfileProps = {
  user: User;
  onBack: () => void;
  onLogout: () => void;
  onUpdate: (updates: Partial<User>) => void;
};

export function Profile({ user, onBack, onLogout, onUpdate }: ProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);

  const handleSave = () => {
    onUpdate({ name });
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-gray-900">Meu Perfil</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6">
          <div className="h-32 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500" />
          <div className="px-6 pb-6">
            <div className="flex flex-col items-center -mt-16 mb-4">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-2 shadow-xl">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Avatar"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <UserIcon className="w-16 h-16 text-white" />
                    </div>
                  )}
                </div>
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors">
                  <Camera className="w-5 h-5 text-white" />
                </button>
              </div>

              {isEditing ? (
                <div className="w-full max-w-xs mt-4 space-y-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex-1 px-4 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      Salvar
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 className="text-gray-900 mt-4">{user.name}</h2>
                  <p className="text-gray-500 flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-3 px-6 py-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    Editar Perfil
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-3">
              <ShoppingBag className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Listas Criadas</p>
            <p className="text-gray-900">24</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-3">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-gray-500 text-sm mb-1">Itens Comprados</p>
            <p className="text-gray-900">342</p>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-gray-900 mb-4">Conquistas</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Comprador Iniciante</p>
                <p className="text-sm text-gray-500">Completou 10 listas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Organizado</p>
                <p className="text-sm text-gray-500">Usou categorias em todas as listas</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl opacity-50">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <p className="text-gray-500">Economista</p>
                <p className="text-sm text-gray-400">Economize R$ 500 no total</p>
              </div>
            </div>
          </div>
        </div>

        {/* Member Since */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Membro desde</p>
              <p className="text-gray-900">15 de Janeiro, 2025</p>
            </div>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-white text-red-600 py-4 rounded-2xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
        >
          <LogOut className="w-5 h-5" />
          Sair da Conta
        </button>
      </div>
    </div>
  );
}
