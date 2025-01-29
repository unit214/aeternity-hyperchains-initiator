import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { DOCUMENTATION_URL } from '@/lib/constants';

export function NavBar() {
    return (
        <div className='flex flex-col md:flex'>
            <div className='border-b'>
                <div className='flex h-16 items-center justify-between md:px-20'>
                    <Link href='/'>
                        <Image
                            className='h-6 md:h-8'
                            src='/hyperchains_logo.svg'
                            alt='Hyperchains logo'
                            width={170}
                            height={38}
                            priority
                        />
                    </Link>
                    <nav className='hidden items-center space-x-4 md:mx-6 md:flex lg:space-x-10'>
                        <Link href='https://hyperchains.ae' target='_blank' rel='noopener noreferrer'>
                            Home
                        </Link>
                        <Link href='https://hyperchains.ae/#how-it-works' target='_blank' rel='noopener noreferrer'>
                            About
                        </Link>
                        <Link href={DOCUMENTATION_URL} target='_blank' rel='noopener noreferrer'>
                            Documentation
                        </Link>
                        <Link href='https://hyperchains.ae/how-to' target='_blank' rel='noopener noreferrer'>
                            How to Start
                        </Link>
                        <Link href='https://hyperchains.ae/faqs' target='_blank' rel='noopener noreferrer'>
                            FAQs
                        </Link>
                    </nav>
                    <Button className='hidden md:flex' variant='outline'>
                        <Link href='/'>Create a Hyperchain</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
