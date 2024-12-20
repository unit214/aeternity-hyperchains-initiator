'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { DayPicker, HoursPicker } from '@/components/form/date-picker';
import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalStorage } from '@uidotdev/usehooks';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    pinningChain: z.enum(['Aeternity', 'Bitcoin']),
    chainNetworkId: z.string(),
    chainConnectionUrl: z.string().url(),
    startTime: z.coerce.date(),
    finality: z.number().min(0).max(100)
});
type FormValues = z.infer<typeof formSchema>;

const INITIATOR_STEP_2_STORAGE_KEY = 'InitiatorStep2';

const PageForm: React.FC<{ initialData?: FormValues; setInitialData: (data: FormValues) => void }> = ({
    initialData,
    setInitialData
}) => {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            pinningChain: initialData?.pinningChain || 'Aeternity',
            chainNetworkId: initialData?.chainNetworkId || '',
            chainConnectionUrl: initialData?.chainConnectionUrl || '',
            startTime: initialData?.startTime
                ? new Date(initialData?.startTime)
                : new Date(new Date().setMinutes(0, 0, 0)),
            finality: initialData?.finality || 12
        }
    });

    function onBack() {
        setInitialData(form.getValues());
        router.push('/initiate/1');
    }
    function onSubmit(values: FormValues) {
        setInitialData(values);
        router.push('/initiate/3');
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-24 font-roboto'>
                <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                    <FormField
                        control={form.control}
                        name='pinningChain'
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Pinning Chain' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Select value={value} onValueChange={onChange} defaultValue={value}>
                                        <SelectTrigger>
                                            <SelectValue placeholder='Choose a parent chain connection' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value='Aeternity'>Aeternity</SelectItem>
                                            <SelectItem value='Bitcoin'>Bitcoin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='chainNetworkId'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Chain Network ID' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input placeholder='Ex: ae_mainnet | ae_uat' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='chainConnectionUrl'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Chain Connection URL' tooltip='Tooltip Text' />
                                <FormControl>
                                    <Input placeholder=' https://user:password@some.address.com:8000' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='startTime'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Start Time | Height' tooltip='Tooltip Text' />
                                <div className='flex flex-row gap-4'>
                                    <DayPicker value={field.value} onChange={field.onChange} />
                                    <HoursPicker value={field.value} onChange={field.onChange} />
                                </div>
                                <span className='font-roboto text-xs text-muted-foreground'>
                                    * The start time may vary slightly due to system adjustments.
                                </span>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='finality'
                        render={({ field: { value, onChange } }) => (
                            <FormItem>
                                <FormLabelWithTooltip label='Finality' tooltip='Tooltip Text' />
                                <div className='flex flex-row gap-6'>
                                    <FormControl>
                                        <Input value={value} onChange={onChange} className='w-20' placeholder='0' />
                                    </FormControl>
                                    <div className='flex w-full flex-col justify-center gap-1'>
                                        <div className='flex flex-row justify-between font-roboto text-sm text-grey-4'>
                                            <span>0</span> <span>100</span>
                                        </div>
                                        <FormControl>
                                            <Slider
                                                onValueChange={(v) => onChange(v[0])}
                                                value={[value]}
                                                defaultValue={[value]}
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

export const InitiatorStep2Form: React.FC = () => {
    const [initialData, setInitialData] = useLocalStorage<FormValues>(INITIATOR_STEP_2_STORAGE_KEY, undefined);
    useEffect(() => {
        setIsLoading(false);
    }, [initialData, setInitialData]);
    const [isLoading, setIsLoading] = useState(true);
    if (!isLoading) {
        return <PageForm initialData={initialData} setInitialData={setInitialData} />;
    }

    return <></>;
};
