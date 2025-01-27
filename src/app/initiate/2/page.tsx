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
import { INITIATOR_STEP_2_STORAGE_KEY, parentChains } from '@/lib/constants';
import { Step2FormValues, step2FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: Step2FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<Step2FormValues>({
        resolver: zodResolver(step2FormSchema),
        defaultValues: {
            parent: initialData?.parent || 'AE',
            parentNetworkId: initialData?.parentNetworkId || '',
            parentNodeURL: initialData?.parentNodeURL || '',
            parentEpochLength: initialData?.parentEpochLength || '10'
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
                        name='parent'
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Pinning Chain'
                                    tooltip='The parent blockchain where the Hyperchain commits its states.'
                                />
                                <FormControl>
                                    <Select value={value} onValueChange={onChange} defaultValue={value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Choose a parent chain connection' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {parentChains.map((c, index) => (
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
                        name='parentNetworkId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Chain Network ID'
                                    tooltip='The unique identifier for the parent chain network the Hyperchain connects to.'
                                />
                                <FormControl>
                                    <Input placeholder='Ex: ae_mainnet | ae_uat' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='parentNodeURL'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Parent Node URL'
                                    tooltip='The API endpoint of a node in the parent chain for syncing and block updates.'
                                />
                                <FormControl>
                                    <Input placeholder='https://testnet.aeternity.io' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='parentEpochLength'
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label='Parent Epoch Length'
                                    tooltip='The number of blocks that make up an epoch on the parent chain.'
                                />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input value={value} onChange={onChange} className='w-20' placeholder='10' />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>10</span> <span>100</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => onChange(v[0])}
                                                value={[value as unknown as number]}
                                                defaultValue={[value as unknown as number]}
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
