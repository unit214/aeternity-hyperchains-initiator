import {
    DEFAULT_FAUCET_INIT_BALANCE,
    DEFAULT_TREASURY_INIT_BALANCE,
    INITIATOR_STEP_2_STORAGE_KEY,
    parentChains
} from '@/lib/constants';
import { getFromLocalStorage } from '@/lib/local-storage';
import { expandDecimals } from '@/lib/utils';

import BigNumber from 'bignumber.js';
import { z } from 'zod';

const bigNumberGreaterThanZeroSchema = ({
    fieldName = undefined,
    withDecimals = true,
    errorMessage = undefined
}: {
    fieldName?: string;
    withDecimals?: boolean;
    errorMessage?: string;
}) =>
    z
        .string({ message: errorMessage ? errorMessage : `${fieldName} is required` })
        .nonempty(errorMessage ? errorMessage : `${fieldName} is required`)
        .transform((n, ctx) => {
            const decimals =
                (withDecimals &&
                    ((localStorage &&
                        parentChains
                            .filter(
                                (c) =>
                                    c.symbol ===
                                    getFromLocalStorage<Step2FormValues>(INITIATOR_STEP_2_STORAGE_KEY)?.parent
                            )
                            .at(0)?.decimals) ||
                        18)) ||
                0;
            if (!BigNumber(n).c) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage
                        ? errorMessage
                        : `${fieldName} is not a valid number ${decimals > 0 && '(use . as a separator)'}`
                });
            }
            if (!BigNumber(n).isGreaterThan(0)) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage ? errorMessage : `${fieldName} must be greater than 0`
                });
            }
            if (BigNumber(n).decimalPlaces()! > decimals) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage
                        ? errorMessage
                        : `${decimals > 0 ? 'Only up to ${decimals} decimal places are allowed' : 'Only whole numbers are allowed'}`
                });
            }

            return n;
        });

export const step1FormSchema = z.object({
    networkId: z.string().nonempty('Hyperchain ID is required'),
    childBlockTime: z.coerce.bigint().min(3000n).max(10000n)
});

export const step2FormSchema = z.object({
    parent: z.string(),
    parentNetworkId: z.string().nonempty('Chain Network ID is required'),
    parentNodeURL: z.string().nonempty('Parent Node URL is required').url(),
    parentEpochLength: z.coerce.bigint().min(0n).max(100n)
});

export const step3FormSchema = z.object({
    fixedCoinbase: bigNumberGreaterThanZeroSchema({ fieldName: 'Block Reward' }),
    pinningReward: bigNumberGreaterThanZeroSchema({ fieldName: 'Pinning Reward' })
});

export const step4FormSchema = z.object({
    validatorCount: bigNumberGreaterThanZeroSchema({ fieldName: 'Number Of Validators', withDecimals: false }),
    validatorBalance: bigNumberGreaterThanZeroSchema({ fieldName: 'Validator Balance' }),
    validatorMinStake: bigNumberGreaterThanZeroSchema({ fieldName: 'Minimum Staking Amount' })
});

export const FormSteps = ['1', '2', '3', '4'];

export const formSchema = z
    // validate input
    .object({
        networkId: z.string({ message: FormSteps[0] }).nonempty(FormSteps[0]),
        childBlockTime: z.coerce.bigint({ message: FormSteps[0] }).min(3000n, FormSteps[0]).max(10000n, FormSteps[0]),
        parent: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNetworkId: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNodeURL: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]).url(FormSteps[1]),
        parentEpochLength: z.coerce.bigint({ message: FormSteps[1] }).min(0n, FormSteps[1]).max(100n, FormSteps[1]),
        pinningReward: bigNumberGreaterThanZeroSchema({ errorMessage: FormSteps[2] }),
        fixedCoinbase: bigNumberGreaterThanZeroSchema({ errorMessage: FormSteps[2] }),
        validatorCount: bigNumberGreaterThanZeroSchema({ withDecimals: false, errorMessage: FormSteps[3] }),
        validatorBalance: bigNumberGreaterThanZeroSchema({ errorMessage: FormSteps[3] }),
        validatorMinStake: bigNumberGreaterThanZeroSchema({ errorMessage: FormSteps[3] })
    })
    // convert into desired output
    .transform((data) => {
        const parentChain = parentChains.filter((c) => c.symbol === data.parent).at(0)!;

        return {
            childBlockTime: data.childBlockTime,
            childEpochLength: (data.parentEpochLength * parentChain.blockTime) / data.childBlockTime, // TODO take next higher number for non absolute result?
            contractSourcesPrefix: parentChain.contractSourcesPrefix,
            enablePinning: true,
            faucetInitBalance: DEFAULT_FAUCET_INIT_BALANCE,
            fixedCoinbase: expandDecimals(data.fixedCoinbase, parentChain.decimals),
            networkId: data.networkId,
            parentChain: {
                epochLength: data.parentEpochLength,
                networkId: data.parentNetworkId,
                nodeURL: data.parentEpochLength,
                type: `AE2${parentChain.symbol}`
            },
            pinningReward: expandDecimals(data.pinningReward, parentChain.decimals),
            treasuryInitBalance: DEFAULT_TREASURY_INIT_BALANCE,
            validators: {
                count: data.validatorCount,
                balance: expandDecimals(data.validatorBalance, parentChain.decimals),
                validatorMinStake: expandDecimals(data.validatorMinStake, parentChain.decimals)
            }
        };
    });

export type Step1FormValues = z.infer<typeof step1FormSchema>;
export type Step2FormValues = z.infer<typeof step2FormSchema>;
export type Step3FormValues = z.infer<typeof step3FormSchema>;
export type Step4FormValues = z.infer<typeof step4FormSchema>;
export type FormValues = z.infer<typeof formSchema>;
