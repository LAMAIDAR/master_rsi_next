'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useState } from 'react'

interface Etudiant {
  cne: string; nom: string; prenom: string; module1: number; module2: number; module3: number
}

const inputStyle: React.CSSProperties = {
  padding: '9px 13px', border: '1.5px solid #e0e6f0', borderRadius: 8,
  fontSize: '.85rem', fontFamily: 'DM Sans, sans-serif', outline: 'none', width: '100%'
}
const labelStyle: React.CSSProperties = {
  fontSize: '.78rem', fontWeight: 600, color: 'var(--blue)',
  textAlign: 'right' as const, paddingRight: 10
}

export default function FichiersPage() {
  const [form, setForm] = useState({ cne: '', nom: '', prenom: '', module1: '', module2: '', module3: '' })
  const [liste, setListe] = useState<Etudiant[]>([])
  const [showListe, setShowListe] = useState(false)
  const [editIdx, setEditIdx] = useState<number | null>(null)
  const [msg, setMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function valider() {
    if (!form.cne || !form.nom || !form.prenom) { alert('Remplissez tous les champs requis'); return }
    const entry: Etudiant = {
      cne: form.cne, nom: form.nom, prenom: form.prenom,
      module1: Number(form.module1), module2: Number(form.module2), module3: Number(form.module3)
    }
    if (editIdx !== null) {
      const updated = [...liste]; updated[editIdx] = entry
      setListe(updated); setEditIdx(null)
    } else {
      setListe([...liste, entry])
    }
    // Simuler sauvegarde fichier (côté client)
    const content = [...liste, entry].map(e =>
      `${e.cne};${e.nom};${e.prenom};${e.module1};${e.module2};${e.module3}`
    ).join('\n')
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'master_rsi2020.txt'; a.click()
    setForm({ cne: '', nom: '', prenom: '', module1: '', module2: '', module3: '' })
    setMsg('Données enregistrées dans master_rsi2020.txt')
    setTimeout(() => setMsg(''), 3000)
  }

  function handleModifier(i: number) {
    const e = liste[i]
    setForm({ cne: e.cne, nom: e.nom, prenom: e.prenom, module1: String(e.module1), module2: String(e.module2), module3: String(e.module3) })
    setEditIdx(i)
    setShowListe(false)
  }

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-file-alt"></i> Projet 02 — Formulaire avec fichiers</div>
      <div className="page-heading"><i className="fa fa-file-alt"></i> Gestion de formulaire avec les fichiers</div>

      {msg && <div className="alert alert-success"><i className="fa fa-check-circle"></i> {msg}</div>}

      {!showListe ? (
        <div className="card-rsi" style={{ maxWidth: 580 }}>
          {/* Section Informations */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)', fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800 }}>1</span>
              Informations
            </h3>
            {[
              { label: 'Nom :', name: 'nom', placeholder: 'Nom' },
              { label: 'Prénom :', name: 'prenom', placeholder: 'Prénom' },
              { label: 'CNE :', name: 'cne', placeholder: 'Code national étudiant' },
            ].map(f => (
              <div key={f.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: 10, marginBottom: 12, background: 'var(--light)', borderRadius: 8, padding: '6px 12px' }}>
                <span style={labelStyle}>{f.label}</span>
                <input style={inputStyle} name={f.name} placeholder={f.placeholder}
                  value={(form as any)[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          {/* Section Notes */}
          <div style={{ marginBottom: 24 }}>
            <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)', fontSize: '1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ background: 'var(--blue)', color: '#fff', borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem', fontWeight: 800 }}>2</span>
              Notes des modules
            </h3>
            {[
              { label: 'Module 1', name: 'module1' },
              { label: 'Module 2', name: 'module2' },
              { label: 'Module 3', name: 'module3' },
            ].map(f => (
              <div key={f.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', alignItems: 'center', gap: 10, marginBottom: 12, background: 'var(--light)', borderRadius: 8, padding: '6px 12px' }}>
                <span style={labelStyle}>{f.label}</span>
                <input style={{ ...inputStyle, width: 80 }} type="number" min={0} max={20} name={f.name} placeholder="Note"
                  value={(form as any)[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginBottom: 16 }}>
            <button onClick={valider} style={{
              padding: '11px 40px', background: 'linear-gradient(120deg, var(--blue-dark), var(--blue-mid))',
              color: '#fff', border: 'none', borderRadius: 9, fontSize: '1rem',
              fontWeight: 700, cursor: 'pointer', fontFamily: 'DM Sans, sans-serif'
            }}>
              Valider
            </button>
          </div>

          <div>
            <button onClick={() => setShowListe(true)} style={{
              background: 'none', border: 'none', color: 'var(--blue)',
              textDecoration: 'underline', cursor: 'pointer', fontSize: '.85rem'
            }}>
              Consulter liste
            </button>
          </div>
        </div>
      ) : (
        <div className="card-rsi">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: 'var(--blue)', fontWeight: 700 }}>
              Liste des étudiants enregistrés dans le fichier
            </h2>
            <button onClick={() => setShowListe(false)} style={{
              padding: '6px 14px', background: 'var(--blue)', color: '#fff',
              border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '.78rem'
            }}>
              <i className="fa fa-arrow-left"></i> Retour
            </button>
          </div>
          {liste.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 0' }}>Aucun étudiant enregistré</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
                <thead>
                  <tr style={{ background: 'var(--blue)', color: '#fff' }}>
                    {['CNE','Nom','Prénom','Module 1','Module 2','Module 3','Modifier'].map(h => (
                      <th key={h} style={{ padding: '10px 14px', fontWeight: 700, textAlign: 'center' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {liste.map((e, i) => (
                    <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : 'var(--light)' }}>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.cne}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.nom}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.prenom}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.module1}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.module2}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.module3}</td>
                      <td style={{ padding: '9px 14px', textAlign: 'center' }}>
                        <button onClick={() => handleModifier(i)} style={{
                          color: 'var(--blue)', background: 'none', border: 'none',
                          cursor: 'pointer', fontWeight: 700, textDecoration: 'underline', fontSize: '.8rem'
                        }}>Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </ProtectedLayout>
  )
}