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
    icon: '/favicon.ico'
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
          <NextIntlClientProvider messages={messages} locale={locale}>
            <Sidebar />
            <main className="flex-1 max-[760px]:pl-20 min-[760px]:pl-64">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {children}
                <Toaster position="top-center" />

              </div>
            </main>
          </NextIntlClientProvider>
        </div>
      </body>
    </html>
  );
}