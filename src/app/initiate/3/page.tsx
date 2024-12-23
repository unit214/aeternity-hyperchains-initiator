'use client';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { FormLabelWithTooltip } from '@/components/form/form-label-with-tooltip';
import { InitiatorStep } from '@/components/initiator-step';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { INITIATOR_STEP_3_STORAGE_KEY } from '@/lib/constants';
import { getFromLocalStorage, saveToLocalStorage } from '@/lib/local-storage';
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

const InitiatorForm: React.FC<{ initialData: FormValues | null }> = ({ initialData }) => {
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
        saveToLocalStorage<FormValues>(form.getValues(), INITIATOR_STEP_3_STORAGE_KEY);
        router.push('/initiate/2');
    }

    function onSubmit(values: FormValues) {
        saveToLocalStorage<FormValues>(values, INITIATOR_STEP_3_STORAGE_KEY);
        router.push('/initiate/4');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='flex flex-col justify-between gap-10 font-roboto md:min-h-[450px]'>
                <div className='grid grid-cols-1 gap-x-12 gap-y-8 md:grid-cols-2 md:gap-y-6'>
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
    );
};

const FormWrapper: React.FC = () => {
    const [initialData, setInitialData] = useState<FormValues | null | undefined>(undefined);
    useEffect(() => {
        setInitialData(getFromLocalStorage<FormValues>(INITIATOR_STEP_3_STORAGE_KEY));
    }, []);

    if (initialData !== undefined) {
        return <InitiatorForm initialData={initialData} />;
    }

    return <></>;
};

const Initiate3Page: React.FC = () => {
    return (
        <div className='flex size-full items-center justify-center'>
            <InitiatorStep
                title='Set Token Economics'
                stepNumber={3}
                description='Establish the rules for validators on your child chain to ensure network security and efficiency.'
                form={<FormWrapper />}
            />
        </div>
    );
};

export default Initiate3Page;
