'use client';

import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';

import Link from 'next/link';

import { Code } from '@/components/code';
import { Button } from '@/components/ui/button';
import {
    INITIATOR_STEP_1_STORAGE_KEY,
    INITIATOR_STEP_2_STORAGE_KEY,
    INITIATOR_STEP_3_STORAGE_KEY,
    INITIATOR_STEP_4_STORAGE_KEY,
    Step
} from '@/lib/constants';
import {
    FormValues,
    Step1FormValues,
    Step2FormValues,
    Step3FormValues,
    Step4FormValues,
    formSchema
} from '@/lib/form-schema';
import { getFromLocalStorage } from '@/lib/local-storage';

import { InfoIcon } from 'lucide-react';
import YAML from 'yaml';
import { ZodError } from 'zod';

const InitiatorStep5Form: React.FC = () => {
    const [formData, setFormData] = useState<FormValues | undefined>();
    const [error, setError] = useState<ReactNode | undefined>();

    useEffect(() => {
        const step1Data = getFromLocalStorage<Step1FormValues>(INITIATOR_STEP_1_STORAGE_KEY);
        const step2Data = getFromLocalStorage<Step2FormValues>(INITIATOR_STEP_2_STORAGE_KEY);
        const step3Data = getFromLocalStorage<Step3FormValues>(INITIATOR_STEP_3_STORAGE_KEY);
        const step4Data = getFromLocalStorage<Step4FormValues>(INITIATOR_STEP_4_STORAGE_KEY);
        try {
            const form = formSchema.parse({
                ...step1Data,
                ...step2Data,
                ...step3Data,
                ...step4Data
            });
            setFormData(form);
        } catch (e) {
            const message = (e as ZodError).errors?.at(0)?.message || (e as Error).message;
            if (Object.values(Step).includes(message as Step)) {
                setError(
                    <span>
                        Go back to{' '}
                        <Link className='text-pink underline' href={`/initiate/${message}`}>
                            Step {message}
                        </Link>{' '}
                        to fix the problem.
                    </span>
                );
            } else {
                setError(
                    <span>
                        <Link className='text-pink underline' href={`/initiate/1`}>
                            Restart the flow
                        </Link>{' '}
                        to fix the problem.
                    </span>
                );
            }
        }
    }, []);

    const createAndDownloadYamlFile = async () => {
        const content = YAML.stringify(formData);
        const file = new Blob([content], { type: 'text/plain' });
        const element = document.createElement('a');
        element.href = URL.createObjectURL(file);
        element.download = 'init.yaml';
        document.body.appendChild(element); // Required for Firefox
        element.click();
        document.body.removeChild(element); // Clean up
        localStorage.removeItem(INITIATOR_STEP_1_STORAGE_KEY);
        localStorage.removeItem(INITIATOR_STEP_2_STORAGE_KEY);
        localStorage.removeItem(INITIATOR_STEP_3_STORAGE_KEY);
        localStorage.removeItem(INITIATOR_STEP_4_STORAGE_KEY);
    };

    return (
        <div className='flex flex-row justify-between gap-20'>
            <div className='mt-11 flex flex-col md:mx-28 md:mt-20 xl:mr-0'>
                {error && (
                    <>
                        <div className='mb-4 text-2xl font-semibold md:text-4xl'>Error parsing form data</div>
                        <span className='mb-16 font-sans text-base text-muted-foreground md:mb-24'>{error}</span>
                    </>
                )}
                {!error && formData && (
                    <>
                        <div className='mb-4 text-2xl font-semibold md:text-4xl'>Success! Your Chain is Ready</div>
                        <span className='font-sans text-base text-muted-foreground'>
                            Start your chain and take it live or Save your chain configuration as a JSON file for future
                            use
                        </span>
                        <div className='mt-8 rounded-xl bg-gray-50 p-3'>
                            <div className='flex items-center'>
                                <img src='/yaml_icon.svg' alt='Yaml Icon' />
                                <div className='pl-2'>
                                    <h2 className='text-lg font-semibold'>Download Your Config File</h2>
                                    <span className='font-sans text-sm text-muted-foreground'>
                                        Config YAML file contains all the parameters you’ve set is
                                    </span>
                                </div>
                                <Button
                                    variant='default'
                                    className='ml-auto hidden w-32 md:flex'
                                    onClick={createAndDownloadYamlFile}>
                                    Download
                                </Button>
                            </div>
                            <Button
                                variant='default'
                                className='mt-2 w-full md:hidden'
                                onClick={createAndDownloadYamlFile}>
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
                        <ol className='mb-16 mt-6 list-decimal space-y-8 pl-4 font-sans marker:font-sans marker:font-semibold md:mb-24'>
                            <li className='space-y-2'>
                                <span className='font-semibold'>Prepare Your Environment</span>
                                <ul className='list-disc space-y-2'>
                                    <li>
                                        Make sure you have{' '}
                                        <Link
                                            className='text-pink underline'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href='https://nodejs.org/en/download'>
                                            Node.js
                                        </Link>{' '}
                                        installed.
                                    </li>
                                    <li>
                                        Make sure you have{' '}
                                        <Link
                                            className='text-pink underline'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href='https://git-scm.com/downloads'>
                                            Git
                                        </Link>{' '}
                                        installed.
                                    </li>
                                    <li>
                                        Make sure you have{' '}
                                        <Link
                                            className='text-pink underline'
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            href='https://www.docker.com/'>
                                            Docker
                                        </Link>{' '}
                                        installed.
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-2'>
                                <span className='font-semibold'>Install the Hyperchains Starter Kit</span>
                                <ul className='list-disc space-y-2'>
                                    <li>
                                        <Code>git clone https://github.com/aeternity/hyperchain-starter-kit</Code>
                                    </li>
                                    <li>
                                        <Code>cd hyperchain-starter-kit</Code>
                                    </li>
                                    <li>
                                        <Code>npm install </Code>
                                    </li>
                                    <li>
                                        <Code>mkdir {formData.networkId}</Code>
                                    </li>
                                    <li>
                                        Copy the downloaded <Code>init.yaml</Code> to <Code>/{formData.networkId}</Code>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-2'>
                                <span className='font-semibold'>Setup Contracts & Generate Economy</span>
                                <ul className='list-disc space-y-2'>
                                    <li>
                                        Setup the contracts by running:
                                        <br />
                                        <Code>npm run dev retrieve-contracts {formData.networkId}</Code>
                                    </li>
                                    <li>
                                        Generate the economy by running:
                                        <br />
                                        <Code>npm run dev gen-economy {formData.networkId}</Code>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-2'>
                                <span className='font-semibold'>Generate Configuration Files & Run Node</span>
                                <ul className='space-y-6'>
                                    <li>
                                        Generate the node configuration files by running:
                                        <br />
                                        <Code>npm run dev gen-node-conf {formData.networkId}</Code>
                                    </li>
                                    <li className='space-y-2'>
                                        This will create 3 files in <Code>nodeConfig</Code> directory:
                                        <ul className='list-disc space-y-2 pl-6'>
                                            <li>
                                                <Code>aeternity.yaml</Code>
                                            </li>
                                            <li>
                                                <Code>{formData.networkId}_accounts.json</Code>
                                            </li>
                                            <li>
                                                <Code>{formData.networkId}_contracts.json</Code>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        Then run your node:
                                        <br />
                                        <Code>
                                            docker run -p 3013:3013 {'\\'}
                                            <br />
                                            -v ${'{PWD}'}/{formData.networkId}
                                            /nodeConfig/aeternity.yaml:/home/aeternity/.aeternity/aeternity/aeternity.yaml{' '}
                                            {'\\'}
                                            <br />
                                            -v ${'{PWD}'}/{formData.networkId}/nodeConfig/{formData.networkId}
                                            _accounts.json:/home/aeternity/node/data/aecore/{formData.networkId}
                                            _accounts.json {'\\'}
                                            <br />
                                            -v ${'{PWD}'}/{formData.networkId}/nodeConfig/{formData.networkId}
                                            _contracts.json:/home/aeternity/node/data/aecore/{formData.networkId}
                                            _contracts.json {'\\'}
                                            <br />
                                            aeternity/aeternity:v7.3.0-rc3
                                        </Code>
                                    </li>
                                    <li>
                                        IMPORTANT: If you used a known public chain (testnet or mainnet) as parent
                                        chain, the tool will set the start_height as current block + 10, that is 30
                                        minutes in future. Keep that in mind when verifying your chain, either decrease
                                        the number or wait until that block is produced on the parent chain before you
                                        start transacting on the Hyperchain.
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-2'>
                                <span className='font-semibold'>Verify Node Status</span>
                                <ul className='space-y-2'>
                                    <li>
                                        Verify your node is running with:
                                        <br />
                                        <Code>curl -s localhost:3013/v3/status | jq</Code>
                                    </li>
                                </ul>
                            </li>
                            <li className='list-none'>
                                <Link
                                    className='text-pink underline'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    href='https://docs.aeternity.io/en/v7.3.0-rc3/hyperchains'>
                                    Learn more
                                </Link>
                            </li>
                        </ol>
                    </>
                )}
            </div>
            <img src='/success_screen.png' className='hidden object-contain object-top xl:block' alt='Success Screen' />
        </div>
    );
};

export default InitiatorStep5Form;
