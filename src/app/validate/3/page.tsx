'use client';

import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';

import { ValidatorNodeConfig } from '@/app/validate/types/types';
import { Button } from '@/components/ui/button';
import { NODE_DATA, VALIDATOR_STEP_1_STORAGE_KEY } from '@/lib/constants';
import { downloadYaml } from '@/lib/file';
import { clearLocalStorage, getFromLocalStorage } from '@/lib/local-storage';
import { sendGAEvent } from '@next/third-parties/google';
import { InfoIcon } from 'lucide-react';
import Link from 'next/link';


const Initiator: React.FC = () => {
    const [data, setData] = useState<ValidatorNodeConfig | undefined>();
    const [error, setError] = useState<ReactNode | undefined>();
    const fileName = 'validate.yaml';
    useEffect(() => {
        const storedData = getFromLocalStorage<ValidatorNodeConfig>(NODE_DATA);
        if (storedData) {
            setData(storedData);
            // validate data
        } else {
            setError('No data found');
        }
    }, []);

    const downloadFileAndClearCache = async () => {
        downloadYaml(fileName, data);
        clearLocalStorage([VALIDATOR_STEP_1_STORAGE_KEY]);
        clearLocalStorage([NODE_DATA]);
    };

    return (
        <div className='flex flex-row justify-between gap-20'>
            <div className='mt-11 flex flex-col md:mx-28 md:mt-20 xl:mr-0'>
                {error && (
                    <>
                        <div className='mb-4 text-2xl font-semibold md:text-4xl'>Error parsing form data</div>
                        <span className='mb-2 font-sans text-base text-muted-foreground'>{error}</span>
                        <Link className='mb-16 font-sans text-base text-pink md:mb-24' href='/validate'>Go back</Link>
                    </>
                )}
                {!error && data && (
                    <>
                        <div className='mb-4 text-2xl font-semibold md:text-4xl'>Success! Your Validator is Ready</div>
                        <span className='font-sans text-base text-muted-foreground'>
                            Use the configuration file to start your validator and participate in the proof of stake process.
                        </span>
                        <div className='mt-8 rounded-xl bg-gray-50 p-3'>
                            <div className='flex items-center'>
                                <img src='/yaml_validator_icon.svg' alt='Yaml Icon' />
                                <div className='pl-2'>
                                    <h2 className='text-lg font-semibold'>Download Your Config File</h2>
                                    <span className='font-sans text-sm text-muted-foreground'>
                                        Config YAML file contains all the parameters you’ve set is
                                    </span>
                                </div>
                                <Button
                                    data-cy='button-download'
                                    variant='default'
                                    className='ml-auto hidden w-32 md:flex'
                                    onClick={() => {
                                        sendGAEvent('event', 'button_download');
                                        downloadFileAndClearCache();
                                    }}>
                                    Download
                                </Button>
                            </div>
                            <Button
                                data-cy='button-download-mobile'
                                variant='default'
                                className='mt-2 w-full md:hidden'
                                onClick={() => {
                                    sendGAEvent('event', 'button_download');
                                    downloadFileAndClearCache();
                                }}>
                                Download
                            </Button>
                        </div>

                        <div className='mt-2 flex rounded-xl bg-pink-2 p-3'>
                            <InfoIcon size={24} className='text-pink' />
                            <span className='pl-2 font-sans text-sm text-pink'>
                                Once you download the file and leave this page, it won&#39;t be accessible again.
                            </span>
                        </div>
                        <div className='mt-8'>
                            <h3 className='text-lg font-semibold'>Next Steps</h3>
                        </div>
                        <div className='mt-4 mb-2 font-sans text-base text-black'>
                            After completing the Validator Setup flow and receiving the configuration file, the next step is to review the setup instructions. Please refer to the Validator Setup Guide for detailed steps on how to proceed and finalize your Validator.
                        </div>
                        <a className="text-pink font-sans text-base underline mb-8" href='https://hyperchains.ae/'>
                            Check the guide
                        </a>

                    </>
                )}
            </div>
            <img src='/validator_success.png' className='hidden object-contain object-top xl:block max-w-' alt='Success Screen' />
        </div>
    );
};

export default Initiator;
