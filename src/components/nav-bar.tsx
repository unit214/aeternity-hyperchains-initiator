import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function NavBar() {
    return (
        <div className='flex flex-col md:flex'>
            <div className='border-b'>
                <div className='flex h-16 items-center justify-between md:px-10'>
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
                        <Link href='/' className=''>
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
                    <Button className='hidden md:flex' variant='outline'>
                        Create a Hyperchain
                    </Button>
                </div>
            </div>
        </div>
    );
}
