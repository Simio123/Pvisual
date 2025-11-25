import { ArrowLeft, Copy, Mail, MessageCircle, Share2, Check, QrCode } from 'lucide-react';
import { useState } from 'react';
import { ShoppingList } from '../App';

type ShareListProps = {
  list: ShoppingList;
  onBack: () => void;
};

export function ShareList({ list, onBack }: ShareListProps) {
  const [copied, setCopied] = useState(false);
  const shareLink = `https://lista-inteligente.app/share/${list.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    const text = `Confira minha lista de compras: ${list.name}`;
    const url = shareLink;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`);
        break;
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(list.name)}&body=${encodeURIComponent(text + '\n\n' + url)}`);
        break;
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(text + ' ' + url)}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
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
            <h1 className="text-gray-900">Compartilhar Lista</h1>
            <p className="text-sm text-gray-500">{list.name}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* QR Code Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-6 text-center">
          <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <QrCode className="w-24 h-24 text-blue-600" />
          </div>
          <h2 className="text-gray-900 mb-2">Escaneie para Acessar</h2>
          <p className="text-gray-500 text-sm">
            Compartilhe este QR code com amigos e família
          </p>
        </div>

        {/* Share Link */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-gray-900 mb-4">Link de Compartilhamento</h3>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 text-gray-700 text-sm overflow-x-auto whitespace-nowrap">
              {shareLink}
            </div>
            <button
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl transition-all flex items-center gap-2 ${
                copied
                  ? 'bg-green-500 text-white'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  Copiar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Share Options */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h3 className="text-gray-900 mb-4">Compartilhar Via</h3>
          <div className="grid grid-cols-1 gap-3">
            <button
              onClick={() => handleShare('whatsapp')}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">WhatsApp</p>
                <p className="text-sm text-gray-500">Enviar para contatos</p>
              </div>
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => handleShare('email')}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">E-mail</p>
                <p className="text-sm text-gray-500">Compartilhar por e-mail</p>
              </div>
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>

            <button
              onClick={() => handleShare('sms')}
              className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-gray-900">SMS</p>
                <p className="text-sm text-gray-500">Enviar mensagem de texto</p>
              </div>
              <Share2 className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Permissions */}
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h3 className="text-gray-900 mb-4">Permissões de Acesso</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900">Pode visualizar</p>
                <p className="text-sm text-gray-500">Todos com o link podem ver</p>
              </div>
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900">Pode editar</p>
                <p className="text-sm text-gray-500">Adicionar e remover itens</p>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-blue-500">
                <div className="absolute top-1 right-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
              <div>
                <p className="text-gray-900">Pode convidar outros</p>
                <p className="text-sm text-gray-500">Compartilhar com mais pessoas</p>
              </div>
              <button className="relative w-12 h-7 rounded-full bg-gray-300">
                <div className="absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md" />
              </button>
            </div>
          </div>
        </div>

        {/* Collaborators */}
        <div className="mt-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-4">Colaboradores Atuais</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white">
                MS
              </div>
              <div className="flex-1">
                <p className="text-gray-900">Maria Silva (Você)</p>
                <p className="text-sm text-gray-500">Proprietária</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white">
                JP
              </div>
              <div className="flex-1">
                <p className="text-gray-900">João Pedro</p>
                <p className="text-sm text-gray-500">Pode editar</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
