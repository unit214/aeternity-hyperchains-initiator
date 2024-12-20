import * as React from 'react';

import { FormLabel } from '@/components/ui/form';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { InfoIcon } from 'lucide-react';

interface InfoTooltipProps {
    label: string;
    tooltip: string;
}

export const FormLabelWithTooltip: React.FC<InfoTooltipProps> = ({ label, tooltip }) => {
    return (
        <div className='flex flex-row gap-2'>
            <FormLabel className='font-clash'>{label}</FormLabel>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <InfoIcon className='size-4' />
                    </TooltipTrigger>
                    <TooltipContent className='font-roboto'>
                        <p>{tooltip}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};
