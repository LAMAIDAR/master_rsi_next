'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Footer from './components/Footer'

export default function LoginPage() {
  const [login, setLogin] = useState('')
  const [pass, setPass] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login, pass }),
    })

    if (res.ok) {
      const data = await res.json()
      localStorage.setItem('etudiant', JSON.stringify(data.etudiant))
      router.push('/dashboard')
    } else {
      setError('Login ou mot de passe incorrect')
    }
    setLoading(false)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header simple pour login */}
      <header className="header">
        <div className="header-inner">
          <div className="h-logos">
            <div className="logo-card">
              <img src="/images/fst1.png" alt="UH1" style={{ height: 52 }} onError={e => (e.currentTarget.style.display='none')} />
            </div>
            <div className="logo-sep"></div>
            <div className="logo-card">
              <img src="/images/fst.png" alt="FST" style={{ height: 52 }} onError={e => (e.currentTarget.style.display='none')} />
            </div>
          </div>
          <div className="h-title">
            <div className="h-badge">Module : Langage du Web &nbsp;·&nbsp; Pr. Sofia El Amoury</div>
            <h1>Faculté des Sciences et Techniques de Settat</h1>
            <p>Université Hassan I<sup>er</sup> &nbsp;—&nbsp; Master RSI &nbsp;·&nbsp; Année 2025-2026</p>
          </div>
          <div style={{ width: 200 }}></div>
        </div>
      </header>

      {/* Main */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--light)', padding: 24 }}>
        <div style={{ width: '100%', maxWidth: 420 }}>
          <div className="card-rsi">
            {/* Titre */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--blue-dark), var(--blue-mid))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
                boxShadow: '0 4px 18px rgba(26,58,107,.25)'
              }}>
                <i className="fa fa-user-graduate" style={{ fontSize: '1.6rem', color: 'var(--gold)' }}></i>
              </div>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.4rem', fontWeight: 700, color: 'var(--blue)', marginBottom: 4 }}>
                Authentification
              </h2>
              <p style={{ fontSize: '.78rem', color: 'var(--muted)' }}>Connectez-vous à votre espace étudiant</p>
            </div>

            {error && (
              <div className="alert alert-danger">
                <i className="fa fa-exclamation-circle"></i> {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--blue)', marginBottom: 6 }}>
                  <i className="fa fa-user" style={{ color: 'var(--gold)', marginRight: 6 }}></i>Login
                </label>
                <input
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8,
                    border: '1.5px solid #e0e6f0', fontSize: '.87rem',
                    fontFamily: 'DM Sans, sans-serif', outline: 'none',
                    transition: 'border-color .2s'
                  }}
                  placeholder="Votre login"
                  value={login}
                  onChange={e => setLogin(e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = '#e0e6f0'}
                  required
                />
              </div>

              <div style={{ marginBottom: 24 }}>
                <label style={{ display: 'block', fontSize: '.8rem', fontWeight: 600, color: 'var(--blue)', marginBottom: 6 }}>
                  <i className="fa fa-lock" style={{ color: 'var(--gold)', marginRight: 6 }}></i>Mot de passe
                </label>
                <input
                  type="password"
                  style={{
                    width: '100%', padding: '10px 14px', borderRadius: 8,
                    border: '1.5px solid #e0e6f0', fontSize: '.87rem',
                    fontFamily: 'DM Sans, sans-serif', outline: 'none',
                    transition: 'border-color .2s'
                  }}
                  placeholder="Votre mot de passe"
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  onFocus={e => e.target.style.borderColor = 'var(--blue)'}
                  onBlur={e => e.target.style.borderColor = '#e0e6f0'}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%', padding: '11px',
                  background: 'linear-gradient(120deg, var(--blue-dark), var(--blue-mid))',
                  color: '#fff', border: 'none', borderRadius: 9,
                  fontSize: '.88rem', fontWeight: 700,
                  fontFamily: 'DM Sans, sans-serif', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  opacity: loading ? 0.7 : 1, transition: 'opacity .2s'
                }}
              >
                <i className="fa fa-sign-in-alt"></i>
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}