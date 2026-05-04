'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/dashboard', label: 'Accueil', icon: '🏠' },
  { href: '/about', label: 'About me', icon: '👤' },
  { href: '/projets', label: 'Mes projets', icon: '📁' },
  { href: '/matrices', label: 'Matrices JS', icon: '🔢' },
  { href: '/fichiers', label: 'Fichiers', icon: '📄' },
  { href: '/images', label: 'Images DB', icon: '🖼️' },
  { href: '/quiz', label: 'Quiz', icon: '❓' },
  { href: '/stats', label: 'Statistiques', icon: '📊' },
  { href: '/geolocalisation', label: 'Géolocalisation', icon: '🗺️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="sidebar">
      <nav>
        {navLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href || pathname.startsWith(link.href + '/') ? 'active' : ''}
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}