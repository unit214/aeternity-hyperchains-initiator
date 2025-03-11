'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { createValidatorConfigData, fetchDataFromNode } from '@/app/validate/2/data';
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
            nodeUrl: initialData?.nodeUrl || 'https://demo.hyperchains.aeternity.io/v3/status',
            nodeConfigUrl:
                initialData?.nodeConfigUrl || 'https://demo.hyperchains.aeternity.io:8443/v3/hyperchain/config'
        },
        mode: 'onBlur'
    });

    function onBack() {
        saveToLocalStorage<ValidatorStep1FormValues>(form.getValues(), VALIDATOR_STEP_1_STORAGE_KEY);
        router.push('/');
    }

    async function onSubmit(values: ValidatorStep1FormValues) {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchDataFromNode(values.nodeUrl, values.nodeConfigUrl);
            saveToLocalStorage<ValidatorStep1FormValues>(values, VALIDATOR_STEP_1_STORAGE_KEY);
            saveToLocalStorage(createValidatorConfigData(data.nodeData, data.nodeConfigData), NODE_DATA);
            router.push('/validate/2');
        } catch (error) {
            if (error instanceof NodeEndpointError) {
                setError('Failed to fetch data from node URL.');
            } else if (error instanceof NodeConfigEndpointError) {
                setError('Failed to fetch data from node config URL');
            } else {
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
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
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
                        name={StepFieldName.nodeConfigUrl}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip
                                    label={validationStepFields[StepFieldName.nodeConfigUrl].label}
                                    tooltip={validationStepFields[StepFieldName.nodeConfigUrl].tooltip}
                                />
                                <FormControl>
                                    <Input
                                        data-cy='input-validator-node-config-url'
                                        placeholder='https://example.node.com'
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
                title='Configure the Validator Node'
                step={1}
                totalSteps={2}
                description='Enter the node URL and node config URL'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Validate1Page;
