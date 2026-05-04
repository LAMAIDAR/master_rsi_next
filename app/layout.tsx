import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Master RSI – Langage du Web',
  description: 'Pr. Sofia El Amoury – FST Settat',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}