import * as React from 'react';

import Link from 'next/link';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export const FAQ: React.FC = () => {
    return (
        <div className='flex w-full flex-col items-center justify-center bg-stone-50 py-16 text-neutral-800 max-md:px-5'>
            <div className='flex w-full max-w-screen-2xl flex-col flex-wrap items-start gap-10 px-32 max-md:px-5 md:flex-row'>
                <div className='pt-4 text-4xl font-semibold leading-none'>FAQ</div>
                <Accordion type='single' collapsible className='w-full flex-1'>
                    <AccordionItem value='item-1'>
                        <AccordionTrigger>What is a Hyperchain?</AccordionTrigger>
                        <AccordionContent className='font-sans text-grey-6'>
                            A Hyperchain is a fast, efficient blockchain that anchors its security to an established
                            blockchain (called a pinning chain) to provide both high performance and strong security
                            guarantees.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>What are the main benefits of using a Hyperchain?</AccordionTrigger>
                        <AccordionContent className='font-sans text-grey-6'>
                            Hyperchains offer fast transactions, strong security, and energy efficiency while keeping
                            operational costs low by leveraging existing blockchain infrastructure.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-3'>
                        <AccordionTrigger>How can I start using Hyperchains?</AccordionTrigger>
                        <AccordionContent className='font-sans text-grey-6'>
                            You can easily launch your own Hyperchain through our web app. Future versions will let you
                            join an existing Hyperchain network as a validator or delegator.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-4'>
                        <AccordionTrigger>What should I do after generating config files?</AccordionTrigger>
                        <AccordionContent className='font-sans text-grey-6'>
                            After generating configs, install required software, deploy your node, set up monitoring,
                            and verify network connectivity before starting node operations. See the detailed How-To
                            Guide{' '}
                            <Link
                                className='text-pink underline'
                                href='https://hyperchains.ae/how-to'
                                target='_blank'
                                rel='noopener noreferrer'>
                                here
                            </Link>
                            .
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
};
