import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// PUT — mettre à jour note1, note2, quiz1, quiz2, moyenne
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const data = await req.json()
    const id = parseInt(params.id)

    // Recalculer la moyenne automatiquement si notes présentes
    if (data.note1 !== undefined && data.note2 !== undefined) {
      data.moyenne = (data.note1 + data.note2) / 2
    }

    const etudiant = await prisma.etudiants.update({
      where: { id },
      data
    })

    return NextResponse.json(etudiant)
  } catch {
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 })
  }
}