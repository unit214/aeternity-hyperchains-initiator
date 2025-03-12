import React from 'react';

import Link from 'next/link';

import { BetaLabel, Step } from '@/app/(home)/HomePage';
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

const HomePage: React.FC = () => {
    return (
        <div className='mb-9 mt-12 flex items-center justify-center font-clash md:mb-24 md:mt-20'>
            <div className='flex flex-col'>
                <div className='mb-4 text-4xl font-semibold'>
                    Welcome to Your Chain Builder
                    <BetaLabel />
                </div>
                <div className='mb-10 font-roboto text-muted-foreground'>
                    Ready to create your custom Hyperchain? Use this chain builder to do it in just a few steps.
                </div>
                <div className='mb-14 flex flex-col gap-2 md:flex-row md:gap-6'>
                    <Step
                        stepNumber={1}
                        title='Enter Your Hyperchain Details'
                        description='Input the node URL and middleware URL.'
                        imageSrc='/home_illustration_1.png'
                        alt='Home illustration 1'
                    />
                    <Step
                        stepNumber={2}
                        title='Download Your Config File'
                        description='Instantly receive the configuration file tailored for your validator node.'
                        imageSrc='/home_validator_2.svg'
                        alt='Home illustration 2'
                    />
                    <Step
                        stepNumber={3}
                        title='Start Running Your Validator'
                        description='Take the first step towards decentralization.'
                        imageSrc='/home_illustration_3.png'
                        alt='Home illustration 3'
                    />
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
