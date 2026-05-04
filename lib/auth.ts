import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

export function verifyToken(req: NextRequest): { id: number } | null {
  try {
    const token = req.cookies.get('token')?.value
    if (!token) return null
    return jwt.verify(token, process.env.JWT_SECRET!) as { id: number }
  } catch {
    return null
  }
}