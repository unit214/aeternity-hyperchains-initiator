'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';

import { Code } from '@/components/code';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
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
import { Step1FormValues, step1FormSchema, step2FormSchema, step3FormSchema, step4FormSchema } from '@/lib/types';

import { InfoIcon } from 'lucide-react';
import YAML from 'yaml';

const Steps = ['1', '2', '3', '4'];

const InitiatorStep5Form: React.FC = () => {
    const [networkId, setNetworkId] = useState<string | undefined>();
    const [yamlFile, setYamlFile] = useState<Blob | undefined>();

    const { toast } = useToast();

    useEffect(() => {
        setNetworkId(getFromLocalStorage<Step1FormValues>(INITIATOR_STEP_1_STORAGE_KEY)?.networkId);
    }, []);

    const createAndDownloadYamlFile = async () => {
        if (!yamlFile) {
            try {
                // get the content from the local storage
                const step1Data = await step1FormSchema
                    .parseAsync(getFromLocalStorage(INITIATOR_STEP_1_STORAGE_KEY))
                    .catch(() => {
                        throw new Error(Steps[0]);
                    });
                const step2Data = await step2FormSchema
                    .parseAsync(getFromLocalStorage(INITIATOR_STEP_2_STORAGE_KEY))
                    .catch(() => {
                        throw new Error(Steps[1]);
                    });
                const step3Data = await step3FormSchema
                    .parseAsync(getFromLocalStorage(INITIATOR_STEP_3_STORAGE_KEY))
                    .catch(() => {
                        throw new Error(Steps[2]);
                    });
                const step4Data = await step4FormSchema
                    .parseAsync(getFromLocalStorage(INITIATOR_STEP_4_STORAGE_KEY))
                    .catch(() => {
                        throw new Error(Steps[3]);
                    });

                // create a new file
                const content = YAML.stringify({
                    childBlockTime: step1Data?.childBlockTime,
                    childEpochLength:
                        (step2Data!.parentEpochLength *
                            parentChains.filter((c) => c.symbol === step2Data?.parent).at(0)!.blockTime) /
                        step1Data!.childBlockTime, // TODO take next higher number for non absolute result?
                    contractSourcesPrefix:
                        'https://raw.githubusercontent.com/aeternity/aeternity/refs/tags/v7.3.0-rc2/',
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
                const file = new Blob([content], { type: 'text/plain' });
                downloadFile(file);
                setYamlFile(file);
                localStorage.removeItem(INITIATOR_STEP_1_STORAGE_KEY);
                localStorage.removeItem(INITIATOR_STEP_2_STORAGE_KEY);
                localStorage.removeItem(INITIATOR_STEP_3_STORAGE_KEY);
                localStorage.removeItem(INITIATOR_STEP_4_STORAGE_KEY);
            } catch (e) {
                if (e instanceof Error && Steps.find((x) => x === e.message) !== undefined) {
                    toast({
                        title: 'Incomplete data',
                        description: (
                            <span>
                                Go back to{' '}
                                <Link className='text-pink underline' href={`/initiate/${e.message}`}>
                                    Step {e.message}
                                </Link>{' '}
                                to fix the problem.
                            </span>
                        )
                    });
                }
            }
        } else {
            downloadFile(yamlFile);
        }
    };

    const downloadFile = (file: Blob) => {
        const element = document.createElement('a');
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
                        <Button
                            variant='default'
                            className='ml-auto hidden w-32 md:flex'
                            onClick={createAndDownloadYamlFile}>
                            Download
                        </Button>
                    </div>
                    <Button variant='default' className='mt-2 w-full md:hidden' onClick={createAndDownloadYamlFile}>
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
                                <Code>mkdir {networkId}</Code>
                            </li>
                            <li>
                                Copy the downloaded <Code>init.yaml</Code> to <Code>/{networkId}</Code>
                            </li>
                        </ul>
                    </li>
                    <li className='space-y-2'>
                        <span className='font-semibold'>Setup Contracts & Generate Economy</span>
                        <ul className='list-disc space-y-2'>
                            <li>
                                Setup the contracts by running:
                                <br />
                                <Code>npm run dev retrieve-contracts {networkId}</Code>
                            </li>
                            <li>
                                Generate the economy by running:
                                <br />
                                <Code>npm run dev gen-economy {networkId}</Code>
                            </li>
                        </ul>
                    </li>
                    <li className='space-y-2'>
                        <span className='font-semibold'>Generate Configuration Files & Run Node</span>
                        <ul className='space-y-6'>
                            <li>
                                Generate the node configuration files by running:
                                <br />
                                <Code>npm run dev gen-node-conf {networkId}</Code>
                            </li>
                            <li className='space-y-2'>
                                This will create 3 files in <Code>nodeConfig</Code> directory:
                                <ul className='list-disc space-y-2 pl-6'>
                                    <li>
                                        <Code>aeternity.yaml</Code>
                                    </li>
                                    <li>
                                        <Code>{networkId}_accounts.json</Code>
                                    </li>
                                    <li>
                                        <Code>{networkId}_contracts.json</Code>
                                    </li>
                                </ul>
                            </li>
                            <li className='space-y-2'>
                                Copy all of the above files to their node corresponding directory, i.e. assuming
                                it&#39;s in <Code>~/aeternity/node</Code>:
                                <ul className='list-disc space-y-2 pl-6'>
                                    <li>
                                        <Code>cp ./{networkId}/nodeConfig/aeternity.yaml ~/aeternity/node/</Code>
                                    </li>
                                    <li>
                                        <Code>
                                            cp ./{networkId}/nodeConfig/{networkId}_*.json ~/aeternity/node/data/aecore/
                                        </Code>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                Don&#39;t forget to fund all pinners accounts on the parent chain prior starting your
                                node/validator.
                            </li>
                            <li>
                                Then run your node:
                                <br />
                                <Code>~/aeternity/node/bin/aeternity start</Code>
                            </li>
                            <li>
                                IMPORTANT: If you used a known public chain (testnet or mainnet) as parent chain, the
                                tool will set the start_height as current block + 10, that is 30 minutes in future. Keep
                                that in mind when verifying your chain, either decrease the number or wait until that
                                block is produced on the parent chain before you start transacting on the Hyperchain.
                            </li>
                        </ul>
                    </li>
                    <li className='space-y-2'>
                        <span className='font-semibold'>Verify Node Status</span>
                        <ul className='space-y-2'>
                            <li>
                                Verify your node is running with:
                                <br />
                                <Code>~/aeternity/node/bin/aeternity status</Code>
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
            </div>
            <img src='/success_screen.png' className='hidden object-contain object-top xl:block' alt='Success Screen' />
        </div>
    );
};

export default InitiatorStep5Form;
