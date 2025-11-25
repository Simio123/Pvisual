import { useState } from 'react';
import { ShoppingCart, TrendingUp, Users, Sparkles, Check, ArrowRight } from 'lucide-react';

type OnboardingProps = {
  onComplete: () => void;
};

const SLIDES = [
  {
    icon: ShoppingCart,
    title: 'Organize suas Compras',
    description: 'Crie listas inteligentes e nunca mais esqueça nada no mercado',
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-100'
  },
  {
    icon: TrendingUp,
    title: 'Controle seus Gastos',
    description: 'Acompanhe quanto você gasta e estabeleça orçamentos mensais',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-100'
  },
  {
    icon: Sparkles,
    title: 'Sugestões Inteligentes',
    description: 'Receba recomendações baseadas no seu histórico de compras',
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-100'
  },
  {
    icon: Users,
    title: 'Compartilhe Listas',
    description: 'Colabore com família e amigos em tempo real',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-100'
  }
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const slide = SLIDES[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Skip Button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={handleSkip}
          className="text-gray-500 hover:text-gray-700 transition-colors"
        >
          Pular
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Icon */}
        <div className={`w-32 h-32 ${slide.bgColor} rounded-full flex items-center justify-center mb-8 animate-bounce`}>
          <div className={`w-24 h-24 bg-gradient-to-br ${slide.color} rounded-full flex items-center justify-center`}>
            <Icon className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Title and Description */}
        <h1 className="text-gray-900 text-center mb-4">
          {slide.title}
        </h1>
        <p className="text-gray-600 text-center max-w-md mb-12">
          {slide.description}
        </p>

        {/* Dots Indicator */}
        <div className="flex gap-2 mb-12">
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? `w-8 bg-gradient-to-r ${slide.color}`
                  : 'w-2 bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className={`w-full max-w-md bg-gradient-to-r ${slide.color} text-white py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
        >
          {currentSlide === SLIDES.length - 1 ? (
            <>
              <Check className="w-5 h-5" />
              Começar
            </>
          ) : (
            <>
              Próximo
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>

      {/* Progress */}
      <div className="p-6">
        <div className="max-w-md mx-auto">
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${slide.color} transition-all duration-300`}
              style={{ width: `${((currentSlide + 1) / SLIDES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
