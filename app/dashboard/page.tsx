'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const projets = [
  { num: 1, icon: 'fa-table',          label: 'Manipulation de matrices',         sub: 'JavaScript',  href: '/matrices',        color: '#f59e0b' },
  { num: 2, icon: 'fa-file-alt',       label: 'Manipulation de formulaires',       sub: 'Fichiers PHP', href: '/fichiers',        color: '#10b981' },
  { num: 3, icon: 'fa-images',         label: 'Insertion & affichage d\'images',   sub: 'Base de données', href: '/images-db',   color: '#6366f1' },
  { num: 4, icon: 'fa-question-circle',label: 'Quiz interactif',                   sub: 'JS & PHP',    href: '/quiz',            color: '#ef4444' },
  { num: 5, icon: 'fa-chart-bar',      label: 'Statistiques',                      sub: 'ChartJS',     href: '/stats',           color: '#8b5cf6' },
  { num: 6, icon: 'fa-map-marker-alt', label: 'Géolocalisation',                   sub: 'Google Maps', href: '/geolocalisation', color: '#0ea5e9' },
]

export default function Dashboard() {
  const [etudiant, setEtudiant] = useState<any>(null)

  useEffect(() => {
    const e = localStorage.getItem('etudiant')
    if (e) setEtudiant(JSON.parse(e))
  }, [])

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-home"></i> Tableau de bord</div>
      <div className="page-heading"><i className="fa fa-home"></i> Bienvenue, {etudiant?.nom}</div>

      {/* Stats rapides */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16, marginBottom: 28 }}>
        {[
          { icon: 'fa-folder-open', label: 'Projets', val: 6,               color: 'var(--blue)' },
          { icon: 'fa-question-circle', label: 'Quiz',val: 2,               color: '#f59e0b' },
          { icon: 'fa-chart-bar',   label: 'Stats',   val: 'ChartJS',       color: '#8b5cf6' },
          { icon: 'fa-map',         label: 'Carte',   val: 'Google Maps',   color: '#10b981' },
        ].map((s, i) => (
          <div key={i} className="card-rsi" style={{ textAlign: 'center', padding: '20px 16px' }}>
            <div style={{
              width: 46, height: 46, borderRadius: '50%',
              background: s.color, display: 'flex', alignItems: 'center',
              justifyContent: 'center', margin: '0 auto 10px'
            }}>
              <i className={`fa ${s.icon}`} style={{ color: '#fff', fontSize: '1.1rem' }}></i>
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.2rem', fontWeight: 700, color: 'var(--blue)' }}>{s.val}</div>
            <div style={{ fontSize: '.72rem', color: 'var(--muted)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Grille projets */}
      <div className="card-rsi">
        <div className="page-heading"><i className="fa fa-rocket"></i> Mes Projets</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18 }}>
          {projets.map(p => (
            <Link key={p.num} href={p.href} style={{ textDecoration: 'none' }}>
              <div style={{
                border: '1px solid #e8edf6', borderRadius: 14, overflow: 'hidden',
                transition: 'box-shadow .2s, transform .2s', cursor: 'pointer',
                background: '#fff'
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.12)'
                  ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  ;(e.currentTarget as HTMLElement).style.transform = 'none'
                }}
              >
                <div style={{
                  height: 80, background: p.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10
                }}>
                  <span style={{
                    background: 'rgba(255,255,255,.2)', color: '#fff',
                    fontSize: '.6rem', fontWeight: 700, padding: '2px 8px',
                    borderRadius: 10, letterSpacing: 1
                  }}>N°{p.num}</span>
                  <i className={`fa ${p.icon}`} style={{ fontSize: '1.8rem', color: '#fff' }}></i>
                </div>
                <div style={{ padding: '14px 16px' }}>
                  <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '.92rem', color: '#1e293b', marginBottom: 4 }}>
                    {p.label}
                  </div>
                  <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>{p.sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  )
}