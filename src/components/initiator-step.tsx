import * as React from 'react';
import { ReactElement } from 'react';

interface InitiatorStepProps {
    title: string;
    stepNumber: number;
    description: string;
    form: ReactElement;
}

export const InitiatorStep: React.FC<InitiatorStepProps> = ({ title, stepNumber, description, form }) => {
    return (
        <div className='mb-9 mt-12 flex w-[810px] flex-col md:my-20'>
            <div className='flex flex-row justify-between gap-7 md:mb-12'>
                <div className='flex flex-col'>
                    <div className='mb-4 text-4xl font-semibold'>{title}</div>
                    <span className='hidden font-roboto text-sm text-muted-foreground'>{description}</span>
                </div>
                <div className='text-4xl font-normal'>
                    <span>{stepNumber}</span>
                    <span className='text-grey-3'>/4</span>
                </div>
            </div>
            <span className='mb-12 font-roboto text-sm text-muted-foreground md:hidden'>{description}</span>
            {form}
        </div>
    );
};
