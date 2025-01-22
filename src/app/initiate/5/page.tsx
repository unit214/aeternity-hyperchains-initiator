'use client';

import * as React from 'react';

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
        <div className='flex flex-row justify-center gap-20'>
            <div className='mt-11 flex flex-col md:ml-28 md:mt-20'>
                <div className='mb-4 text-2xl font-semibold md:text-4xl'>Success! Your Chain is Ready</div>
                <span className='font-sans text-base text-muted-foreground'>
                    Start your chain and take it live or Save your chain configuration as a JSON file for future use
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
                        <Button variant='default' className='ml-auto hidden w-32 md:flex' onClick={downloadTxtFile}>
                            Download
                        </Button>
                    </div>
                    <Button variant='default' className='mt-2 w-full md:hidden' onClick={downloadTxtFile}>
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
                <ol className='mb-16 mt-6 list-decimal pl-4 font-sans marker:font-sans marker:font-semibold md:mb-24'>
                    <li className='mb-8'>
                        <span className='font-semibold'>Prepare Your Environment</span>
                        <ul className='list-disc'>
                            <li>
                                Ensure your hardware meets the{' '}
                                <Link className='text-pink underline' href='example.com'>
                                    Node Requirements
                                </Link>
                            </li>
                            <li>Verify software dependencies are installed (e.g., Docker, Node.js, etc.).</li>
                        </ul>
                    </li>
                    <li className='mb-8'>
                        <span className='font-semibold'>Add Your Private Keys to the Config File</span>
                        <ul className='list-disc'>
                            <li>
                                Enter your private keys into the configuration file securely.
                                <br />
                                <Link className='text-pink underline' href='example.com'>
                                    See More
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='mb-8'>
                        <span className='font-semibold'>Download and Install Node Software</span>
                        <ul className='list-disc'>
                            <li>
                                Obtain the node software package from{' '}
                                <Link className='text-pink underline' href='example.com'>
                                    Documentation.
                                </Link>
                            </li>
                            <li>Follow installation instructions for your operating system.</li>
                        </ul>
                    </li>
                    <li className='mb-8'>
                        <span className='font-semibold'>Connect to the Parent Chain</span>
                        <ul className='list-disc'>
                            <li>Verify parent chain configurations in your config file.</li>
                            <li>
                                Ensure the parent chain is running and accessible.
                                <br />
                                <Link className='text-pink underline' href='example.com'>
                                    See More
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li className='mb-8'>
                        <span className='font-semibold'>Start Your Node</span>
                        <ul className='list-none'>
                            <li>
                                Run the node using the command:
                                <br />
                                <code>./start-node --config &lt;path_to_your_config_file&gt;</code>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <span className='font-semibold'>Monitor Node Activity</span>
                        <ul className='list-disc'>
                            <li>Check logs to confirm successful connection to the parent chain.</li>
                            <li>
                                Use provided monitoring tools to track node performance.
                                <br />
                                <Link className='text-pink underline' href='example.com'>
                                    See More
                                </Link>
                            </li>
                        </ul>
                    </li>
                </ol>
            </div>
            <img src='/success_screen.png' className='hidden object-contain object-top xl:block' alt='Success Screen' />
        </div>
    );
};

export default InitiatorStep5Form;
