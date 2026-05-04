'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useState, useEffect } from 'react'

interface ImageItem { id: number; name: string; type: string; size: number; bin_img: string }

export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [showImages, setShowImages] = useState(false)
  const [msg, setMsg] = useState('')
  const [err, setErr] = useState('')

  async function fetchImages() {
    setLoading(true)
    const res = await fetch('/api/images')
    if (res.ok) {
      const data = await res.json()
      setImages(data)
      setShowImages(true)
    }
    setLoading(false)
  }

  async function insertImage() {
    if (!file) { alert('Choisissez une image'); return }
    setLoading(true)
    setErr(''); setMsg('')
    const formData = new FormData()
    formData.append('image', file)
    const res = await fetch('/api/images', { method: 'POST', body: formData })
    if (res.ok) {
      setMsg('Image insérée avec succès !')
      setFile(null)
      const input = document.getElementById('file-input') as HTMLInputElement
      if (input) input.value = ''
    } else {
      setErr('Erreur lors de l\'insertion')
    }
    setLoading(false)
    setTimeout(() => { setMsg(''); setErr('') }, 3000)
  }

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-images"></i> Projet 03 — Images BDD</div>
      <div className="page-heading"><i className="fa fa-images"></i> Manipulation d&apos;images avec les bases de données</div>

      {msg && <div className="alert alert-success"><i className="fa fa-check-circle"></i> {msg}</div>}
      {err && <div className="alert alert-danger"><i className="fa fa-exclamation-circle"></i> {err}</div>}

      <div className="card-rsi" style={{ maxWidth: 600, marginBottom: 28 }}>
        <fieldset style={{ border: '1.5px solid #e0e6f0', borderRadius: 10, padding: '20px 24px' }}>
          <legend style={{
            fontFamily: 'Playfair Display, serif', fontWeight: 700,
            color: 'var(--blue)', fontSize: '1rem', padding: '0 8px'
          }}>
            Manipulation d&apos;images avec les bases de données
          </legend>

          <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '.85rem', fontWeight: 600, color: 'var(--blue)', marginBottom: 10 }}>
              <i className="fa fa-upload" style={{ color: 'var(--gold)', marginRight: 6 }}></i>
              Choix d&apos;une image à insérer :
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
              <label style={{
                padding: '8px 16px', background: 'var(--light)', border: '1.5px solid #e0e6f0',
                borderRadius: 7, cursor: 'pointer', fontSize: '.8rem', fontWeight: 600,
                color: 'var(--blue)', display: 'flex', alignItems: 'center', gap: 7
              }}>
                <i className="fa fa-folder-open" style={{ color: 'var(--gold)' }}></i>
                Choisir un fichier
                <input id="file-input" type="file" accept="image/*" style={{ display: 'none' }}
                  onChange={e => setFile(e.target.files?.[0] || null)} />
              </label>
              <span style={{ fontSize: '.8rem', color: 'var(--muted)' }}>
                {file ? file.name : 'Aucun fichier choisi'}
              </span>
            </div>

            {file && (
              <div style={{ marginTop: 12, padding: '10px 14px', background: 'var(--light)', borderRadius: 8, fontSize: '.78rem', color: '#475569' }}>
                <i className="fa fa-info-circle" style={{ color: 'var(--gold)', marginRight: 6 }}></i>
                <strong>{file.name}</strong> — {(file.size / 1024).toFixed(1)} Ko — {file.type}
              </div>
            )}
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button onClick={insertImage} disabled={loading || !file} style={{
              padding: '9px 20px', background: 'var(--blue)', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
              fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 7,
              opacity: !file ? 0.6 : 1
            }}>
              <i className="fa fa-database"></i>
              {loading ? 'Insertion...' : 'Insérer Image'}
            </button>

            <button onClick={fetchImages} disabled={loading} style={{
              padding: '9px 20px', background: '#10b981', color: '#fff',
              border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer',
              fontSize: '.82rem', display: 'flex', alignItems: 'center', gap: 7
            }}>
              <i className="fa fa-eye"></i>
              {loading ? 'Chargement...' : 'Afficher toutes les images'}
            </button>
          </div>
        </fieldset>
      </div>

      {/* Galerie */}
      {showImages && (
        <div className="card-rsi">
          <div className="page-heading"><i className="fa fa-th"></i> Galerie d&apos;images ({images.length})</div>
          {images.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'var(--muted)', padding: '32px 0' }}>
              <i className="fa fa-image" style={{ fontSize: '2rem', display: 'block', marginBottom: 10, color: '#e2e8f0' }}></i>
              Aucune image dans la base de données
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16 }}>
              {images.map(img => (
                <div key={img.id} style={{
                  border: '1px solid #e8edf6', borderRadius: 12, overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(26,58,107,.06)'
                }}>
                  <div style={{ height: 140, overflow: 'hidden', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <img
                      src={`data:${img.type};base64,${img.bin_img}`}
                      alt={img.name}
                      style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ padding: '10px 12px' }}>
                    <div style={{ fontWeight: 600, fontSize: '.78rem', color: '#1e293b', marginBottom: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {img.name}
                    </div>
                    <div style={{ fontSize: '.7rem', color: 'var(--muted)' }}>
                      {img.type} — {(img.size / 1024).toFixed(1)} Ko
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </ProtectedLayout>
  )
}