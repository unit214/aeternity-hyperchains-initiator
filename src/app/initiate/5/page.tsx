'use client';

import * as React from 'react';
import { ReactNode } from 'react';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
    DEFAULT_FAUCET_INIT_BALANCE,
    DEFAULT_TREASURY_INIT_BALANCE,
    INITIATOR_STEP_1_STORAGE_KEY,
    INITIATOR_STEP_2_STORAGE_KEY,
    INITIATOR_STEP_3_STORAGE_KEY,
    INITIATOR_STEP_4_STORAGE_KEY,
    parentChains
} from '@/lib/constants';
import { getFromLocalStorage } from '@/lib/local-storage';
import { step1FormSchema, step2FormSchema, step3FormSchema, step4FormSchema } from '@/lib/types';

import { InfoIcon } from 'lucide-react';
import YAML from 'yaml';

const LineItem = ({ children }: { children?: ReactNode | string }) => {
    return <span className='inline-block w-3 text-center'>{children}</span>;
};

const InitiatorStep5Form: React.FC = () => {
    const downloadTxtFile = () => {
        // get the content from the local storage
        const step1Data = step1FormSchema.parse(getFromLocalStorage(INITIATOR_STEP_1_STORAGE_KEY));
        const step2Data = step2FormSchema.parse(getFromLocalStorage(INITIATOR_STEP_2_STORAGE_KEY));
        const step3Data = step3FormSchema.parse(getFromLocalStorage(INITIATOR_STEP_3_STORAGE_KEY));
        const step4Data = step4FormSchema.parse(getFromLocalStorage(INITIATOR_STEP_4_STORAGE_KEY));

        // create a new file
        const content = YAML.stringify({
            childBlockTime: step1Data?.childBlockTime,
            childEpochLength:
                (step2Data!.parentEpochLength *
                    parentChains.filter((c) => c.symbol === step2Data?.parent).at(0)!.blockTime) /
                step1Data!.childBlockTime, // TODO take next higher number for non absolute result?
            contractSourcesPrefix: 'https://raw.githubusercontent.com/aeternity/aeternity/refs/tags/v7.3.0-rc2/',
            enablePinning: true,
            faucetInitBalance: DEFAULT_FAUCET_INIT_BALANCE,
            fixedCoinbase: step3Data?.fixedCoinbase,
            networkId: step1Data?.networkId,
            parentChain: {
                epochLength: step2Data?.parentEpochLength,
                networkId: step2Data?.parentNetworkId,
                nodeURL: step2Data?.parentNodeUrl,
                type: `AE2${step2Data?.parent}`
            },
            pinningReward: step3Data?.pinningReward,
            treasuryInitBalance: DEFAULT_TREASURY_INIT_BALANCE,
            validators: {
                count: step4Data?.validatorCount,
                balance: step4Data?.validatorBalance,
                validatorMinStake: step4Data?.validatorMinStake
            }
        });
        const element = document.createElement('a');
        const file = new Blob([content], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'init.yaml';
        document.body.appendChild(element); // Required for Firefox
        element.click();
        document.body.removeChild(element); // Clean up
    };

    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <div className='flex flex-col'>
                <div className='mb-12 flex flex-row justify-between gap-7'>
                    <div className='flex flex-col'>
                        <div className='mb-4 text-4xl font-semibold'>Success! Your Chain is Ready</div>
                        <span className='font-sans text-sm text-muted-foreground'>
                            Start your chain and take it live or Save your chain configuration as a JSON file for future
                            use
                        </span>
                        <div className='rounded-xl bg-gray-50 p-3'>
                            <div className='flex items-center'>
                                <img src='/yaml_icon.svg' alt='Yaml Icon' />
                                <div className='pl-2'>
                                    <h2 className='text-xl font-semibold'>Download Your Config File</h2>
                                    <span className='font-sans text-sm text-muted-foreground'>
                                        Config YAML file contains all the parameters you’ve set is
                                    </span>
                                </div>
                                <Button variant='default' className='ml-auto w-32' onClick={downloadTxtFile}>
                                    Download
                                </Button>
                            </div>
                            <div className='flex rounded-xl bg-pink-2 p-3'>
                                <InfoIcon size={24} className='text-pink' />
                                <span className='pl-2 text-pink'>
                                    Please note that after downloading the file you will not have access to this page.
                                </span>
                            </div>
                        </div>
                        <div className='mt-12'>
                            <h3 className='text-2xl font-semibold'>Next Steps</h3>
                        </div>
                        <div className='font-sans'>
                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>1.</LineItem> Prepare Your Environment
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Ensure your hardware meets the{' '}
                                    <Link href='example.com'>Node Requirements</Link>
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Verify software dependencies are installed (e.g.,
                                    Docker, Node.js, etc.).
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>2.</LineItem> Add Your Private Keys to the Config File
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Enter your private keys into the configuration file
                                    securely.
                                </div>
                                <div className='mt-2'>
                                    <LineItem></LineItem> <Link href='example.com'>See More</Link>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>3.</LineItem> Download and Install Node Software
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Obtain the node software package from{' '}
                                    <Link href='example.com'>Documentation.</Link>
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Follow installation instructions for your operating
                                    system.
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>4.</LineItem> Connect to the Parent Chain
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Verify parent chain configurations in your config file.
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Ensure the parent chain is running and accessible.
                                </div>
                                <div className='mt-2'>
                                    <LineItem></LineItem> <Link href='example.com'>See More</Link>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>5.</LineItem> Start Your Node
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Run the node using the command:
                                </div>
                                <div>
                                    <pre className='ml-3 mt-2'>
                                        ./start-node --config &lt;path_to_your_config_file&gt;
                                    </pre>
                                </div>
                            </div>

                            <div className='mb-4'>
                                <div className='font-semibold'>
                                    <LineItem>6.</LineItem> Monitor Node Activity
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Check logs to confirm successful connection to the
                                    parent chain.
                                </div>
                                <div>
                                    <LineItem>&#8226;</LineItem> Use provided monitoring tools to track node
                                    performance.
                                </div>
                                <div className='mt-2'>
                                    <LineItem></LineItem> <Link href='example.com'>See More</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <img
                        src='/success_screen.png'
                        className='hidden object-contain object-top xl:block'
                        alt='Success Screen'
                    />
                </div>
            </div>
        </div>
    );
};

export default InitiatorStep5Form;
