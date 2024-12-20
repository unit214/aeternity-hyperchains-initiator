import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function NavBar() {
    return (
        <div className='hidden flex-col md:flex'>
            <div className='border-b'>
                <div className='flex h-16 items-center justify-between px-4 lg:px-10'>
                    <Image
                        className='h-6 sm:h-8'
                        src='/hyperchains_logo.svg'
                        alt='Hyperchains logo'
                        width={180}
                        height={38}
                        priority
                    />
                    <nav className='mx-6 flex items-center space-x-4 lg:space-x-10'>
                        <Link href='#' className=''>
                            Home
                        </Link>
                        <Link href='#' className=''>
                            All Chains
                        </Link>
                        <Link href='#' className=''>
                            My Delegations
                        </Link>
                        <Link href='#' className=''>
                            Validators
                        </Link>
                        <Link href='#' className=''>
                            Documentation
                        </Link>
                    </nav>
                    <Button variant='outline'>Create a Hyperchain</Button>
                </div>
            </div>
        </div>
    );
}
