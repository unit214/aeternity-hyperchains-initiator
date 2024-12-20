'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from '@uidotdev/usehooks';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    unstakeDelay: z.coerce.number().gt(0),
    validatorMinStake: z.coerce.number().gt(0),
    validatorMinPercentage: z.coerce.number().gt(0)
});
type FormValues = z.infer<typeof formSchema>;

const INITIATOR_STEP_4_STORAGE_KEY = 'InitiatorStep4';

const PageForm: React.FC<{ initialData?: FormValues; setInitialData: (data: FormValues) => void }> = ({
    initialData,
    setInitialData
}) => {
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
        setInitialData(form.getValues());
        router.push('/initiate/3');
    }
    function onSubmit(values: FormValues) {
        setInitialData(values);
        router.push('/initiate/5');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-12 font-roboto'>
                <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
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

export const InitiatorStep4Form: React.FC = () => {
    const [initialData, setInitialData] = useLocalStorage<FormValues>(INITIATOR_STEP_4_STORAGE_KEY, undefined);
    useEffect(() => {
        setIsLoading(false);
    }, [initialData, setInitialData]);
    const [isLoading, setIsLoading] = useState(true);
    if (!isLoading) {
        return <PageForm initialData={initialData} setInitialData={setInitialData} />;
    }

    return <></>;
};
