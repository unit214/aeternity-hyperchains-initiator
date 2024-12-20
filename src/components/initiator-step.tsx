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
        <div className='flex w-[810px] flex-col'>
            <div className='mb-12 flex flex-row justify-between gap-7'>
                <div className='flex flex-col'>
                    <div className='mb-4 text-4xl font-semibold'>{title}</div>
                    <span className='font-roboto text-sm text-muted-foreground'>{description}</span>
                </div>
                <div className='text-4xl font-normal'>
                    <span>{stepNumber}</span>
                    <span className='text-grey-3'>/4</span>
                </div>
            </div>
            {form}
        </div>
    );
};
