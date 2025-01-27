import { INITIATOR_STEP_2_STORAGE_KEY, parentChains } from '@/lib/constants';
import { getFromLocalStorage } from '@/lib/local-storage';
import { ParentChain } from '@/lib/types';
import { expandDecimals } from '@/lib/utils';

import BigNumber from 'bignumber.js';
import { z } from 'zod';

const getParentChainFromLocalStorage = (): ParentChain | undefined =>
    localStorage &&
    parentChains
        .filter((c) => c.symbol === getFromLocalStorage<Step2FormValues>(INITIATOR_STEP_2_STORAGE_KEY)?.parent)
        .at(0);

const parentDecimals = () => getParentChainFromLocalStorage()?.decimals || 18;

const bigNumberSchema = ({
    fieldName = undefined,
    errorMessage = undefined,
    gt,
    min,
    max,
    dec = () => 0
}: {
    fieldName?: string;
    errorMessage?: string;
    gt?: bigint;
    min?: bigint;
    max?: bigint;
    dec?: () => number;
}) =>
    z.coerce
        .string({ message: errorMessage ? errorMessage : `${fieldName} is required` })
        .nonempty(errorMessage ? errorMessage : `${fieldName} is required`)
        .transform((n, ctx) => {
            if (!BigNumber(n).c) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage
                        ? errorMessage
                        : `${fieldName} is not a valid number${dec() > 0 ? ' (use . as a separator)' : ''}`
                });
            }
            if (gt && !BigNumber(n).isGreaterThan(gt.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage ? errorMessage : `${fieldName} must be greater than ${gt}`
                });
            }
            if (min && !BigNumber(n).isGreaterThanOrEqualTo(min.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage ? errorMessage : `${fieldName} must be at least ${min}`
                });
            }
            if (max && !BigNumber(n).isLessThanOrEqualTo(max.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage ? errorMessage : `${fieldName} must not be greater than ${max}`
                });
            }
            if (BigNumber(n).decimalPlaces()! > dec()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: errorMessage
                        ? errorMessage
                        : `${dec() > 0 ? `Only up to ${dec} decimal places are allowed` : 'Only whole numbers are allowed'}`
                });
            }

            return n;
        });

export const step1FormSchema = z.object({
    networkId: z.string().nonempty('Hyperchain ID is required'),
    childBlockTime: bigNumberSchema({ fieldName: 'Hyperchain Block Time', min: 3000n, max: 10000n })
});

export const step2FormSchema = z.object({
    parent: z.string(),
    parentNetworkId: z.string().nonempty('Chain Network ID is required'),
    parentNodeURL: z.string().nonempty('Parent Node URL is required').url(),
    parentEpochLength: bigNumberSchema({ fieldName: 'Parent Epoch Length', min: 10n, max: 100n })
});

export const step3FormSchema = z.object({
    fixedCoinbase: bigNumberSchema({ fieldName: 'Block Reward', gt: 0n, dec: parentDecimals }),
    pinningReward: bigNumberSchema({ fieldName: 'Pinning Reward', gt: 0n, dec: parentDecimals })
});

export const step4FormSchema = z
    .object({
        validatorCount: bigNumberSchema({ fieldName: 'Number Of Validators', gt: 0n }),
        validatorBalance: bigNumberSchema({ fieldName: 'Validator Balance', gt: 0n, dec: parentDecimals }),
        validatorMinStake: bigNumberSchema({ fieldName: 'Minimum Staking Amount', gt: 0n, dec: parentDecimals }),
        faucetInitBalance: bigNumberSchema({ fieldName: 'Faucet Init Balance', gt: 0n, dec: parentDecimals }),
        treasuryInitBalance: bigNumberSchema({ fieldName: 'Treasury Init Balance', gt: 0n, dec: parentDecimals })
    })
    .transform((data, ctx) => {
        if (BigNumber(data.validatorBalance).isLessThan(data.validatorMinStake)) {
            ctx.addIssue({
                path: ['validatorBalance'],
                code: z.ZodIssueCode.custom,
                message: 'Validator Balance can not be smaller than Minimum Staking Amount'
            });
            ctx.addIssue({
                path: ['validatorMinStake'],
                code: z.ZodIssueCode.custom,
                message: 'Minimum Staking Amount can not be greater than Validator Balance'
            });
        }

        return data;
    });

export const FormSteps = ['1', '2', '3', '4'];

export const formSchema = z
    // validate input
    .object({
        networkId: z.string({ message: FormSteps[0] }).nonempty(FormSteps[0]),
        childBlockTime: bigNumberSchema({ errorMessage: FormSteps[0], min: 3000n, max: 10000n }),
        parent: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNetworkId: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]),
        parentNodeURL: z.string({ message: FormSteps[1] }).nonempty(FormSteps[1]).url(FormSteps[1]),
        parentEpochLength: bigNumberSchema({ errorMessage: FormSteps[1], min: 10n, max: 100n }),
        pinningReward: bigNumberSchema({ errorMessage: FormSteps[2], gt: 0n, dec: parentDecimals }),
        fixedCoinbase: bigNumberSchema({ errorMessage: FormSteps[2], gt: 0n, dec: parentDecimals }),
        validatorCount: bigNumberSchema({ errorMessage: FormSteps[3], gt: 0n }),
        validatorBalance: bigNumberSchema({ errorMessage: FormSteps[3], gt: 0n, dec: parentDecimals }),
        validatorMinStake: bigNumberSchema({ errorMessage: FormSteps[3], gt: 0n, dec: parentDecimals }),
        faucetInitBalance: bigNumberSchema({ errorMessage: FormSteps[3], gt: 0n, dec: parentDecimals }),
        treasuryInitBalance: bigNumberSchema({ errorMessage: FormSteps[3], gt: 0n, dec: parentDecimals })
    })
    .transform((data, ctx) => {
        if (BigNumber(data.validatorBalance).isLessThan(data.validatorMinStake)) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: FormSteps[3] });
        }

        return data;
    })
    // convert into desired output
    .transform((data) => {
        const parentChain = parentChains.filter((c) => c.symbol === data.parent).at(0)!;

        return {
            childBlockTime: BigInt(data.childBlockTime),
            childEpochLength: BigInt(
                BigNumber(data.parentEpochLength)
                    .multipliedBy(parentChain.blockTime)
                    .dividedBy(data.childBlockTime)
                    .toString()
            ), // TODO take next higher number for non absolute result?
            contractSourcesPrefix: parentChain.contractSourcesPrefix,
            enablePinning: true,
            faucetInitBalance: expandDecimals(data.faucetInitBalance, parentChain.decimals),
            fixedCoinbase: expandDecimals(data.fixedCoinbase, parentChain.decimals),
            networkId: data.networkId,
            parentChain: {
                epochLength: BigInt(data.parentEpochLength),
                networkId: data.parentNetworkId,
                nodeURL: data.parentNodeURL,
                type: `AE2${parentChain.symbol}`
            },
            pinningReward: expandDecimals(data.pinningReward, parentChain.decimals),
            treasuryInitBalance: expandDecimals(data.treasuryInitBalance, parentChain.decimals),
            validators: {
                count: BigInt(data.validatorCount),
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
