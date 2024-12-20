import React from 'react';

import { InitiatorStep } from '@/components/initiator-step';
import { InitiatorStep4Form } from '@/components/initiator/initiator-step-4-form';

const Initiate4Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Validator Requirements'
                stepNumber={4}
                description='Establish the rules for validators on your hyperchain to ensure network security and efficiency.'
                form={<InitiatorStep4Form />}
            />
        </div>
    );
};

export default Initiate4Page;
