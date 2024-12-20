import React from 'react';

import Link from 'next/link';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';

const Form: React.FC = () => {
    return (
        <>
            <div className='flex flex-row gap-4 self-center'>
                <Link href='/initiate/1'>
                    <Button variant='outline' className='w-24'>
                        Back
                    </Button>
                </Link>
                <Link href='/initiate/3'>
                    <Button variant='default' className='w-24'>
                        Next
                    </Button>
                </Link>
            </div>
        </>
    );
};

const Initiate2Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Up Your Pinning Chain'
                stepNumber={2}
                description='Define the key parameters for connecting your hyperchain to the pinning chain. These settings establish the foundation of your network’s relationship with the pinning chain.'
                form={<Form />}
            />
        </div>
    );
};

export default Initiate2Page;
