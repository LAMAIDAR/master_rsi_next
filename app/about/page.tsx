'use client'

import ProtectedLayout from '../components/ProtectedLayout'
import { useEffect, useState } from 'react'

export default function AboutPage() {
  const [etudiant, setEtudiant] = useState<any>(null)

  useEffect(() => {
    const e = localStorage.getItem('etudiant')
    if (e) setEtudiant(JSON.parse(e))
  }, [])

  const section = (title: string, icon: string, children: React.ReactNode) => (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)', fontSize: '1rem', fontWeight: 700, marginBottom: 14, paddingBottom: 8, borderBottom: '2px solid var(--gold)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <i className={`fa ${icon}`} style={{ color: 'var(--gold)' }}></i> {title}
      </h3>
      {children}
    </div>
  )

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-user"></i> À propos</div>
      <div className="page-heading"><i className="fa fa-user"></i> About Me – Curriculum Vitae</div>

      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>

        {/* Colonne gauche - Photo + infos */}
        <div>
          <div className="card-rsi" style={{ textAlign: 'center', padding: 24 }}>
            {/* Photo */}
            <div style={{ width: 130, height: 130, borderRadius: '50%', margin: '0 auto 16px', overflow: 'hidden', border: '4px solid var(--gold)', boxShadow: '0 4px 18px rgba(26,58,107,.2)' }}>
              <img
                src="/images/photo.jpg"
                alt="Photo"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${etudiant?.nom || 'E'}&background=1a3a6b&color=e8a020&size=130`
                }}
              />
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', fontWeight: 700, color: 'var(--blue)', marginBottom: 4 }}>
              {etudiant?.nom || 'Votre Nom'}
            </h2>
            <div style={{ fontSize: '.78rem', color: 'var(--muted)', marginBottom: 12 }}>
              {etudiant?.filiere || 'Master RSI'} — FST Settat
            </div>
            <div style={{ display: 'inline-block', background: 'var(--light)', border: '1px solid #e0e6f0', borderRadius: 20, padding: '4px 14px', fontSize: '.72rem', color: 'var(--blue)', fontWeight: 600 }}>
              <i className="fa fa-graduation-cap" style={{ color: 'var(--gold)', marginRight: 5 }}></i>
              Étudiant Master
            </div>
          </div>

          {/* Compétences */}
          <div className="card-rsi" style={{ marginTop: 16 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)', fontSize: '.95rem', fontWeight: 700, marginBottom: 16, paddingBottom: 8, borderBottom: '2px solid var(--gold)' }}>
              <i className="fa fa-code" style={{ color: 'var(--gold)', marginRight: 8 }}></i>Compétences
            </h3>
            {[
              { skill: 'HTML / CSS', level: 90 },
              { skill: 'JavaScript', level: 80 },
              { skill: 'PHP / Laravel', level: 75 },
              { skill: 'Next.js / React', level: 70 },
              { skill: 'MySQL / Prisma', level: 72 },
              { skill: 'Python', level: 65 },
            ].map(s => (
              <div key={s.skill} style={{ marginBottom: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.78rem', color: '#475569', fontWeight: 600, marginBottom: 5 }}>
                  <span>{s.skill}</span><span>{s.level}%</span>
                </div>
                <div style={{ height: 7, background: '#e8edf6', borderRadius: 10 }}>
                  <div style={{ height: '100%', width: `${s.level}%`, background: 'linear-gradient(90deg, var(--blue-dark), var(--blue-mid))', borderRadius: 10, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colonne droite - CV */}
        <div className="card-rsi">
          {section('Profil', 'fa-user-circle', (
            <p style={{ fontSize: '.85rem', color: '#475569', lineHeight: 1.8 }}>
              Étudiant en Master RSI (Réseaux et Systèmes d'Information) à la Faculté des Sciences et Techniques de Settat. Passionné par le développement web full-stack, les bases de données et les technologies modernes. Motivé, rigoureux et toujours en quête d'apprentissage.
            </p>
          ))}

          {section('Formation', 'fa-graduation-cap', (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { year: '2025–2026', title: 'Master RSI', place: 'FST Settat – Université Hassan Ier', desc: 'Réseaux et Systèmes d\'Information' },
                { year: '2022–2024', title: 'Licence en Informatique', place: 'Faculté des Sciences', desc: 'Informatique et Mathématiques' },
                { year: '2019–2022', title: 'Baccalauréat Sciences Mathématiques', place: 'Lycée Settat', desc: 'Mention Bien' },
              ].map(f => (
                <div key={f.year} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span style={{ background: 'var(--gold)', color: 'var(--blue-dark)', fontSize: '.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, whiteSpace: 'nowrap', marginTop: 3 }}>{f.year}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--blue)' }}>{f.title}</div>
                    <div style={{ fontSize: '.78rem', color: '#475569' }}>{f.place}</div>
                    <div style={{ fontSize: '.74rem', color: 'var(--muted)' }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          ))}

          {section('Projets académiques', 'fa-rocket', (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { num: 1, title: 'Manipulation de matrices', tech: 'JavaScript' },
                { num: 2, title: 'Gestion de formulaires', tech: 'PHP / Fichiers' },
                { num: 3, title: 'Gestion d\'images', tech: 'MySQL / Prisma' },
                { num: 4, title: 'Quiz interactif', tech: 'JS & PHP' },
                { num: 5, title: 'Statistiques', tech: 'Chart.js' },
                { num: 6, title: 'Géolocalisation', tech: 'OpenStreetMap' },
              ].map(p => (
                <div key={p.num} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 14px', background: 'var(--light)', borderRadius: 8, border: '1px solid #e8edf6' }}>
                  <span style={{ background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 700, flexShrink: 0 }}>{p.num}</span>
                  <span style={{ fontSize: '.82rem', color: '#1e293b', fontWeight: 600, flex: 1 }}>{p.title}</span>
                  <span style={{ fontSize: '.7rem', background: 'var(--gold)', color: 'var(--blue-dark)', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>{p.tech}</span>
                </div>
              ))}
            </div>
          ))}

          {section('Contact', 'fa-envelope', (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: 'fa-envelope', label: 'email@uhp.ac.ma' },
                { icon: 'fa-phone', label: '+212 6XX-XXXXXX' },
                { icon: 'fa-map-marker-alt', label: 'Settat, Maroc' },
                { icon: 'fa-linkedin', label: 'linkedin.com/in/monprofil' },
              ].map(c => (
                <div key={c.icon} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '.82rem', color: '#475569' }}>
                  <i className={`fa ${c.icon}`} style={{ color: 'var(--gold)', width: 18, textAlign: 'center' }}></i>
                  {c.label}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ProtectedLayout>
  )
}