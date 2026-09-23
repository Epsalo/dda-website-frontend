export default function SectionHeader({ kicker, eyebrow, title, text, light = false }) {
  return <div className={`section-header${light ? ' light' : ''}`}><div className="section-kicker">{kicker || eyebrow}</div><h2>{title}</h2><p>{text}</p></div>
}
