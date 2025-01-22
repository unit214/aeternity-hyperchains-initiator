import { DEFAULT_FAUCET_INIT_BALANCE, DEFAULT_TREASURY_INIT_BALANCE, parentChains } from '@/lib/constants';
import { expandDecimals } from '@/lib/utils';

import { z } from 'zod';

export const Steps = ['1', '2', '3', '4'];

const positiveBigIntOrNumberSchema = z.union([
    z.coerce
        .bigint()
        .positive()
        .transform((n) => n.toString()),
    z.coerce
        .number()
        .positive()
        .transform((n) => n.toString())
])
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
    fixedCoinbase: positiveBigIntOrNumberSchema,
    pinningReward: positiveBigIntOrNumberSchema
});

export const step4FormSchema = z.object({
    validatorCount: z.coerce.bigint().positive(),
    validatorBalance: positiveBigIntOrNumberSchema,
    validatorMinStake: positiveBigIntOrNumberSchema
});

export type Step1FormValues = z.infer<typeof step1FormSchema>;
export type Step2FormValues = z.infer<typeof step2FormSchema>;
export type Step3FormValues = z.infer<typeof step3FormSchema>;
export type Step4FormValues = z.infer<typeof step4FormSchema>;

export const completeFormSchema = z
    .object({
        networkId: z.string({ message: Steps[0] }),
        childBlockTime: z.coerce.bigint({ message: Steps[0] }),
        pinningReward: z.string({ message: Steps[2] }),
        fixedCoinbase: z.string({ message: Steps[2] }),
        parent: z.string({ message: Steps[1] }).nonempty(Steps[1]),
        parentNetworkId: z.string({ message: Steps[1] }).nonempty(Steps[1]),
        parentNodeURL: z.string({ message: Steps[1] }).nonempty(Steps[1]),
        parentEpochLength: z.coerce.bigint().positive(Steps[1]),
        validatorCount: z.coerce.bigint({ message: Steps[3] }).positive(Steps[3]),
        validatorBalance: z.coerce.string({ message: Steps[3] }),
        validatorMinStake: z.coerce.string({ message: Steps[3] })
    })
    .transform((data) => {
        const parentChain = parentChains.filter((c) => c.symbol === data.parent).at(0)!;

        return {
            childBlockTime: data.childBlockTime,
            childEpochLength: (data.parentEpochLength * parentChain.blockTime) / data.childBlockTime, // TODO take next higher number for non absolute result?
            contractSourcesPrefix: 'https://raw.githubusercontent.com/aeternity/aeternity/refs/tags/v7.3.0-rc2/',
            enablePinning: true,
            faucetInitBalance: DEFAULT_FAUCET_INIT_BALANCE,
            fixedCoinbase: expandDecimals(data.fixedCoinbase, parentChain.decimals, Steps[2]),
            networkId: data.networkId,
            parentChain: {
                epochLength: data.parentEpochLength,
                networkId: data.parentNetworkId,
                nodeURL: data.parentEpochLength,
                type: `AE2${parentChain.symbol}`
            },
            pinningReward: expandDecimals(data.pinningReward, parentChain.decimals, Steps[2]),
            treasuryInitBalance: DEFAULT_TREASURY_INIT_BALANCE,
            validators: {
                count: data.validatorCount,
                balance: expandDecimals(data.validatorBalance, parentChain.decimals, Steps[3]),
                validatorMinStake: expandDecimals(data.validatorMinStake, parentChain.decimals, Steps[3])
            }
        };
    });

export type CompleteForm = z.infer<typeof completeFormSchema>;
