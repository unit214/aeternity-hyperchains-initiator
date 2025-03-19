'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ValidatorNodeConfig } from '@/app/validate/types/types';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { NODE_DATA, StepFieldName } from '@/lib/constants';
import { ValidatorStep2FormValues, validatorStep2FormSchema } from '@/lib/form-schema';
import { getFromLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

const InitiatorForm: React.FC = () => {
    const router = useRouter();
    const form = useForm<ValidatorStep2FormValues>({
        resolver: zodResolver(validatorStep2FormSchema),
        defaultValues: {
            checkbox1: false,
            checkbox2: false,
            checkbox3: false,
            checkbox4: false
        },
        mode: 'onBlur'
    });

    const [data, setData] = useState<ValidatorNodeConfig | undefined>();
    useEffect(() => {
        const storedData = getFromLocalStorage<ValidatorNodeConfig>(NODE_DATA);
        if (storedData) {
            setData(storedData);
        } else {
            router.push('/validate/1');
        }
    }, []);

    function onBack() {
        router.push('/validate/1');
    }

    async function onSubmit(values: ValidatorStep2FormValues) {
        console.log(values);
        router.push('/validate/3');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className={'flex flex-col justify-between gap-10 font-roboto md:gap-36'}>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name={StepFieldName.checkbox1}
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center space-x-1'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}></Checkbox>
                                    </FormControl>
                                    <FormLabel className='font-clash'>
                                        Do you have more than the required amount of tokens on the{' '}
                                        {data?.chain.fork_management.network_id} hyperchain to become a validator?
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.checkbox2}
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center space-x-1'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}></Checkbox>
                                    </FormControl>{' '}
                                    <FormLabel className='font-clash'>
                                        Do you have an account with funds on the aeternity chain{' '}
                                        {data?.chain.consensus[0].config.parent_chain.consensus.network_id}?
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.checkbox3}
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center space-x-1'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}></Checkbox>
                                    </FormControl>{' '}
                                    <FormLabel className='font-clash'>
                                        Do you have access to a node of the aeternity chain{' '}
                                        {data?.chain.consensus[0].config.parent_chain.consensus.network_id}?
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name={StepFieldName.checkbox4}
                        render={({ field }) => (
                            <FormItem>
                                <div className='flex items-center space-x-1'>
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            onBlur={field.onBlur}
                                            name={field.name}
                                            ref={field.ref}></Checkbox>
                                    </FormControl>{' '}
                                    <FormLabel className='font-clash'>
                                        Did you get the accounts file {data?.chain.hard_forks['6'].accounts_file} and
                                        the contracts file {data?.chain.hard_forks['6'].contracts_file}?
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />
                </div>

                <div className='flex w-full flex-row gap-4 self-center md:w-fit'>
                    <Button type='button' variant='outline' className='w-full md:w-24' onClick={onBack}>
                        Back
                    </Button>
                    <Button
                        data-cy='button-next'
                        type='submit'
                        variant='default'
                        className='w-full md:w-24'
                        disabled={
                            !form.watch('checkbox1') ||
                            !form.watch('checkbox2') ||
                            !form.watch('checkbox3') ||
                            !form.watch('checkbox4')
                        }>
                        Next
                    </Button>
                </div>
            </form>
        </Form>
    );
};

const Validate1Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Check the Requirements'
                step={2}
                totalSteps={2}
                description='Read each step carefully and confirm that you meet the requirements.'
                form={<InitiatorForm />}
            />
        </div>
    );
};

export default Validate1Page;
