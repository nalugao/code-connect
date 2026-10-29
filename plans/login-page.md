# Página de Login — Code Connect (`apps/web`)

## Context
O `apps/web` ainda é o template do Vite. Vamos construir a página de login a partir do layout enviado, seguindo as regras do CLAUDE.md: Atomic Design, Tailwind e um teste por componente. A página de cadastro (que ainda não será feita) usa o mesmo layout base, com outro banner e outros campos. Por isso o layout vira um **template** reutilizável e o formulário fica num organism separado.

Decisões já tomadas com a usuária:
- O submit é só UI. O `LoginForm` faz uma validação básica e chama `onSubmit(values)`, que recebe via props. A API não entra agora.
- Instalar o `react-router`, com a rota `/login`. A rota `/` redireciona para `/login`, e o link "Crie seu cadastro!" já aponta para `/cadastro`, que ainda não existe.
- Os elos de corrente do fundo serão desenhados em SVG inline.

## 1. Setup (fazer antes dos componentes)
- **Tailwind v4**: `pnpm --filter web add -D tailwindcss @tailwindcss/vite` e incluir o plugin em `vite.config.ts`.
- **Testes**: `pnpm --filter web add -D vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`.
  - Adicionar um bloco `test` em `vite.config.ts`: `environment: 'jsdom'`, `globals: true`, `setupFiles: './src/test/setup.ts'`. O setup importa `@testing-library/jest-dom/vitest`.
  - Usar `/// <reference types="vitest/config" />` no topo do config.
  - Em `tsconfig.app.json`, adicionar `"vitest/globals"` e `"@testing-library/jest-dom"` em `types`.
  - Em `apps/web/package.json`, criar os scripts `"test": "vitest run"` e `"test:watch": "vitest"`.
  - No `package.json` da raiz, trocar o `test` para `pnpm -r test`, para rodar os testes da api e do web.
- **Router**: `pnpm --filter web add react-router`.
- **Fonte**: carregar a Prompt pelo Google Fonts em `index.html` (é a fonte do layout). Mudar `lang="pt-BR"` e o title para "Code Connect".
- **Tokens** em `src/index.css`, que hoje tem o CSS do template e será substituído:
  ```css
  @import "tailwindcss";
  @theme {
    --font-sans: "Prompt", sans-serif;
    --color-page: #01080E;      /* fundo da tela */
    --color-card: #171D1F;      /* card central */
    --color-shape: #0F1A1F;     /* elos decorativos */
    --color-primary: #81FE88;   /* botão / link verde */
    --color-input: #888888;     /* fundo dos inputs */
    --color-offwhite: #E1E1E1;  /* textos */
    --color-dark: #132E35;      /* texto do botão primário */
  }
  ```
- **Limpeza do template**: remover `App.css`, `src/assets/*` (hero, react e vite) e `public/icons.svg`.

## 2. Componentes (`src/components/`, uma pasta por componente com `X.tsx` + `X.test.tsx`)

