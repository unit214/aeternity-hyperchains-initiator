'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    id: z.string(),
    blockTime: z.number().min(0).max(10000),
    blockProductionTime: z.number().min(0).max(10000)
});
type FormValues = z.infer<typeof formSchema>;

const INITIATOR_STEP_1_STORAGE_KEY = 'InitiatorStep1';

const PageForm: React.FC<{ initialData?: FormValues; setInitialData: (data: FormValues) => void }> = ({
    initialData,
    setInitialData
}) => {
    const router = useRouter();
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        values: {
            id: initialData?.id || '0x3F2d4E7ftdrey764dygJUGeC89f',
            blockTime: initialData?.blockTime || 6500,
            blockProductionTime: initialData?.blockProductionTime || 6500
        }
    });

    function onBack() {
        setInitialData(form.getValues());
        router.push('/');
    }
    function onSubmit(values: FormValues) {
        setInitialData(values);
        router.push('/initiate/2');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-48 font-roboto'>
                <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                    <FormField
                        control={form.control}
                        name='id'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Hyperchain ID' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input disabled placeholder='id' {...field} />
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
                                <FormLabelWithTooltip label='Hyperchain Block Time' tooltip='Tooltip Text' />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input value={value} onChange={onChange} className='w-20' placeholder='0' />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>0</span> <span>10000</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => onChange(v[0])}
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
                                <FormLabelWithTooltip label='Hyperchain Block Production Time' tooltip='Tooltip Text' />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input value={value} onChange={onChange} className='w-20' placeholder='0' />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>0</span> <span>10000</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => onChange(v[0])}
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
    );
};

export const InitiatorStep1Form: React.FC = () => {
    const [initialData, setInitialData] = useLocalStorage<FormValues>(INITIATOR_STEP_1_STORAGE_KEY, undefined);
    useEffect(() => {
        setIsLoading(false);
    }, [initialData, setInitialData]);
    const [isLoading, setIsLoading] = useState(true);
    if (!isLoading) {
        return <PageForm initialData={initialData} setInitialData={setInitialData} />;
    }

    return <></>;
};
