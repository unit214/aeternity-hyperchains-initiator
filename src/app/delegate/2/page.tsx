'use client';

import Image from 'next/image';
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
            <div className='grid gap-4 md:grid-cols-2'>
                <div>
                    <h3 className='font-clash text-lg font-medium'>Step 1</h3>
                    <p className='mt-3 font-roboto'>Open Superhero Wallet and click on the current network name</p>
                </div>
                <Image src='/add_network_1.png' alt='add_network_1' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 2</h3>
                    <p className='mt-3 font-roboto'>
                        Click <strong>More</strong> to manage networks
                    </p>
                </div>
                <Image src='/add_network_2.png' alt='add_network_2' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 3</h3>
                    <p className='mt-3 font-roboto'>
                        Click <strong>Add custom network</strong>
                    </p>
                </div>
                <Image src='/add_network_3.png' alt='add_network_3' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 4</h3>
                    <p className='mt-3 font-roboto'>
                        Enter network name and scroll down to the <strong>æternity</strong> section
                    </p>
                </div>
                <Image src='/add_network_4.png' alt='add_network_4' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 5</h3>
                    <p className='mt-3 font-roboto'>
                        Fill in <strong>Network URL</strong>, <strong>Network middleware</strong>,{' '}
                        <strong>Tipping backend</strong>, <strong>Explorer</strong>.<br />
                        If the network does not support tipping backend or explorer just leave the default values.
                        <br />
                        Verify if all the data is correct and click <strong>Add network</strong>
                    </p>
                </div>
                <Image src='/add_network_5.png' alt='add_network_5' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 6</h3>
                    <p className='mt-3 font-roboto'>
                        Once the network is added click on the <strong>X</strong> to go the main view
                    </p>
                </div>
                <Image src='/add_network_6.png' alt='add_network_6' width={300} height={500} />
                <div>
                    <h3 className='mt-6 font-clash text-lg font-medium'>Step 7</h3>
                    <p className='mt-3 font-roboto'>
                        If you see the name of the network with a green dot, then you have connected your Superhero
                        wallet successfuly and you can proceed with the delegation process.
                    </p>
                </div>
                <Image src='/add_network_7.png' alt='add_network_7' width={300} height={500} />
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