**atoms/**
- `Button`: props `variant: 'primary'` e as props nativas de `<button>`, com `children` (texto + ícone). Teste: o botão renderiza e o `onClick` é chamado.
- `Input`: repassa as props nativas e o `ref`, além de `invalid?: boolean` para o estilo de erro. Teste: o usuário digita e o valor muda.
- `Label`: tem `htmlFor` e `children`. Teste: o label renderiza associado ao input.
- `Checkbox`: tem `label` e as props nativas, com o checkbox estilizado em verde. Teste: o clique alterna o estado checked.
- `TextLink`: é um wrapper do `Link` do react-router, com `variant: 'muted' | 'primary'`. Teste: o `href` está correto (renderizado dentro de `MemoryRouter`).
- `Divider`: uma linha horizontal com um texto opcional no centro. Teste: o texto aparece.
- `Icon`: recebe `name: 'arrow-right' | 'clipboard'` e renderiza o SVG inline com `aria-hidden`. Teste: renderiza o SVG certo para cada nome.
- `ChainShape`: SVG decorativo com os elos, `aria-hidden`, e aceita `className` para posicionar. Teste: renderiza com `aria-hidden`.

**molecules/**
- `FormField`: combina `Label` + `Input` + mensagem de erro opcional. Usa `useId` para ligar label e input, e `aria-invalid` / `aria-describedby` para o erro. Teste: o campo é encontrado por `getByLabelText` e o erro aparece.
- `SocialLoginButton`: recebe `iconSrc`, `label` e `onClick`, com o ícone em cima e o texto embaixo, como no layout. Teste: aparece com o nome acessível e o clique dispara o `onClick`.
- `AuthRedirect`: recebe `question`, `linkText`, `to` e `icon?`. No login fica "Ainda não tem conta? / Crie seu cadastro!", e no cadastro será reaproveitado como "Já tem conta? / Faça seu login". Teste: o texto e o link apontam para `to`.

**organisms/**
- `LoginForm`: tem os campos "Email ou usuário" e "Senha", a linha com "Lembrar-me" e "Esqueci a senha", e o botão "Login →". Recebe `onSubmit({ identifier, password, remember })`. A validação é feita só no submit: os campos não podem estar vazios e, nesse caso, aparece um erro no `FormField`. Teste: com os campos vazios aparecem os erros e o `onSubmit` não é chamado; com os campos preenchidos, o `onSubmit` é chamado com os valores.
- `SocialLogin`: tem o `Divider` com "ou entre com outras contas" e uma lista de `providers: { name, iconSrc, onClick }[]`. Fica genérico para o cadastro poder reutilizar. Teste: renderiza um botão por provider.

**templates/**
- `AuthTemplate`: recebe `bannerSrc`, `bannerAlt`, `title`, `subtitle` e `children`. Faz o fundo `bg-page` com dois `ChainShape` (canto superior esquerdo e inferior direito) e o card `bg-card rounded-3xl` com o banner à esquerda e o conteúdo à direita (`h1` com o título, subtítulo e `children`).
  - É o ponto de reuso do cadastro: muda só o banner, o título e os `children`.
  - Responsivo: em telas pequenas o banner some, ou fica em cima, e o card ocupa a largura toda.
  - Teste: renderiza o banner com o alt, o heading e os children.

**pages/**
- `LoginPage`: monta o `AuthTemplate` com o banner `/IMG_1 - Desktop.png`, o título "Login" e o subtítulo "Boas-vindas! Faça seu login.". Dentro vão o `LoginForm`, o `SocialLogin` (Github `/Github.png` e Gmail `/Google.png`) e o `AuthRedirect` para `/cadastro`.
  - Por enquanto, o `onSubmit` e os providers sociais fazem só `console.log`, com um TODO para a integração.
  - Teste: os elementos principais da página aparecem.

## 3. App / rotas
- `src/App.tsx` define as rotas com `BrowserRouter` + `Routes`: `/login` mostra a `LoginPage`, e `/` faz `<Navigate to="/login" replace />`.
- `src/main.tsx` continua como está, importando `index.css`.

## Arquivos principais
- `apps/web/vite.config.ts`, `apps/web/package.json`, `apps/web/tsconfig.app.json`, `apps/web/index.html`
- `apps/web/src/index.css`, `apps/web/src/App.tsx`, `apps/web/src/test/setup.ts`
- `apps/web/src/components/{atoms,molecules,organisms,templates,pages}/**`
- `package.json` da raiz (script `test`)

O estilo do código segue o web: sem ponto e vírgula, aspas simples, `import type` para tipos e nada de enums.

## Verificação
1. `pnpm web test`: todos os testes dos componentes passam.
2. `pnpm web lint` e `pnpm web build` (`tsc -b` + vite) rodam sem erros.
3. `pnpm test` na raiz roda os testes da api e do web.
4. `pnpm dev:web`: abrir `http://localhost:5173/`, que deve redirecionar para `/login`, e comparar visualmente com o layout. Conferir:
   - os erros aparecem ao enviar o formulário vazio;
   - o `console.log` aparece ao enviar o formulário preenchido;
   - o link "Crie seu cadastro!" vai para `/cadastro`.
5. Commits no padrão Conventional Commits, por exemplo `build(web): setup tailwind and vitest` e `feat(web): add login page`.
