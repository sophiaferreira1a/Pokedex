import { useState } from 'react'
import PokemonImage from './PokemonImage'
import '../css/TrainerList.css'

function TrainerList({ trainers, pokemon, onSelectPokemon }) {
  // id do treinador que está expandido (ou null)
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((current) => (current === id ? null : id))

  return (
    <div className="trainers">
      {trainers.map((trainer) => {
        const team = trainer.pokemonIds
          .map((pid) => pokemon.find((p) => p.id === pid))
          .filter(Boolean)
        const isOpen = openId === trainer.id

        return (
          <article key={trainer.id} className={`trainer ${isOpen ? 'is-open' : ''}`}>
            <button className="trainer__head" onClick={() => toggle(trainer.id)}>
              <div>
                <h3>{trainer.name}</h3>
                <p>🏅 {trainer.badges} {trainer.badges === 1 ? 'insígnia' : 'insígnias'}</p>
              </div>
              <span className="trainer__count">🐾 {team.length}</span>
            </button>

            {isOpen && (
              <ul className="trainer__team">
                {team.map((p) => (
                  <li key={p.id}>
                    <button onClick={() => onSelectPokemon(p)}>
                      <PokemonImage id={p.id} name={p.name} className="trainer__img" />
                      <span>{p.name}</span>
                    </button>
                  </li>
                ))}
                {team.length === 0 && <li className="trainer__none">Sem Pokémon.</li>}
              </ul>
            )}
          </article>
        )
      })}
    </div>
  )
}

export default TrainerList
