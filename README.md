# 🎮 Pokédex React + Vite

Pokédex interativa desenvolvida com **React + Vite** para a Atividade 03 (DIAW – PUC Minas), em dupla (Pair Programming).

## ✨ Funcionalidades

- 🐾 Lista de **151 Pokémon** a partir do `pokedex-data.json` (ID, nome, tipos, HP, Attack, Defense, Special Attack, Special Defense e Speed)
- 🔎 Pesquisa por **nome ou ID** (atualiza enquanto digita)
- 🧬 Filtro por **tipo**
- 📄 Modal de **detalhes** com barras de atributos
- 🧑‍🚀 Área de **treinadores** (insígnias e Pokémon de cada um)
- ⚠️ Tela de "nenhum Pokémon encontrado"
- 📱 Interface responsiva e identidade visual própria (cores por tipo)
- 🏆 Extras: ⭐ favoritos (salvos no `localStorage`), 📊 ordenação, 🎲 Pokémon aleatório, 🌙 dark mode

## ▶️ Como executar

```bash
npm install
npm run dev
```

Abra no navegador: **http://localhost:5173**

Para gerar a versão de produção: `npm run build` (e `npm run preview` para testar).

## 📁 Dados

Os dados ficam em `src/data/pokedex-data.json` (tipos, Pokémon e treinadores) e são importados diretamente em `src/App.jsx`.

## 🖼️ Imagens

As imagens são carregadas do repositório de sprites da **PokéAPI**:
`https://github.com/PokeAPI/sprites` (arte oficial por ID; se falhar, usa o sprite padrão).
A aplicação continua funcionando com os dados do JSON mesmo sem as imagens.

## 🧩 Organização

```text
src/
├── components/   # Header, SearchBar, Filters, PokemonList, PokemonCard,
│                 # PokemonDetails, StatBar, TypeBadge, PokemonImage, TrainerList
├── css/          # um arquivo de estilo por componente + App.css
├── data/         # pokedex-data.json
├── utils/        # typeColors.js e pokemonImage.js
├── App.jsx       # estados (busca, filtro, ordenação, favoritos, tema) e composição
├── main.jsx
└── index.css     # variáveis de tema e reset
```

## ⚛️ Conceitos de React utilizados

Componentes funcionais, props, `useState`, `useEffect`, `useMemo` (estado derivado), renderização de listas com `map()`, eventos e filtragem de dados.

## 👥 Autor

- Sophia Nicole Ferreira Reis Gonçalves