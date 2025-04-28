'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DELEGATOR_STEP_1_STORAGE_KEY, StepFieldName, delegationStepFields } from '@/lib/constants';
import { NodeConfigEndpointError, NodeEndpointError } from '@/lib/error';
import { DelegatorStep1FormValues, delegatorStep1FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: DelegatorStep1FormValues | null }> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<DelegatorStep1FormValues>({
        resolver: zodResolver(delegatorStep1FormSchema),
        defaultValues: {
            nodeUrl: initialData?.nodeUrl,
            delegationContract: initialData?.delegationContract ?? ''
        },
        mode: 'onBlur'
    });

    function onBack() {
        router.push('/delegate');
    }

    async function onSubmit(values: DelegatorStep1FormValues) {
        setLoading(true);
        setError(null);
        try {
            saveToLocalStorage<DelegatorStep1FormValues>(values, DELEGATOR_STEP_1_STORAGE_KEY);
            router.push('/delegate/2');
        } catch (error) {
            if (error instanceof NodeEndpointError) {
                setError('Failed to fetch data from node URL.');
            } else if (error instanceof NodeConfigEndpointError) {
                setError('Failed to fetch data from middleware URL');
            } else {
                console.error(error);
                setError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={'flex flex-col justify-between gap-10 font-roboto md:gap-36'}>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name={StepFieldName.nodeUrl}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={delegationStepFields[StepFieldName.nodeUrl].label}
                                    tooltip={delegationStepFields[StepFieldName.nodeUrl].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-validator-node-url'
                                        placeholder='https://example.node.com'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.delegationContract}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={delegationStepFields[StepFieldName.delegationContract].label}
                                    tooltip={delegationStepFields[StepFieldName.delegationContract].tooltip}
                                />
                                <FormControl>
                                    <Input data-cy='input-validator-node-url' placeholder='ct_...' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {error && <div className='text-sm text-red-500'>{error}</div>}
                </div>

                <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                    <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                        Back
                    </Button>
                    <Button data-cy='button-next' type='submit' variant='default' className='w-full md:w-24'>
                        {loading ? <Loader2 className='animate-spin' /> : 'Next'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const FormWrapper: React.FC = () => {
    const [initialData, setInitialData] = useState<DelegatorStep1FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<DelegatorStep1FormValues>(DELEGATOR_STEP_1_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Delegate1Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Tell us about the hyperchain'
                step={1}
                totalSteps={3}
                description='Enter the node URL and middleware URL'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Delegate1Page;
