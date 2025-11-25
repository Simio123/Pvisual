import { useState } from 'react';
import { Accessibility } from './components/Accessibility';
import { Dashboard } from './components/Dashboard';
import { ListDetail } from './components/ListDetail';
import { CreateList } from './components/CreateList';
import { AddItem } from './components/AddItem';
import { Statistics } from './components/Statistics';
import { Categories } from './components/Categories';
import { Login } from './components/Login';
import { Onboarding } from './components/Onboarding';
import { Profile } from './components/Profile';
import { Settings } from './components/Settings';
import { Budget } from './components/Budget';
import { History } from './components/History';
import { Recipes } from './components/Recipes';
import { RecipeDetail } from './components/RecipeDetail';
import { ShareList } from './components/ShareList';
import { Notifications } from './components/Notifications';
import { ColorBlindIndicator } from './components/ColorBlindIndicator';

export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  purchased: boolean;
  price?: number;
  note?: string;
};

export type ShoppingList = {
  id: string;
  name: string;
  items: ShoppingItem[];
  createdAt: Date;
  updatedAt: Date;
  color: string;
  shared?: boolean;
  archived?: boolean;
};

export type User = {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
    currency: string;
    language: string;
    accessibility?: {
      colorBlindMode: 'normal' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia';
      fontSize: 'small' | 'medium' | 'large' | 'xlarge';
      highContrast: boolean;
      reduceMotion: boolean;
      screenReader: boolean;
      largerTouchTargets: boolean;
    };
  };
};

export type Recipe = {
  id: string;
  name: string;
  image: string;
  ingredients: { name: string; quantity: string }[];
  servings: number;
  time: number;
  difficulty: 'easy' | 'medium' | 'hard';
};

