import { useState } from 'react';
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, PiggyBank, AlertCircle } from 'lucide-react';
import { ShoppingList } from '../App';

type BudgetProps = {
  lists: ShoppingList[];
  onBack: () => void;
};

export function Budget({ lists, onBack }: BudgetProps) {
  const [monthlyBudget, setMonthlyBudget] = useState(1000);
  const [isEditingBudget, setIsEditingBudget] = useState(false);
  const [budgetInput, setBudgetInput] = useState(monthlyBudget.toString());

  // Calculate spending
  const totalSpent = lists.reduce((acc, list) => 
    acc + list.items.filter(item => item.purchased).reduce((sum, item) => sum + (item.price || 0), 0), 0
  );

  const remaining = monthlyBudget - totalSpent;
  const percentageUsed = (totalSpent / monthlyBudget) * 100;

  // Weekly breakdown
  const weeklyData = [
    { week: 'Semana 1', spent: 180, budget: 250 },
    { week: 'Semana 2', spent: 230, budget: 250 },
    { week: 'Semana 3', spent: 195, budget: 250 },
    { week: 'Semana 4', spent: 145, budget: 250 },
  ];

  const handleSaveBudget = () => {
    const newBudget = parseFloat(budgetInput);
    if (!isNaN(newBudget) && newBudget > 0) {
      setMonthlyBudget(newBudget);
    }
    setIsEditingBudget(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
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
            <h1 className="text-gray-900">Orçamento</h1>
            <p className="text-sm text-gray-500">Controle seus gastos</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Monthly Budget Card */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 shadow-xl mb-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-green-100 text-sm mb-1">Orçamento Mensal</p>
              {isEditingBudget ? (
                <div className="flex items-center gap-2">
                  <span className="text-3xl">R$</span>
                  <input
                    type="number"
                    value={budgetInput}
                    onChange={(e) => setBudgetInput(e.target.value)}
                    className="w-32 px-3 py-2 bg-white/20 border border-white/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-2xl"
                    autoFocus
                  />
                </div>
              ) : (
                <p className="text-4xl">R$ {monthlyBudget.toFixed(2)}</p>
              )}
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <PiggyBank className="w-8 h-8" />
            </div>
          </div>

          {isEditingBudget ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditingBudget(false)}
                className="flex-1 px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveBudget}
                className="flex-1 px-4 py-2 bg-white text-green-600 rounded-xl hover:bg-green-50 transition-colors"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setIsEditingBudget(true);
                setBudgetInput(monthlyBudget.toString());
              }}
              className="w-full px-4 py-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
            >
              Editar Orçamento
            </button>
          )}
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-red-600" />
              </div>
              <p className="text-sm text-gray-500">Gasto</p>
            </div>
            <p className="text-2xl text-gray-900">R$ {totalSpent.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">{percentageUsed.toFixed(0)}% do orçamento</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-10 h-10 ${remaining >= 0 ? 'bg-green-100' : 'bg-red-100'} rounded-xl flex items-center justify-center`}>
                {remaining >= 0 ? (
                  <TrendingDown className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
              </div>
              <p className="text-sm text-gray-500">Restante</p>
            </div>
            <p className={`text-2xl ${remaining >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              R$ {Math.abs(remaining).toFixed(2)}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {remaining >= 0 ? 'Dentro do orçamento' : 'Acima do orçamento'}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-700">Progresso do Orçamento</span>
            <span className="text-gray-900">{percentageUsed.toFixed(0)}%</span>
          </div>
          <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                percentageUsed > 100 ? 'bg-red-500' : percentageUsed > 80 ? 'bg-yellow-500' : 'bg-green-500'
              }`}
              style={{ width: `${Math.min(percentageUsed, 100)}%` }}
            />
          </div>
          {percentageUsed > 80 && (
            <div className="mt-3 p-3 bg-yellow-50 rounded-xl flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-900">Atenção ao orçamento!</p>
                <p className="text-xs text-yellow-700 mt-1">
                  Você já utilizou {percentageUsed.toFixed(0)}% do seu orçamento mensal.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Weekly Breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-blue-500" />
            <h3 className="text-gray-900">Gastos Semanais</h3>
          </div>
          <div className="space-y-4">
            {weeklyData.map((week, index) => {
              const weekPercentage = (week.spent / week.budget) * 100;
              return (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700">{week.week}</span>
                    <span className="text-gray-900">R$ {week.spent.toFixed(2)} / R$ {week.budget.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all"
                      style={{ width: `${weekPercentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 shadow-sm">
          <h3 className="text-gray-900 mb-3">💡 Dicas para Economizar</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Compare preços antes de comprar</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Faça uma lista antes de ir ao mercado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Evite compras por impulso</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span>Aproveite promoções e cupons</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
