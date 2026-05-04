'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useState } from 'react'

type Matrix = number[][]

function generateRandom(rows: number, cols: number): Matrix {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 9) + 1)
  )
}

function matrixToString(m: Matrix): string {
  return m.map(row => row.join('  ')).join('\n')
}

function addMatrices(a: Matrix, b: Matrix): Matrix | null {
  if (a.length !== b.length || a[0].length !== b[0].length) return null
  return a.map((row, i) => row.map((val, j) => val + b[i][j]))
}

function multiplyMatrices(a: Matrix, b: Matrix): Matrix | null {
  if (a[0].length !== b.length) return null
  return a.map((row, i) =>
    b[0].map((_, j) => row.reduce((sum, _, k) => sum + a[i][k] * b[k][j], 0))
  )
}

const textareaStyle: React.CSSProperties = {
  width: '100%', height: 120, padding: '10px 12px',
  border: '1.5px solid #e0e6f0', borderRadius: 8,
  fontFamily: 'monospace', fontSize: '.85rem',
  resize: 'vertical', background: '#f8fafc', outline: 'none'
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '8px 12px',
  border: '1.5px solid #e0e6f0', borderRadius: 7,
  fontSize: '.85rem', fontFamily: 'DM Sans, sans-serif', outline: 'none'
}

const btnStyle = (color: string): React.CSSProperties => ({
  padding: '8px 18px', border: 'none', borderRadius: 8,
  background: color, color: '#fff', fontWeight: 700,
  fontSize: '.78rem', cursor: 'pointer', fontFamily: 'DM Sans, sans-serif',
  display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 8
})

export default function MatricesPage() {
  const [rows1, setRows1] = useState('')
  const [cols1, setCols1] = useState('')
  const [rows2, setRows2] = useState('')
  const [cols2, setCols2] = useState('')
  const [matrix1, setMatrix1] = useState<Matrix>([])
  const [matrix2, setMatrix2] = useState<Matrix>([])
  const [sumResult, setSumResult] = useState('')
  const [prodResult, setProdResult] = useState('')

  function generate(n: number) {
    const r = parseInt(n === 1 ? rows1 : rows2)
    const c = parseInt(n === 1 ? cols1 : cols2)
    if (!r || !c || r < 1 || c < 1 || r > 10 || c > 10) {
      alert('Entrez des dimensions valides (1-10)')
      return
    }
    const m = generateRandom(r, c)
    n === 1 ? setMatrix1(m) : setMatrix2(m)
    setSumResult('')
    setProdResult('')
  }

  function calcSum() {
    if (!matrix1.length || !matrix2.length) { alert('Générez les deux matrices d\'abord'); return }
    const result = addMatrices(matrix1, matrix2)
    if (!result) { alert('Les matrices doivent avoir les mêmes dimensions pour la somme'); return }
    setSumResult(matrixToString(result))
  }

  function calcProd() {
    if (!matrix1.length || !matrix2.length) { alert('Générez les deux matrices d\'abord'); return }
    const result = multiplyMatrices(matrix1, matrix2)
    if (!result) { alert('Nb colonnes M1 doit égaler nb lignes M2 pour le produit'); return }
    setProdResult(matrixToString(result))
  }

  const matCard = (title: string, n: number, rows: string, setRows: any, cols: string, setCols: any, matrix: Matrix) => (
    <div style={{
      background: '#fff', border: '1px solid #e8edf6', borderRadius: 14,
      overflow: 'hidden', boxShadow: '0 2px 14px rgba(26,58,107,.06)'
    }}>
      <div style={{
        background: 'linear-gradient(120deg, var(--blue-dark), var(--blue-mid))',
        padding: '10px 18px', textAlign: 'center',
        fontFamily: 'Playfair Display, serif', color: '#fff', fontWeight: 700
      }}>
        {title}
      </div>
      <div style={{ padding: 18 }}>
        <div style={{ color: 'var(--blue)', fontWeight: 700, fontSize: '.8rem', marginBottom: 12 }}>
          <i className="fa fa-ruler-combined" style={{ color: 'var(--gold)', marginRight: 6 }}></i>
          Saisie des dimensions
        </div>
        <div style={{ marginBottom: 10 }}>
          <label style={{ fontSize: '.78rem', color: '#475569', marginBottom: 4, display: 'block' }}>Nombres de lignes :</label>
          <input style={inputStyle} type="number" min={1} max={10} value={rows} onChange={e => setRows(e.target.value)} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ fontSize: '.78rem', color: '#475569', marginBottom: 4, display: 'block' }}>Nombres de colonnes :</label>
          <input style={inputStyle} type="number" min={1} max={10} value={cols} onChange={e => setCols(e.target.value)} />
        </div>
        <button style={btnStyle('var(--gold)')} onClick={() => generate(n)}>
          <i className="fa fa-random"></i> Générer des valeurs aléatoires
        </button>
        <div style={{ marginTop: 10 }}>
          <div style={{ fontSize: '.78rem', color: '#475569', marginBottom: 4 }}>Valeurs générées :</div>
          <textarea style={textareaStyle} readOnly value={matrix.length ? matrixToString(matrix) : ''} />
        </div>
      </div>
    </div>
  )

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-table"></i> Projet 01 — Matrices JavaScript</div>
      <div className="page-heading"><i className="fa fa-table"></i> Manipulation de matrices avec Javascript</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 28 }}>
        {matCard('Matrice N°1', 1, rows1, setRows1, cols1, setCols1, matrix1)}
        {matCard('Matrice N°2', 2, rows2, setRows2, cols2, setCols2, matrix2)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        {/* Somme */}
        <div className="card-rsi">
          <button style={{ ...btnStyle('var(--blue)'), marginBottom: 12 }} onClick={calcSum}>
            <i className="fa fa-plus"></i> Calculer Somme
          </button>
          <div style={{ fontSize: '.78rem', color: '#475569', marginBottom: 6 }}>Résultat de la Somme :</div>
          <textarea style={textareaStyle} readOnly value={sumResult} />
        </div>

        {/* Produit */}
        <div className="card-rsi">
          <button style={{ ...btnStyle('#8b5cf6'), marginBottom: 12 }} onClick={calcProd}>
            <i className="fa fa-times"></i> Calculer Produit
          </button>
          <div style={{ fontSize: '.78rem', color: '#475569', marginBottom: 6 }}>Résultat du Produit :</div>
          <textarea style={textareaStyle} readOnly value={prodResult} />
        </div>
      </div>
    </ProtectedLayout>
  )
}