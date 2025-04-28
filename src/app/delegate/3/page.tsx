'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Encoded, connectWallet, delegateStake, getBalance } from '@/lib/aeternity';
import { DELEGATOR_STEP_1_STORAGE_KEY, StepFieldName } from '@/lib/constants';
import { DelegatorStep1FormValues, DelegatorStep3FormValues, delegatorStep3FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC = () => {
    const router = useRouter();
    function onBack() {
        router.push('/delegate/2');
    }
    function onNext() {
        router.push('/delegate/4');
    }

    const form = useForm<DelegatorStep3FormValues>({
        resolver: zodResolver(delegatorStep3FormSchema),
        defaultValues: {
            amount: ''
        },
        mode: 'onBlur'
    });
    async function onSubmit(values: DelegatorStep3FormValues) {
        try {
            setIsStaking(false);
            setIsStaked(false);
            if (!contractAddress) {
                throw new Error('Delegation contract is missing. Go back to step 1 and fill it.');
            }
            const result = await delegateStake({ address: contractAddress, amount: values.amount });

            if (result !== 'ok') {
                throw new Error('Staking was not successful');
            }
            setIsStaked(true);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
            console.error(error);
        } finally {
            setIsStaking(false);
        }
    }

    const [isConnecting, setIsConnecting] = useState(false);
    const [isStaking, setIsStaking] = useState(false);
    const [isStaked, setIsStaked] = useState(false);
    const [account, setAccount] = useState<Encoded.AccountAddress | undefined>();
    const [balance, setBalance] = useState<string>();
    const [nodeUrl, setNodeUrl] = useState<string>();
    const [contractAddress, setContractAddress] = useState<string>();
    const [error, setError] = useState<string>();

    useEffect(() => {
        const localStorageData = getFromLocalStorage<DelegatorStep1FormValues>(DELEGATOR_STEP_1_STORAGE_KEY);
        setNodeUrl(localStorageData?.nodeUrl);
        setContractAddress(localStorageData?.delegationContract);
    }, []);

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                if (!isConnecting && account) {
                    const walletBalance = await getBalance(account);
                    setBalance(walletBalance);
                }
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unknown error occurred');
                }
                console.error(error);
            }
        };
        fetchBalance();
    }, [account, isConnecting]);

    return (
        <div className='flex flex-col justify-between gap-10 md:gap-36'>
            <div>
                <div className='gap grid gap-6 rounded-xl border p-2 xl:min-h-72 xl:grid-cols-2'>
                    <div className='rounded-xl bg-grey-1 p-4'>
                        <h3 className='font-clash text-sm font-medium'>Wallet balance</h3>
                        <p className='mb-4 font-roboto text-sm text-grey-5'>Connect Superhero Wallet to view balance</p>
                        {isConnecting ? (
                            <div className='flex w-full items-center rounded-xl border bg-background p-3'>
                                <div className='h-7 grow' />
                                <div className='animate-pulse rounded-sm bg-[#FFEFB7] px-2 py-[2px] text-sm text-[#A88302]'>
                                    Connecting
                                </div>
                            </div>
                        ) : account ? (
                            <div className='flex w-full items-center rounded-xl border bg-background p-3'>
                                <div className='grow text-lg font-medium'>{balance}</div>
                                <div className='rounded-sm bg-[#CFF9E0] px-2 py-[2px] text-sm text-[#1CA473]'>
                                    Connected
                                </div>
                            </div>
                        ) : (
                            <Button
                                className='w-full md:w-fit'
                                onClick={async () => {
                                    try {
                                        setIsConnecting(true);
                                        setError(undefined);
                                        if (!nodeUrl) {
                                            setError('No NodeURL provided. Go back to step 1 and fill NodeURL');

                                            return;
                                        }
                                        const walletAddress = await connectWallet(nodeUrl);
                                        setAccount(walletAddress);
                                    } catch (error) {
                                        if (error instanceof Error) {
                                            setError(error.message);
                                        } else {
                                            setError('An unknown error occurred');
                                        }
                                        console.error(error);
                                    } finally {
                                        setIsConnecting(false);
                                    }
                                }}>
                                Connect Your Wallet
                            </Button>
                        )}
                    </div>
                    <div className='p-4'>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                                <div>
                                    <h3 className='font-clash text-sm font-medium'>Stake Aeternity (AE)</h3>
                                    <p className='mb-4 font-roboto text-sm text-grey-5'>Chose amount to stake</p>
                                    <FormField
                                        control={form.control}
                                        name={StepFieldName.amount}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <div className='flex items-center space-x-2 rounded-lg bg-input-background p-2 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
                                                        <Image
                                                            src='/ae_token.svg'
                                                            alt='ae_token'
                                                            width={32}
                                                            height={32}
                                                        />
                                                        <Input
                                                            placeholder='0 AE'
                                                            className='focus-visible:ring-0 focus-visible:ring-offset-0 disabled:border-0 disabled:bg-input-background [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none'
                                                            disabled={!account || !contractAddress}
                                                            type='number'
                                                            inputMode='decimal'
                                                            {...field}
                                                            onChange={(e) => {
                                                                if (Number(e.target.value) < 0) {
                                                                    return;
                                                                }
                                                                field.onChange(e);
                                                            }}
                                                        />
                                                        {isStaking && (
                                                            <div className='animate-pulse rounded-sm bg-[#FFEFB7] px-2 py-[2px] text-sm text-[#A88302]'>
                                                                Staking
                                                            </div>
                                                        )}
                                                        {isStaked && (
                                                            <div className='rounded-sm bg-[#CFF9E0] px-2 py-[2px] text-sm text-[#1CA473]'>
                                                                Staked
                                                            </div>
                                                        )}
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {account ? (
                                    contractAddress ? (
                                        <>
                                            <div className='flex justify-between text-sm'>
                                                <div className='text-grey-5'>Delegation contract:</div>
                                                <div>{`${contractAddress.substring(0, 5)}...${contractAddress.substring(contractAddress.length - 3)}`}</div>
                                            </div>
                                            <Button className='w-full md:w-fit' type='submit'>
                                                Stake
                                            </Button>
                                        </>
                                    ) : (
                                        <div className='text-sm text-red-500'>
                                            Delegation contract is missing. Go back to step 1 and fill it.
                                        </div>
                                    )
                                ) : (
                                    <></>
                                )}
                            </form>
                        </Form>
                    </div>
                </div>
                {error && <div className='text-sm text-red-500'>{error}</div>}
            </div>
            <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                    Back
                </Button>
                <Button
                    data-cy='button-next'
                    variant='default'
                    className='w-full md:w-24'
                    onClick={onNext}
                    disabled={!isStaked}>
                    Finish
                </Button>
            </div>
        </div>
    );
};

const Delegate3Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Connect Your Wallet'
                step={3}
                totalSteps={3}
                description='Make sure the hyperchain is added to Super Hero Wallet'
                form={<InitiatorForm />}
            />
        </div>
    );
};

export default Delegate3Page;
