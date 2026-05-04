import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyToken } from '@/lib/auth'

// GET — récupérer toutes les images
export async function GET(req: NextRequest) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const images = await prisma.images.findMany({
    select: {
      id: true,
      name: true,
      type: true,
      size: true,
      bin_img: true
    }
  })

  // Convertir bin_img (Buffer) en base64 pour l'envoyer au frontend
  const result = images.map(img => ({
    id: img.id,
    name: img.name,
    type: img.type,
    size: img.size,
    bin_img: Buffer.from(img.bin_img).toString('base64')
  }))

  return NextResponse.json(result)
}

// POST — insérer une image
export async function POST(req: NextRequest) {
  const payload = verifyToken(req)
  if (!payload) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  try {
    const formData = await req.formData()
    const file = formData.get('image') as File

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const image = await prisma.images.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        bin_img: buffer
      }
    })

    return NextResponse.json({
      message: 'Image insérée',
      id: image.id,
      name: image.name
    }, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erreur insertion image' }, { status: 500 })
  }
}