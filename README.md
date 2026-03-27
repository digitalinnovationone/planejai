# Planej.ai: Desenvolvendo um Educador Financeiro com React e IA Generativa

O **Planej.ai** é uma aplicação web de planejamento financeiro pessoal. O usuário preenche um formulário com informações sobre sua renda, gastos e uma meta financeira (como uma viagem ou a compra de um bem), e a aplicação usa inteligência artificial para gerar um diagnóstico personalizado com sugestões práticas, ideias de renda extra e um plano de ação.

Tudo funciona diretamente no navegador: sem backend, sem banco de dados remoto. Os dados são salvos no `localStorage` e as análises são geradas em tempo real pela API do Google Gemini.

---

## Stacks do Projeto

### Dependências de produção

| Pacote                   | Versão  | Finalidade                   |
| ------------------------ | ------- | ---------------------------- |
| `react`                  | ^19.2.4 | Biblioteca principal de UI   |
| `react-dom`              | ^19.2.4 | Renderização React no DOM    |
| `react-router-dom`       | ^7.13.2 | Roteamento client-side (SPA) |
| `tailwindcss`            | ^4.2.2  | Framework de CSS utilitário  |
| `@tailwindcss/vite`      | ^4.2.2  | Plugin Tailwind para Vite    |
| `@fontsource/inter`      | ^5.2.8  | Fonte Inter auto-hospedada   |
| `lucide-react`           | ^1.5.0  | Biblioteca de ícones SVG     |
| `react-loading-skeleton` | ^3.5.0  | Skeletons de carregamento    |

### Dependências de desenvolvimento

| Pacote                             | Versão  | Finalidade                               |
| ---------------------------------- | ------- | ---------------------------------------- |
| `vite`                             | ^8.0.1  | Build tool e dev server                  |
| `typescript`                       | ~5.9.3  | Tipagem estática                         |
| `@vitejs/plugin-react`             | ^6.0.1  | Suporte a React no Vite (Fast Refresh)   |
| `eslint`                           | ^9.39.4 | Linter de código                         |
| `prettier`                         | ^3.8.1  | Formatação de código                     |
| `eslint-plugin-simple-import-sort` | ^12.1.1 | Ordenação automática de imports          |
| `eslint-plugin-unused-imports`     | ^4.4.1  | Remove imports não utilizados            |
| `prettier-plugin-tailwindcss`      | ^0.7.2  | Ordenação automática de classes Tailwind |

---

## Estrutura de Pastas

```
planejai/
├── public/
│   ├── favicon.svg           # Ícone da aba do navegador
│   └── icons.svg             # Sprite de ícones SVG
├── src/
│   ├── assets/
│   │   └── images/
│   │       └── piggy-bank.png  # Imagem ilustrativa (hero)
│   ├── components/
│   │   ├── features/
│   │   │   ├── Insights/       # Componentes de exibição dos insights da IA
│   │   │   │   ├── Content.tsx
│   │   │   │   └── Error.tsx
│   │   │   ├── Simulation/     # Componentes do formulário multi-step
│   │   │   │   ├── Form.tsx
│   │   │   │   ├── FormStep.tsx
│   │   │   │   ├── Hero.tsx
│   │   │   │   └── Progress.tsx
│   │   │   └── SimulationResults/  # Componentes da página de resultados
│   │   │       ├── AIInsightCardProps.tsx
│   │   │       └── Card.tsx
│   │   ├── layout/
│   │   │   └── RootLayout.tsx  # Layout raiz com Header
│   │   └── shared/             # Componentes reutilizáveis
│   │       ├── Button.tsx
│   │       ├── Divider.tsx
│   │       ├── Header.tsx
│   │       ├── Input.tsx
│   │       └── PageHero.tsx
│   ├── context/
│   │   └── theme/
│   │       ├── ThemeContext.tsx   # Contexto de tema (claro/escuro)
│   │       └── ThemeProvider.tsx  # Provider do contexto de tema
│   ├── data/
│   │   ├── aiPrompt.ts       # Montagem do prompt para o Gemini
│   │   └── simulation.ts     # Dados e configuração do formulário
│   ├── hooks/
│   │   ├── useInsight.tsx         # Hook de chamada à API do Gemini
│   │   ├── useSimulationStorage.tsx  # Hook de leitura/escrita no localStorage
│   │   └── useTheme.tsx           # Hook de acesso ao contexto de tema
│   ├── pages/
│   │   ├── SimulationFormPage.tsx    # Página do formulário
│   │   └── SimulationResultsPage.tsx # Página de resultados
│   ├── services/
│   │   └── aiService.ts      # Chamada HTTP à API do Google Gemini
│   ├── styles/
│   │   └── theme.css         # Variáveis CSS de tema (claro/escuro)
│   ├── utils/
│   │   ├── currency.ts       # Máscara e formatação de moeda
│   │   └── simulation.ts     # Utilitários de simulação
│   ├── App.tsx               # Componente raiz
│   ├── index.css             # Estilos globais e imports
│   ├── main.tsx              # Entry point da aplicação
│   └── router.tsx            # Definição das rotas
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Estilos Iniciais

### `src/index.css`

Cole este conteúdo no arquivo `src/index.css` após instalar as dependências:

```css
@import 'tailwindcss';
@import '@fontsource/inter/400.css';
@import '@fontsource/inter/600.css';
@import '@fontsource/inter/700.css';
@import '@fontsource/inter/800.css';
@import './styles/theme.css';

@layer base {
  body {
    @apply bg-background text-foreground;
    width: 100%;
    height: 100%;
    transition:
      background-color 0.3s ease,
      color 0.3s ease;
  }
}

.lucide {
  stroke-width: 1.5;
}
```

### `src/styles/theme.css`

Crie o arquivo `src/styles/theme.css` e cole o conteúdo abaixo. Ele define as variáveis CSS de cor para os temas claro e escuro, e as registra no sistema de tokens do Tailwind v4:

```css
@layer base {
  :root,
  [data-theme='light'] {
    --background: #f8fafc;
    --foreground: #0f1729;
    --primary: #925cf0;
    --primary-foreground: #f8fafc;
    --card: #fcfcfe;
    --border: rgba(9, 9, 11, 0.08);
    --muted-primary: rgba(146, 92, 240, 0.5);
    --muted-foreground: #64749a;
    --secondary-button: #f1f5f9;
    --input: #fcfcfe;
    --skeleton-base-color: #e1e1f1;
    --skeleton-highlight-color: #c5c5df;
  }

  [data-theme='dark'] {
    --background: #0f0d16;
    --foreground: #fcfcfe;
    --primary: #925cf0;
    --primary-foreground: #fcfcfc;
    --card: #181622;
    --border: rgba(248, 250, 252, 0.4);
    --muted-primary: rgba(146, 92, 240, 0.2);
    --muted-foreground: #ad9fc8;
    --secondary-button: #27272a;
    --input: #232131;
    --skeleton-base-color: #3e3e42;
    --skeleton-highlight-color: #434052;
  }
}

