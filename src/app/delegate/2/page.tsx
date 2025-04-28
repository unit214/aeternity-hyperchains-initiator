'use client';

import { useRouter } from 'next/navigation';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';

const InitiatorForm: React.FC = () => {
    const router = useRouter();

    function onBack() {
        router.push('/delegate/1');
    }

    function onNext() {
        router.push('/delegate/3');
    }

    return (
        <div className='flex flex-col justify-between gap-10 md:gap-36'>
            <div>
                <h3 className='font-clash text-lg font-medium'>Step 1</h3>
                <p className='mt-3 font-roboto'>Open Superhero Wallet</p>
                <h3 className='mt-6 font-clash text-lg font-medium'>Step 2</h3>
                <p className='mt-3 font-roboto'>Enter network details</p>
                <h3 className='mt-6 font-clash text-lg font-medium'>Step 3</h3>
                <p className='mt-3 font-roboto'>Connect to network</p>
            </div>
            <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                    Back
                </Button>
                <Button data-cy='button-next' variant='default' className='w-full md:w-24' onClick={onNext}>
                    Next
                </Button>
            </div>
        </div>
    );
};

const Delegate2Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Configure Your Wallet Network'
                step={2}
                totalSteps={3}
                description='Make sure the hyperchain is added to Super Hero Wallet'
                form={<InitiatorForm />}
            />
        </div>
    );
};

export default Delegate2Page;
