'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    id: z.string().min(2, {
        message: 'Username must be at least 2 characters.'
    }),
    blockTime: z.number().min(0).max(10000),
    blockProductionTime: z.number().min(0).max(10000)
});

const Initiator1Form: React.FC = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: '0x3F2d4E7ftdrey764dygJUGeC89f',
            blockTime: 6500,
            blockProductionTime: 6500
        }
    });

    function onBack() {
        // TODO store form data in local storage
        router.push('/');
    }
    function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO store form data in local storage
        console.log(values);
        router.push('/initiate/2');
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-48'>
                    <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                        <FormField
                            control={form.control}
                            name='id'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Hyperchain ID</FormLabel>
                                    <FormControl>
                                        <Input disabled placeholder='shadcn' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='blockTime'
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>Hyperchain Block Time</FormLabel>
                                    <div className='flex flex-row gap-6'>
                                        <FormControl>
                                            <Input value={value} onChange={onChange} className='w-20' placeholder='0' />
                                        </FormControl>
                                        <div className='flex w-full flex-col justify-center gap-1'>
                                            <div className='text-grey-4 flex flex-row justify-between font-roboto text-sm'>
                                                <span>0</span> <span>10000</span>
                                            </div>
                                            <FormControl>
                                                <Slider
                                                    onValueChange={onChange}
                                                    value={[value]}
                                                    defaultValue={[value]}
                                                    max={10000}
                                                    step={1}
                                                />
                                            </FormControl>
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='blockProductionTime'
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabel>Hyperchain Block Production Time</FormLabel>
                                    <div className='flex flex-row gap-6'>
                                        <FormControl>
                                            <Input value={value} onChange={onChange} className='w-20' placeholder='0' />
                                        </FormControl>
                                        <div className='flex w-full flex-col justify-center gap-1'>
                                            <div className='text-grey-4 flex flex-row justify-between font-roboto text-sm'>
                                                <span>0</span> <span>10000</span>
                                            </div>
                                            <FormControl>
                                                <Slider
                                                    onValueChange={onChange}
                                                    value={[value]}
                                                    defaultValue={[value]}
                                                    max={10000}
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
        </>
    );
};

const Initiate1Page: React.FC = () => {
    return (
        <div className='mt-20 flex size-full items-center justify-center'>
            <InitiatorStep
                title='Configure Your Hyperchain'
                stepNumber={1}
                description='Define the operational parameters for your hyperchain, including block timings and network identifiers.'
                form={<Initiator1Form />}
            />
        </div>
    );
};

export default Initiate1Page;
