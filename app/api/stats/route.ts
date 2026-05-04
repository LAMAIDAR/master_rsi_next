import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET — données pour les statistiques ChartJS
export async function GET(req: NextRequest) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const etudiants = await prisma.etudiants.findMany({
    select: {
      nom: true,
      moyenne: true,
      note1: true,
      note2: true,
      quiz1: true,
      quiz2: true
    }
  })

  return NextResponse.json(etudiants)
}