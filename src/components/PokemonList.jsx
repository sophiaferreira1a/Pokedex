import PokemonCard from './PokemonCard'
import '../css/PokemonList.css'

function PokemonList({ pokemon, favorites, onSelect, onToggleFavorite }) {
  // Nenhum resultado encontrado
  if (pokemon.length === 0) {
    return (
      <div className="empty">
        <div className="empty__icon">😢</div>
        <h2>Nenhum Pokémon encontrado</h2>
        <p>Tente outro nome, ID ou mude o filtro de tipo.</p>
      </div>
    )
  }

  return (
    <div className="list">
      {pokemon.map((p) => (
        <PokemonCard
          key={p.id}
          pokemon={p}
          isFavorite={favorites.includes(p.id)}
          onSelect={onSelect}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default PokemonList
