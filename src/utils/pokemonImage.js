// Imagens vindas do repositório de sprites da PokéAPI (fonte documentada no README)
const BASE = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export const getArtworkUrl = (id) => `${BASE}/other/official-artwork/${id}.png`
export const getSpriteUrl = (id) => `${BASE}/${id}.png`

export const formatId = (id) => `#${String(id).padStart(3, '0')}`