@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-card: var(--card);
  --color-border: var(--border);
  --color-muted-primary: var(--muted-primary);
  --color-muted-foreground: var(--muted-foreground);
  --color-secondary-button: var(--secondary-button);
  --color-input: var(--input);
  --color-red-500: #ef4444;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --color-skeleton-base: var(--skeleton-base-color);
  --color-skeleton-highlight: var(--skeleton-highlight-color);
}
```

---

## Assets

Faça o download dos arquivos abaixo e coloque-os nos caminhos indicados dentro do projeto:

| Arquivo                                            | Caminho no projeto                 | Descrição                  |
| -------------------------------------------------- | ---------------------------------- | -------------------------- |
| [piggy-bank.png](src/assets/images/piggy-bank.png) | `src/assets/images/piggy-bank.png` | Ilustração da hero section |

---

## Sumário

- [Bloco 1 — Configuração e Layout Base do Projeto](#bloco-1--configuração-e-layout-base-do-projeto)
  - [Aula 01: Apresentação do Curso e do Projeto](#aula-01-apresentação-do-curso-e-do-projeto)
  - [Aula 02: Criando o Projeto com Vite e Configurações Iniciais](#aula-02-criando-o-projeto-com-vite-e-configurações-iniciais)
  - [Aula 03: Adicionando e Configurando o Tailwind CSS com Vite](#aula-03-adicionando-e-configurando-o-tailwind-css-com-vite)
  - [Aula 04: Configurando Variáveis de Tema e Estilos Globais](#aula-04-configurando-variáveis-de-tema-e-estilos-globais)
  - [Aula 05: Configurando Rotas com React Router](#aula-05-configurando-rotas-com-react-router)
  - [Aula 06: Componente `Button`](#aula-06-componente-button)
  - [Aula 07: Cabeçalho e Menu de Navegação](#aula-07-cabeçalho-e-menu-de-navegação)
- [Bloco 2 — Temas e Formulário Multi-Step de Simulação](#bloco-2--temas-e-formulário-multi-step-de-simulação)
  - [Aula 08: Implementando o Sistema de Temas](#aula-08-implementando-o-sistema-de-temas)
  - [Aula 09: Estrutura Base da Página de Simulação](#aula-09-estrutura-base-da-página-de-simulação)
  - [Aula 10: Componente de Progresso do Formulário](#aula-10-componente-de-progresso-do-formulário)
  - [Aula 11: Interface do Formulário de Simulação](#aula-11-interface-do-formulário-de-simulação)
  - [Aula 12: Configurando os Dados do Formulário Multi-Step](#aula-12-configurando-os-dados-do-formulário-multi-step)
  - [Aula 13: Lógica de Avançar, Voltar e Exibir Progresso](#aula-13-lógica-de-avançar-voltar-e-exibir-progresso)
  - [Aula 14: Aplicando Máscara de Moeda no Input](#aula-14-aplicando-máscara-de-moeda-no-input)
  - [Aula 15: Salvando as Respostas no localStorage](#aula-15-salvando-as-respostas-no-localstorage)
- [Bloco 3 — Resultado da Simulação e Insights com IA](#bloco-3--resultado-da-simulação-e-insights-com-ia)
  - [Aula 16: Componentes para a Página de Resultados](#aula-16-componentes-para-a-página-de-resultados)
  - [Aula 17: Implementando ID Único para Cada Simulação](#aula-17-implementando-id-único-para-cada-simulação)
  - [Aula 18: Criando o Prompt para a IA Generativa](#aula-18-criando-o-prompt-para-a-ia-generativa)
  - [Aula 19: Obtendo a Chave de API do Google Gemini](#aula-19-obtendo-a-chave-de-api-do-google-gemini)
  - [Aula 20: Chamada para a API do Gemini](#aula-20-chamada-para-a-api-do-gemini)
  - [Aula 21: Evitando Chamadas Duplicadas à API](#aula-21-evitando-chamadas-duplicadas-à-api)
  - [Aula 22: Estados de Carregamento e de Erro](#aula-22-estados-de-carregamento-e-de-erro)
  - [Aula 23: Exibindo o Diagnóstico Financeiro da IA](#aula-23-exibindo-o-diagnóstico-financeiro-da-ia)
- [Desafios](#desafios)
  - [Desafio 1 — Página de Histórico de Simulações](#desafio-1--página-de-histórico-de-simulações)
  - [Desafio 2 — Conversando com o Educador Financeiro](#desafio-2--conversando-com-o-educador-financeiro)

---

## Bloco 1 — Configuração e Layout Base do Projeto

### Aula 01: Apresentação do Curso e do Projeto

O Planej.ai é uma SPA (Single Page Application) desenvolvida com React + TypeScript. Nesta série, você vai aprender a construir do zero uma aplicação com formulário multi-step, sistema de temas (claro/escuro), persistência de dados com `localStorage` e integração com IA generativa.

---

### Aula 02: Criando o Projeto com Vite e Configurações Iniciais

1. Crie o projeto utilizando o Vite com o template de React + TypeScript:

   ```bash
   pnpm create vite planejai --template react-ts
   ```

2. Faça uma limpeza nos arquivos gerados automaticamente pelo Vite:
   - Remova o arquivo `App.css`
   - Limpe o conteúdo de `App.tsx`
   - Deixe o arquivo `index.css` em branco
   - Remova as imagens da pasta `assets`

3. Configure o repositório Git e vincule ao repositório remoto:

   ```bash
   git init
   git commit -m "feat: create project react-ts"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/seu-repositorio.git
   ```

4. Configure o ESLint, Prettier e o VSCode com a ajuda da IA. Use o seguinte prompt como base para gerar as configurações:

   ```
   - Faça a configuração do Prettier no projeto e ESLint.
   - Configure o VSCode para o projeto
   - Sempre que o desenvolvedor salvar um arquivo, ele deve ser formatado automaticamente
   - Espaçamento para novos arquivos de 2 tabs por padrão
   - Remova automaticamente os imports que não são utilizados
   - Faça a ordenação dos imports automaticamente
   - Adicione o plugin do Prettier para organizar as classes do tailwind
   - Configure o alias no projeto '@/' para a pasta src
   ```

---

### Aula 03: Adicionando e Configurando o Tailwind CSS com Vite

O **Tailwind CSS** é um framework de CSS "utility-first": em vez de criar classes personalizadas no seu próprio CSS (como `.botao-primario`), você monta o visual dos elementos usando classes pré-prontas, onde cada uma é responsável por uma única propriedade (espaçamento, cor, tamanho, sombra etc.).

Isso torna o desenvolvimento mais rápido, o CSS final mais leve (só as classes usadas são incluídas no build) e facilita a criação de layouts responsivos e consistentes.

1. Instale o Tailwind CSS e o plugin de integração com o Vite:

   ```bash
   pnpm add tailwindcss @tailwindcss/vite
   ```

2. Configure o plugin no arquivo `vite.config.ts`:

   ```tsx
   import { defineConfig } from 'vite'
   import tailwindcss from '@tailwindcss/vite'

   export default defineConfig({
     plugins: [tailwindcss()],
   })
   ```

3. Adicione a fonte `Inter` ao projeto:

   ```bash
   pnpm add @fontsource/inter
   ```

   Importe os pesos da fonte no arquivo `index.css`:

   ```css
   @import '@fontsource/inter/400.css';
   @import '@fontsource/inter/600.css';
   @import '@fontsource/inter/700.css';
   @import '@fontsource/inter/800.css';
   ```

---

### Aula 04: Configurando Variáveis de Tema e Estilos Globais

Neste projeto, utilizaremos dois arquivos de estilos:

- `index.css` → ponto de entrada e estilos globais
- `styles/theme.css` → design tokens (variáveis de cor por tema)

1. Importe o Tailwind dentro dos estilos globais (`index.css`):

   ```css
   @import 'tailwindcss';
   @import '@fontsource/inter/400.css';
   @import '@fontsource/inter/600.css';
   @import '@fontsource/inter/700.css';
   @import '@fontsource/inter/800.css';
   ```

2. Defina os tokens de design no arquivo `/styles/theme.css`.

   **`@theme`:** No Tailwind v4, o `@theme` é onde você registra os nomes das classes personalizadas. Ao declarar `--color-primary: ...` dentro dele, o Tailwind cria automaticamente as classes `bg-primary`, `text-primary`, `border-primary`, etc. Sem isso, essas classes não funcionariam.

   **`@layer base`:** Usado para adicionar estilos globais e resetar regras padrão do CSS para elementos HTML (como `h1`, `a`, `body`). Esses estilos são carregados antes das classes utilitárias, que podem sobrescrevê-los quando necessário.

   ```css
   @layer base {
     :root,
     [data-theme='light'] {
       --background: #f8fafc;
       --foreground: #0f1729;
       --primary: #925cf0;
       --primary-foreground: #f8fafc;
       --card: #fcfcfe;
       --border: rgba(9, 9, 11, 0.08);
       --muted-primary: rgba(146, 92, 240, 0.5);
       --muted-foreground: #64749a;
       --secondary-button: #f1f5f9;
       --input: #fcfcfe;
     }

     [data-theme='dark'] {
       --background: #0f0d16;
       --foreground: #fcfcfe;
       --primary: #925cf0;
       --primary-foreground: #fcfcfc;
       --card: #181622;
       --border: rgba(248, 250, 252, 0.4);
       --muted-primary: rgba(146, 92, 240, 0.2);
       --muted-foreground: #ad9fc8;
       --secondary-button: #27272a;
       --input: #232131;
     }
   }

   @theme {
     --color-background: var(--background);
     --color-foreground: var(--foreground);
     --color-primary: var(--primary);
     --color-primary-foreground: var(--primary-foreground);
     --color-card: var(--card);
     --color-border: var(--border);
     --color-muted-primary: var(--muted-primary);
     --color-muted-foreground: var(--muted-foreground);
     --color-secondary-button: var(--secondary-button);
     --color-input: var(--input);
     --color-red-500: #ef4444;
     --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
   }
   ```

3. Adicione os estilos globais ao `index.css`:

   ```css
   @import 'tailwindcss';
   @import '@fontsource/inter/400.css';
   @import '@fontsource/inter/600.css';
   @import '@fontsource/inter/700.css';
   @import '@fontsource/inter/800.css';
   @import './styles/theme.css';

   @layer base {
     body {
       @apply bg-background text-foreground;
       width: 100%;
       height: 100%;
       transition:
         background-color 0.3s ease,
         color 0.3s ease;
     }
   }
   ```

---

### Aula 05: Configurando Rotas com React Router

O React, por padrão, é uma SPA (_Single Page Application_). O React Router permite simular a navegação entre páginas sem recarregar o navegador.

1. Instale a biblioteca:

   ```bash
   pnpm add react-router-dom
   ```

2. Crie o arquivo `src/router.tsx` com as rotas da aplicação. Por enquanto, vamos usar elementos temporários que serão substituídos pelos componentes reais:

   ```tsx
   import { createBrowserRouter } from 'react-router-dom'

   export const router = createBrowserRouter([
     {
       children: [
         {
           path: '/',
           element: <h1>Formulário de Simulação</h1>,
         },
         {
           path: '/resultado',
           element: <h1>Resultado da Simulação</h1>,
         },
         {
           path: '/historico',
           element: <h1>Histórico de Simulações</h1>,
         },
       ],
     },
   ])
   ```

3. No `App.tsx`, configure o `RouterProvider` para disponibilizar as rotas e os hooks do React Router em toda a aplicação:

   ```tsx
   import { RouterProvider } from 'react-router-dom'

   import { router } from './router'

   function App() {
     return <RouterProvider router={router} />
   }

   export default App
   ```

---

### Aula 06: Componente `Button`

Nesta aula, criaremos o componente `Button` reutilizável. Ele recebe uma prop `variant` que define qual estilo deve ser aplicado, permitindo usar o mesmo componente em diferentes contextos sem precisar estilizar do zero a cada uso.

Exemplo de uso:

```tsx
<Button variant="primary" icon={PiggyBank}>
  Clique aqui
