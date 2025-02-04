import * as React from 'react';

import { HybridTooltip, HybridTooltipContent, HybridTooltipTrigger } from '@/components/hyprid-tooltip';
import { FormLabel } from '@/components/ui/form';
import { TooltipProvider } from '@/components/ui/tooltip';

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
                <HybridTooltip delayDuration={0}>
                    <HybridTooltipTrigger type='button'>
                        <InfoIcon className='size-4' />
                    </HybridTooltipTrigger>
                    <HybridTooltipContent className='bg-black font-roboto text-sm text-white'>
                        <p>{tooltip}</p>
                    </HybridTooltipContent>
                </HybridTooltip>
            </TooltipProvider>
        </div>
    );
};
