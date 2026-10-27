import '../css/StatBar.css'

const MAX_STAT = 255 // maior valor base possível nos jogos

function StatBar({ label, value, color }) {
  const percent = Math.min((value / MAX_STAT) * 100, 100)

  return (
    <div className="stat">
      <span className="stat__label">{label}</span>
      <span className="stat__value">{value}</span>
      <div className="stat__track">
        <div className="stat__fill" style={{ width: `${percent}%`, backgroundColor: color }} />
      </div>
    </div>
  )
}

export default StatBar