</Button>
```

1. Crie o arquivo em `src/components/shared/Button/index.tsx` com a estrutura inicial:

   ```tsx
   export function Button() {
     return <button>Clique aqui</button>
   }
   ```

2. Adicione a biblioteca de ícones:

   ```bash
   pnpm add lucide-react
   ```

3. Declare as propriedades que o `Button` pode receber.

   > O `extends ButtonHTMLAttributes` garante que o componente aceite props nativas como `type="submit"`, `onClick`, `disabled`, etc., sem precisar declará-las manualmente uma por uma.

   ```tsx
   import type { LucideIcon } from 'lucide-react'
   import type { ButtonHTMLAttributes } from 'react'

   interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
     variant: 'primary' | 'secondary' | 'ghost'
     icon?: LucideIcon
   }

   export function Button({
     variant,
     icon: Icon,
     children,
     ...props
   }: ButtonProps) {
     return (
       <button {...props}>
         {Icon && <Icon size={16} />}
         {children}
       </button>
     )
   }
   ```

4. Adicione as classes base e as classes por variante:

   ```tsx
   const baseClasses =
     'flex cursor-pointer items-center justify-center font-medium text-sm gap-2 px-4 py-3 transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-80'

   const variantClasses = {
     primary: 'bg-primary text-primary-foreground font-semibold rounded-xl',
     secondary: 'bg-secondary-button border border-border rounded-3xl',
     ghost: 'rounded-lg text-foreground',
   }
   ```

5. Aplique as classes e permita customização via `className`:

   ```tsx
   export function Button({
     variant,
     icon: Icon,
     children,
     className,
     ...props
   }: ButtonProps) {
     return (
       <button
         className={[baseClasses, variantClasses[variant], className].join(' ')}
         {...props}
       >
         {Icon && <Icon />}
         {children}
       </button>
     )
   }
   ```

6. Deixe os ícones do Lucide com espessura de traço mais fina globalmente no CSS:

   ```css
   .lucide {
     stroke-width: 1.5;
   }
   ```

---

### Aula 07: Cabeçalho e Menu de Navegação

1. Crie o componente `Header` em `src/components/shared/Header/index.tsx`:

   ```tsx
   export function Header() {
     return <header>Header</header>
   }
   ```

2. Crie o `RootLayout` para exibir o `Header` em todas as páginas da aplicação:

   `src/components/layout/RootLayout.tsx`

   ```tsx
   import { Outlet } from 'react-router-dom'

   import { Header } from '../shared/Header'

   export function RootLayout() {
     return (
       <>
         <Header />
         <Outlet />
       </>
     )
   }
   ```

   Atualize o `router.tsx` para usar o `RootLayout`:

   ```tsx
   import { createBrowserRouter } from 'react-router-dom'

   import { RootLayout } from './components/layout/RootLayout'

   export const router = createBrowserRouter([
     {
       element: <RootLayout />,
       children: [
         {
           path: '/',
           element: <h1>Formulário de Simulação</h1>,
         },
         {
           path: '/resultado',
           element: <h1>Resultado da Simulação</h1>,
         },
         {
           path: '/historico',
           element: <h1>Histórico de Simulações</h1>,
         },
       ],
     },
   ])
   ```

3. Desenvolva o logotipo dentro do `Header`:

   ```tsx
   import { Wallet } from 'lucide-react'

   export function Header() {
     return (
       <header className="border-b border-(--border) px-6 py-3">
         <nav className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
               <Wallet size={20} className="text-primary-foreground" />
             </div>
             <span className="text-lg">
               <span className="text-muted-foreground font-medium">Planej</span>
               <span className="font-extrabold">.ai</span>
             </span>
           </div>
         </nav>
       </header>
     )
   }
   ```

4. Adicione os botões de navegação:

   ```tsx
   import { Clock, TrendingUp, Wallet } from 'lucide-react'
   import { useNavigate } from 'react-router-dom'

   import { Button } from './Button'

   export function Header() {
     const navigate = useNavigate()

     return (
       <header className="border-b border-(--border) px-6 py-3">
         <nav className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
               <Wallet size={20} className="text-primary-foreground" />
             </div>
             <span className="text-lg">
               <span className="text-muted-foreground font-medium">Planej</span>
               <span className="font-extrabold">.ai</span>
             </span>
           </div>
           <div className="flex items-center gap-1">
             <Button
               variant="secondary"
               icon={TrendingUp}
               onClick={() => void navigate('/')}
             >
               <span className="hidden sm:inline">Nova Simulação</span>
             </Button>
             <Button
               variant="ghost"
               icon={Clock}
               onClick={() => void navigate('/historico')}
             >
               <span className="hidden sm:inline">Histórico</span>
             </Button>
           </div>
         </nav>
       </header>
     )
   }
   ```

---

## Bloco 2 — Temas e Formulário Multi-Step de Simulação

### Aula 08: Implementando o Sistema de Temas

Nesta aula, criaremos a lógica para que o usuário possa alternar entre os temas claro e escuro usando a **Context API** do React.

Requisitos:

- A preferência de tema deve ser salva no `localStorage`.
- Se não houver valor salvo, deve-se usar a preferência do sistema operacional.

1. Crie o arquivo `src/context/theme/ThemeContext.tsx` com a definição do contexto:

   ```tsx
   import { createContext } from 'react'

   export type Theme = 'light' | 'dark'

   interface ThemeContextValue {
     theme: Theme
     toggleTheme: () => void
   }

   export const ThemeContext = createContext<ThemeContextValue | undefined>(
     undefined,
   )
   ```

2. Crie o `ThemeProvider` em `src/context/theme/ThemeProvider.tsx`. Começamos com a estrutura básica:

   ```tsx
   import { type PropsWithChildren, useState } from 'react'

   import { type Theme, ThemeContext } from './ThemeContext'

   export function ThemeProvider({ children }: PropsWithChildren) {
     const [theme, setTheme] = useState<Theme>('light')

     const toggleTheme = () => {
       setTheme((currentTheme) => (currentTheme === 'light' ? 'dark' : 'light'))
     }

     return (
       <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     )
   }
   ```

3. Adicione o `useEffect` para atualizar o atributo `data-theme` no HTML e salvar a preferência no `localStorage`. Sempre que o `theme` muda, atualizamos o atributo no HTML (para o CSS aplicar as cores corretas) e salvamos no `localStorage`:

   ```tsx
   useEffect(() => {
     document.documentElement.setAttribute('data-theme', theme)
     localStorage.setItem('theme', theme)
   }, [theme])
   ```

4. Inicialize o estado de tema com as preferências salvas (localStorage ou sistema operacional):

   ```tsx
   const [theme, setTheme] = useState<Theme>(() => {
     const localStorageTheme = localStorage.getItem('theme') as Theme | null

     if (localStorageTheme) {
       return localStorageTheme
     }

     const systemPrefersDark = window.matchMedia(
       '(prefers-color-scheme: dark)',
     ).matches

     return systemPrefersDark ? 'dark' : 'light'
   })
   ```

5. Crie o hook personalizado `useTheme` em `src/hooks/useTheme.tsx`:

   ```tsx
   import { useContext } from 'react'

   import { ThemeContext } from '../context/theme/ThemeContext'

   export function useTheme() {
     const context = useContext(ThemeContext)

     if (context === undefined) {
       throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
     }

     return context
   }
   ```

6. Envolva a aplicação com o `ThemeProvider` no `App.tsx`:

   ```tsx
   import { RouterProvider } from 'react-router-dom'

   import { ThemeProvider } from './context/theme/ThemeProvider'
   import { router } from './router'

   function App() {
     return (
       <ThemeProvider>
         <RouterProvider router={router} />
       </ThemeProvider>
     )
   }

   export default App
   ```

7. Adicione o botão de alternar tema no `Header`:

   ```tsx
   <Button
     aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
     variant="ghost"
     icon={theme === 'light' ? Moon : Sun}
     onClick={toggleTheme}
   />
   ```

8. Crie o componente `Divider` em `src/components/shared/Divider.tsx`:

   ```tsx
   interface DividerProps {
     orientation?: 'horizontal' | 'vertical'
     spacing?: number
     className?: string
   }

   export function Divider({
     orientation = 'horizontal',
     spacing = 16,
     className,
   }: DividerProps) {
     const style =
       orientation === 'horizontal'
         ? { marginTop: spacing, marginBottom: spacing }
         : { marginLeft: spacing, marginRight: spacing }

     const classNamesByOrientation = {
       horizontal: 'w-full h-px',
       vertical: 'self-stretch w-px',
     }

     return (
       <div
         role="separator"
         aria-orientation={orientation}
         style={style}
         className={[
           'bg-border',
           classNamesByOrientation[orientation],
           className,
         ]
           .filter(Boolean)
           .join(' ')}
       />
     )
   }
   ```

9. Versão final do `Header` com todos os elementos:

   ```tsx
   import { Clock, Moon, Sun, TrendingUp, Wallet } from 'lucide-react'
   import { useNavigate } from 'react-router-dom'

   import { useTheme } from '../../hooks/useTheme'
   import { Button } from './Button'
   import { Divider } from './Divider'

   export function Header() {
     const navigate = useNavigate()
     const { theme, toggleTheme } = useTheme()

     return (
       <header className="border-b border-(--border) px-6 py-3">
         <nav className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="bg-primary flex h-9 w-9 items-center justify-center rounded-full">
               <Wallet size={20} className="text-primary-foreground" />
             </div>
             <span className="text-lg">
               <span className="text-muted-foreground font-medium">Planej</span>
               <span className="font-extrabold">.ai</span>
             </span>
           </div>
           <div className="flex items-center gap-1">
             <Button
               variant="secondary"
               icon={TrendingUp}
               onClick={() => void navigate('/')}
             >
               <span className="hidden sm:inline">Nova Simulação</span>
             </Button>
             <Button
               variant="ghost"
               icon={Clock}
               onClick={() => void navigate('/historico')}
             >
               <span className="hidden sm:inline">Histórico</span>
             </Button>
             <Divider orientation="vertical" />
             <Button
               aria-label={`Mudar para tema ${theme === 'light' ? 'escuro' : 'claro'}`}
               variant="ghost"
               icon={theme === 'light' ? Moon : Sun}
               onClick={toggleTheme}
             />
           </div>
         </nav>
       </header>
     )
   }
   ```

---

### Aula 09: Estrutura Base da Página de Simulação

1. Crie a página `SimulationFormPage` e registre-a na rota `/`:

   `src/pages/SimulationFormPage.tsx`

   ```tsx
   export function SimulationFormPage() {
     return (
       <div>
         <h1>Simulation Form Page</h1>
       </div>
     )
   }
   ```

   `src/router.tsx`

   ```tsx
   import { createBrowserRouter } from 'react-router-dom'

   import { RootLayout } from './components/layout/RootLayout'
   import { SimulationFormPage } from './pages/SimulationFormPage'

   export const router = createBrowserRouter([
     {
       element: <RootLayout />,
       children: [
         {
           path: '/',
           element: <SimulationFormPage />,
         },
         {
           path: '/resultado',
           element: <h1>Resultado da Simulação</h1>,
         },
         {
           path: '/historico',
           element: <h1>Histórico de Simulações</h1>,
         },
       ],
     },
   ])
   ```

2. Crie o componente `SimulationHero` para o título e subtítulo da página.

   > Adicione a imagem do cofrinho 3D em `src/assets/images/piggy-bank.png`.

   `src/components/features/Simulation/Hero/index.tsx`

   ```tsx
   import PiggyBankImage from '@/assets/images/piggy-bank.png'

   export function SimulationHero() {
     return (
       <div className="mb-8 text-center">
         <div className="flex flex-col items-center sm:flex-row">
           <h1 className="text-foreground text-3xl font-semibold sm:text-4xl">
             Vamos planejar seu futuro
           </h1>
           <img
             src={PiggyBankImage}
             alt=""
             aria-hidden="true"
             className="h-16 w-16 sm:-mt-2 sm:-ml-3"
           />
         </div>
         <p className="text-muted-foreground text-sm">
           Responda algumas questões para ter insights financeiros
           personalizados.
         </p>
       </div>
     )
   }
   ```

3. Atualize a página de simulação para incluir o hero e um componente de formulário:

   ```tsx
   import { SimulationHero } from '@/components/features/Simulation/Hero'
   import { SimulationForm } from '../components/features/Simulation/Form'

   export function SimulationFormPage() {
     return (
       <main className="mx-auto max-w-xl px-4 py-10 sm:py-14">
         <SimulationHero />
         <SimulationForm />
       </main>
     )
   }
   ```

---

### Aula 10: Componente de Progresso do Formulário

Crie o componente de barra de progresso para o formulário multi-step:

`src/components/features/Simulation/Progress/index.tsx`

```tsx
interface StepProgressProps {
  currentStep: number
  totalSteps: number
}

