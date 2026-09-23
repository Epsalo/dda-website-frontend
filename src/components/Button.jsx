import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
export default function Button({ href = '#', children, variant = 'primary', large = false, arrow = false, onClick }) {
  const isInternal = href.startsWith('/');
  const className = `btn btn-${variant}${large ? ' btn-large' : ''}`;
  const content = <>{children}{arrow && <ArrowRight size={18} />}</>;
  return isInternal
    ? <Link to={href} onClick={onClick} className={className}>{content}</Link>
    : <a href={href} onClick={onClick} className={className}>{content}</a>;
}
