'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { Button } from './ui/button';
import { CookieIcon } from 'lucide-react';
import { externalUrls } from '@/lib/constants';

export default function CookieConsent({ onAcceptCallback = () => {}, onDeclineCallback = () => {} }) {
    const [isOpen, setIsOpen] = useState(false);
    const [hide, setHide] = useState(false);

    useEffect(() => {
        if (document.cookie.includes('cookieConsent=true')) {
            onAcceptCallback();
        }
    }, []);

    const accept = () => {
        setIsOpen(false);
        document.cookie = 'cookieConsent=true; expires=Fri, 31 Dec 9999 23:59:59 GMT';
        setTimeout(() => {
            setHide(true);
        }, 700);
        onAcceptCallback();
    };

    const decline = () => {
        setIsOpen(false);
        setTimeout(() => {
            setHide(true);
        }, 700);
        onDeclineCallback();
    };

    useEffect(() => {
        try {
            setIsOpen(true);
            if (document.cookie.includes('cookieConsent=true')) {
                setIsOpen(false);
                setTimeout(() => {
                    setHide(true);
                }, 700);
            }
        } catch (e) {
            console.log('Error: ', e);
        }
    }, []);

    return (
        <div
            className={cn(
                'fixed bottom-0 z-[200] duration-700 md:bottom-4 md:right-4 md:max-w-md',
                !isOpen
                    ? 'translate-y-8 opacity-0 transition-[opacity,transform]'
                    : 'translate-y-0 opacity-100 transition-[opacity,transform]',
                hide && 'hidden'
            )}>
            <div className='m-3 rounded-md border border-border bg-background shadow-lg'>
                <div className='grid gap-2'>
                    <div className='flex h-14 items-center justify-between border-b border-border p-4'>
                        <h1 className='text-lg font-medium'>We use cookies</h1>
                        <CookieIcon className='size-[1.2rem]' />
                    </div>
                    <div className='p-4'>
                        <p className='text-start font-sans text-sm font-normal'>
                            We use cookies to ensure you get the best experience on our website. For more information on
                            how we use cookies, please see our cookie policy.
                            <br />
                            <br />
                            <span className='text-xs'>
                                By clicking &#34;<span className='font-medium opacity-80'>Accept</span>
                                &#34;, you agree to our use of cookies.
                            </span>
                            <br />
                            <Link
                                className='text-xs underline'
                                href={externalUrls.PRIVACY_POLICY}
                                target='_blank'
                                rel='noopener noreferrer'>
                                Learn more.
                            </Link>
                        </p>
                    </div>
                    <div className='flex gap-2 border-t border-border p-4 py-5'>
                        <Button onClick={accept} className='w-full'>
                            Accept
                        </Button>
                        <Button onClick={decline} className='w-full' variant='secondary'>
                            Decline
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