export function StepProgress({ currentStep, totalSteps }: StepProgressProps) {
  const progress = (currentStep / totalSteps) * 100

  return (
    <div className="mb-4">
      <p className="text-muted-foreground mb-2 text-sm">
        Passo {currentStep} de {totalSteps}
      </p>
      <div className="bg-border h-1 w-full overflow-hidden rounded-full">
        <div
          role="progressbar"
          aria-valuenow={currentStep}
          aria-valuemin={1}
          aria-valuemax={totalSteps}
          aria-label={`Passo ${currentStep} de ${totalSteps}`}
          className="bg-primary h-full rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
```

---

### Aula 11: Interface do Formulário de Simulação

1. Crie o componente `FormStep`:

   `src/components/features/Simulation/FormStep/index.tsx`

   ```tsx
   import type { LucideIcon } from 'lucide-react'

   interface FormStepProps {
     icon: LucideIcon
     title: string
     question: string
   }

   export function FormStep({ icon: Icon, title, question }: FormStepProps) {
     return (
       <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
         <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
           <Icon size={32} className="text-primary-foreground" />
         </div>
         <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
           {title}
         </h2>
         <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
           {question}
         </h3>
       </div>
     )
   }
   ```

2. Crie o componente `Input` em `src/components/shared/Input.tsx`:

   ```tsx
   import type { InputHTMLAttributes } from 'react'

   import { Divider } from './Divider'

   export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
     prefix?: string
     suffix?: string
   }

   export function Input({ prefix, suffix, ...rest }: InputProps) {
     return (
       <div className="bg-input flex items-center rounded-2xl p-4 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]">
         {prefix && (
           <>
             <span className="text-muted-foreground text-sm font-medium">
               {prefix}
             </span>
             <Divider orientation="vertical" />
           </>
         )}
         <input
           className="text-foreground placeholder:text-muted-foreground w-full bg-transparent text-sm outline-none"
           autoFocus
           {...rest}
         />
         {suffix && (
           <>
             <Divider orientation="vertical" />
             <span className="text-muted-foreground ml-3 text-sm font-medium">
               {suffix}
             </span>
           </>
         )}
       </div>
     )
   }
   ```

3. Atualize o `FormStep` para incluir o input e os botões de navegação:

   ```tsx
   import { ArrowLeft, ArrowRight, type LucideIcon } from 'lucide-react'

   import { Button } from '@/components/shared/Button'
   import { Input, type InputProps } from '@/components/shared/Input'

   interface FormStepProps {
     icon: LucideIcon
     title: string
     question: string
     inputProps: InputProps
     submitButtonProps?: {
       label: string
       emojiIcon?: string
     }
   }

   export function FormStep({
     icon: Icon,
     title,
     question,
     inputProps,
     submitButtonProps,
   }: FormStepProps) {
     return (
       <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
         <div className="bg-primary mb-4 flex h-15 w-15 items-center justify-center rounded-xl">
           <Icon size={32} className="text-primary-foreground" />
         </div>
         <h2 className="text-primary mb-1 text-xs font-semibold tracking-widest uppercase">
           {title}
         </h2>
         <h3 className="text-foreground mb-6 text-xl leading-snug font-semibold sm:text-2xl">
           {question}
         </h3>
         <form className="flex flex-col gap-4">
           <Input {...inputProps} />
           <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
             <Button
               type="button"
               variant="ghost"
               className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
             >
               <ArrowLeft size={16} />
               Voltar
             </Button>
             <Button
               type="submit"
               variant="primary"
               className="order-1 flex-1 sm:order-2"
             >
               {submitButtonProps?.label ?? 'Próximo'}
               {submitButtonProps?.emojiIcon ?? <ArrowRight size={16} />}
             </Button>
           </div>
         </form>
       </div>
     )
   }
   ```

---

### Aula 12: Configurando os Dados do Formulário Multi-Step

1. Exporte a interface `FormStepProps` para ser usada em outros arquivos:

   ```tsx
   export interface FormStepProps {
     id: string
     // ... demais propriedades
   }
   ```

2. Crie o arquivo `src/data/simulation.ts` com a configuração de cada step do formulário:

   ```tsx
   import {
     CalendarClock,
     CreditCard,
     Goal,
     Landmark,
     PiggyBank,
     Wallet,
   } from 'lucide-react'

   import type { FormStepProps } from '../components/features/Simulation/FormStep'

   export const simulationFormSteps: FormStepProps[] = [
     {
       id: 'income',
       icon: PiggyBank,
       title: 'Renda mensal bruta',
       question:
         'Quanto é depositado na sua conta todo mês (somando todas as fontes)?',
       inputProps: {
         placeholder: 'ex: 5.000,00',
         prefix: 'R$',
         maxLength: 12,
       },
     },
     {
       id: 'expenses',
       icon: CreditCard,
       title: 'Custos fixos de vida',
       question:
         'Quanto você gasta mensalmente com custos fixos (aluguel, contas, etc)?',
       inputProps: {
         placeholder: 'ex: 2.000,00',
         prefix: 'R$',
         maxLength: 12,
       },
     },
     {
       id: 'debts',
       icon: Landmark,
       title: 'Dívidas / parcelas',
       question:
         'Você tem algum valor comprometido com parcelas ou empréstimos mensalmente?',
       inputProps: {
         placeholder: 'ex: 500,00',
         prefix: 'R$',
         maxLength: 12,
       },
     },
     {
       id: 'goalName',
       icon: Goal,
       title: 'Nome da meta',
       question: 'Qual o objetivo que você deseja alcançar?',
       inputProps: {
         placeholder: 'ex: Viagem para o Japão',
         maxLength: 50,
       },
     },
     {
       id: 'goalAmount',
       icon: Wallet,
       title: 'Custo da meta',
       question: 'Quanto custa realizar esse sonho?',
       inputProps: {
         placeholder: 'ex: 15.000,00',
         prefix: 'R$',
         maxLength: 12,
       },
     },
     {
       id: 'goalDeadline',
       icon: CalendarClock,
       title: 'Prazo desejado',
       question: 'Em quantos meses você planeja atingir esse objetivo?',
       inputProps: {
         type: 'number',
         placeholder: 'ex: 12',
         suffix: 'meses',
         min: 1,
         max: 120,
       },
       submitButtonProps: {
         label: 'Gerar simulação',
         emojiIcon: '✨',
       },
     },
   ]
   ```

3. Use os dados no componente `SimulationForm`:

   ```tsx
   import { simulationFormSteps } from '@/data/simulation'

   import { FormStep } from './FormStep'
   import { FormProgress } from './Progress'

   export const SimulationForm = () => {
     const currentStep = simulationFormSteps[0]

     return (
       <>
         <FormProgress currentStep={1} totalSteps={6} />
         <FormStep key={currentStep.id} {...currentStep} />
       </>
     )
   }
   ```

---

### Aula 13: Lógica de Avançar, Voltar e Exibir Progresso

1. Adicione um estado para controlar o step atual:

   ```tsx
   export const SimulationForm = () => {
     const [currentStepIndex, setCurrentStepIndex] = useState(0)
     const totalSteps = simulationFormSteps.length
     const currentStep = simulationFormSteps[currentStepIndex]

     return (
       <>
         <FormProgress
           currentStep={currentStepIndex + 1}
           totalSteps={totalSteps}
         />
         <FormStep key={currentStep.id} {...currentStep} />
       </>
     )
   }
   ```

2. Implemente as funções de navegação:

   ```tsx
   const handleNextStep = () => {
     if (currentStepIndex + 1 > totalSteps - 1) {
       return
     }

     setCurrentStepIndex((prev) => prev + 1)
   }

   const handlePreviousStep = () => {
     if (currentStepIndex === 0) {
       return
     }

     setCurrentStepIndex((prev) => prev - 1)
   }
   ```

3. Atualize o `FormStep` para receber e chamar as funções de navegação:

   ```tsx
   interface ActionsButtonsProps {
     onBack: () => void
     onNext: () => void
     hideBackButton?: boolean
   }

   export function FormStep({
     icon: Icon,
     title,
     question,
     inputProps,
     submitButtonProps,
     hideBackButton,
     onBack,
     onNext,
   }: FormStepProps & ActionsButtonsProps) {
     const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
       e.preventDefault()
       onNext()
     }

     return (
       <div className="bg-card rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] sm:p-8">
         {/* ... */}
         <form onSubmit={handleSubmit} className="flex flex-col gap-4">
           <Input {...inputProps} />
           <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
             {!hideBackButton && (
               <Button
                 type="button"
                 variant="ghost"
                 className="order-2 flex-1 justify-center rounded-xl py-3 sm:order-1"
                 onClick={onBack}
               >
                 <ArrowLeft size={16} />
                 Voltar
               </Button>
             )}
             <Button
               type="submit"
               variant="primary"
               className="order-1 flex-1 sm:order-2"
             >
               {submitButtonProps?.label ?? 'Próximo'}
               {submitButtonProps?.emojiIcon ?? <ArrowRight size={16} />}
             </Button>
           </div>
         </form>
       </div>
     )
   }
   ```

4. Adicione validação para não permitir avançar com o campo vazio:

   ```tsx
   export function FormStep({ ... }: FormStepProps & ActionsButtonsProps) {
     const [inputValue, setInputValue] = useState('')

     const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
       e.preventDefault()

       if (!inputValue) {
         return
       }

       onNext()
     }

     return (
       // ...
       <Input
         {...inputProps}
         value={inputValue}
         onChange={(e) => setInputValue(e.target.value)}
       />
       <Button
         type="submit"
         variant="primary"
         className="order-1 flex-1 sm:order-2"
         disabled={!inputValue}
       >
         {/* ... */}
       </Button>
     )
   }
   ```

---

### Aula 14: Aplicando Máscara de Moeda no Input

1. Crie a função de máscara em `src/utils/currency.ts`:

   ```tsx
   export function formatCurrencyMask(value: string): string {
     const digits = value.replace(/\D/g, '')

     if (!digits) {
       return ''
     }

     const number = parseInt(digits, 10) / 100

     return number.toLocaleString('pt-BR', {
       minimumFractionDigits: 2,
       maximumFractionDigits: 2,
     })
   }
   ```

2. Aplique a máscara nos inputs monetários dentro do `FormStep`:

   ```tsx
   <Input
     {...inputProps}
     value={inputValue}
     onChange={(e) => {
       const isCurrency = inputProps.prefix === 'R$'
       const value = e.target.value
       setInputValue(isCurrency ? formatCurrencyMask(value) : value)
     }}
   />
   ```

3. Corrija o bug em que o input da próxima pergunta vinha preenchido com o valor anterior. A solução é adicionar a prop `key` no componente — quando o `key` muda, o React desmonta e remonta o componente do zero, resetando automaticamente todo o estado interno:

   ```tsx
   <FormStep
     {...currentStep}
     key={currentStep.id}
     hideBackButton={currentStepIndex === 0}
     onBack={handlePreviousStep}
     onNext={handleNextStep}
   />
   ```

---

### Aula 15: Salvando as Respostas no localStorage

1. Atualize o `FormStep` para enviar o valor preenchido ao componente pai quando avançar:

   ```tsx
   interface ActionsButtonsProps {
     onBack: () => void
     onNext: (value: string) => void
     hideBackButton?: boolean
   }

   const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
     e.preventDefault()

     if (!inputValue) {
       return
     }

     onNext(inputValue)
   }
   ```

2. Adicione o tipo `SimulationFormData` ao arquivo de dados. O operador `satisfies` valida que o array respeita o formato de `FormStepProps[]`, mas sem apagar os tipos literais dos `id`s. Assim, o TypeScript sabe exatamente quais valores existem, e o tipo `SimulationFormData` é gerado automaticamente a partir dos dados — sem precisar declarar manualmente cada chave:

   ```tsx
   export const simulationFormSteps: FormStepProps[] = [
     // ...
   ] satisfies FormStepProps[]

   export type SimulationFormData = Record<
     (typeof simulationFormSteps)[number]['id'],
     string
   >
   ```

3. Salve os dados de cada step no estado do `SimulationForm`:

   ```tsx
   import { type SimulationFormData, simulationFormSteps } from '@/data/simulation'

   export const SimulationForm = () => {
     const [currentStepIndex, setCurrentStepIndex] = useState(0)
     const [formData, setFormData] = useState<SimulationFormData>({} as SimulationFormData)
     const totalSteps = simulationFormSteps.length
     const currentStep = simulationFormSteps[currentStepIndex]

     const handleNextStep = (value: string) => {
       const updatedFormData = { ...formData, [currentStep.id]: value }

       setFormData(updatedFormData)

       if (currentStepIndex + 1 > totalSteps - 1) {
         return
       }

       setCurrentStepIndex((prev) => prev + 1)
     }
   ```

4. Crie o hook `useSimulationStorage` para centralizar a lógica de persistência:

   `src/hooks/useSimulationStorage.tsx`

   ```tsx
   import { type SimulationFormData } from '@/data/simulation'

   const LOCAL_STORAGE_KEY = 'simulation-data'

   export const useSimulationStorage = () => {
     const saveFormData = (formData: SimulationFormData) => {
       const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
       const savedData = storage
         ? (JSON.parse(storage) as SimulationFormData[])
         : []

       localStorage.setItem(
         LOCAL_STORAGE_KEY,
         JSON.stringify([...savedData, formData]),
       )
     }

     return { saveFormData }
   }
   ```

5. Ao finalizar o formulário, salve os dados e navegue para a página de resultados:

   ```tsx
   const navigate = useNavigate()

   const handleNextStep = (value: string) => {
     const updatedFormData = { ...formData, [currentStep.id]: value }
     setFormData(updatedFormData)

     if (currentStepIndex + 1 > totalSteps - 1) {
       saveFormData(updatedFormData)
       void navigate('/resultado')
       return
     }

     setCurrentStepIndex((prev) => prev + 1)
   }
   ```

---

## Bloco 3 — Resultado da Simulação e Insights com IA

### Aula 16: Componentes para a Página de Resultados

1. Crie a `SimulationResultsPage` e configure a rota:

   ```tsx
   export function SimulationResultsPage() {
     return <h1>Página de Resultados</h1>
   }
   ```

   ```tsx
   {
     path: '/resultado',
     element: <SimulationResultsPage />,
   }
   ```

2. Crie o componente `PageHero` em `src/components/shared/PageHero.tsx`:

   ```tsx
   interface PageHeroProps {
     title: string
     subtitle: string
   }

   export function PageHero({ title, subtitle }: PageHeroProps) {
     return (
       <>
         <h1 className="text-foreground mb-1 text-2xl font-semibold sm:text-3xl">
           {title}
         </h1>
         <p className="text-muted-foreground mb-8 text-sm">{subtitle}</p>
       </>
     )
   }
   ```

3. Crie o componente `Card` para exibir os dados da simulação:

   `src/components/features/SimulationResults/Card.tsx`

   ```tsx
   import type { LucideIcon } from 'lucide-react'

   interface CardProps {
     icon: LucideIcon
     label: string
     value: string
     subtitle: string
     variant?: 'default' | 'primary'
   }

   const variantClasses = {
     default: {
       card: 'bg-card',
       accent: 'text-primary',
       value: 'text-foreground',
       subtitle: 'text-muted-foreground',
     },
     primary: {
       card: 'bg-primary',
       accent: 'text-primary-foreground',
       value: 'text-primary-foreground',
       subtitle: 'text-primary-foreground/70',
     },
   }

   export function Card({
     icon: Icon,
     label,
     value,
     subtitle,
     variant = 'default',
   }: CardProps) {
     const styles = variantClasses[variant]

     return (
       <div
         className={[
           'rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)]',
           styles.card,
         ].join(' ')}
       >
         <div className="mb-3 flex items-center gap-2">
           <Icon size={16} className={styles.accent} />
           <span
             className={[
               'text-xs font-semibold tracking-widest uppercase',
               styles.accent,
             ].join(' ')}
           >
             {label}
           </span>
         </div>
         <p className={['text-3xl font-semibold', styles.value].join(' ')}>
           {value}
         </p>
         <p className={['mt-1 text-sm', styles.subtitle].join(' ')}>
           {subtitle}
         </p>
       </div>
     )
   }
   ```

4. Crie a função utilitária `parseCurrency` em `src/utils/currency.ts`:

   ```tsx
   export function parseCurrency(value: string): number {
     return (
       parseFloat(
         value.replace(/\./g, '').replace(',', '.').replace('R$', ''),
       ) || 0
     )
   }
   ```

5. Crie a função `calcMonthlySavings` em `src/utils/simulation.ts`:

   ```tsx
   import type { SimulationFormData } from '../data/simulation'
   import { parseCurrency } from './currency'

   export function calcMonthlySavings(data: SimulationFormData) {
     return (
       parseCurrency(data.income) -
       parseCurrency(data.expenses) -
       parseCurrency(data.debts)
     )
   }
   ```

6. Monte a página de resultados com todos os cards:

   ```tsx
   const mock: SimulationFormData = {
     income: 'R$ 5.000,00',
     expenses: 'R$ 2.000,00',
     debts: 'R$ 500,00',
     goalName: 'Viagem para o Japão',
     goalAmount: 'R$ 15.000,00',
     goalDeadline: '12',
   }

   export function SimulationResultsPage() {
     const data = mock as SimulationFormData
     const monthlySavings = calcMonthlySavings(data)

     return (
       <main className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
         <PageHero
           title="Resultado da sua simulação"
           subtitle="Com base no seu perfil financeiro e objetivos."
         />
         <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
           <Card
             icon={Goal}
             label="Custo da Meta"
             value={data.goalAmount}
             subtitle={data.goalName}
           />
           <Card
             icon={CalendarClock}
             label="Prazo"
             value={`${data.goalDeadline} meses`}
             subtitle="Prazo para atingir a meta"
           />
           <Card
             variant="primary"
             icon={PiggyBank}
             label="Economia mensal"
             value={`R$ ${monthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
             subtitle="Economia mensal necessária"
           />
         </div>
         <div className="grid gap-6 lg:grid-cols-3">
           <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
             Painel de Insights
           </div>
           <div className="order-1 flex flex-col gap-6 lg:order-2">
             <Card
               icon={Wallet}
               label="Renda mensal"
               value={data.income}
               subtitle="Renda total bruta por mês"
             />
             <Card
               icon={CreditCardIcon}
               label="Custos Fixos de Vida"
               value={data.expenses}
               subtitle="Gastos essenciais por mês"
             />
             <Card
               icon={Landmark}
               label="Dívidas / Parcelas"
               value={data.debts}
               subtitle="Valor comprometido em parcelas/depósito"
             />
           </div>
         </div>
       </main>
     )
   }
   ```

---

### Aula 17: Implementando ID Único para Cada Simulação

Atualmente salvamos simulações sem um identificador único, o que impede recuperar um registro específico na página de resultados.

1. Crie o tipo `SimulationRecord` no hook de armazenamento. A boa prática é não poluir o tipo de formulário com responsabilidades de armazenamento:

   ```tsx
   export type SimulationRecord = SimulationFormData & { id: string }
   ```

2. Atualize `saveFormData` para gerar um ID único usando a Web Crypto API:

   ```tsx
   export const useSimulationStorage = () => {
     const saveFormData = (formData: SimulationFormData) => {
       const id = crypto.randomUUID()
       const record: SimulationRecord = { ...formData, id }

       const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
       const savedData = storage
         ? (JSON.parse(storage) as SimulationRecord[])
         : []

       localStorage.setItem(
         LOCAL_STORAGE_KEY,
         JSON.stringify([...savedData, record]),
       )

       return id
     }
   }
   ```

3. Adicione a função `getFormData` para buscar uma simulação pelo ID:

   ```tsx
   const getFormData = (id: string): SimulationRecord | null => {
     const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
     if (!storage) {
       return null
     }

     const savedData = JSON.parse(storage) as SimulationRecord[]
     return savedData.find((record) => record.id === id) || null
   }
   ```

4. Use o ID retornado para navegar com o parâmetro de rota:

   ```tsx
   const handleNextStep = (value: string) => {
     const updatedFormData = { ...formData, [currentStep.id]: value }
     setFormData(updatedFormData)

     if (currentStepIndex + 1 > totalSteps - 1) {
       const id = saveFormData(updatedFormData)
       void navigate(`/resultado/${id}`)
       return
     }

     setCurrentStepIndex((prev) => prev + 1)
   }
   ```

5. Atualize a rota e a página de resultados para ler o ID via `useParams`:

   ```tsx
   // router.tsx
   {
     path: '/resultado/:id',
     element: <SimulationResultsPage />,
   }
   ```

   ```tsx
   // SimulationResultsPage.tsx
   export function SimulationResultsPage() {
     const { id } = useParams<{ id: string }>()
     const { getFormData } = useSimulationStorage()
     const data = id ? getFormData(id) : null

     if (!data) {
       return <p>Simulação não encontrada.</p>
     }

     // ...
   }
   ```

---

### Aula 18: Criando o Prompt para a IA Generativa

Ao integrar IA em uma aplicação, a qualidade do prompt é determinante para a qualidade da resposta. Veja os elementos essenciais:

| Elemento             | Por que é importante                     |
| -------------------- | ---------------------------------------- |
| Papel                | Define tom e consistência                |
| Contexto de exibição | Evita respostas inadequadas para a UI    |
| Dados estruturados   | Garante que a IA usa os valores corretos |
| Formato de saída     | Permite processar a resposta no código   |
| Schema               | Contrato entre prompt e código           |
| Critérios objetivos  | Elimina ambiguidade em campos enumerados |
| Regras de restrição  | Previne comportamentos indesejados       |

- **Papel (Role):** Diga quem a IA é. Quanto mais específico, mais consistente e previsível será o comportamento.
- **Contexto de exibição:** A IA não sabe onde a resposta vai aparecer. Se não informar, ela pode usar markdown, escrever em terceira pessoa ou textos longos demais.
- **Dados estruturados:** Passe os dados de forma clara e rotulada. Inclua também valores calculados para garantir consistência com os que o sistema exibe.
- **Formato de saída:** Em integrações, você precisa processar a resposta no código — instrua a IA a retornar um formato específico (JSON).
- **Schema como contrato:** Mostra exatamente o que o código espera receber da IA.
- **Critérios objetivos:** Para campos com valores fixos, defina os critérios explicitamente. Nunca deixe a IA inferir.
- **Regras de restrição:** Limitam comportamentos indesejados que a IA poderia ter por padrão.

`src/data/aiPrompt.ts`

```tsx
import type { SimulationRecord } from '@/hooks/useSimulationStorage'
import { parseCurrency } from '@/utils/currency'
import { calcMonthlySavings } from '@/utils/simulation'

const RESPONSE_SCHEMA = `{
  "feasibility": {
    "status": "viable" | "needs_adjustment" | "unfeasible",
    "content": "<Análise objetiva sobre se a meta é atingível no prazo com o valor disponível. Mencione os números relevantes.>"
  },
  "diagnosis": {
    "content": "<Diagnóstico focado no comprometimento do orçamento: quanto % da renda está comprometida com gastos e dívidas, e o que isso representa para a saúde financeira.>"
  },
  "suggestions": {
    "items": ["<Sugestão prática e concreta para reduzir gastos ou reorganizar o orçamento>"]
  },
  "extraIncome": {
    "items": ["<Ideia prática para gerar renda extra compatível com a realidade brasileira>"]
  },
  "investment": {
    "items": ["<Sugestão de investimento acessível para o perfil apresentado, com foco em atingir a meta>"]
  },
  "motivation": {
    "content": "<Mensagem final motivacional e personalizada, citando a meta pelo nome.>"
  }
}`

export function buildAIPrompt(simulation: SimulationRecord) {
  const { income, expenses, debts, goalName, goalAmount, goalDeadline } =
    simulation

  const monthlySavings = calcMonthlySavings(simulation)
  const monthlySavingsNeeded =
    parseCurrency(goalAmount) / parseInt(goalDeadline)

  return `Você é um educador financeiro especializado em finanças pessoais. Analise os dados abaixo e gere um diagnóstico financeiro personalizado com linguagem clara, didática e encorajadora, voltado para pessoas sem conhecimento financeiro. O diagnóstico será exibido diretamente ao usuário no app, fale sempre em segunda pessoa ("você tem...", "sua meta...").

Dados da simulação:
- Renda mensal bruta: ${income}
- Custos fixos essenciais: ${expenses}
- Dívidas e parcelas mensais: ${debts}
- Valor disponível por mês: ${monthlySavings} reais
- Meta: ${goalName}
- Custo da meta: ${goalAmount}
- Prazo desejado: ${goalDeadline} meses
- Economia mensal necessária para atingir a meta no prazo: ${monthlySavingsNeeded} reais
- Saldo após reserva para a meta: ${monthlySavings - monthlySavingsNeeded} reais

Retorne APENAS um JSON válido, sem texto adicional, sem blocos de código, neste formato exato:

${RESPONSE_SCHEMA}

Regras:
- Todos os textos em português do Brasil
- Máximo de 4 itens por lista
- Seja específico ao citar valores calculados
- Não repita informações entre seções
- Nunca use markdown dentro dos valores do JSON
- Para o campo "feasibility.status", use os seguintes critérios:
  - "viable": saldo após reserva para a meta é maior ou igual a 0
  - "needs_adjustment": saldo negativo de até 20% do valor da economia mensal necessária
  - "unfeasible": saldo negativo superior a 20% do valor da economia mensal necessária`
}
```

---

### Aula 19: Obtendo a Chave de API do Google Gemini

1. Acesse o [Google AI Studio](https://aistudio.google.com/) com sua conta Google.
2. No menu lateral, clique em **Get API Key**.
3. Clique em **Criar chave de API** e dê um nome para ela.
4. Copie a chave gerada.
5. Crie o arquivo `.env.local` na raiz do projeto e adicione a chave:

   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```

---

### Aula 20: Chamada para a API do Gemini

1. Crie o serviço em `src/services/aiService.ts`:

   ```tsx
   interface GeminiResponse {
     candidates: {
       content: {
         parts: { text: string }[]
       }
     }[]
   }

   const API_KEY = String(import.meta.env.VITE_GEMINI_API_KEY)
   const MODEL_NAME = 'gemini-flash-latest'
   const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`

   const callGeminiAPI = async (prompt: string) => {
     const response = await fetch(GEMINI_API_URL, {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({
         contents: [{ parts: [{ text: prompt }] }],
       }),
     })

     if (!response.ok) {
       throw new Error(`Erro na requisição: ${response.status}`)
     }

     return (await response.json()) as GeminiResponse
   }

   export interface InsightData {
     feasibility: {
       status: 'viable' | 'needs_adjustment' | 'unfeasible'
       content: string
     }
     diagnosis: { content: string }
     suggestions: { items: string[] }
     extraIncome: { items: string[] }
     investment: { items: string[] }
     motivation: { content: string }
   }

   export const getInsight = async (prompt: string) => {
     const response = await callGeminiAPI(prompt)
     const json = response.candidates[0].content.parts[0].text
     return JSON.parse(json) as InsightData
   }
   ```

2. Crie o hook `useInsight` em `src/hooks/useInsight.ts`:

   ```tsx
   import { useCallback, useEffect, useState } from 'react'

   import { buildAIPrompt } from '@/data/aiPrompt'
   import { useSimulationStorage } from '@/hooks/useSimulationStorage'
   import { getInsight, type InsightData } from '@/services/aiService'

   export const useInsight = (id: string) => {
     const [insight, setInsight] = useState<InsightData | null>(null)
     const [isLoading, setIsLoading] = useState(false)
     const [error, setError] = useState<string | null>(null)

     const { getFormData } = useSimulationStorage()

     // useCallback é necessário pois essa função entra no array de dependências do useEffect
     const fetchInsight = useCallback(
       async (simulationId: string) => {
         const simulation = getFormData(simulationId)

         if (!simulation) {
           setError('Simulação não encontrada.')
           return
         }

         setIsLoading(true)
         setError(null)

         try {
           const prompt = buildAIPrompt(simulation)
           const data = await getInsight(prompt)
           setInsight(data)
           return data
         } catch {
           setError('Erro ao gerar o diagnóstico. Tente novamente.')
         } finally {
           setIsLoading(false)
         }
       },
       [getFormData],
     )

     useEffect(() => {
       if (insight || isLoading) {
         return
       }

       fetchInsight(id).then((data) => {
         if (!data) return
         setInsight(data)
       })
     }, [id, insight, isLoading, fetchInsight])

     return { insight, isLoading, error, fetchInsight }
   }
   ```

3. Crie o componente `AIInsightsCard`:

   ```tsx
   import { useInsight } from '@/hooks/useInsight'

   interface AIInsightCardProps {
     simulationId: string
   }

   export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
     const { insight } = useInsight(simulationId)

     return (
       <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
         Painel de Insights
       </div>
     )
   }
   ```

---

### Aula 21: Evitando Chamadas Duplicadas à API

Em desenvolvimento, o React Strict Mode renderiza componentes duas vezes, o que faz a API do Gemini ser chamada duas vezes. Use um `useRef` como flag para evitar isso:

```tsx
export const useInsight = (id: string) => {
  const isRequestPending = useRef(false)
  const [insight, setInsight] = useState<InsightData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { getFormData } = useSimulationStorage()

  const fetchInsight = useCallback(
    async (simulationId: string) => {
      const simulation = getFormData(simulationId)

      if (!simulation) {
        setError('Simulação não encontrada.')
        return
      }

      isRequestPending.current = true
      setIsLoading(true)
      setError(null)

      try {
        const prompt = buildAIPrompt(simulation)
        const data = await getInsight(prompt)
        setInsight(data)
        return data
      } catch {
        setError('Erro ao gerar o diagnóstico. Tente novamente.')
      } finally {
        isRequestPending.current = false
        setIsLoading(false)
      }
    },
    [getFormData],
  )

  useEffect(() => {
    // Evita loop infinito de requisições para a API do Gemini
    if (insight || isLoading || isRequestPending.current || error) {
      return
    }

    fetchInsight(id).then((data) => {
      isRequestPending.current = false
      if (!data) {
        return
      }

      setInsight(data)
    })
  }, [id, insight, isLoading, fetchInsight])

  return { insight, isLoading, error, fetchInsight }
}
```

Para evitar chamadas desnecessárias quando o usuário revisita uma simulação, salve o insight no `localStorage` junto com os dados da simulação:

```tsx
// data/simulation.ts
export type SimulationRecord = SimulationFormData & {
  id: string
  insight?: InsightData
}

const updateSimulation = (id: string, data: SimulationRecord) => {
  const storage = localStorage.getItem(LOCAL_STORAGE_KEY)
  const savedData = storage ? (JSON.parse(storage) as SimulationRecord[]) : []

  const updated = savedData.map((record) =>
    record.id === id ? { ...data } : record,
  )

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated))
}
```

Inicialize o estado do insight com o valor salvo, se existir:

```tsx
const [insight, setInsight] = useState<InsightData | null>(() => {
  const simulation = getFormData(id)

  if (simulation?.insight) {
    return simulation.insight
  }

  return null
})
```

---

### Aula 22: Estados de Carregamento e de Erro

1. Crie os componentes de estado:

   `src/components/features/Insights/Error.tsx`

   ```tsx
   import { RefreshCw } from 'lucide-react'

   import { Button } from '../../shared/Button'

   interface ErrorProps {
     simulationId: string
     message: string
     onRetry: () => void
   }

   export function Error({ simulationId, message, onRetry }: ErrorProps) {
     if (!simulationId || !message) {
       return null
     }

     return (
       <div className="flex h-full flex-col items-center justify-center gap-3 p-6">
         <p className="text-sm text-red-500">⚠️ {message}</p>
         <Button
           variant="primary"
           className="px-6"
           icon={RefreshCw}
           onClick={onRetry}
         >
           Tentar novamente
         </Button>
       </div>
     )
   }
   ```

2. Instale a biblioteca de skeleton para o estado de carregamento:

   ```bash
   pnpm add react-loading-skeleton
   ```

3. Atualize o `AIInsightsCard` para tratar os diferentes estados:

   ```tsx
   import 'react-loading-skeleton/dist/skeleton.css'

   import Skeleton from 'react-loading-skeleton'

   export function AIInsightsCard({ simulationId }: AIInsightCardProps) {
     const { insight, isLoading, error, fetchInsight } =
       useInsight(simulationId)

     return (
       <div className="bg-card order-2 rounded-2xl p-6 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.2)] lg:order-1 lg:col-span-2">
         <div className="mb-3 flex items-center gap-1.5">
           <span>✨</span>
           <span className="text-primary text-xs font-semibold tracking-widest uppercase">
             Insight Financeiro Personalizado
           </span>
         </div>

         {isLoading && (
           <div className="flex">
             <Skeleton
               count={10.5}
               baseColor="var(--color-skeleton-base)"
               highlightColor="var(--color-skeleton-highlight)"
               className="mb-3 flex rounded-lg"
               containerClassName="flex-1"
               inline
             />
           </div>
         )}
         {!isLoading && error && (
           <Error
             simulationId={simulationId}
             message={error}
             onRetry={() => fetchInsight(simulationId)}
           />
         )}
         {!isLoading && insight && <Content insight={insight} />}
       </div>
     )
   }
   ```

4. Adicione as cores do skeleton ao `theme.css`:

   ```css
   @layer base {
     :root,
     [data-theme='light'] {
       /* ... */
       --skeleton-base-color: #e1e1f1;
       --skeleton-highlight-color: #c5c5df;
     }

     [data-theme='dark'] {
       /* ... */
       --skeleton-base-color: #3e3e42;
       --skeleton-highlight-color: #434052;
     }
   }

   @theme {
     /* ... */
     --color-skeleton-base: var(--skeleton-base-color);
     --color-skeleton-highlight: var(--skeleton-highlight-color);
   }
   ```

---

### Aula 23: Exibindo o Diagnóstico Financeiro da IA

Crie o componente `Content` para renderizar os insights retornados:

```tsx
import type { PropsWithChildren } from 'react'

import type { InsightData } from '@/services/aiService'

interface ContentProps {
  insight: InsightData
}

function Paragraph({ children }: PropsWithChildren) {
  return (
    <p className="text-muted-foreground text-sm leading-relaxed">{children}</p>
  )
}

function SectionTitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-foreground mt-5 mb-1.5 text-sm leading-relaxed font-semibold">
      {children}
    </h3>
  )
}

function OrderedList({ items }: { items: string[] }) {
  return (
    <ol className="text-muted-foreground ml-6 list-decimal text-sm leading-relaxed">
      {items.map((item, index) => (
        <li key={index} className="pl-1">
          {item}
        </li>
      ))}
    </ol>
  )
}

const statusStyles = {
  viable: {
    label: 'Meta viável no prazo',
    className:
      'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  },
  needs_adjustment: {
    label: 'Ajuste necessário',
    className:
      'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  },
  unfeasible: {
    label: 'Meta inviável no prazo',
    className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  },
}

export function Content({ insight }: ContentProps) {
  const status = statusStyles[insight.feasibility.status] ?? null

  return (
    <div className="lg:scrollbar-thin lg:max-h-93 lg:overflow-y-auto lg:pr-2 lg:[scrollbar-color:var(--border)_transparent]">
      <section className="flex flex-col gap-2">
        <div className="flex flex-col items-start gap-2 sm:flex-row">
          <span className="text-foreground text-sm font-semibold">
            🎯 Viabilidade da Meta
          </span>
          {status && (
            <span
              className={`w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${status.className}`}
            >
              {status.label}
            </span>
          )}
        </div>
        <Paragraph>{insight.feasibility.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>💰 Diagnóstico Financeiro</SectionTitle>
        <Paragraph>{insight.diagnosis.content}</Paragraph>
      </section>

      <section>
        <SectionTitle>📋 Sugestões Práticas</SectionTitle>
        <OrderedList items={insight.suggestions.items} />
      </section>

      <section>
        <SectionTitle>💡 Como Aumentar sua Renda</SectionTitle>
        <OrderedList items={insight.extraIncome.items} />
      </section>

      <section>
        <SectionTitle>🏦 Sugestões de Investimento</SectionTitle>
        <OrderedList items={insight.investment.items} />
      </section>

      <section>
        <SectionTitle>🚀 Mensagem Final</SectionTitle>
        <Paragraph>{insight.motivation.content}</Paragraph>
      </section>
    </div>
  )
}
```

Envie os insights via props na chamada do componente:

```tsx
<Content insight={insight} />
```

---

## Desafios

### Desafio 1 — Página de Histórico de Simulações

- Exiba um resumo de cada simulação salva
- Crie um layout responsivo seguindo o protótipo
- Permita excluir uma simulação do histórico
- Ao clicar em "Ver detalhes", navegue para a página de resultados com os insights já gerados

### Desafio 2 — Conversando com o Educador Financeiro

- Adicione um campo de texto dentro do componente `AIInsightCard`
- Permita que o usuário faça perguntas sobre a simulação realizada
- A IA deve retornar respostas claras e exibi-las seguindo o protótipo
- O scroll deve rolar automaticamente quando a IA retornar uma resposta
- Mostre feedback de carregamento e erro para o usuário
- O usuário pode fazer quantas perguntas quiser por simulação
- Todo o histórico de perguntas e respostas deve ser exibido na tela
- As conversas devem ser salvas no `localStorage` para consulta posterior
