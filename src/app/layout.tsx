import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gaby Guillén - Admin',
  description: 'Panel de administración de Gaby Guillén',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
