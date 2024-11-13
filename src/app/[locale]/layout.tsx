import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import "@/app/globals.css"
import Sidebar from './components/sidebar';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cansu Altun | Frontend Developer',
  description: 'Frontend Developer specialized in React, Next.js, and TypeScript',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
  },
  openGraph: {
    type: 'website',
    title: 'Cansu Altun | Frontend Developer',
    description: 'Frontend Developer specialized in React, Next.js, and TypeScript',
    url: 'https://your-website.com',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cansu Altun | Frontend Developer',
    description: 'Frontend Developer specialized in React, Next.js, and TypeScript',
    images: ['/og-image.png'],
  },
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className="bg-gradient-to-br from-white to-orange-50">
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 max-[760px]:pl-20 min-[760px]:pl-64">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <NextIntlClientProvider messages={messages} locale={locale}>
                {children}
                <Toaster position="top-center" />
              </NextIntlClientProvider>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}