'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { INITIATOR_STEP_2_STORAGE_KEY, StepFieldName, pinningChains, stepFields } from '@/lib/constants';
import { Step2FormValues, step2FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: Step2FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<Step2FormValues>({
        resolver: zodResolver(step2FormSchema),
        defaultValues: {
            pinningChain: initialData?.pinningChain || 'AE',
            pinningChainNetworkId: initialData?.pinningChainNetworkId || '',
            pinningChainNodeUrl: initialData?.pinningChainNodeUrl || '',
            pinningChainEpochLength: initialData?.pinningChainEpochLength || '10'
        },
        mode: 'onBlur'
    });

    function onBack() {
        saveToLocalStorage<Step2FormValues>(form.getValues(), INITIATOR_STEP_2_STORAGE_KEY);
        router.push('/initiate/1');
    }
    function onSubmit(values: Step2FormValues) {
        saveToLocalStorage<Step2FormValues>(values, INITIATOR_STEP_2_STORAGE_KEY);
        router.push('/initiate/3');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:gap-36'>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name={StepFieldName.pinningChain}
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.pinningChain].label}
                                    tooltip={stepFields[StepFieldName.pinningChain].tooltip}
                                />
                                <FormControl>
                                    <Select value={value} onValueChange={onChange} defaultValue={value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Choose a pinning chain connection' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {pinningChains.map((c, index) => (
                                                <SelectItem key={index} value={c.symbol}>
                                                    {c.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.pinningChainNetworkId}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.pinningChainNetworkId].label}
                                    tooltip={stepFields[StepFieldName.pinningChainNetworkId].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-pinning-chain-network-id'
                                        placeholder='Ex: ae_mainnet | ae_uat'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.pinningChainNodeUrl}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.pinningChainNodeUrl].label}
                                    tooltip={stepFields[StepFieldName.pinningChainNodeUrl].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-pinning-chain-node-url'
                                        placeholder='https://testnet.aeternity.io'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.pinningChainEpochLength}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={stepFields[StepFieldName.pinningChainEpochLength].label}
                                    tooltip={stepFields[StepFieldName.pinningChainEpochLength].tooltip}
                                />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input
                                            data-cy='input-pinning-chain-epoch-length'
                                            className='w-20'
                                            placeholder='10'
                                            {...field}
                                        />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>10</span> <span>100</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => field.onChange(v[0])}
                                                value={[field.value as unknown as number]}
                                                defaultValue={[field.value as unknown as number]}
                                                min={10}
                                                max={100}
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
    const [initialData, setInitialData] = useState<Step2FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<Step2FormValues>(INITIATOR_STEP_2_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Initiate2Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Up Your Pinning Chain'
                stepNumber={2}
                description='Define the key parameters for connecting your hyperchain to the pinning chain. These settings establish the foundation of your network’s relationship with the pinning chain.'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Initiate2Page;
