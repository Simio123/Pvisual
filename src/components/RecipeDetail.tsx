import { ArrowLeft, Clock, Users, ChefHat, Plus, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type RecipeDetailProps = {
  recipeId: string;
  onBack: () => void;
  onAddToList: (ingredients: { name: string; quantity: string }[]) => void;
};

const RECIPE_DATA: Record<string, any> = {
  '1': {
    name: 'Massa ao Molho Pesto',
    image: 'https://images.unsplash.com/photo-1712746784067-e9e1bd86c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzU0MTM0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: 25,
    servings: 4,
    difficulty: 'Fácil',
    ingredients: [
      { name: 'Macarrão penne', quantity: '500g' },
      { name: 'Manjericão fresco', quantity: '2 xícaras' },
      { name: 'Parmesão ralado', quantity: '100g' },
      { name: 'Alho', quantity: '3 dentes' },
      { name: 'Azeite de oliva', quantity: '100ml' },
      { name: 'Pinhões', quantity: '50g' },
      { name: 'Sal e pimenta', quantity: 'a gosto' },
    ],
    steps: [
      'Cozinhe o macarrão em água fervente com sal até ficar al dente',
      'No liquidificador, bata o manjericão, alho, parmesão, pinhões e azeite',
      'Tempere o pesto com sal e pimenta a gosto',
      'Escorra a massa e misture com o molho pesto',
      'Sirva imediatamente com parmesão extra por cima'
    ]
  },
  '2': {
    name: 'Frango Grelhado com Legumes',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzYzNTI4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 40,
    servings: 3,
    difficulty: 'Médio',
    ingredients: [
      { name: 'Peito de frango', quantity: '600g' },
      { name: 'Brócolis', quantity: '1 maço' },
      { name: 'Cenoura', quantity: '2 unidades' },
      { name: 'Pimentão', quantity: '2 unidades' },
      { name: 'Alho', quantity: '4 dentes' },
      { name: 'Limão', quantity: '2 unidades' },
      { name: 'Azeite', quantity: '3 colheres' },
    ],
    steps: [
      'Tempere o frango com sal, pimenta, alho e suco de limão',
      'Deixe marinar por 30 minutos',
      'Corte os legumes em pedaços médios',
      'Grelhe o frango até dourar dos dois lados',
      'Refogue os legumes com azeite e alho',
      'Sirva o frango com os legumes'
    ]
  }
};

export function RecipeDetail({ recipeId, onBack, onAddToList }: RecipeDetailProps) {
  const recipe = RECIPE_DATA[recipeId] || RECIPE_DATA['1'];

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Image Header */}
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center hover:bg-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>

        {/* Recipe Title */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white mb-2">{recipe.name}</h1>
          <div className="flex items-center gap-4 text-white/90">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {recipe.time}min
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {recipe.servings} porções
            </span>
            <span className="flex items-center gap-1">
              <ChefHat className="w-4 h-4" />
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Ingredients */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-gray-900">Ingredientes</h2>
            <button
              onClick={() => onAddToList(recipe.ingredients)}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:shadow-lg transition-all text-sm"
            >
              <Plus className="w-4 h-4" />
              Adicionar à Lista
            </button>
          </div>
          <div className="space-y-3">
            {recipe.ingredients.map((ingredient: any, index: number) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                <div className="w-6 h-6 rounded-lg border-2 border-gray-300 flex items-center justify-center flex-shrink-0">
                  <Check className="w-4 h-4 text-gray-400" />
                </div>
                <div className="flex-1">
                  <span className="text-gray-900">{ingredient.name}</span>
                </div>
                <span className="text-sm text-gray-500">{ingredient.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <h2 className="text-gray-900 mb-4">Modo de Preparo</h2>
          <div className="space-y-4">
            {recipe.steps.map((step: string, index: number) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Nutrition Info */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-4">Informações Nutricionais (por porção)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Calorias</p>
              <p className="text-2xl text-gray-900">420</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Proteínas</p>
              <p className="text-2xl text-gray-900">28g</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Carboidratos</p>
              <p className="text-2xl text-gray-900">45g</p>
            </div>
            <div className="bg-white rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">Gorduras</p>
              <p className="text-2xl text-gray-900">18g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 left-0 right-0 px-4 max-w-4xl mx-auto">
        <button
          onClick={() => onAddToList(recipe.ingredients)}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Adicionar Ingredientes à Lista
        </button>
      </div>
    </div>
  );
}