type Screen = 
  | 'login' 
  | 'onboarding' 
  | 'dashboard' 
  | 'list-detail' 
  | 'create-list' 
  | 'add-item' 
  | 'statistics' 
  | 'categories'
  | 'profile'
  | 'settings'
  | 'accessibility'
  | 'budget'
  | 'history'
  | 'recipes'
  | 'recipe-detail'
  | 'share-list'
  | 'notifications';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [selectedListId, setSelectedListId] = useState<string | null>(null);
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [lists, setLists] = useState<ShoppingList[]>([
    {
      id: '1',
      name: 'Compras da Semana',
      color: '#10b981',
      createdAt: new Date('2025-11-15'),
      updatedAt: new Date('2025-11-19'),
      items: [
        { id: '1', name: 'Leite', quantity: 2, unit: 'litros', category: 'Laticínios', purchased: true, price: 5.50 },
        { id: '2', name: 'Pão', quantity: 1, unit: 'pacote', category: 'Padaria', purchased: false, price: 7.00 },
        { id: '3', name: 'Maçã', quantity: 6, unit: 'unidades', category: 'Frutas', purchased: false, price: 12.00 },
        { id: '4', name: 'Arroz', quantity: 1, unit: 'kg', category: 'Grãos', purchased: true, price: 6.50 },
      ]
    },
    {
      id: '2',
      name: 'Churrasco',
      color: '#f59e0b',
      createdAt: new Date('2025-11-18'),
      updatedAt: new Date('2025-11-18'),
      items: [
        { id: '5', name: 'Picanha', quantity: 2, unit: 'kg', category: 'Carnes', purchased: false, price: 80.00 },
        { id: '6', name: 'Carvão', quantity: 1, unit: 'pacote', category: 'Outros', purchased: false, price: 15.00 },
        { id: '7', name: 'Sal grosso', quantity: 1, unit: 'pacote', category: 'Temperos', purchased: false, price: 3.50 },
      ]
    },
    {
      id: '3',
      name: 'Festa de Aniversário',
      color: '#ec4899',
      createdAt: new Date('2025-11-10'),
      updatedAt: new Date('2025-11-10'),
      archived: true,
      items: [
        { id: '8', name: 'Bolo', quantity: 1, unit: 'unidades', category: 'Padaria', purchased: true, price: 80.00 },
        { id: '9', name: 'Refrigerante', quantity: 6, unit: 'litros', category: 'Bebidas', purchased: true, price: 30.00 },
      ]
    }
  ]);

  const handleLogin = (email: string, password: string) => {
    setUser({
      id: '1',
      name: 'Maria Silva',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      preferences: {
        theme: 'light',
        notifications: true,
        currency: 'BRL',
        language: 'pt-BR'
      }
    });
    setCurrentScreen('onboarding');
  };

  const handleRegister = (name: string, email: string, password: string) => {
    setUser({
      id: '1',
      name: name,
      email: email,
      preferences: {
        theme: 'light',
        notifications: true,
        currency: 'BRL',
        language: 'pt-BR'
      }
    });
    setCurrentScreen('onboarding');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentScreen('login');
  };

  const handleCreateList = (name: string, color: string) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      color,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    setLists([...lists, newList]);
    setCurrentScreen('dashboard');
  };

  const handleDeleteList = (id: string) => {
    setLists(lists.filter(list => list.id !== id));
    setCurrentScreen('dashboard');
  };

  const handleArchiveList = (id: string) => {
    setLists(lists.map(list => 
      list.id === id ? { ...list, archived: !list.archived } : list
    ));
  };

  const handleAddItem = (listId: string, item: Omit<ShoppingItem, 'id'>) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: [...list.items, { ...item, id: Date.now().toString() }],
          updatedAt: new Date()
        };
      }
      return list;
    }));
    setCurrentScreen('list-detail');
  };

  const handleToggleItem = (listId: string, itemId: string) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? { ...item, purchased: !item.purchased } : item
          ),
          updatedAt: new Date()
        };
      }
      return list;
    }));
  };

  const handleDeleteItem = (listId: string, itemId: string) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.filter(item => item.id !== itemId),
          updatedAt: new Date()
        };
      }
      return list;
    }));
  };

  const handleUpdateItem = (listId: string, itemId: string, updates: Partial<ShoppingItem>) => {
    setLists(lists.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          items: list.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          ),
          updatedAt: new Date()
        };
      }
      return list;
    }));
  };

  const handleUpdateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  const selectedList = lists.find(list => list.id === selectedListId);

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen === 'login' && (
        <Login onLogin={handleLogin} onRegister={handleRegister} />
      )}

      {currentScreen === 'onboarding' && (
        <Onboarding onComplete={() => setCurrentScreen('dashboard')} />
      )}

      {currentScreen === 'dashboard' && (
        <Dashboard
          lists={lists.filter(l => !l.archived)}
          user={user}
          onSelectList={(id) => {
            setSelectedListId(id);
            setCurrentScreen('list-detail');
          }}
          onCreateList={() => setCurrentScreen('create-list')}
          onNavigate={(screen) => setCurrentScreen(screen)}
          onUpdateUser={handleUpdateUser}
        />
      )}

      {currentScreen === 'create-list' && (
        <CreateList
          onBack={() => setCurrentScreen('dashboard')}
          onCreate={handleCreateList}
        />
      )}

      {currentScreen === 'list-detail' && selectedList && (
        <ListDetail
          list={selectedList}
          onBack={() => setCurrentScreen('dashboard')}
          onAddItem={() => setCurrentScreen('add-item')}
          onToggleItem={(itemId) => handleToggleItem(selectedList.id, itemId)}
          onDeleteItem={(itemId) => handleDeleteItem(selectedList.id, itemId)}
          onDeleteList={() => handleDeleteList(selectedList.id)}
          onUpdateItem={(itemId, updates) => handleUpdateItem(selectedList.id, itemId, updates)}
          onShare={() => setCurrentScreen('share-list')}
          onArchive={() => {
            handleArchiveList(selectedList.id);
            setCurrentScreen('dashboard');
          }}
        />
      )}

      {currentScreen === 'add-item' && selectedList && (
        <AddItem
          listId={selectedList.id}
          onBack={() => setCurrentScreen('list-detail')}
          onAdd={handleAddItem}
        />
      )}

      {currentScreen === 'statistics' && (
        <Statistics
          lists={lists}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'categories' && (
        <Categories
          lists={lists}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'profile' && user && (
        <Profile
          user={user}
          onBack={() => setCurrentScreen('dashboard')}
          onLogout={handleLogout}
          onUpdate={handleUpdateUser}
        />
      )}

      {currentScreen === 'settings' && user && (
        <Settings
          user={user}
          onBack={() => setCurrentScreen('dashboard')}
          onUpdate={handleUpdateUser}
          onNavigateToAccessibility={() => setCurrentScreen('accessibility')}
        />
      )}

      {currentScreen === 'accessibility' && user && (
        <Accessibility
          user={user}
          onBack={() => setCurrentScreen('settings')}
          onUpdate={handleUpdateUser}
        />
      )}

      {currentScreen === 'budget' && (
        <Budget
          lists={lists}
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      {currentScreen === 'history' && (
        <History
          lists={lists}
          onBack={() => setCurrentScreen('dashboard')}
          onRestoreList={handleArchiveList}
        />
      )}

      {currentScreen === 'recipes' && (
        <Recipes
          onBack={() => setCurrentScreen('dashboard')}
          onSelectRecipe={(id) => {
            setSelectedRecipeId(id);
            setCurrentScreen('recipe-detail');
          }}
        />
      )}

      {currentScreen === 'recipe-detail' && selectedRecipeId && (
        <RecipeDetail
          recipeId={selectedRecipeId}
          onBack={() => setCurrentScreen('recipes')}
          onAddToList={(ingredients) => {
            // Create a new list from recipe
            const newList: ShoppingList = {
              id: Date.now().toString(),
              name: 'Ingredientes da Receita',
              color: '#8b5cf6',
              items: ingredients.map((ing, idx) => ({
                id: `${Date.now()}-${idx}`,
                name: ing.name,
                quantity: parseFloat(ing.quantity) || 1,
                unit: 'unidades',
                category: 'Outros',
                purchased: false
              })),
              createdAt: new Date(),
              updatedAt: new Date()
            };
            setLists([...lists, newList]);
            setCurrentScreen('dashboard');
          }}
        />
      )}

      {currentScreen === 'share-list' && selectedList && (
        <ShareList
          list={selectedList}
          onBack={() => setCurrentScreen('list-detail')}
        />
      )}

      {currentScreen === 'notifications' && (
        <Notifications
          onBack={() => setCurrentScreen('dashboard')}
        />
      )}

      <ColorBlindIndicator />
    </div>
  );
}