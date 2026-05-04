'use client'

import ProtectedLayout from '../components/ProtectedLayout'
import { useEffect, useRef, useState } from 'react'

export default function StatsPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [etudiants, setEtudiants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const chartRef = useRef<any>(null)

  useEffect(() => {
    fetch('/api/stats').then(r => r.json()).then(data => {
      setEtudiants(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (!etudiants.length || !canvasRef.current) return

    const loadChart = async () => {
      const { Chart, registerables } = await import('chart.js')
      Chart.register(...registerables)

      if (chartRef.current) chartRef.current.destroy()

      const colors = ['#4e73df','#9b59b6','#1abc9c','#e8a0bf','#e74a3b','#f59e0b','#10b981','#6366f1']

      chartRef.current = new Chart(canvasRef.current!, {
        type: 'bar',
        data: {
          labels: etudiants.map(e => e.nom),
          datasets: [{
            label: 'Moyenne',
            data: etudiants.map(e => e.moyenne),
            backgroundColor: etudiants.map((_, i) => colors[i % colors.length]),
            borderRadius: 6,
          }]
        },
        options: {
          responsive: true,
          plugins: {
            title: { display: true, text: 'Moyenne des étudiants du Master RSI', font: { size: 14, weight: 'bold' } },
            legend: { display: false }
          },
          scales: {
            y: { beginAtZero: true, max: 20, grid: { color: '#f1f5f9' } },
            x: { grid: { display: false } }
          }
        }
      })
    }
    loadChart()

    return () => { if (chartRef.current) chartRef.current.destroy() }
  }, [etudiants])

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-chart-bar"></i> Projet 05 — Statistiques ChartJS</div>
      <div className="page-heading"><i className="fa fa-chart-bar"></i> Statistiques avec chartJS</div>

      <div className="card-rsi">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <i className="fa fa-spinner fa-spin" style={{ fontSize: '2rem', marginBottom: 12, display: 'block' }}></i>
            Chargement des données...
          </div>
        ) : etudiants.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
            <i className="fa fa-inbox" style={{ fontSize: '2rem', marginBottom: 12, display: 'block', color: '#e2e8f0' }}></i>
            Aucun étudiant dans la base de données
          </div>
        ) : (
          <>
            <canvas ref={canvasRef} style={{ maxHeight: 400 }} />

            {/* Tableau récap */}
            <div style={{ marginTop: 32 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', color: 'var(--blue)', fontSize: '1rem', marginBottom: 14 }}>
                <i className="fa fa-table" style={{ color: 'var(--gold)', marginRight: 8 }}></i>
                Récapitulatif des notes
              </h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
                  <thead>
                    <tr style={{ background: 'var(--blue)', color: '#fff' }}>
                      {['Nom','Note 1','Note 2','Quiz 1','Quiz 2','Moyenne'].map(h => (
                        <th key={h} style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {etudiants.map((e, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : 'var(--light)' }}>
                        <td style={{ padding: '9px 14px', fontWeight: 600, color: 'var(--blue)' }}>{e.nom}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.note1}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.note2}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.quiz1}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'center' }}>{e.quiz2}</td>
                        <td style={{ padding: '9px 14px', textAlign: 'center' }}>
                          <span style={{
                            background: e.moyenne >= 10 ? '#dcfce7' : '#fee2e2',
                            color: e.moyenne >= 10 ? '#166534' : '#991b1b',
                            padding: '3px 10px', borderRadius: 20, fontWeight: 700
                          }}>
                            {Number(e.moyenne).toFixed(2)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </ProtectedLayout>
  )
}