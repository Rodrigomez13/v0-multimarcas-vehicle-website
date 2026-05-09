import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: 'GF MultiMarcas | Venta de Vehículos 0km y Usados',
  description: 'GF MultiMarcas - Tu concesionaria de confianza en Formosa. Venta de motos, autos y camionetas nuevos y usados. Encontrá tu próximo vehículo al mejor precio.',
  keywords: ['autos', 'motos', 'camionetas', '0km', 'usados', 'concesionaria', 'vehículos', 'GF MultiMarcas', 'Formosa'],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
