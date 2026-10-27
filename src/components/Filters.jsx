import { getTypeColor } from '../utils/typeColors'
import '../css/Filters.css'

const SORT_OPTIONS = [
  { value: 'id', label: 'ID' },
  { value: 'name', label: 'Nome' },
  { value: 'hp', label: 'HP' },
  { value: 'attack', label: 'Attack' },
  { value: 'defense', label: 'Defense' },
  { value: 'specialAttack', label: 'Special Attack' },
  { value: 'specialDefense', label: 'Special Defense' },
  { value: 'speed', label: 'Speed' },
]

function Filters({
  types,
  selectedType,
  onSelectType,
  sortBy,
  onChangeSort,
  onlyFavorites,
  onToggleFavorites,
  onRandom,
}) {
  return (
    <section className="filters">
      <div className="filters__types">
        <button
          className={`type-chip ${selectedType === 'all' ? 'is-active' : ''}`}
          onClick={() => onSelectType('all')}
        >
          Todos
        </button>
        {types.map((t) => (
          <button
            key={t.id}
            className={`type-chip ${selectedType === t.name ? 'is-active' : ''}`}
            style={{ '--chip-color': getTypeColor(t.name) }}
            onClick={() => onSelectType(t.name)}
          >
            {t.name}
          </button>
        ))}
      </div>

      <div className="filters__row">
        <label className="filters__sort">
          Ordenar por:
          <select value={sortBy} onChange={(e) => onChangeSort(e.target.value)}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <button
          className={`btn ${onlyFavorites ? 'is-active' : ''}`}
          onClick={onToggleFavorites}
        >
          ⭐ Só favoritos
        </button>

        <button className="btn" onClick={onRandom}>
          🎲 Aleatório
        </button>
      </div>
    </section>
  )
}

export default Filters
