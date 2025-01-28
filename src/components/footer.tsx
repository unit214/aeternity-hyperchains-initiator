import * as React from 'react';

import Link from 'next/link';

export interface FooterSectionProps {
    title: string;
    links: { label: string; url: string }[];
}

export const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
    return (
        <div className='flex w-1/2 flex-col md:w-auto'>
            <div className='w-full whitespace-nowrap text-grey-5'>{title}</div>
            <div className='mt-3 flex w-full flex-col items-start text-white'>
                {links.map((link, index) => {
                    const linkProps = link.url.startsWith('/') ? {} : { target: '_blank', rel: 'noopener noreferrer' };

                    return (
                        <div key={index} className={index > 0 ? 'mt-2' : ''}>
                            <a href={link.url} className='hover:underline' {...linkProps}>
                                {link.label}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export const LogoSection: React.FC = () => {
    return (
        <div className='z-0 flex w-64 flex-col items-start text-grey-5'>
            <Link href='https://hyperchains.ae' target='_blank' rel='noopener noreferrer'>
                <img
                    loading='lazy'
                    src='/hyperchains_logo_white.svg'
                    alt='HC Logo'
                    className='max-w-full object-contain'
                />
            </Link>
            <div className='mt-3 w-full self-stretch leading-6'>
                æternity&apos;s long-awaited hyperchains technology is a quantum leap for Web3
            </div>
            <div className='mt-3 flex max-w-full flex-col leading-loose'>
                <div>Powered by</div>
                <Link href='https://aeternity.com' target='_blank' rel='noopener noreferrer'>
                    <img
                        loading='lazy'
                        src='/aeternity_logo.svg'
                        alt='Powered by logo'
                        className='w-full object-contain'
                    />
                </Link>
            </div>
        </div>
    );
};

const footerSections = [
    {
        title: 'MAIN',
        links: [
            { label: 'Home', url: 'https://hyperchains.ae' },
            { label: 'Create a Hyperchain', url: '/', isInternalLink: true },
            { label: 'FAQs', url: 'https://hyperchains.ae/faqs' }
        ]
    },
    {
        title: 'INITIATOR',
        links: [
            { label: 'Create a Hyperchain', url: '/', isInternalLink: true },
            { label: 'How to start', url: 'https://hyperchains.ae/how-to' },
            { label: 'Documentation', url: 'https://hyperchains.ae/faqs' }
        ]
    },
    {
        title: 'LEGAL',
        links: [
            { label: 'Terms of services', url: 'https://example.com' },
            { label: 'Privacy policy', url: '/privacy-policy' }
        ]
    }
];

export const Footer: React.FC = () => {
    return (
        <div className='flex flex-col items-center justify-center bg-black-1 px-5 py-12 font-sans text-sm md:px-20 md:pt-24'>
            <div className='flex w-full max-w-full flex-col max-md:gap-12 md:max-w-screen-2xl'>
                <div className='flex w-full flex-col items-start gap-y-12 md:flex-row md:justify-between'>
                    <LogoSection />
                    <div className='flex flex-wrap justify-start gap-y-8 pl-0 md:gap-x-12 md:pl-20'>
                        {footerSections.map((section, index) => (
                            <FooterSection key={index} title={section.title} links={section.links} />
                        ))}
                    </div>
                </div>
                <div className='w-full text-center text-grey-5 md:text-right'>
                    Copyright © {new Date().getFullYear()} - All rights reserved
                </div>
            </div>
        </div>
    );
};
