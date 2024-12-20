import React from 'react';

import Link from 'next/link';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';

const Form: React.FC = () => {
    return (
        <>
            <div className='flex flex-row gap-4 self-center'>
                <Link href='/'>
                    <Button variant='outline' className='w-24'>
                        Back
                    </Button>
                </Link>
                <Link href='/initiate/2'>
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
                title='Configure Your Hyperchain'
                stepNumber={1}
                description='Define the operational parameters for your hyperchain, including block timings and network identifiers.'
                form={<Form />}
            />
        </div>
    );
};

export default Initiate1Page;
