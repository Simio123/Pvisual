import { useState } from 'react';
import { ArrowLeft, Search, Clock, Users, ChefHat, Flame, Plus } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type RecipesProps = {
  onBack: () => void;
  onSelectRecipe: (id: string) => void;
};

const RECIPES = [
  {
    id: '1',
    name: 'Massa ao Molho Pesto',
    image: 'https://images.unsplash.com/photo-1712746784067-e9e1bd86c043?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzU0MTM0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    time: 25,
    servings: 4,
    difficulty: 'easy' as const,
    category: 'Massas'
  },
  {
    id: '2',
    name: 'Frango Grelhado com Legumes',
    image: 'https://images.unsplash.com/photo-1682423187670-4817da9a1b23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwY2hpY2tlbiUyMG1lYWx8ZW58MXx8fHwxNzYzNTI4MjQyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 40,
    servings: 3,
    difficulty: 'medium' as const,
    category: 'Carnes'
  },
  {
    id: '3',
    name: 'Salada Caesar Completa',
    image: 'https://images.unsplash.com/photo-1620019989479-d52fcedd99fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMHNhbGFkJTIwYm93bHxlbnwxfHx8fDE3NjM1MzY0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 15,
    servings: 2,
    difficulty: 'easy' as const,
    category: 'Saladas'
  },
  {
    id: '4',
    name: 'Bolo de Chocolate Cremoso',
    image: 'https://images.unsplash.com/photo-1736840334919-aac2d5af73e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBkZXNzZXJ0JTIwY2FrZXxlbnwxfHx8fDE3NjM1NTgwOTB8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 60,
    servings: 8,
    difficulty: 'medium' as const,
    category: 'Sobremesas'
  },
  {
    id: '5',
    name: 'Panquecas Americanas',
    image: 'https://images.unsplash.com/photo-1636743713732-125909a35dcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2Zhc3QlMjBwYW5jYWtlc3xlbnwxfHx8fDE3NjM0ODk2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 20,
    servings: 4,
    difficulty: 'easy' as const,
    category: 'Café da Manhã'
  },
  {
    id: '6',
    name: 'Refeição Saudável',
    image: 'https://images.unsplash.com/photo-1517778968789-3eea19b05c18?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGh5JTIwZm9vZCUyMGNvb2tpbmd8ZW58MXx8fHwxNzYzNTYxOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    time: 30,
    servings: 2,
    difficulty: 'easy' as const,
    category: 'Fit'
  }
];

const CATEGORIES = ['Todas', 'Massas', 'Carnes', 'Saladas', 'Sobremesas', 'Café da Manhã', 'Fit'];

export function Recipes({ onBack, onSelectRecipe }: RecipesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h1 className="text-gray-900">Receitas</h1>
              <p className="text-sm text-gray-500">Encontre inspiração para suas refeições</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar receitas..."
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4">
          {CATEGORIES.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Recipe */}
        <div className="mb-6">
          <h2 className="text-gray-900 mb-3 flex items-center gap-2">
            <Flame className="w-5 h-5 text-orange-500" />
            Receita em Destaque
          </h2>
          <button
            onClick={() => onSelectRecipe(RECIPES[0].id)}
            className="w-full bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-all group"
          >
            <div className="relative h-48 overflow-hidden">
              <ImageWithFallback
                src={RECIPES[0].image}
                alt={RECIPES[0].name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white mb-1">{RECIPES[0].name}</h3>
                <div className="flex items-center gap-3 text-white/90 text-sm">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {RECIPES[0].time}min
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {RECIPES[0].servings} porções
                  </span>
                </div>
              </div>
            </div>
          </button>
        </div>

        {/* Recipe Grid */}
        <div>
          <h2 className="text-gray-900 mb-3">Todas as Receitas</h2>
          {filteredRecipes.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow-sm">
              <ChefHat className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Nenhuma receita encontrada</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredRecipes.map(recipe => (
                <button
                  key={recipe.id}
                  onClick={() => onSelectRecipe(recipe.id)}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all group text-left"
                >
                  <div className="flex gap-4">
                    <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden">
                      <ImageWithFallback
                        src={recipe.image}
                        alt={recipe.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1 py-4 pr-4">
                      <h3 className="text-gray-900 mb-2">{recipe.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-2">
                        <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-lg">
                          {recipe.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-lg ${getDifficultyColor(recipe.difficulty)}`}>
                          {getDifficultyLabel(recipe.difficulty)}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-500 text-sm">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.time}min
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {recipe.servings}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
