import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET — liste tous les étudiants
export async function GET(req: NextRequest) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const etudiants = await prisma.etudiants.findMany({
    select: {
      id: true,
      nom: true,
      login: true,
      filiere: true,
      note1: true,
      note2: true,
      quiz1: true,
      quiz2: true,
      moyenne: true,
      longitude: true,
      latitude: true
    }
  })

  return NextResponse.json(etudiants)
}