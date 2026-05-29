import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GramAnalyse — Instagram Follower Analysis',
  description:
    "Discover who doesn't follow you back on Instagram. Upload your data export for instant, private analysis — no login required.",
  keywords: ['instagram', 'followers', 'analysis', 'unfollow', 'social media'],
  openGraph: {
    title: 'GramAnalyse',
    description: "Find out who doesn't follow you back on Instagram.",
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
