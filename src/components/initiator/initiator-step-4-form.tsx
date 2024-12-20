'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    unstakeDelay: z.number().min(0),
    validatorMinStake: z.number().min(0),
    validatorMinPercentage: z.number().min(0)
});

export const InitiatorStep4Form: React.FC = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {}
    });

    function onBack() {
        // TODO store form data in local storage
        router.push('/initiate/3');
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO store form data in local storage
        console.log(values);
        router.push('/initiate/5');
    }

    return (
        <>
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
                            Next
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
