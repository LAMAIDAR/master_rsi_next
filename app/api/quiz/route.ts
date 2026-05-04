import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// PUT — enregistrer la note d'un quiz
export async function PUT(req: NextRequest) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const { quizNumber, note } = await req.json()
    const id = payload.id

    const data: { quiz1?: number; quiz2?: number } = {}

    if (quizNumber === 1) data.quiz1 = note
    if (quizNumber === 2) data.quiz2 = note

    const etudiant = await prisma.etudiants.update({
      where: { id },
      data
    })

    return NextResponse.json({
      message: `Note Quiz ${quizNumber} enregistrée`,
      etudiant
    })
  } catch {
    return NextResponse.json({ error: 'Erreur enregistrement quiz' }, { status: 500 })
  }
}