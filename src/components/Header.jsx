import '../css/Header.css'

function Header({ view, onChangeView, dark, onToggleDark, favoritesCount }) {
  return (
    <header className="header">
      <h1 className="header__title">
        <span className="header__ball" aria-hidden="true" /> Pokédex
      </h1>

      <nav className="header__nav">
        <button
          className={`header__tab ${view === 'pokedex' ? 'is-active' : ''}`}
          onClick={() => onChangeView('pokedex')}
        >
          🐾 Pokémon
        </button>
        <button
          className={`header__tab ${view === 'trainers' ? 'is-active' : ''}`}
          onClick={() => onChangeView('trainers')}
        >
          🧑‍🚀 Treinadores
        </button>
      </nav>

      <div className="header__actions">
        <span className="header__fav" title="Favoritos">
          ⭐ {favoritesCount}
        </span>
        <button
          className="header__theme"
          onClick={onToggleDark}
          aria-label="Alternar tema claro/escuro"
        >
          {dark ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header
