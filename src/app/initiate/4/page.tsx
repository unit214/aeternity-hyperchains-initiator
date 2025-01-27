'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INITIATOR_STEP_4_STORAGE_KEY } from '@/lib/constants';
import { Step4FormValues, step4FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: Step4FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<Step4FormValues>({
        resolver: zodResolver(step4FormSchema),
        defaultValues: {
            validatorCount: initialData?.validatorCount || '',
            validatorBalance: initialData?.validatorBalance || '',
            validatorMinStake: initialData?.validatorMinStake || '',
            faucetInitBalance: initialData?.faucetInitBalance || '',
            treasuryInitBalance: initialData?.treasuryInitBalance || ''
        },
        mode: 'onBlur'
    });

    function onBack() {
        saveToLocalStorage<Step4FormValues>(form.getValues(), INITIATOR_STEP_4_STORAGE_KEY);
        router.push('/initiate/3');
    }
    function onSubmit(values: Step4FormValues) {
        saveToLocalStorage<Step4FormValues>(values, INITIATOR_STEP_4_STORAGE_KEY);
        router.push('/initiate/5');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:gap-36'>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name='validatorCount'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Number Of Validators'
                                    tooltip='The initial number of validators to participate in the Hyperchain network.'
                                />
                                <FormControl>
                                    <Input {...field} placeholder='3' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='validatorBalance'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Validator Balance'
                                    tooltip='The initial balance allocated to validators at the genesis of the Hyperchain.'
                                />
                                <FormControl>
                                    <Input {...field} placeholder='100.0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='validatorMinStake'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Minimum Staking Amount'
                                    tooltip='The minimum number of native Hyperchain tokens required to stake and become a validator.'
                                />
                                <FormControl>
                                    <Input {...field} placeholder='100.0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='faucetInitBalance'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Faucet Init Balance' tooltip='Tooltip TBD' />
                                <FormControl>
                                    <Input {...field} placeholder='100.0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='treasuryInitBalance'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Treasury Init Balance' tooltip='Tooltip TBD' />
                                <FormControl>
                                    <Input {...field} placeholder='100.0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-row gap-4 self-center'>
                    <Button type='button' variant='outline' className='w-24' onClick={onBack}>
                        Back
                    </Button>
                    <Button type='submit' variant='default' className='w-24'>
                        Finish
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const FormWrapper: React.FC = () => {
    const [initialData, setInitialData] = useState<Step4FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<Step4FormValues>(INITIATOR_STEP_4_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Initiate4Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Validator Requirements'
                stepNumber={4}
                description='Establish the rules for validators on your hyperchain to ensure network security and efficiency.'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Initiate4Page;
