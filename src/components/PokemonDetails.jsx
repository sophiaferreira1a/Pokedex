import { useEffect } from 'react'
import PokemonImage from './PokemonImage'
import TypeBadge from './TypeBadge'
import StatBar from './StatBar'
import { getTypeColor } from '../utils/typeColors'
import { formatId } from '../utils/pokemonImage'
import '../css/PokemonDetails.css'

function PokemonDetails({ pokemon, trainers, isFavorite, onToggleFavorite, onClose }) {
  // Fecha o modal com a tecla ESC
  useEffect(() => {
    const handleKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const { id, name, types, stats } = pokemon
  const color = getTypeColor(types[0]?.name)
  const owners = trainers.filter((t) => t.pokemonIds.includes(id))
  const total = Object.values(stats).reduce((a, b) => a + b, 0)

  return (
    <div className="modal" onClick={onClose}>
      <div
        className="modal__box"
        style={{ '--type-color': color }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Detalhes de ${name}`}
      >
        <button className="modal__close" onClick={onClose} aria-label="Fechar">✕</button>

        <div className="modal__hero">
          <span className="modal__id">{formatId(id)}</span>
          <PokemonImage key={id} id={id} name={name} className="modal__img" />
        </div>

        <div className="modal__body">
          <div className="modal__title">
            <h2>{name}</h2>
            <button
              className={`modal__fav ${isFavorite ? 'is-fav' : ''}`}
              onClick={() => onToggleFavorite(id)}
            >
              {isFavorite ? '★ Favorito' : '☆ Favoritar'}
            </button>
          </div>

          <div className="modal__types">
            {types.map((t) => (
              <TypeBadge key={t.id} name={t.name} />
            ))}
          </div>

          <div className="modal__stats">
            <StatBar label="❤️ HP" value={stats.hp} color={color} />
            <StatBar label="⚔️ Attack" value={stats.attack} color={color} />
            <StatBar label="🛡️ Defense" value={stats.defense} color={color} />
            <StatBar label="✨ Special Attack" value={stats.specialAttack} color={color} />
            <StatBar label="🛡️ Special Defense" value={stats.specialDefense} color={color} />
            <StatBar label="💨 Speed" value={stats.speed} color={color} />
            <p className="modal__total">Total: <strong>{total}</strong></p>
          </div>

          {owners.length > 0 && (
            <div className="modal__owners">
              <h4>🧑‍🚀 Treinadores</h4>
              <p>{owners.map((o) => o.name).join(', ')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PokemonDetails
