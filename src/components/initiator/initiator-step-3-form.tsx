'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLocalStorage } from '@/lib/useLocalStorage';
import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
    blockReward: z.coerce.number().gt(0),
    pinningReward: z.coerce.number().gt(0),
    slashingFee: z.coerce.number().gt(0),
    transactionFailurePenalty: z.coerce.number().gt(0),
    mintingAmount: z.coerce.number().gt(0),
    pinningInterval: z.string(),
    parentChainTransactionFee: z.coerce.number().gt(0),
    tokenAccountPublicAddress: z.string().url()
});
type FormValues = z.infer<typeof formSchema>;

const INITIATOR_STEP_3_STORAGE_KEY = 'InitiatorStep3';

const PageForm: React.FC<{ initialData?: FormValues; setInitialData: (data: FormValues) => void }> = ({
    initialData,
    setInitialData
}) => {
    const router = useRouter();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            blockReward: initialData?.blockReward || ('' as unknown as number),
            pinningReward: initialData?.pinningReward || ('' as unknown as number),
            slashingFee: initialData?.slashingFee || ('' as unknown as number),
            transactionFailurePenalty: initialData?.transactionFailurePenalty || ('' as unknown as number),
            mintingAmount: initialData?.mintingAmount || ('' as unknown as number),
            pinningInterval: initialData?.pinningInterval || '',
            parentChainTransactionFee: initialData?.parentChainTransactionFee || ('' as unknown as number),
            tokenAccountPublicAddress: initialData?.tokenAccountPublicAddress || ''
        }
    });

    function onBack() {
        setInitialData(form.getValues());
        router.push('/initiate/2');
    }

    function onSubmit(values: FormValues) {
        setInitialData(values);
        router.push('/initiate/4');
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-12 font-roboto'>
                    <div className='grid grid-cols-2 gap-x-12 gap-y-6'>
                        <FormField
                            control={form.control}
                            name='blockReward'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Block Reward' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 2.5' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='pinningReward'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Pinning Reward' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 0.1' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='slashingFee'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Slashing Fee' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 0.05' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='transactionFailurePenalty'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Transaction Failure Penalty' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 0.02' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='mintingAmount'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Minting amount' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 1,000,000' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='pinningInterval'
                            render={({ field: { value, onChange } }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Pinning Interval' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Select value={value} onValueChange={onChange} defaultValue={value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder='Every 100 blocks' />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value='100'>Every 100 blocks</SelectItem>
                                                <SelectItem value='200'>Every 200 blocks</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='parentChainTransactionFee'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Parent Chain Transaction Fee' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder='Ex: 0.0001' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name='tokenAccountPublicAddress'
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabelWithTooltip label='Token account public address' tooltip='Tooltip Text' />
                                    <FormControl>
                                        <Input placeholder=' https://user:password@some.address.com:8000' {...field} />
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

export const InitiatorStep3Form: React.FC = () => {
    const [initialData, setInitialData] = useLocalStorage<FormValues>(INITIATOR_STEP_3_STORAGE_KEY, undefined);
    useEffect(() => {
        setIsLoading(false);
    }, [initialData, setInitialData]);
    const [isLoading, setIsLoading] = useState(true);
    if (!isLoading) {
        return <PageForm initialData={initialData} setInitialData={setInitialData} />;
    }

    return <></>;
};
