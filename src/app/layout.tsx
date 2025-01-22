import type { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import localFont from 'next/font/local';

import { ThemeProvider } from 'next-themes';

import '@/app/globals.css';
import { FAQ } from '@/components/faq';
import { Footer } from '@/components/footer';
import { NavBar } from '@/components/nav-bar';

const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900'
});
const clashDisplay = localFont({
    src: [
        { path: './fonts/ClashDisplay-Extralight.woff', weight: '200', style: 'normal' },
        { path: './fonts/ClashDisplay-Light.woff', weight: '300', style: 'normal' },
        { path: './fonts/ClashDisplay-Regular.woff', weight: '400', style: 'normal' },
        { path: './fonts/ClashDisplay-Medium.woff', weight: '500', style: 'normal' },
        { path: './fonts/ClashDisplay-Semibold.woff', weight: '600', style: 'normal' },
        { path: './fonts/ClashDisplay-Bold.woff', weight: '700', style: 'normal' }
    ],
    variable: '--font-clashdisplay'
});
const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    style: 'normal',
    subsets: ['latin'],
    variable: '--font-roboto'
});

export const metadata: Metadata = {
    title: 'Hyperchains',
    description: 'Powered by æternity'
};

const Layout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        // ? https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
        // ? https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors
        // Theme is forced light for now
        <html
            suppressHydrationWarning
            lang='en'
            className={`${geistSans.variable} ${geistMono.variable} ${clashDisplay.variable} ${roboto.variable}`}>
            <body className='flex min-h-screen flex-col bg-background font-clash text-foreground antialiased'>
                <ThemeProvider attribute='class' forcedTheme={'light'}>
                    <NavBar />
                    <main className='flex-1 px-4'>{children}</main>
                    <FAQ />
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
};

export default Layout;
