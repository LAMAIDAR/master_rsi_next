'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useEffect, useRef, useState } from 'react'

export default function GeolocalisationPage() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [etudiants, setEtudiants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    fetch('/api/etudiants').then(r => r.json()).then(data => {
      setEtudiants(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (loading || !mapRef.current) return

    // Utiliser OpenStreetMap via Leaflet (pas besoin de clé API)
    const loadLeaflet = async () => {
      if (typeof window === 'undefined') return

      // Charger CSS Leaflet
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link')
        link.id = 'leaflet-css'
        link.rel = 'stylesheet'
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
        document.head.appendChild(link)
      }

      // Charger JS Leaflet
      const L = await new Promise<any>((resolve) => {
        if ((window as any).L) { resolve((window as any).L); return }
        const script = document.createElement('script')
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'
        script.onload = () => resolve((window as any).L)
        document.head.appendChild(script)
      })

      if (!mapRef.current) return

      // Centrer sur le Maroc par défaut
      const center = etudiants.length > 0
        ? [etudiants[0].latitude || 33.5731, etudiants[0].longitude || -7.5898]
        : [33.5731, -7.5898]

      const map = L.map(mapRef.current).setView(center, 6)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      // Marqueurs pour chaque étudiant
      etudiants.forEach((e: any) => {
        if (!e.latitude || !e.longitude) return
        const marker = L.marker([e.latitude, e.longitude])
        marker.addTo(map)
        marker.bindPopup(`
          <div style="font-family: DM Sans, sans-serif; min-width: 140px;">
            <div style="font-weight: 700; color: #1a3a6b; margin-bottom: 4px; font-size: 14px;">
              👤 ${e.nom}
            </div>
            <div style="font-size: 12px; color: #475569;">
              📍 ${e.latitude.toFixed(4)}, ${e.longitude.toFixed(4)}
            </div>
            ${e.filiere ? `<div style="font-size: 11px; color: #8a97b0; margin-top: 4px;">🎓 ${e.filiere}</div>` : ''}
          </div>
        `)
      })

      setMapLoaded(true)
    }

    loadLeaflet()
  }, [etudiants, loading])

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-map-marker-alt"></i> Projet 06 — Géolocalisation</div>
      <div className="page-heading"><i className="fa fa-map-marker-alt"></i> Géolocalisation des étudiants</div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div className="card-rsi" style={{ textAlign: 'center', padding: '16px 12px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--blue)', fontFamily: 'Playfair Display, serif' }}>
            {etudiants.filter(e => e.latitude && e.longitude).length}
          </div>
          <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Étudiants localisés</div>
        </div>
        <div className="card-rsi" style={{ textAlign: 'center', padding: '16px 12px' }}>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#10b981', fontFamily: 'Playfair Display, serif' }}>
            {etudiants.length}
          </div>
          <div style={{ fontSize: '.72rem', color: 'var(--muted)' }}>Total étudiants</div>
        </div>
      </div>

      {/* Carte */}
      <div className="card-rsi" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 24px', borderBottom: '1px solid #e8edf6', display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="fa fa-map" style={{ color: 'var(--gold)' }}></i>
          <span style={{ fontFamily: 'Playfair Display, serif', fontWeight: 700, color: 'var(--blue)' }}>
            Carte des positions — OpenStreetMap
          </span>
        </div>

        {loading ? (
          <div style={{ height: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)' }}>
            <div style={{ textAlign: 'center' }}>
              <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: 12, display: 'block' }}></i>
              Chargement de la carte...
            </div>
          </div>
        ) : (
          <div ref={mapRef} style={{ height: 500, width: '100%' }} />
        )}
      </div>

      {/* Liste étudiants */}
      {etudiants.length > 0 && (
        <div className="card-rsi" style={{ marginTop: 24 }}>
          <div className="page-heading" style={{ fontSize: '1rem' }}>
            <i className="fa fa-list"></i> Liste des positions
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
              <thead>
                <tr style={{ background: 'var(--blue)', color: '#fff' }}>
                  {['Nom','Filière','Latitude','Longitude','Statut'].map(h => (
                    <th key={h} style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {etudiants.map((e, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : 'var(--light)' }}>
                    <td style={{ padding: '9px 14px', fontWeight: 600, color: 'var(--blue)' }}>{e.nom}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', color: '#475569' }}>{e.filiere || '—'}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', fontFamily: 'monospace', fontSize: '.78rem' }}>{e.latitude ? Number(e.latitude).toFixed(4) : '—'}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center', fontFamily: 'monospace', fontSize: '.78rem' }}>{e.longitude ? Number(e.longitude).toFixed(4) : '—'}</td>
                    <td style={{ padding: '9px 14px', textAlign: 'center' }}>
                      {e.latitude && e.longitude
                        ? <span style={{ background: '#dcfce7', color: '#166534', padding: '2px 10px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700 }}>✓ Localisé</span>
                        : <span style={{ background: '#fee2e2', color: '#991b1b', padding: '2px 10px', borderRadius: 20, fontSize: '.72rem', fontWeight: 700 }}>✗ Non défini</span>
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ProtectedLayout>
  )
}