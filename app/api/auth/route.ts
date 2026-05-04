import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  try {
    const { login, pass } = await req.json()

    // ✅ findFirst au lieu de findUnique
    const etudiant = await prisma.etudiants.findFirst({
      where: { login }
    })

    if (!etudiant) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    const hashCompatible = etudiant.pass.replace(/^\$2y\$/, '$2b$')

    console.log('Hash original :', etudiant.pass.substring(0, 10))
    console.log('Hash modifié  :', hashCompatible.substring(0, 10))
    const passwordMatch = bcrypt.compareSync(pass, hashCompatible)
    console.log('Match :', passwordMatch)

    if (!passwordMatch) {
      return NextResponse.json(
        { error: 'Identifiants incorrects' },
        { status: 401 }
      )
    }

    const token = jwt.sign(
      { id: etudiant.id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    )

    const response = NextResponse.json({
      message: 'Connexion réussie',
      etudiant: {
        id: etudiant.id,
        nom: etudiant.nom,
        login: etudiant.login,
        filiere: etudiant.filiere
      }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: '/'
    })

    return response

  } catch (err) {
    console.log('Erreur serveur :', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}

export async function DELETE() {
  const response = NextResponse.json({ message: 'Déconnecté' })
  response.cookies.delete('token')
  return response
}