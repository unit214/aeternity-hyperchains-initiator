'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INITIATOR_STEP_2_STORAGE_KEY, INITIATOR_STEP_3_STORAGE_KEY, parentChains } from '@/lib/constants';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { Step2FormValues, Step3FormValues, step3FormSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

const InitiatorForm: React.FC<{ initialData: Step3FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<Step3FormValues>({
        resolver: zodResolver(step3FormSchema),
        defaultValues: {
            fixedCoinbase: initialData?.fixedCoinbase || '',
            pinningReward: initialData?.pinningReward || ''
        }
    });

    function onBack() {
        saveToLocalStorage<Step3FormValues>(form.getValues(), INITIATOR_STEP_3_STORAGE_KEY);
        router.push('/initiate/2');
    }

    function onSubmit(values: Step3FormValues) {
        saveToLocalStorage<Step3FormValues>(values, INITIATOR_STEP_3_STORAGE_KEY);
        router.push('/initiate/4');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:gap-36'>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name='fixedCoinbase'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Block Reward' tooltip='Tooltip Text' />
                                <FormControl>
                                    <NumericFormat
                                        {...field}
                                        allowNegative={false}
                                        decimalScale={
                                            parentChains
                                                .filter(
                                                    (c) =>
                                                        c.symbol ===
                                                        getFromLocalStorage<Step2FormValues>(
                                                            INITIATOR_STEP_2_STORAGE_KEY
                                                        )?.parent
                                                )
                                                .at(0)?.decimals || 18
                                        }
                                        placeholder='0.0'
                                        customInput={Input}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='pinningReward'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Pinning Reward' tooltip='Tooltip Text' />
                                <FormControl>
                                    <NumericFormat
                                        {...field}
                                        allowNegative={false}
                                        decimalScale={
                                            parentChains
                                                .filter(
                                                    (c) =>
                                                        c.symbol ===
                                                        getFromLocalStorage<Step2FormValues>(
                                                            INITIATOR_STEP_2_STORAGE_KEY
                                                        )?.parent
                                                )
                                                .at(0)?.decimals || 18
                                        }
                                        placeholder='0.0'
                                        customInput={Input}
                                    />
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
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const FormWrapper: React.FC = () => {
    const [initialData, setInitialData] = useState<Step3FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<Step3FormValues>(INITIATOR_STEP_3_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Initiate3Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Token Economics'
                stepNumber={3}
                description='Establish the rules for validators on your child chain to ensure network security and efficiency.'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Initiate3Page;
