import React from 'react';

import { InitiatorStep } from '@/components/initiator-step';
import { InitiatorStep3Form } from '@/components/initiator/initiator-step-3-form';

const Initiate3Page: React.FC = () => {
    return (
        <div className='my-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Token Economics'
                stepNumber={3}
                description='Establish the rules for validators on your child chain to ensure network security and efficiency.'
                form={<InitiatorStep3Form />}
            />
        </div>
    );
};

export default Initiate3Page;
