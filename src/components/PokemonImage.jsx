import { useState } from 'react'
import { getArtworkUrl, getSpriteUrl } from '../utils/pokemonImage'

// Tenta a arte oficial; se falhar, o sprite; se falhar de novo, mostra um emoji.
function PokemonImage({ id, name, className }) {
  const [stage, setStage] = useState(0)

  if (stage >= 2) {
    return <div className={`${className} img-fallback`} role="img" aria-label={name}>❓</div>
  }

  return (
    <img
      className={className}
      src={stage === 0 ? getArtworkUrl(id) : getSpriteUrl(id)}
      alt={name}
      loading="lazy"
      onError={() => setStage((s) => s + 1)}
    />
  )
}

export default PokemonImage
