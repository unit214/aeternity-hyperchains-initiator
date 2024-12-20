import React from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

interface StepProps {
    stepNumber: number;
    title: string;
    description: string;
    imageSrc: string;
    alt: string;
}

const Step: React.FC<StepProps> = ({ stepNumber, title, description, imageSrc, alt }) => {
    return (
        <div className='flex w-64 flex-col items-start rounded-xl bg-primary-foreground p-4'>
            <Image className='h-40 self-center' src={imageSrc} alt={alt} width={222} height={154} />
            <span className='font-roboto text-sm text-pink'>Step {stepNumber}</span>
            <span className='lead text-2xl font-semibold'>{title}</span>
            <span className='font-roboto text-sm text-muted-foreground'>{description}</span>
        </div>
    );
};

const HomePage: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center font-clash'>
            <div className='flex flex-col'>
                <div className='mb-4 text-4xl font-semibold'>Welcome to Your Chain Builder</div>
                <div className='mb-10 font-roboto text-muted-foreground'>
                    Ready to create your own blockchain? With just a few onboarding steps, you will receive your chain
                </div>
                <div className='mb-14 flex gap-6'>
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
                <Link href='/initiate/1' className='mb-28 w-fit self-center'>
                    <Button variant='default'>Start Build Chain</Button>
                </Link>
            </div>
        </div>
    );
};

export default HomePage;
