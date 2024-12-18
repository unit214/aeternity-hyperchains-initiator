import * as React from 'react';

export interface FooterSectionProps {
    title: string;
    links: { label: string; url: string }[];
}

export const FooterSection: React.FC<FooterSectionProps> = ({ title, links }) => {
    return (
        <div className='flex w-1/2 flex-col pr-8 pt-8 md:w-auto md:pt-0'>
            <div className='w-full whitespace-nowrap text-neutral-500'>{title}</div>
            <div className='mt-3 flex w-full flex-col items-start text-white'>
                {links.map((link, index) => (
                    <div key={index} className={index > 0 ? 'mt-2' : ''}>
                        <a href={link.url} className='hover:underline' target='_blank' rel='noopener noreferrer'>
                            {link.label}
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const LogoSection: React.FC = () => {
    return (
        <div className='z-0 flex w-64 flex-col items-start text-neutral-500'>
            <img loading='lazy' src='/hyperchains_logo_white.svg' alt='HC Logo' className='max-w-full object-contain' />
            <div className='mt-3 w-full self-stretch leading-6'>
                æternity's long-awaited hyperchains technology is a quantum leap for Web3
            </div>
            <div className='mt-3 flex max-w-full flex-col leading-loose'>
                <div>Powered by</div>
                <img loading='lazy' src='/aeternity_logo.svg' alt='Powered by logo' className='w-full object-contain' />
            </div>
        </div>
    );
};

const footerSections = [
    {
        title: 'MAIN',
        links: [
            { label: 'Home', url: 'https://example.com' },
            { label: 'All Chains', url: 'https://example.com' },
            { label: 'Create a Hyperchain', url: 'https://example.com' }
        ]
    },
    {
        title: 'INITIATOR',
        links: [
            { label: 'Create a Hyperchain', url: 'https://example.com' },
            { label: 'Documentation', url: 'https://example.com' },
            { label: 'Running a chain', url: 'https://example.com' }
        ]
    },
    {
        title: 'DELEGATOR',
        links: [
            { label: 'My Delegations', url: 'https://example.com' },
            { label: 'Connect Wallet', url: 'https://example.com' }
        ]
    },
    {
        title: 'VALIDATOR',
        links: [
            { label: 'Validators', url: 'https://example.com' },
            { label: 'Running a chain', url: 'https://example.com' }
        ]
    },
    {
        title: 'LEGAL',
        links: [
            { label: 'Terms of services', url: 'https://example.com' },
            { label: 'Privacy policy', url: 'https://example.com' }
        ]
    }
];

export const Footer: React.FC = () => {
    return (
        <div className='flex flex-col justify-center bg-neutral-800 px-20 text-sm max-md:px-5'>
            <div className='flex w-full flex-col justify-center px-8 py-10 max-md:max-w-full max-md:px-5'>
                <div className='relative flex w-full flex-col items-start max-md:max-w-full md:flex-row'>
                    <LogoSection />
                    <div className='z-0 flex min-w-[240px] flex-1 shrink basis-0 flex-col leading-loose max-md:max-w-full'>
                        <div className='flex w-full flex-wrap items-start justify-start pl-0 max-md:max-w-full md:pl-20'>
                            {footerSections.map((section, index) => (
                                <FooterSection key={index} title={section.title} links={section.links} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className='w-full text-right text-neutral-500'>
                    Copyright © {new Date().getFullYear()} - All rights reserved
                </div>
            </div>
        </div>
    );
};
