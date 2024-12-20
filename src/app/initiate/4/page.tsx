import React from 'react';

import Link from 'next/link';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';

const Form: React.FC = () => {
    return (
        <>
            <div className='flex flex-row gap-4 self-center'>
                <Link href='/initiate/3'>
                    <Button variant='outline' className='w-24'>
                        Back
                    </Button>
                </Link>
                <Button variant='default' className='w-24'>
                    Finish
                </Button>
            </div>
        </>
    );
};

const Initiate1Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Validator Requirements'
                stepNumber={4}
                description='Establish the rules for validators on your hyperchain to ensure network security and efficiency.'
                form={<Form />}
            />
        </div>
    );
};

export default Initiate1Page;
