'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import Link from 'next/link'

const projets = [
  {
    num: 1, icon: 'fa-table', href: '/matrices',
    title: 'Manipulation de matrices avec Javascript',
    desc: 'Générer des matrices aléatoires, calculer leur somme et produit.',
    tech: 'JavaScript', color: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b,#d97706)'
  },
  {
    num: 2, icon: 'fa-file-alt', href: '/fichiers',
    title: 'Manipulation de formulaires avec les fichiers (en PHP)',
    desc: 'Saisir des données étudiants et les enregistrer dans un fichier .txt.',
    tech: 'PHP / Fichiers', color: '#10b981', bg: 'linear-gradient(135deg,#10b981,#059669)'
  },
  {
    num: 3, icon: 'fa-images', href: '/images-db',
    title: 'Insertion et affichage d\'images dans une base de données',
    desc: 'Uploader des images en base64, les stocker et les afficher depuis MySQL.',
    tech: 'MySQL / Prisma', color: '#6366f1', bg: 'linear-gradient(135deg,#6366f1,#4f46e5)'
  },
  {
    num: 4, icon: 'fa-question-circle', href: '/quiz',
    title: 'Quiz',
    desc: 'Quiz JavaScript et PHP avec correction automatique et enregistrement des notes.',
    tech: 'JS & PHP', color: '#ef4444', bg: 'linear-gradient(135deg,#ef4444,#dc2626)'
  },
  {
    num: 5, icon: 'fa-chart-bar', href: '/stats',
    title: 'Statistiques avec chartJS',
    desc: 'Visualiser les moyennes des étudiants sous forme de graphiques.',
    tech: 'Chart.js', color: '#8b5cf6', bg: 'linear-gradient(135deg,#8b5cf6,#7c3aed)'
  },
  {
    num: 6, icon: 'fa-map-marker-alt', href: '/geolocalisation',
    title: 'Géolocalisation',
    desc: 'Afficher les positions géographiques des étudiants sur une carte interactive.',
    tech: 'OpenStreetMap', color: '#0ea5e9', bg: 'linear-gradient(135deg,#0ea5e9,#0284c7)'
  },
]

export default function ProjetsPage() {
  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-folder-open"></i> Mes Projets</div>
      <div className="page-heading"><i className="fa fa-folder-open"></i> Liste des Projets</div>

      <div className="card-rsi">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {projets.map((p, i) => (
            <Link key={p.num} href={p.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 20,
                padding: '18px 20px',
                borderBottom: i < projets.length - 1 ? '1px solid #f1f5f9' : 'none',
                transition: 'background .15s', borderRadius: i === 0 ? '8px 8px 0 0' : i === projets.length - 1 ? '0 0 8px 8px' : 0
              }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--light)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}
              >
                {/* Numéro */}
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: p.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, boxShadow: `0 4px 12px ${p.color}44`
                }}>
                  <i className={`fa ${p.icon}`} style={{ color: '#fff', fontSize: '1rem' }}></i>
                </div>

                {/* Contenu */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 3 }}>
                    <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, fontSize: '.95rem', color: 'var(--blue)' }}>
                      {p.num}. {p.title}
                    </span>
                  </div>
                  <div style={{ fontSize: '.76rem', color: 'var(--muted)' }}>{p.desc}</div>
                </div>

                {/* Badge tech */}
                <div style={{ flexShrink: 0 }}>
                  <span style={{ background: p.color + '15', color: p.color, border: `1px solid ${p.color}44`, padding: '4px 12px', borderRadius: 20, fontSize: '.7rem', fontWeight: 700, letterSpacing: 0.5 }}>
                    {p.tech}
                  </span>
                </div>

                {/* Flèche */}
                <i className="fa fa-chevron-right" style={{ color: 'var(--muted)', fontSize: '.75rem', flexShrink: 0 }}></i>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  )
}