# Relatório de categorias — Rota das Lupas

> Fonte oficial do catálogo inicial (recebido do Henri em 2026-07-15).
> Modelos são categorias de navegação. Armações e lentes são filtros e opções de variantes.

## 1. Objetivo

Criar a área de produtos do site Rota das Lupas integrada à Shopify, organizando o catálogo por modelo de óculos e permitindo que o consumidor filtre as combinações por acabamento da armação e cor da lente.

## 2. Estrutura principal do catálogo

Produtos
└── Óculos
    ├── Double-X
    ├── Juliet
    └── Penny

Navegação da loja:

- Todos os produtos
- Double-X
- Juliet
- Penny

As cores de armação e de lente não são categorias principais: funcionam como filtros e variações dentro de cada modelo.

## 3. Double-X

- Nome: Óculos Double-X · Handle: `oculos-double-x` · Categoria: Óculos · Marca: Rota das Lupas · Status inicial: Rascunho
- Armação: X-Metal ou Polished
- Lente: Dark Ruby, Neon Blue, G26 ou Violet

## 4. Juliet

- Nome: Óculos Juliet · Handle: `oculos-juliet` · Categoria: Óculos · Marca: Rota das Lupas · Status inicial: Rascunho

| Acabamento/combinação | Lente        | SKU             | Observação                 |
| --------------------- | ------------ | --------------- | -------------------------- |
| 24K Corvette          | Gold         | RDL-JUL-CVT-GLD | Combinação dourada         |
| Tio 2                 | Violet       | RDL-JUL-TIO-VIO | Prata com lente violeta    |
| Carbon Ducati         | Black        | RDL-JUL-DUC-BLK | Kit com detalhes vermelhos |
| Tio 2                 | Liquid Metal | RDL-JUL-TIO-LQM | Prata com lente espelhada  |

Filtros: Modelo Juliet · Armação 24K Corvette / Tio 2 / Carbon Ducati · Lente Gold / Violet / Black / Liquid Metal

## 5. Penny

- Nome: Óculos Penny · Handle: `oculos-penny` · Categoria: Óculos · Marca: Rota das Lupas · Status inicial: Rascunho

| Acabamento da armação | Lente        | SKU             |
| --------------------- | ------------ | --------------- |
| Polished              | Ruby         | RDL-PEN-POL-RBY |
| Plasma                | Violet       | RDL-PEN-PLS-VIO |
| Plasma                | Liquid Metal | RDL-PEN-PLS-LQM |
| X-Metal               | Black        | RDL-PEN-XMT-BLK |

Filtros: Modelo Penny · Armação Polished / Plasma / X-Metal · Lente Ruby / Violet / Liquid Metal / Black

## 6. Terminologia comercial

- Plasma: prata muito brilhante, aparência cromada
- Polished: prata claro e polido
- X-Metal: acabamento metálico mais escuro
- 24K: acabamento dourado
- 24K Corvette: combinação especial dourada
- Carbon Ducati: combinação escura com detalhes vermelhos
- Tio 2: acabamento prata associado às combinações Juliet cadastradas

Não traduzir nomes comerciais (Dark Ruby, Neon Blue, G26, Violet, Liquid Metal, Ruby, Gold). Devem permanecer destacados na apresentação das variações.

## 7. Filtros da página de produtos

- **Modelo:** Double-X, Juliet, Penny
- **Armação/acabamento:** X-Metal, Polished, Plasma, 24K Corvette, Tio 2, Carbon Ducati
- **Lente:** Dark Ruby, Neon Blue, G26, Violet, Gold, Black, Liquid Metal, Ruby
- **Preço:** referência R$ 189,00 · promocional R$ 149,90 · Pix (5% off) R$ 142,41

## 8. Página /produtos

1. Título "Encontre sua lupa"
2. Introdução curta da coleção
3. Abas/botões: Todos · Double-X · Juliet · Penny
4. Filtros de armação e lente
5. Grade responsiva
6. Ordenação por relevância, nome e preço
7. Contagem de resultados
8. Limpar filtros

Card: imagem principal, nome do modelo, combinação, preço riscado, preço promocional, "5% de desconto no Pix", amostras das lentes, botão "Ver detalhes".

## 9. Página individual do produto

Rotas: `/produtos/oculos-double-x`, `/produtos/oculos-juliet`, `/produtos/oculos-penny`

Galeria, nome, seleção de armação, seleção de lente, SKU dinâmico, R$ 149,90 (antes R$ 189,00; R$ 142,41 no Pix), descrição, botão de compra, relacionados.

**Somente combinações realmente cadastradas devem ser selecionáveis.** Não gerar combinações automáticas armação×lente.

## 10. Mapeamento Shopify

- Product Type: `Óculos` · Vendor: `Rota das Lupas` · Collection principal: `Óculos`
- Metacampos: `custom.modelo`, `custom.armacao`, `custom.lente`
- Variante opção 1: `Armação` · opção 2: `Lente`
- Tags: `oculos`, `double-x`, `juliet`, `penny`, `x-metal`, `polished`, `plasma`, `24k-corvette`, `tio-2`, `carbon-ducati` + tags das lentes

## 11. Resumo

3 modelos, 4 variantes cada = 12 combinações válidas. Preço 149,90 / comparativo 189,00 / Pix −5%.
