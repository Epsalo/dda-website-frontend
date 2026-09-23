import { Activity, Building2, Droplets, GraduationCap, HandHeart, HeartPulse, Leaf, MapPin, Users } from 'lucide-react'

const icons = { Activity, Building2, Droplets, GraduationCap, HandHeart, HeartPulse, Leaf, MapPin, Users }
export default function Icon({ name, ...props }) { const Component = icons[name] || Building2; return <Component {...props} /> }
