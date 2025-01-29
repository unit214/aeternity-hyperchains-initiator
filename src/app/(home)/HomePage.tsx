import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from '@/components/ui/dialog';

const BetaLabel: React.FC = () => {
    return (
        <span className='inline-flex align-middle'>
            <div className='ml-2 rounded-lg bg-violet-2 px-2.5 py-1 text-lg font-medium uppercase text-white md:ml-4'>
                beta
            </div>
        </span>
    );
};

interface StepProps {
    stepNumber: number;
    title: string;
    description: string;
    imageSrc: string;
    alt: string;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description, imageSrc, alt }) => {
    return (
        <div className='flex w-full flex-col items-start rounded-xl bg-primary-foreground p-4 md:w-64'>
            <div className='hidden flex-col md:flex'>
                <Image className='h-40 self-center' src={imageSrc} alt={alt} width={222} height={154} />
                <span className='font-roboto text-sm text-pink'>Step {stepNumber}</span>
                <span className='lead text-2xl font-semibold'>{title}</span>
            </div>
            <div className='flex flex-row md:hidden'>
                <div className='flex flex-col'>
                    <span className='font-roboto text-sm text-pink'>Step {stepNumber}</span>
                    <span className='lead text-2xl font-semibold'>{title}</span>
                </div>
                <Image className='h-24 self-center' src={imageSrc} alt={alt} width={222} height={154} />
            </div>
            <span className='mt-3 font-roboto text-sm text-muted-foreground'>{description}</span>
        </div>
    );
};

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
                        title='Generate Your Custom Chain'
                        description='Define the parameters, security, and functionality of your new chain.'
                        imageSrc='/home_illustration_1.png'
                        alt='Home illustration 1'
                    />
                    <Step
                        stepNumber={2}
                        title='Download Your Config File'
                        description='Instantly receive the configuration file tailored for your chain setup.'
                        imageSrc='/home_illustration_2.png'
                        alt='Home illustration 2'
                    />
                    <Step
                        stepNumber={3}
                        title='Start Running Your Chain'
                        description='Launch your chain and take the first step towards decentralization.'
                        imageSrc='/home_illustration_3.png'
                        alt='Home illustration 3'
                    />
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button className='w-fit self-center' variant='default'>
                            Get Started
                        </Button>
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
                            <Link href='/initiate/1' className='w-fit'>
                                <Button type='submit'>Agree &amp; Continue</Button>
                            </Link>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default HomePage;
