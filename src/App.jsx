import { useEffect, useMemo, useState } from 'react'
import data from './data/pokedex-data.json'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import Filters from './components/Filters'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import TrainerList from './components/TrainerList'
import './css/App.css'

const { pokemon, types, trainers } = data

// O tipo "Typeless" não é usado pelos Pokémon, então fica fora do filtro
const filterTypes = types.filter((t) => t.name !== 'Typeless')

// Lê do localStorage de forma segura
function loadFromStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [view, setView] = useState('pokedex')
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [sortBy, setSortBy] = useState('id')
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [selected, setSelected] = useState(null)
  const [favorites, setFavorites] = useState(() => loadFromStorage('pokedex:favorites', []))
  const [dark, setDark] = useState(() => loadFromStorage('pokedex:dark', false))

  // Persiste favoritos
  useEffect(() => {
    localStorage.setItem('pokedex:favorites', JSON.stringify(favorites))
  }, [favorites])

  // Persiste e aplica o tema
  useEffect(() => {
    localStorage.setItem('pokedex:dark', JSON.stringify(dark))
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  }, [dark])

  // Estado derivado: lista filtrada + ordenada
  const visiblePokemon = useMemo(() => {
    const term = search.trim().toLowerCase().replace('#', '')

    const filtered = pokemon.filter((p) => {
      const matchesSearch =
        term === '' ||
        p.name.toLowerCase().includes(term) ||
        String(p.id) === term ||
        String(p.id).padStart(3, '0').includes(term)

      const matchesType =
        selectedType === 'all' || p.types.some((t) => t.name === selectedType)

      const matchesFav = !onlyFavorites || favorites.includes(p.id)

      return matchesSearch && matchesType && matchesFav
    })

    return [...filtered].sort((a, b) => {
      if (sortBy === 'id') return a.id - b.id
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      return b.stats[sortBy] - a.stats[sortBy] // atributos: maior primeiro
    })
  }, [search, selectedType, sortBy, onlyFavorites, favorites])

  const toggleFavorite = (id) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((f) => f !== id) : [...current, id],
    )
  }

  const pickRandom = () => {
    const source = visiblePokemon.length > 0 ? visiblePokemon : pokemon
    setSelected(source[Math.floor(Math.random() * source.length)])
  }

  return (
    <div className="app">
      <Header
        view={view}
        onChangeView={setView}
        dark={dark}
        onToggleDark={() => setDark((d) => !d)}
        favoritesCount={favorites.length}
      />

      <main className="app__main">
        {view === 'pokedex' ? (
          <>
            <SearchBar value={search} onChange={setSearch} />
            <Filters
              types={filterTypes}
              selectedType={selectedType}
              onSelectType={setSelectedType}
              sortBy={sortBy}
              onChangeSort={setSortBy}
              onlyFavorites={onlyFavorites}
              onToggleFavorites={() => setOnlyFavorites((v) => !v)}
              onRandom={pickRandom}
            />
            <p className="app__count">{visiblePokemon.length} Pokémon encontrado(s)</p>
            <PokemonList
              pokemon={visiblePokemon}
              favorites={favorites}
              onSelect={setSelected}
              onToggleFavorite={toggleFavorite}
            />
          </>
        ) : (
          <TrainerList trainers={trainers} pokemon={pokemon} onSelectPokemon={setSelected} />
        )}
      </main>

      {selected && (
        <PokemonDetails
          pokemon={selected}
          trainers={trainers}
          isFavorite={favorites.includes(selected.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelected(null)}
        />
      )}

      <footer className="app__footer">
        Dados: pokedex-data.json · Imagens: PokéAPI sprites
      </footer>
    </div>
  )
}

export default App
