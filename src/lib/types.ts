import { z } from 'zod';

export const step1FormSchema = z.object({
    networkId: z.string().nonempty(),
    childBlockTime: z.coerce.bigint().min(3000n).max(10000n)
});

export const step2FormSchema = z.object({
    parent: z.string(),
    parentNetworkId: z.string().nonempty(),
    parentNodeUrl: z.string().nonempty().url(),
    parentEpochLength: z.coerce.bigint().min(0n).max(100n)
});

export const step3FormSchema = z.object({
    fixedCoinbase: z.coerce.bigint().gt(0n),
    pinningReward: z.coerce.bigint().gt(0n)
});

export const step4FormSchema = z.object({
    validatorCount: z.coerce.bigint().gt(0n),
    validatorBalance: z.coerce.bigint().gt(0n),
    validatorMinStake: z.coerce.bigint().gt(0n)
});

export type Step1FormValues = z.infer<typeof step1FormSchema>;
export type Step2FormValues = z.infer<typeof step2FormSchema>;
export type Step3FormValues = z.infer<typeof step3FormSchema>;
export type Step4FormValues = z.infer<typeof step4FormSchema>;
