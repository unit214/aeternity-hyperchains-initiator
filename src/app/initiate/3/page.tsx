'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INITIATOR_STEP_3_STORAGE_KEY } from '@/lib/constants';
import { Step3FormValues, step3FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: Step3FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<Step3FormValues>({
        resolver: zodResolver(step3FormSchema),
        defaultValues: {
            fixedCoinbase: initialData?.fixedCoinbase || '',
            pinningReward: initialData?.pinningReward || ''
        },
        mode: 'onBlur'
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
                <div className='grid grid-cols-1 gap-y-8 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name='fixedCoinbase'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Block Reward'
                                    tooltip='The amount of native Hyperchain tokens rewarded to the validator for producing a new block.'
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
                        name='pinningReward'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Pinning Reward'
                                    tooltip='The amount of native Hyperchain tokens rewarded to validators for successfully committing the Hyperchain state to the pinning chain.'
                                />
                                <FormControl>
                                    <Input {...field} placeholder='100.0' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                    <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                        Back
                    </Button>
                    <Button type='submit' variant='default' className='w-full md:w-24'>
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
