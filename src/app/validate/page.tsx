import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { BetaLabel } from '@/app/(home)/HomePage';
import { AgreeButton, GetStartedButton } from '@/components/home/buttons-with-ga-event';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

const FullWidthStep: React.FC = () => {
    return (
        <div className='flex w-full flex-col items-start rounded-xl bg-primary-foreground'>
            <div className='flex flex-col md:flex-row'>
                <div className='flex w-full flex-1 flex-col p-4 md:pl-12 md:pt-12'>
                    <span className='font-roboto text-sm text-pink'>Validator</span>
                    <span className='lead text-2xl font-semibold'>Create Your Validator Config</span>
                    <span className='mt-3 font-roboto text-sm text-muted-foreground'>
                        Define the parameters, assign the Hyperchain and complete the checklist to bring your Validator
                        live
                    </span>
                </div>
                <div className='flex w-full flex-1 items-center justify-center md:justify-items-end'>
                    <Image
                        className='h-40 self-center md:ml-auto md:h-64'
                        src='validator_start.svg'
                        alt='validator start'
                        width={400}
                        height={400}
                    />
                </div>
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <div className='mb-9 mt-12 flex items-center justify-center font-clash md:mb-24 md:mt-20'>
            <div className='flex flex-col'>
                <div className='mb-4 text-4xl font-semibold'>
                    Welcome to the Validator Setup
                    <BetaLabel />
                </div>
                <div className='mb-10 font-roboto text-muted-foreground'>
                    Want to participate in a Hyperchains network? Follow these simple steps to set up your validator!
                </div>
                <div className='mb-14 flex flex-col gap-2 md:flex-row md:gap-6'>
                    <FullWidthStep />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <GetStartedButton />
                    </DialogTrigger>
                    <DialogContent className='max-w-[425px] font-sans'>
                        <DialogHeader>
                            <DialogTitle className='font-clash text-2xl'>We&#39;re in Beta Mode</DialogTitle>
                            <DialogDescription>
                                Hyperchains is currently in Beta Mode, intended solely for testing.
                                <br />
                                <br />
                                Stable Version 1.0 with enhanced reliability will soon be released, allowing users to
                                transfer value onto the chain.
                                <br />
                                <br />
                                Users are cautioned against any transfer of value to a Hyperchain until the official
                                release due to potential for instability. Said transfers shall be the sole
                                responsibility of any relevant user. We shall bear no liability in case of loss value by
                                the users.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Link href='/validate/1' className='w-fit'>
                                <AgreeButton />
                            </Link>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

const Page = () => {
    return <HomePage />;
};

export default Page;
