# 📱 Lista de Compras Inteligente - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Telas de Autenticação](#telas-de-autenticação)
3. [Telas Principais](#telas-principais)
4. [Telas de Funcionalidades Avançadas](#telas-de-funcionalidades-avançadas)
5. [Telas de Configuração](#telas-de-configuração)
6. [Funcionalidades Especiais](#funcionalidades-especiais)
7. [Sistema de Temas](#sistema-de-temas)

---

## 🎯 Visão Geral

A **Lista de Compras Inteligente** é um aplicativo completo e moderno para gerenciamento de compras, com design mobile-first, múltiplas funcionalidades avançadas e foco total em acessibilidade e experiência do usuário.

### ✨ Características Principais

- 🎨 Interface moderna com gradientes e animações
- 📱 Design responsivo mobile-first
- ♿ Recursos completos de acessibilidade
- 🌓 3 modos de tema (Claro, Escuro, Daltonismo)
- 💰 Controle de preços e orçamento
- 📊 Estatísticas e análises detalhadas
- 🍳 Sistema de receitas integrado
- 🔔 Sistema de notificações
- 👥 Compartilhamento de listas
- 📜 Histórico completo de compras

---

## 🔐 Telas de Autenticação

### 1. Login (`/components/Login.tsx`)

**Descrição:** Tela inicial de autenticação do usuário.

**Funcionalidades:**
- ✅ Login com email e senha
- ✅ Cadastro de novos usuários
- ✅ Validação de formulários
- ✅ Design com gradientes atrativos
- ✅ Alternância entre modo Login/Cadastro

**Campos:**
- Email (obrigatório)
- Senha (obrigatório)
- Nome completo (apenas no cadastro)

**Ações:**
- `Entrar` - Autentica o usuário
- `Cadastrar` - Cria nova conta
- Toggle entre Login/Cadastro

---

### 2. Onboarding (`/components/Onboarding.tsx`)

**Descrição:** Tutorial interativo para novos usuários.

**Funcionalidades:**
- ✅ 3 slides informativos
- ✅ Animações suaves de transição
- ✅ Indicadores de progresso
- ✅ Navegação por swipe ou botões
- ✅ Possibilidade de pular

**Slides:**
1. **Bem-vindo** - Introdução ao app
2. **Organize suas Compras** - Recursos de organização
3. **Economize Tempo** - Benefícios e sugestões

**Ações:**
- `Próximo` - Avança para o próximo slide
- `Pular` - Vai direto para o dashboard
- `Começar` - Inicia o uso do app

---

## 🏠 Telas Principais

### 3. Dashboard (`/components/Dashboard.tsx`)

**Descrição:** Tela principal do aplicativo com visão geral e ações rápidas.

**Funcionalidades:**
- ✅ Saudação personalizada com nome do usuário
- ✅ Avatar do usuário ou ícone padrão
- ✅ Notificações com badge
- ✅ **Seletor de tema** (Claro/Escuro/Daltonismo)
- ✅ Cards de estatísticas em tempo real
- ✅ Ações rápidas com gradientes
- ✅ Lista de compras ativas
- ✅ Menu de navegação inferior

**Estatísticas Exibidas:**
- 📋 **Listas Ativas** - Total de listas não arquivadas
- ✅ **Progresso** - Porcentagem de itens comprados

**Ações Rápidas:**
- ➕ **Nova Lista** - Cria lista de compras
- 📊 **Estatísticas** - Visualiza análises
- 📁 **Categorias** - Gerencia categorias
- 🍳 **Receitas** - Explora receitas

**Menu Inferior:**
- 🏠 Dashboard (ativo)
- 📜 Histórico
- 💰 Orçamento
- ⚙️ Configurações

**Header Superior:**
- 🔔 Notificações (com indicador vermelho)
- 🎨 Seletor de Tema (novo!)
- 👤 Perfil do usuário

---

### 4. Criar Lista (`/components/CreateList.tsx`)

**Descrição:** Tela para criação de novas listas de compras.

**Funcionalidades:**
- ✅ Definir nome da lista
- ✅ Escolher cor personalizada
- ✅ Preview em tempo real
- ✅ 8 opções de cores vibrantes
- ✅ Validação de campos

**Cores Disponíveis:**
- 🔵 Azul (#3b82f6)
- 🟢 Verde (#10b981)
- 🟡 Amarelo (#f59e0b)
- 🔴 Vermelho (#ef4444)
- 🟣 Roxo (#8b5cf6)
- 🟠 Laranja (#f97316)
- 🩷 Rosa (#ec4899)
- ⚫ Cinza (#6b7280)

**Ações:**
- `Criar Lista` - Salva a nova lista
- `Voltar` - Retorna ao dashboard

---

### 5. Detalhes da Lista (`/components/ListDetail.tsx`)

**Descrição:** Visualização completa de uma lista específica com todos os itens.

**Funcionalidades:**
- ✅ Header colorido baseado na cor da lista
- ✅ Barra de progresso visual
- ✅ Total de gastos em tempo real
- ✅ Lista de itens com categorias
- ✅ Checkbox para marcar como comprado
- ✅ Edição rápida de preços
- ✅ Botão de adicionar item flutuante
- ✅ Menu de opções da lista

**Informações Exibidas:**
- Nome da lista
- Progresso (X de Y itens)
- Total gasto (R$ XXX,XX)
- Data de atualização

**Por Item:**
- ✅ Checkbox de compra
- 📦 Nome do item
- 🔢 Quantidade e unidade
- 💵 Preço (editável)
- 🏷️ Categoria (badge colorido)
- 🗑️ Botão de deletar

**Menu de Opções:**
- 🗑️ Deletar lista
- 📦 Arquivar lista
- 📤 Compartilhar lista

**Ações:**
- `+ Adicionar Item` - Abre tela de adicionar
- `Voltar` - Retorna ao dashboard

---

### 6. Adicionar Item (`/components/AddItem.tsx`)

**Descrição:** Formulário completo para adicionar novos itens à lista.

**Funcionalidades:**
- ✅ Formulário intuitivo e organizado
- ✅ Categorização automática
- ✅ Sugestões inteligentes de itens
- ✅ Ícones por categoria
- ✅ Validação de campos
- ✅ Campo de observações

**Campos do Formulário:**
- 📝 **Nome do Item** (obrigatório)
- 🔢 **Quantidade** (número)
- 📏 **Unidade** (kg, litros, unidades, etc.)
- 🏷️ **Categoria** (dropdown com 10 categorias)
- 💰 **Preço** (opcional, em reais)
- 📄 **Observações** (opcional)

**Categorias Disponíveis:**
1. 🍎 Frutas e Verduras
2. 🥛 Laticínios
3. 🥩 Carnes e Peixes
4. 🍞 Padaria
5. 🌾 Grãos e Cereais
6. 🧊 Congelados
7. 🧴 Higiene e Limpeza
8. 🥤 Bebidas
9. 🌶️ Temperos
10. 📦 Outros

**Sugestões Inteligentes:**
- Top 10 itens mais comprados
- Clique rápido para adicionar
- Preenche automaticamente nome e categoria

**Ações:**
- `Adicionar Item` - Salva o item na lista
- `Voltar` - Retorna aos detalhes da lista

---

## 📊 Telas de Funcionalidades Avançadas

### 7. Estatísticas (`/components/Statistics.tsx`)

**Descrição:** Dashboard analítico com gráficos e métricas detalhadas.

**Funcionalidades:**
- ✅ Cards de métricas principais
- ✅ Gráfico de gastos por categoria (pizza)
- ✅ Gráfico de evolução de compras (barras)
- ✅ Top 5 itens mais comprados
- ✅ Insights automáticos
- ✅ Biblioteca Recharts para visualizações

**Métricas Principais:**
- 📋 **Total de Listas** - Todas as listas criadas
- 🛒 **Total de Itens** - Soma de todos os itens
- 💰 **Gasto Total** - Soma de todos os valores
- 📊 **Média por Lista** - Gasto médio

**Gráficos:**
1. **Gastos por Categoria** (Pie Chart)
   - Visualização em pizza
   - Cores por categoria
   - Percentual de cada categoria

2. **Evolução de Compras** (Bar Chart)
   - Últimos 6 meses
   - Quantidade de itens por mês
   - Gradiente azul

**Top 5 Itens:**
- Ranking dos produtos mais comprados
- Quantidade de vezes comprado
- Ícone e nome do item

**Ações:**
- `Voltar` - Retorna ao dashboard

---

### 8. Categorias (`/components/Categories.tsx`)

**Descrição:** Gerenciador visual de categorias de produtos.

**Funcionalidades:**
- ✅ Grid de 10 categorias
- ✅ Contador de itens por categoria
- ✅ Cards coloridos com gradientes
- ✅ Ícones representativos
- ✅ Estatísticas de uso
- ✅ Design responsivo

**Categorias com Cores:**
1. 🍎 **Frutas** - Verde (#10b981)
2. 🥛 **Laticínios** - Azul claro
3. 🥩 **Carnes** - Vermelho (#ef4444)
4. 🍞 **Padaria** - Laranja (#f59e0b)
5. 🌾 **Grãos** - Amarelo
6. 🧊 **Congelados** - Ciano
7. 🧴 **Limpeza** - Roxo (#8b5cf6)
8. 🥤 **Bebidas** - Rosa (#ec4899)
9. 🌶️ **Temperos** - Verde escuro
10. 📦 **Outros** - Cinza (#6b7280)

**Informações por Categoria:**
- Total de itens cadastrados
- Porcentagem do total
- Ícone temático

**Ações:**
- `Voltar` - Retorna ao dashboard

---

### 9. Orçamento (`/components/Budget.tsx`)

**Descrição:** Gerenciador financeiro de compras com metas e alertas.

**Funcionalidades:**
- ✅ Definir orçamento mensal
- ✅ Acompanhar gastos em tempo real
- ✅ Barra de progresso visual
- ✅ Alertas de limite
- ✅ Gastos por lista
- ✅ Projeções e economia

**Cards Principais:**
- 💰 **Orçamento Total** - Meta mensal definida
- 💸 **Gasto Atual** - Total gasto no mês
- 💚 **Disponível** - Saldo restante
- 📊 **Progresso** - Porcentagem utilizada

**Barra de Progresso:**
- Verde: 0-70% (saudável)
- Amarelo: 70-90% (atenção)
- Vermelho: 90-100% (limite)

**Lista de Gastos:**
- Nome da lista
- Data da compra
- Valor total
- Badge colorido

**Funcionalidades Extras:**
- Editar orçamento mensal
- Ver histórico de gastos
- Exportar relatório
- Sugestões de economia

**Ações:**
- `Editar Orçamento` - Altera meta mensal
- `Voltar` - Retorna ao dashboard

---

### 10. Histórico (`/components/History.tsx`)

**Descrição:** Arquivo completo de listas passadas e arquivadas.

**Funcionalidades:**
- ✅ Visualizar listas arquivadas
- ✅ Restaurar listas antigas
- ✅ Ver detalhes de compras passadas
- ✅ Filtros por data
- ✅ Estatísticas do histórico

**Informações por Lista:**
- Nome e cor da lista
- Data de criação
- Data de arquivamento
- Total de itens
- Valor total gasto
- Badge "Arquivado"

**Ações Disponíveis:**
- 🔄 **Restaurar** - Traz lista de volta às ativas
- 👁️ **Ver Detalhes** - Visualiza itens da lista
- 🗑️ **Deletar Permanentemente** - Remove definitivamente

**Estatísticas:**
- Total de listas arquivadas
- Economia total realizada
- Item mais comprado historicamente

**Ações:**
- `Voltar` - Retorna ao dashboard

---

### 11. Receitas (`/components/Recipes.tsx`)

**Descrição:** Catálogo de receitas com integração para lista de compras.

**Funcionalidades:**
- ✅ Grid de receitas com imagens
- ✅ Filtros por dificuldade
- ✅ Tempo de preparo
- ✅ Número de porções
- ✅ Imagens do Unsplash
- ✅ Adicionar ingredientes à lista

**Receitas Disponíveis:**

1. **Bolo de Chocolate** 🍰
   - Dificuldade: Fácil
   - Tempo: 45 min
   - Porções: 8

2. **Lasanha** 🍝
   - Dificuldade: Média
   - Tempo: 90 min
   - Porções: 6

3. **Salada Caesar** 🥗
   - Dificuldade: Fácil
   - Tempo: 20 min
   - Porções: 4

4. **Frango Assado** 🍗
   - Dificuldade: Média
   - Tempo: 60 min
   - Porções: 4

5. **Sushi** 🍱
   - Dificuldade: Difícil
   - Tempo: 120 min
   - Porções: 4

6. **Brigadeiro** 🍫
   - Dificuldade: Fácil
   - Tempo: 30 min
   - Porções: 20

**Filtros:**
- Todas as receitas
- Fácil
- Média
- Difícil

**Ações:**
- Clique na receita → Ver detalhes
- `Voltar` - Retorna ao dashboard

---

### 12. Detalhes da Receita (`/components/RecipeDetail.tsx`)

**Descrição:** Visualização completa de uma receita específica.

**Funcionalidades:**
- ✅ Imagem grande da receita
- ✅ Informações detalhadas
- ✅ Lista completa de ingredientes
- ✅ Modo de preparo
- ✅ Adicionar todos ingredientes à lista

**Informações Exibidas:**
- 👥 Porções
- ⏱️ Tempo de preparo
- 📊 Dificuldade
- ⭐ Avaliação (opcional)

**Lista de Ingredientes:**
- Nome do ingrediente
- Quantidade exata
- Checkbox para marcar

**Ações:**
- `Adicionar à Lista` - Cria lista com todos ingredientes
- `Compartilhar Receita` - Compartilha via apps
- `Voltar` - Retorna ao catálogo

---

### 13. Compartilhar Lista (`/components/ShareList.tsx`)

**Descrição:** Sistema de compartilhamento de listas com outras pessoas.

**Funcionalidades:**
- ✅ Link de compartilhamento
- ✅ QR Code da lista
- ✅ Compartilhar via apps
- ✅ Copiar link
- ✅ Permissões de edição

**Opções de Compartilhamento:**
- 📱 WhatsApp
- 📧 Email
- 💬 Telegram
- 📋 Copiar link

**Permissões:**
- 👁️ **Visualização** - Apenas ver a lista
- ✏️ **Edição** - Pode editar itens
- 🗑️ **Administrador** - Controle total

**QR Code:**
- Gerado automaticamente
- Pode ser escaneado por outros usuários
- Acesso instantâneo à lista

**Ações:**
- `Compartilhar` - Abre menu de apps
- `Copiar Link` - Copia URL
- `Gerenciar Acessos` - Ver quem tem acesso
- `Voltar` - Retorna aos detalhes

---

### 14. Notificações (`/components/Notifications.tsx`)

**Descrição:** Central de notificações e alertas do aplicativo.

**Funcionalidades:**
- ✅ Lista de notificações por tipo
- ✅ Badges coloridos por categoria
- ✅ Marcar como lida
- ✅ Limpar todas
- ✅ Notificações em tempo real

**Tipos de Notificações:**

1. **🎯 Lembretes**
   - Listas pendentes
   - Itens não comprados
   - Compras agendadas

2. **💰 Orçamento**
   - Limite próximo (80%)
   - Limite atingido (100%)
   - Economia realizada

3. **✅ Compras**
   - Lista completada
   - Item adicionado
   - Preço alterado

4. **👥 Compartilhamento**
   - Convite recebido
   - Lista compartilhada
   - Permissão alterada

5. **🍳 Receitas**
   - Nova receita disponível
   - Ingredientes em promoção

**Ações:**
- Clique → Ver detalhes
- Swipe → Deletar
- `Marcar todas como lida`
- `Limpar todas`
- `Voltar` - Retorna ao dashboard

---

## ⚙️ Telas de Configuração

### 15. Perfil (`/components/Profile.tsx`)

**Descrição:** Tela de perfil do usuário com informações e estatísticas.

**Funcionalidades:**
- ✅ Avatar grande e personalizável
- ✅ Informações do usuário
- ✅ Estatísticas pessoais
- ✅ Conquistas e badges
- ✅ Opção de logout
- ✅ Editar perfil

**Informações Exibidas:**
- 👤 Nome completo
- 📧 Email
- 📅 Membro desde
- 🌟 Nível de usuário

**Estatísticas Pessoais:**
- 📋 Total de listas criadas
- 🛒 Total de itens comprados
- 💰 Total economizado
- 🔥 Dias consecutivos de uso

**Conquistas:**
- 🏆 Primeira compra
- 💪 10 listas criadas
- 💵 R$ 1000 economizados
- 📈 Uso por 30 dias

**Ações:**
- `Editar Perfil` - Alterar informações
- `Alterar Foto` - Trocar avatar
- `Configurações` - Ir para configurações
- `Sair` - Fazer logout

---

### 16. Configurações (`/components/Settings.tsx`)

**Descrição:** Painel completo de configurações do aplicativo.

**Funcionalidades:**
- ✅ Preferências de tema
- ✅ Configurações de notificação
- ✅ Idioma e moeda
- ✅ Privacidade e segurança
- ✅ Sobre o aplicativo
- ✅ Link para acessibilidade

**Seções de Configuração:**

**1. Aparência**
- 🌓 Tema (Claro/Escuro/Automático)
- 🎨 Cor de destaque
- 📱 Layout da interface

**2. Notificações**
- 🔔 Ativar/Desativar notificações
- 🔊 Sons de alerta
- 📳 Vibração
- ⏰ Lembretes de compras

**3. Conta**
- 👤 Editar perfil
- 🔒 Alterar senha
- 📧 Email de recuperação
- 🗑️ Excluir conta

**4. Dados**
- 💾 Backup automático
- ☁️ Sincronização na nuvem
- 📊 Exportar dados
- 🗑️ Limpar cache

**5. Sistema**
- 🌍 Idioma (PT-BR, EN, ES)
- 💰 Moeda (BRL, USD, EUR)
- 📏 Unidades de medida
- 🕐 Formato de data/hora

**6. Acessibilidade**
- ♿ Configurações completas
- 👁️ Modo para daltonismo
- 🔤 Tamanho de fonte
- 🎭 Alto contraste

**7. Sobre**
- ℹ️ Versão do app
- 📄 Termos de uso
- 🔒 Política de privacidade
- 📧 Suporte

**Ações:**
- Cada item abre sua tela específica
- Toggle switches para ativar/desativar
- Sliders para ajustes
- `Voltar` - Retorna ao dashboard

---

### 17. Acessibilidade (`/components/Accessibility.tsx`)

**Descrição:** Centro completo de recursos de acessibilidade.

**Funcionalidades:**
- ✅ 5 modos de daltonismo
- ✅ 4 tamanhos de fonte
- ✅ Modo alto contraste
- ✅ Redução de animações
- ✅ Otimização para leitores de tela
- ✅ Alvos de toque maiores

**1. Modos de Daltonismo**

- 👁️ **Normal** - Sem filtros
- 🔴 **Protanopia** - Dificuldade com vermelho
- 🟢 **Deuteranopia** - Dificuldade com verde
- 🔵 **Tritanopia** - Dificuldade com azul
- ⚫ **Acromatopsia** - Visão em tons de cinza

**2. Tamanho da Fonte**

- **Pequeno** - 14px (base)
- **Médio** - 16px (recomendado)
- **Grande** - 18px
- **Extra Grande** - 20px

**3. Opções Adicionais**

- ⚫⚪ **Alto Contraste** - Aumenta diferenciação
- 🎬 **Reduzir Animações** - Remove transições
- 🔊 **Leitor de Tela** - Otimiza para acessibilidade
- 👆 **Alvos Maiores** - Aumenta área de toque

**Como Funciona:**
- Cada opção possui toggle ou seletor
- Mudanças aplicadas instantaneamente
- Configurações salvas no perfil
- Preview em tempo real

**Filtros CSS Aplicados:**
- Ajuste de contraste
- Mudança de saturação
- Rotação de matiz
- Escala de cinza

**Ações:**
- `Testar Modo` - Preview temporário
- `Restaurar Padrões` - Volta ao normal
- `Salvar` - Mantém configurações
- `Voltar` - Retorna às configurações

---

## 🎨 Funcionalidades Especiais

### Sistema de Temas (ThemeSwitcher)

**Descrição:** Seletor de tema com 3 modos visuais.

**Localização:** Header do Dashboard (ao lado das notificações)

**3 Modos Disponíveis:**

#### 1. ☀️ Modo Claro
- Interface clara e vibrante
- Fundo branco (#ffffff)
- Texto escuro para contraste
- Cores originais mantidas
- Ideal para ambientes iluminados

**Características:**
```css
- Background: #ffffff, #f9fafb
- Text: #111827, #374151
- Gradientes vibrantes mantidos
```

#### 2. 🌙 Modo Escuro
- Reduz fadiga ocular
- Fundo escuro (#0f172a)
- Texto claro (#f1f5f9)
- Perfeito para uso noturno
- Economia de bateria (OLED)

**Características:**
```css
- Background: #0f172a, #1e293b
- Text: #f1f5f9, #cbd5e1
- Sombras suavizadas
- Gradientes preservados
```

#### 3. 👁️ Modo Daltonismo
- Cores otimizadas para daltonismo
- Filtro deuteranopia aplicado
- Contraste aumentado em 15%
- Bordas mais visíveis (2px)
- Melhor diferenciação visual

**Características:**
```css
- Cores primárias ajustadas
- Contraste: 115%
- Saturação: 120%
- Bordas destacadas
- Sombras pronunciadas
```

**Indicador Visual:**
- Badge flutuante quando modo daltonismo ativo
- Mostra "Modo Daltonismo Ativo"
- Posicionado no topo central
- Desaparece nos outros modos

**Como Usar:**
1. Clique no ícone roxo no header
2. Selecione o tema desejado
3. Aplicação instantânea
4. Preferência salva automaticamente

---

## 🔧 Tecnologias Utilizadas

### Frontend
- ⚛️ **React** - Biblioteca principal
- 🎨 **Tailwind CSS 4.0** - Estilização
- 📊 **Recharts** - Gráficos
- 🎭 **Motion/React** - Animações
- 🦋 **Lucide React** - Ícones

### Funcionalidades
- 🔐 Autenticação local
- 💾 LocalStorage para persistência
- 🎨 CSS Variables para temas
- ♿ ARIA labels completos
- 📱 Progressive Web App (PWA)

---

  ## Como rodar o projeto

  Insira `npm i` para instalar dependencias .

  Insira `npm run dev` para iniciar o servidor.
  