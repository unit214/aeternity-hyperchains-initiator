import * as React from 'react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export interface FAQItemProps {
    question: string;
    iconSrc: string;
}

export interface FAQListProps {
    items: FAQItemProps[];
}
export const FAQItem: React.FC<FAQItemProps> = ({ question }) => {
    return (
        <>
            <div className='flex w-full flex-wrap items-center justify-between gap-10 max-md:max-w-full'>
                <div className='my-auto min-w-[240px] self-stretch'>{question}</div>
                <span className='my-auto aspect-square w-6 cursor-pointer text-4xl font-normal'>+</span>
            </div>
            <div className='mt-5 max-w-full self-end border-t'></div>
        </>
    );
};
export const FAQList: React.FC<FAQListProps> = ({ items }) => {
    return (
        <div className='flex min-w-[240px] flex-1 shrink basis-0 flex-col text-lg font-medium leading-none max-md:max-w-full'>
            {items.map((item, index) => (
                <div key={index} className='mt-5 first:mt-0'>
                    <FAQItem question={item.question} iconSrc={item.iconSrc} />
                </div>
            ))}
        </div>
    );
};

const faqItems: FAQItemProps[] = [
    {
        question: 'What are the hardware requirements?',
        iconSrc:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/3755ba18787f15b97813e1db7ee026bbb2edf07283769ef5ce9b13dcece63f36?placeholderIfAbsent=true&apiKey=93d96d41fa4e473b9b2c8dacbe6d22b6'
    },
    {
        question: 'How does hyperchain token economy work?',
        iconSrc:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/3755ba18787f15b97813e1db7ee026bbb2edf07283769ef5ce9b13dcece63f36?placeholderIfAbsent=true&apiKey=93d96d41fa4e473b9b2c8dacbe6d22b6'
    },
    {
        question: 'Is there a risk of attack with dPoW?',
        iconSrc:
            'https://cdn.builder.io/api/v1/image/assets/TEMP/3755ba18787f15b97813e1db7ee026bbb2edf07283769ef5ce9b13dcece63f36?placeholderIfAbsent=true&apiKey=93d96d41fa4e473b9b2c8dacbe6d22b6'
    }
];

export const FAQ: React.FC = () => {
    return (
        <div className='flex flex-col justify-center bg-stone-50 px-32 py-16 text-neutral-800 max-md:px-5 lg:px-52'>
            <div className='flex max-w-full flex-col flex-wrap items-start gap-10 md:flex-row'>
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
