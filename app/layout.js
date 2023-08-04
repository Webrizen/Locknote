import './globals.css'
import { Inter, Roboto } from 'next/font/google'

const roboto = Roboto({ 
  weight: ["100" , "300" , "400" , "500" , "700" , "900" , "100" , "300" , "400" , "500" , "700", "900"],
  subsets: ['latin'] 
})

export const metadata = {
  title: 'Locknote',
  description: 'A secure and easy way to share self-destructing notes using Next.js and Firebase.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
