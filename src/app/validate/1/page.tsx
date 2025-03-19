'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { createValidatorConfigData, fetchDataFromNode } from '@/app/validate/3/data';
import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NODE_DATA, StepFieldName, VALIDATOR_STEP_1_STORAGE_KEY, validationStepFields } from '@/lib/constants';
import { NodeConfigEndpointError, NodeEndpointError } from '@/lib/error';
import { ValidatorStep1FormValues, validatorStep1FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC<{ initialData: ValidatorStep1FormValues | null }> = ({ initialData }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const form = useForm<ValidatorStep1FormValues>({
        resolver: zodResolver(validatorStep1FormSchema),
        defaultValues: {
            nodeUrl: initialData?.nodeUrl,
            nodeAeUrl: initialData?.nodeAeUrl,
            middlewareUrl: initialData?.middlewareUrl
        },
        mode: 'onBlur'
    });

    function onBack() {
        router.push('/');
    }

    async function onSubmit(values: ValidatorStep1FormValues) {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDataFromNode(values.nodeUrl, values.middlewareUrl);
            saveToLocalStorage<ValidatorStep1FormValues>(values, VALIDATOR_STEP_1_STORAGE_KEY);
            saveToLocalStorage(
                createValidatorConfigData(data.nodeData, data.middlewareData, values.nodeAeUrl),
                NODE_DATA
            );
            router.push('/validate/2');
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
                                    label={validationStepFields[StepFieldName.nodeUrl].label}
                                    tooltip={validationStepFields[StepFieldName.nodeUrl].tooltip}
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
                        name={StepFieldName.nodeAeUrl}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={validationStepFields[StepFieldName.nodeAeUrl].label}
                                    tooltip={validationStepFields[StepFieldName.nodeAeUrl].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-validator-node-ae-url'
                                        placeholder='example.node.com:3015'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.middlewareUrl}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={validationStepFields[StepFieldName.middlewareUrl].label}
                                    tooltip={validationStepFields[StepFieldName.middlewareUrl].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-validator-node-config-url'
                                        placeholder='https://example.mdw.com'
                                        {...field}
                                    />
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
    const [initialData, setInitialData] = useState<ValidatorStep1FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<ValidatorStep1FormValues>(VALIDATOR_STEP_1_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Validate1Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Tell us about the hyperchain'
                step={1}
                totalSteps={2}
                description='Enter the node URL and middleware URL'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Validate1Page;
