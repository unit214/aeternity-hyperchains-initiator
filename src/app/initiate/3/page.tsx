import React from 'react';

import Link from 'next/link';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';

const Form: React.FC = () => {
    return (
        <>
            <div className='flex flex-row gap-4 self-center'>
                <Link href='/initiate/2'>
                    <Button variant='outline' className='w-24'>
                        Back
                    </Button>
                </Link>
                <Link href='/initiate/4'>
                    <Button variant='default' className='w-24'>
                        Next
                    </Button>
                </Link>
            </div>
        </>
    );
};

const Initiate1Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Token Economics'
                stepNumber={3}
                description='Establish the rules for validators on your child chain to ensure network security and efficiency.'
                form={<Form />}
            />
        </div>
    );
};

export default Initiate1Page;
