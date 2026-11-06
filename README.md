# Memory Game — Jogo da Memória

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Mantine UI + Tabler Icons.

## Rodar localmente
```bash
npm install
npm run dev
```
Abra http://localhost:3000

## Deploy na Vercel
1. Suba a pasta para um repositório Git (GitHub/GitLab/Bitbucket) e importe em vercel.com/new — o preset Next.js é detectado automaticamente; ou
2. Rode `npx vercel` na raiz do projeto.

Nenhuma variável de ambiente é necessária.

## Grades ímpares (5x5 e 9x9)
Gera-se `floor(n*n / 2)` pares e uma carta **coringa** (estrela) fixa no centro, que não pode ser virada.

## Imagens das cartas
As cartas usam **fotos** (não ícones). Por padrão elas vêm do serviço gratuito `loremflickr.com`, por palavra-chave
(ver `lib/themes.ts`), são pré-carregadas antes da partida e, se alguma falhar, a carta mostra um emoji de reserva.

Para usar suas próprias imagens (recomendado em produção): coloque os arquivos em `public/images/` e altere
`imageUrl()` em `lib/game.ts`, por exemplo `/images/${s.q}-${variant}.jpg`.
