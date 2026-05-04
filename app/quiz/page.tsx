'use client'
import ProtectedLayout from '../components/ProtectedLayout'
import { useState, useEffect } from 'react'

const jsAnswers: Record<string, string> = { js_q1: 'a', js_q2: 'a', js_q3: 'd' }
const phpAnswers: Record<string, string> = { php_q1: 'c', php_q2: 'a', php_q3: 'b' }

export default function QuizPage() {
  const [openModal, setOpenModal] = useState<'js' | 'php' | null>(null)
  const [jsScore, setJsScore] = useState<number | null>(null)
  const [phpScore, setPhpScore] = useState<number | null>(null)
  const [jsAnsw, setJsAnsw] = useState<Record<string, string>>({})
  const [phpAnsw, setPhpAnsw] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/quiz').then(r => r.json()).then(data => {
      if (data.quiz1 !== undefined) setJsScore(data.quiz1)
      if (data.quiz2 !== undefined) setPhpScore(data.quiz2)
    }).catch(() => {})
  }, [])

  function submitQuiz(type: 'js' | 'php') {
    const correct = type === 'js' ? jsAnswers : phpAnswers
    const chosen  = type === 'js' ? jsAnsw : phpAnsw
    const total = Object.keys(correct).length
    let score = 0
    for (const [name, val] of Object.entries(correct)) {
      if (!chosen[name]) { alert('⚠️ Veuillez répondre à toutes les questions'); return }
      if (chosen[name] === val) score++
    }
    alert(`✅ Quiz ${type === 'js' ? 'JavaScript' : 'PHP'} terminé !\n\nVotre note : ${score} / ${total}`)
    if (type === 'js') setJsScore(score)
    else setPhpScore(score)

    fetch('/api/quiz', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quizNumber: type === 'js' ? 1 : 2, note: score })
    })
    setOpenModal(null)
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.6)',
    zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20
  }
  const modalStyle: React.CSSProperties = {
    background: '#fff', borderRadius: 20, width: '100%', maxWidth: 640,
    maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 80px rgba(0,0,0,.3)'
  }
  const optionLabel = (color: string): React.CSSProperties => ({
    display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer',
    fontSize: '.82rem', color: '#374151', padding: '10px 14px', borderRadius: 10,
    border: '1px solid #e2e8f0', width: '100%', transition: 'all .18s'
  })

  function QuizOption({ name, value, label, color, answers, setAnswers }:
    { name: string; value: string; label: string; color: string; answers: Record<string,string>; setAnswers: any }) {
    return (
      <li style={{ marginBottom: 8 }}>
        <label style={{ ...optionLabel(color), borderColor: answers[name] === value ? color : '#e2e8f0', background: answers[name] === value ? `${color}15` : '#fff' }}>
          <input type="radio" name={name} value={value} style={{ accentColor: color, width: 16, height: 16 }}
            checked={answers[name] === value}
            onChange={() => setAnswers({ ...answers, [name]: value })} />
          {label}
        </label>
      </li>
    )
  }

  function QuestionBlock({ num, text, numColor, children }: any) {
    return (
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: '.9rem', marginBottom: 12, lineHeight: 1.5, display: 'flex', alignItems: 'flex-start', gap: 8 }}>
          <span style={{ background: numColor, borderRadius: '50%', width: 24, height: 24, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '.7rem', fontWeight: 800, flexShrink: 0, marginTop: 2 }}>{num}</span>
          <span dangerouslySetInnerHTML={{ __html: text }} />
        </div>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>{children}</ul>
      </div>
    )
  }

  return (
    <ProtectedLayout>
      <div className="proj-badge"><i className="fa fa-question-circle"></i> Projet 04 — Quiz Interactif</div>
      <div className="page-heading"><i className="fa fa-question-circle"></i> Quiz – Testez vos Connaissances</div>

      {/* Cards Quiz */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
        {/* Quiz JS */}
        <div onClick={() => setOpenModal('js')} style={{ background: '#fff', borderRadius: 18, border: '1px solid #e8edf6', overflow: 'hidden', boxShadow: '0 2px 14px rgba(26,58,107,.06)', cursor: 'pointer', transition: 'box-shadow .2s, transform .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(26,58,107,.06)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
          <div style={{ height: 140, background: 'linear-gradient(135deg,#f59e0b,#d97706)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 12, left: 14, background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: '.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>Quiz N°1</span>
            <span style={{ fontSize: '3rem' }}>⚡</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Quiz 1 – JavaScript</div>
            <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginBottom: 14 }}>Tester vos connaissances en JavaScript · 3 questions</div>
            <button onClick={e => { e.stopPropagation(); setOpenModal('js') }} style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '.78rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <i className="fa fa-play"></i> Commencer
            </button>
          </div>
        </div>

        {/* Quiz PHP */}
        <div onClick={() => setOpenModal('php')} style={{ background: '#fff', borderRadius: 18, border: '1px solid #e8edf6', overflow: 'hidden', boxShadow: '0 2px 14px rgba(26,58,107,.06)', cursor: 'pointer', transition: 'box-shadow .2s, transform .2s' }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 24px rgba(0,0,0,.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 14px rgba(26,58,107,.06)'; (e.currentTarget as HTMLElement).style.transform = 'none' }}>
          <div style={{ height: 140, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <span style={{ position: 'absolute', top: 12, left: 14, background: 'rgba(255,255,255,.2)', color: '#fff', fontSize: '.65rem', fontWeight: 700, padding: '3px 10px', borderRadius: 12 }}>Quiz N°2</span>
            <span style={{ fontSize: '3rem' }}>🐘</span>
          </div>
          <div style={{ padding: '16px 20px' }}>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', fontWeight: 700, color: '#1e293b', marginBottom: 6 }}>Quiz 2 – PHP</div>
            <div style={{ fontSize: '.76rem', color: 'var(--muted)', marginBottom: 14 }}>Tester vos connaissances en PHP · 3 questions</div>
            <button onClick={e => { e.stopPropagation(); setOpenModal('php') }} style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: '.78rem', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <i className="fa fa-play"></i> Commencer
            </button>
          </div>
        </div>
      </div>

      {/* Scores */}
      <div style={{ background: '#fff', borderRadius: 18, border: '1px solid #e8edf6', overflow: 'hidden', boxShadow: '0 2px 14px rgba(26,58,107,.06)' }}>
        <div style={{ background: 'linear-gradient(135deg,#1e293b,#334155)', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className="fa fa-trophy" style={{ color: '#fbbf24' }}></i>
          <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1rem', fontWeight: 700, color: '#fff', margin: 0 }}>Mes résultats enregistrés</h3>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {jsScore === null && phpScore === null ? (
            <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '.8rem', padding: '16px 0' }}>
              <i className="fa fa-inbox" style={{ fontSize: '1.5rem', display: 'block', marginBottom: 8, color: '#e2e8f0' }}></i>
              Aucun résultat enregistré. Complétez un quiz !
            </div>
          ) : (
            <>
              {jsScore !== null && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#475569' }}><i className="fa fa-bolt" style={{ color: '#d97706', marginRight: 6 }}></i>Quiz JavaScript</span>
                  <span style={{ background: '#fef3c7', color: '#92400e', fontWeight: 700, padding: '3px 12px', borderRadius: 20, fontSize: '.82rem' }}>{jsScore} / 3</span>
                </div>
              )}
              {phpScore !== null && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0' }}>
                  <span style={{ fontSize: '.82rem', fontWeight: 600, color: '#475569' }}><i className="fa fa-code" style={{ color: '#6366f1', marginRight: 6 }}></i>Quiz PHP</span>
                  <span style={{ background: '#ede9fe', color: '#4c1d95', fontWeight: 700, padding: '3px 12px', borderRadius: 20, fontSize: '.82rem' }}>{phpScore} / 3</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modal JS */}
      {openModal === 'js' && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setOpenModal(null)}>
          <div style={modalStyle}>
            <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#d97706', marginBottom: 4 }}>
                <i className="fa fa-bolt"></i> Quiz 1 JavaScript
              </h2>
              <p style={{ fontSize: '.8rem', color: '#64748b' }}>Tester vos Connaissances en <strong>javascript</strong></p>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <QuestionBlock num="1" text='Dans quel élément on met le code <strong>javascript</strong> ?' numColor="#fef3c7" textColor="#92400e">
                {[['a','a. &lt;script&gt;'],['b','b. &lt;js&gt;'],['c','c. &lt;body&gt;'],['d','d. &lt;link&gt;']].map(([v,l]) => (
                  <QuizOption key={v} name="js_q1" value={v} label={l.replace(/&lt;/g,'<').replace(/&gt;/g,'>')} color="#d97706" answers={jsAnsw} setAnswers={setJsAnsw} />
                ))}
              </QuestionBlock>
              <QuestionBlock num="2" text="Quel attribut utiliser pour faire référence à un script javascript externe ?" numColor="#fef3c7">
                {[['a','a. src'],['b','b. rel'],['c','c. type'],['d','d. href']].map(([v,l]) => (
                  <QuizOption key={v} name="js_q2" value={v} label={l} color="#d97706" answers={jsAnsw} setAnswers={setJsAnsw} />
                ))}
              </QuestionBlock>
              <QuestionBlock num="3" text='Comment afficher "hello" sur un message <strong>alert</strong> ?' numColor="#fef3c7">
                {[['a','a. msg("hello")'],['b','b. alertbox("hello")'],['c','c. documentwrite("hello")'],['d','d. alert("hello")']].map(([v,l]) => (
                  <QuizOption key={v} name="js_q3" value={v} label={l} color="#d97706" answers={jsAnsw} setAnswers={setJsAnsw} />
                ))}
              </QuestionBlock>
            </div>
            <div style={{ padding: '0 28px 28px', display: 'flex', gap: 12 }}>
              <button onClick={() => submitQuiz('js')} style={{ flex: 1, padding: 13, background: 'linear-gradient(135deg,#f59e0b,#d97706)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <i className="fa fa-paper-plane"></i> Submit result
              </button>
              <button onClick={() => setOpenModal(null)} style={{ padding: '13px 20px', border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', cursor: 'pointer', fontSize: '.82rem', color: '#64748b' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal PHP */}
      {openModal === 'php' && (
        <div style={overlayStyle} onClick={e => e.target === e.currentTarget && setOpenModal(null)}>
          <div style={modalStyle}>
            <div style={{ padding: '24px 28px 16px', borderBottom: '1px solid #f1f5f9', textAlign: 'center' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: '#6366f1', marginBottom: 4 }}>
                <i className="fa fa-code"></i> Quiz 2 PHP
              </h2>
              <p style={{ fontSize: '.8rem', color: '#64748b' }}>Tester vos Connaissances en <strong>PHP</strong></p>
            </div>
            <div style={{ padding: '24px 28px' }}>
              <QuestionBlock num="1" text="Que signifie PHP ?" numColor="#ede9fe">
                {[['a','a. Page Helper Process'],['b','b. Programming Home Pages'],['c','c. PHP: Hypertext Preprocessor']].map(([v,l]) => (
                  <QuizOption key={v} name="php_q1" value={v} label={l} color="#6366f1" answers={phpAnsw} setAnswers={setPhpAnsw} />
                ))}
              </QuestionBlock>
              <QuestionBlock num="2" text="Quelle fonction retourne la longueur d'une chaine de texte ?" numColor="#ede9fe">
                {[['a','a. strlen'],['b','b. strlength'],['c','c. length'],['d','d. substr']].map(([v,l]) => (
                  <QuizOption key={v} name="php_q2" value={v} label={l} color="#6366f1" answers={phpAnsw} setAnswers={setPhpAnsw} />
                ))}
              </QuestionBlock>
              <QuestionBlock num="3" text="Sachant que $num = 6. Quelle est la valeur de : $num += 2 ?" numColor="#ede9fe">
                {[['a','a. 3'],['b','b. 8'],['c','c. 10'],['d','d. 12']].map(([v,l]) => (
                  <QuizOption key={v} name="php_q3" value={v} label={l} color="#6366f1" answers={phpAnsw} setAnswers={setPhpAnsw} />
                ))}
              </QuestionBlock>
            </div>
            <div style={{ padding: '0 28px 28px', display: 'flex', gap: 12 }}>
              <button onClick={() => submitQuiz('php')} style={{ flex: 1, padding: 13, background: 'linear-gradient(135deg,#6366f1,#4f46e5)', color: '#fff', border: 'none', borderRadius: 12, fontWeight: 700, cursor: 'pointer', fontSize: '.88rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                <i className="fa fa-paper-plane"></i> Submit result
              </button>
              <button onClick={() => setOpenModal(null)} style={{ padding: '13px 20px', border: '1px solid #e2e8f0', borderRadius: 12, background: '#fff', cursor: 'pointer', fontSize: '.82rem', color: '#64748b' }}>
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </ProtectedLayout>
  )
}