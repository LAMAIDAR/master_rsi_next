'use client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function Header() {
  const router = useRouter()
  const etudiant = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('etudiant') || 'null')
    : null

  async function handleLogout() {
    await fetch('/api/auth', { method: 'DELETE' })
    localStorage.removeItem('etudiant')
    router.push('/')
  }

  return (
    <header className="header">
      <div className="header-inner">
        <div className="h-logos">
          <div className="logo-card">
            <img src="/images/fst1.png" alt="Université Hassan Ier" onError={e => (e.currentTarget.style.display='none')} />
          </div>
          <div className="logo-sep"></div>
          <div className="logo-card">
            <img src="/images/fst.png" alt="FST Settat" onError={e => (e.currentTarget.style.display='none')} />
          </div>
        </div>

        <div className="h-title">
          <div className="h-badge">Module : Langage du Web &nbsp;·&nbsp; Pr. Sofia El Amoury</div>
          <h1>Faculté des Sciences et Techniques de Settat</h1>
          <p>Université Hassan I<sup>er</sup> &nbsp;—&nbsp; Master RSI &nbsp;·&nbsp; Année 2025-2026</p>
        </div>

        <div className="h-actions">
          {etudiant && (
            <>
              <div className="h-user">
                <i className="fa fa-user-circle"></i>
                {etudiant.nom}
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                <i className="fa fa-sign-out-alt"></i> Déconnexion
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  )
}