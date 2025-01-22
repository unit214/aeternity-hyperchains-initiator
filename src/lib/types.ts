import { DEFAULT_FAUCET_INIT_BALANCE, DEFAULT_TREASURY_INIT_BALANCE, parentChains } from '@/lib/constants';
import { expandDecimals } from '@/lib/utils';

import { z } from 'zod';

export const FormSteps = ['1', '2', '3', '4'];

const greaterThanZeroBigIntSchema = z.coerce
    .bigint()
    .gt(0n, 'Input must be greater than 0')
    .transform((n) => n.toString());

const greaterThanZeroNumberSchema = z.coerce
    .number()
    .gt(0, 'Input must be greater than 0')
    .transform((n) => n.toString());

const greaterThanZeroBigIntOrNumberSchema = z.union([greaterThanZeroBigIntSchema, greaterThanZeroNumberSchema]);

export const step1FormSchema = z.object({
    networkId: z.string().nonempty('Required'),
    childBlockTime: z.coerce.bigint().min(3000n).max(10000n)
});

export const step2FormSchema = z.object({
    parent: z.string(),
    parentNetworkId: z.string().nonempty('Required'),
    parentNodeURL: z.string().nonempty().url(),
    parentEpochLength: z.coerce.bigint().min(0n).max(100n)
});

export const step3FormSchema = z.object({
    fixedCoinbase: greaterThanZeroBigIntOrNumberSchema,
    pinningReward: greaterThanZeroBigIntOrNumberSchema
});

export const step4FormSchema = z.object({
    validatorCount: greaterThanZeroBigIntSchema,
    validatorBalance: greaterThanZeroBigIntOrNumberSchema,
    validatorMinStake: greaterThanZeroBigIntOrNumberSchema
});

export const formSchema = z
    .object({
        networkId: z.string({ message: FormSteps[0] }),
        childBlockTime: z.coerce.bigint({ message: FormSteps[0] }),
        parent: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNetworkId: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNodeURL: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentEpochLength: z.coerce.bigint({ message: FormSteps[1] }),
        pinningReward: z.string({ message: FormSteps[2] }),
        fixedCoinbase: z.string({ message: FormSteps[2] }),
        validatorCount: z.coerce.bigint({ message: FormSteps[3] }),
        validatorBalance: z.coerce.string({ message: FormSteps[3] }),
        validatorMinStake: z.coerce.string({ message: FormSteps[3] })
    })
    .transform((data) => {
        const parentChain = parentChains.filter((c) => c.symbol === data.parent).at(0)!;

        return {
            childBlockTime: data.childBlockTime,
            childEpochLength: (data.parentEpochLength * parentChain.blockTime) / data.childBlockTime, // TODO take next higher number for non absolute result?
            contractSourcesPrefix: parentChain.contractSourcesPrefix,
            enablePinning: true,
            faucetInitBalance: DEFAULT_FAUCET_INIT_BALANCE,
            fixedCoinbase: expandDecimals(data.fixedCoinbase, parentChain.decimals, FormSteps[2]),
            networkId: data.networkId,
            parentChain: {
                epochLength: data.parentEpochLength,
                networkId: data.parentNetworkId,
                nodeURL: data.parentEpochLength,
                type: `AE2${parentChain.symbol}`
            },
            pinningReward: expandDecimals(data.pinningReward, parentChain.decimals, FormSteps[2]),
            treasuryInitBalance: DEFAULT_TREASURY_INIT_BALANCE,
            validators: {
                count: data.validatorCount,
                balance: expandDecimals(data.validatorBalance, parentChain.decimals, FormSteps[3]),
                validatorMinStake: expandDecimals(data.validatorMinStake, parentChain.decimals, FormSteps[3])
            }
        };
    });

export type Step1FormValues = z.infer<typeof step1FormSchema>;
export type Step2FormValues = z.infer<typeof step2FormSchema>;
export type Step3FormValues = z.infer<typeof step3FormSchema>;
export type Step4FormValues = z.infer<typeof step4FormSchema>;
export type FormValues = z.infer<typeof formSchema>;
