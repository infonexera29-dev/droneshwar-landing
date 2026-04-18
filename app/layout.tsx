import type {Metadata} from 'next';
import { Inter, Rajdhani } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Droneshwar Defence Academy | Best NDA Coaching',
  description: 'Join Droneshwar Defence Academy to clear NDA, CDS, AFCAT. Expert faculty, physical training, and guaranteed results.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${rajdhani.variable}`}>
      <body suppressHydrationWarning className="antialiased font-sans flex flex-col min-h-screen">
        {children}
      </body>
    </html>
  );
}
