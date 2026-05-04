'use client'  
 // ← MANQUANT !
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from './Header'
import Footer from './Footer'
import Sidebar from './Sidebar'

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const etudiant = localStorage.getItem('etudiant')
    if (!etudiant) router.push('/')
  }, [router])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <div className="page-wrapper">
        <Sidebar />
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  )
}