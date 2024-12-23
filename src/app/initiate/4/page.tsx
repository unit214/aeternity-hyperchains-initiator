'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { INITIATOR_STEP_4_STORAGE_KEY } from '@/lib/constants';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    unstakeDelay: z.coerce.number().gt(0),
    validatorMinStake: z.coerce.number().gt(0),
    validatorMinPercentage: z.coerce.number().gt(0)
});
type FormValues = z.infer<typeof formSchema>;

const InitiatorForm: React.FC<{ initialData: FormValues | null }> = ({ initialData }) => {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unstakeDelay: initialData?.unstakeDelay || ('' as unknown as number),
            validatorMinStake: initialData?.validatorMinStake || ('' as unknown as number),
            validatorMinPercentage: initialData?.validatorMinPercentage || ('' as unknown as number)
        }
    });

    function onBack() {
        saveToLocalStorage<FormValues>(form.getValues(), INITIATOR_STEP_4_STORAGE_KEY);
        router.push('/initiate/3');
    }
    function onSubmit(values: FormValues) {
        saveToLocalStorage<FormValues>(values, INITIATOR_STEP_4_STORAGE_KEY);
        router.push('/initiate/5');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:min-h-[450px]'>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
                    <FormField
                        control={form.control}
                        name='unstakeDelay'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Unstake Delay' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input placeholder='Ex: 7 days' {...field} />
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
                                <FormLabelWithTooltip label='Validator min Stake' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input placeholder='Ex: 1000' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='validatorMinPercentage'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Validator Min Percentage' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input placeholder='Ex: 5000' {...field} />
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
    const [initialData, setInitialData] = useState<FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<FormValues>(INITIATOR_STEP_4_STORAGE_KEY));
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
