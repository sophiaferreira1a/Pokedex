import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import { getTypeColor } from '../utils/typeColors'
import { formatId } from '../utils/pokemonImage'
import '../css/PokemonCard.css'

function PokemonCard({ pokemon, isFavorite, onSelect, onToggleFavorite }) {
  const { id, name, types, stats } = pokemon
  const mainColor = getTypeColor(types[0]?.name)

  return (
    <article
      className="card"
      style={{ '--type-color': mainColor }}
      onClick={() => onSelect(pokemon)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(pokemon)}
    >
      <button
        className={`card__fav ${isFavorite ? 'is-fav' : ''}`}
        onClick={(e) => {
          e.stopPropagation()
          onToggleFavorite(id)
        }}
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? '★' : '☆'}
      </button>

      <span className="card__id">{formatId(id)}</span>
      <PokemonImage id={id} name={name} className="card__img" />
      <h3 className="card__name">{name}</h3>

      <div className="card__types">
        {types.map((t) => (
          <TypeBadge key={t.id} name={t.name} />
        ))}
      </div>

      <ul className="card__stats">
        <li><span>❤️ HP</span><strong>{stats.hp}</strong></li>
        <li><span>⚔️ Atq</span><strong>{stats.attack}</strong></li>
        <li><span>🛡️ Def</span><strong>{stats.defense}</strong></li>
        <li><span>✨ Atq Esp</span><strong>{stats.specialAttack}</strong></li>
        <li><span>🛡️ Def Esp</span><strong>{stats.specialDefense}</strong></li>
        <li><span>💨 Vel</span><strong>{stats.speed}</strong></li>
      </ul>
    </article>
  )
}

export default PokemonCard
