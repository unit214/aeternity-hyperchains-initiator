import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQ: React.FC = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center bg-stone-50 py-16 text-neutral-800 max-md:px-5'>
            <div className='flex w-full max-w-screen-2xl flex-col flex-wrap items-start gap-10 px-32 max-md:px-5 md:flex-row'>
                <div className='pt-4 text-4xl font-semibold leading-none'>FAQ</div>
                <Accordion type='single' collapsible className='w-full flex-1'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>What are the hardware requirements?</AccordionTrigger>
                        <AccordionContent>This is some content.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>How does hyperchain token economy work?</AccordionTrigger>
                        <AccordionContent>This is some content.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                        <AccordionTrigger>Is there a risk of attack with dPoW?</AccordionTrigger>
                        <AccordionContent>This is some content.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
