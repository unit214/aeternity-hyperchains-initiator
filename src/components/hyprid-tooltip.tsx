'use client';

import * as React from 'react';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const TouchContext = createContext<boolean | undefined>(undefined);
const useTouch = () => useContext(TouchContext);

export const TouchProvider = (props: PropsWithChildren) => {
    const [isTouch, setTouch] = useState<boolean>();

    useEffect(() => {
        setTouch(window.matchMedia('(pointer: coarse)').matches);
    }, []);

    return <TouchContext.Provider value={isTouch} {...props} />;
};

export const HybridTooltip = (props: React.ComponentProps<typeof Tooltip> & React.ComponentProps<typeof Popover>) => {
    const isTouch = useTouch();

    return isTouch ? <Popover {...props} /> : <Tooltip {...props} />;
};

export const HybridTooltipTrigger = (
    props: React.ComponentProps<typeof TooltipTrigger> & React.ComponentProps<typeof PopoverTrigger>
) => {
    const isTouch = useTouch();

    return isTouch ? <PopoverTrigger {...props} /> : <TooltipTrigger {...props} />;
};

export const HybridTooltipContent = (
    props: React.ComponentProps<typeof TooltipContent> & React.ComponentProps<typeof PopoverContent>
) => {
    const isTouch = useTouch();

    return isTouch ? <PopoverContent {...props} /> : <TooltipContent {...props}></TooltipContent>;
};
