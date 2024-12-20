import React from 'react';

import { InitiatorStep } from '@/components/initiator-step';
import { InitiatorStep2Form } from '@/components/initiator/initiator-step-2-form';

const Initiate2Page: React.FC = () => {
    return (
        <div className='my-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Up Your Pinning Chain'
                stepNumber={2}
                description='Define the key parameters for connecting your hyperchain to the pinning chain. These settings establish the foundation of your network’s relationship with the pinning chain.'
                form={<InitiatorStep2Form />}
            />
        </div>
    );
};

export default Initiate2Page;
