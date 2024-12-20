import React from 'react';

import { InitiatorStep } from '@/components/initiator-step';
import { InitiatorStep1Form } from '@/components/initiator/initiator-step-1-form';

const Initiate1Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Configure Your Hyperchain'
                stepNumber={1}
                description='Define the operational parameters for your hyperchain, including block timings and network identifiers.'
                form={<InitiatorStep1Form />}
            />
        </div>
    );
};

export default Initiate1Page;
