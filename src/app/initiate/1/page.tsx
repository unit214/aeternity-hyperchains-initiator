'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { INITIATOR_STEP_1_STORAGE_KEY, StepFieldName, stepFields } from '@/lib/constants';
import { Step1FormValues, step1FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: Step1FormValues | null }> = ({ initialData }) => {
    const router = useRouter();
    const form = useForm<Step1FormValues>({
        resolver: zodResolver(step1FormSchema),
        defaultValues: {
            networkId: initialData?.networkId || '',
            childBlockTime: initialData?.childBlockTime || '3000',
            childBlockProductionTime: '500' // hardcoded to 500ms in RC5 and later versions
        },
        mode: 'onBlur'
    });

    function onBack() {
        saveToLocalStorage<Step1FormValues>(form.getValues(), INITIATOR_STEP_1_STORAGE_KEY);
        router.push('/');
    }
    function onSubmit(values: Step1FormValues) {
        saveToLocalStorage<Step1FormValues>(values, INITIATOR_STEP_1_STORAGE_KEY);
        router.push('/initiate/2');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:gap-36'>
                <div className='grid grid-cols-1 gap-y-8 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name={StepFieldName.networkId}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.networkId].label}
                                    tooltip={stepFields[StepFieldName.networkId].tooltip}
                                />
                                <FormControl>
                                    <Input data-cy='input-hyperchain-id' placeholder='hc_test' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.childBlockTime}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.childBlockTime].label}
                                    tooltip={stepFields[StepFieldName.childBlockTime].tooltip}
                                />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input
                                            data-cy='input-hyperchain-block-time'
                                            className='w-20'
                                            placeholder='3000'
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>3000 ms</span> <span>10000 ms</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => field.onChange(v[0])}
                                                value={[field.value as unknown as number]}
                                                defaultValue={[field.value as unknown as number]}
                                                min={3000}
                                                max={10000}
                                                step={1}
                                            />
                                        </FormControl>
                                    </div>
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                    <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                        Back
                    </Button>
                    <Button data-cy='button-next' type='submit' variant='default' className='w-full md:w-24'>
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const FormWrapper: React.FC = () => {
    const [initialData, setInitialData] = useState<Step1FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<Step1FormValues>(INITIATOR_STEP_1_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Initiate1Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Configure Your Hyperchain'
                step={1}
                totalSteps={4}
                description='Define the operational parameters for your hyperchain, including block timings and network identifiers.'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Initiate1Page;
