import { INITIATOR_STEP_2_STORAGE_KEY, Step, StepFieldName, pinningChains, stepFields } from '@/lib/constants';
import { getFromLocalStorage } from '@/lib/local-storage';
import { PinningChain } from '@/lib/types';
import { expandDecimals } from '@/lib/utils';

import BigNumber from 'bignumber.js';
import { z } from 'zod';

const getPinningChainFromLocalStorage = (): PinningChain | undefined =>
    localStorage &&
    pinningChains
        .filter((c) => c.symbol === getFromLocalStorage<Step2FormValues>(INITIATOR_STEP_2_STORAGE_KEY)?.pinningChain)
        .at(0);

const pinningChainDecimals = () => getPinningChainFromLocalStorage()?.decimals || 18;

const bigNumberSchema = ({
    fieldName = undefined,
    gt,
    min,
    max,
    dec = () => 0,
    step = undefined
}: {
    fieldName?: string;
    gt?: bigint;
    min?: bigint;
    max?: bigint;
    dec?: () => number;
    step?: Step;
}) => {
    return z.coerce
        .string({ message: step ? step : `${fieldName} is required` })
        .nonempty(step ? step : `${fieldName} is required`)
        .transform((n, ctx) => {
            if (!BigNumber(n).c) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: step
                        ? step
                        : `${fieldName} is not a valid number${dec() > 0 ? ' (use . as a separator)' : ''}`
                });
            }
            if (gt && !BigNumber(n).isGreaterThan(gt.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: step ? step : `${fieldName} must be greater than ${gt}`
                });
            }
            if (min && !BigNumber(n).isGreaterThanOrEqualTo(min.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: step ? step : `${fieldName} must be at least ${min}`
                });
            }
            if (max && !BigNumber(n).isLessThanOrEqualTo(max.toString())) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: step ? step : `${fieldName} must not be greater than ${max}`
                });
            }
            if (BigNumber(n).decimalPlaces()! > dec()) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: step
                        ? step
                        : `${dec() > 0 ? `Only up to ${dec} decimal places are allowed` : 'Only whole numbers are allowed'}`
                });
            }

            return n;
        });
};

export const step1FormSchema = z.object({
    [StepFieldName.networkId]: z.string().nonempty(`${stepFields[StepFieldName.networkId].label} is required`),
    [StepFieldName.childBlockTime]: bigNumberSchema({
        fieldName: stepFields[StepFieldName.childBlockTime].label,
        min: 3000n,
        max: 10000n
    })
});

export const step2FormSchema = z.object({
    [StepFieldName.pinningChain]: z.string(),
    [StepFieldName.pinningChainNetworkId]: z
        .string()
        .nonempty(`${stepFields[StepFieldName.pinningChainNetworkId].label} is required`),
    [StepFieldName.pinningChainNodeUrl]: z
        .string()
        .nonempty(`${stepFields[StepFieldName.pinningChainNodeUrl].label} is required`)
        .url(`${stepFields[StepFieldName.pinningChainNodeUrl].label} is not a valid URL`),
    [StepFieldName.pinningChainEpochLength]: bigNumberSchema({
        fieldName: stepFields[StepFieldName.pinningChainEpochLength].label,
        min: 10n,
        max: 100n
    })
});

export const step3FormSchema = z.object({
    [StepFieldName.blockReward]: bigNumberSchema({
        fieldName: stepFields[StepFieldName.blockReward].label,
        gt: 0n,
        dec: pinningChainDecimals
    }),
    [StepFieldName.pinningReward]: bigNumberSchema({
        fieldName: stepFields[StepFieldName.pinningReward].label,
        gt: 0n,
        dec: pinningChainDecimals
    })
});

export const step4FormSchema = z
    .object({
        [StepFieldName.validatorCount]: bigNumberSchema({
            fieldName: stepFields[StepFieldName.validatorCount].label,
            gt: 0n
        }),
        [StepFieldName.validatorBalance]: bigNumberSchema({
            fieldName: stepFields[StepFieldName.validatorBalance].label,
            gt: 0n,
            dec: pinningChainDecimals
        }),
        [StepFieldName.validatorMinStake]: bigNumberSchema({
            fieldName: stepFields[StepFieldName.validatorMinStake].label,
            gt: 0n,
            dec: pinningChainDecimals
        }),
        [StepFieldName.faucetInitBalance]: bigNumberSchema({
            fieldName: stepFields[StepFieldName.faucetInitBalance].label,
            gt: 0n,
            dec: pinningChainDecimals
        }),
        [StepFieldName.treasuryInitBalance]: bigNumberSchema({
            fieldName: stepFields[StepFieldName.treasuryInitBalance].label,
            gt: 0n,
            dec: pinningChainDecimals
        })
    })
    .transform((data, ctx) => {
        if (BigNumber(data.validatorBalance).isLessThan(data.validatorMinStake) && BigInt(data.validatorCount) > 0n) {
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

export const formSchema = z
    // validate input
    .object({
        [StepFieldName.networkId]: z
            .string({ message: stepFields[StepFieldName.networkId].step })
            .nonempty(stepFields[StepFieldName.networkId].step),
        [StepFieldName.childBlockTime]: bigNumberSchema({
            min: 3000n,
            max: 10000n,
            step: stepFields[StepFieldName.childBlockTime].step
        }),
        [StepFieldName.pinningChain]: z
            .string({ message: stepFields[StepFieldName.pinningChain].step })
            .nonempty(stepFields[StepFieldName.pinningChain].step),
        [StepFieldName.pinningChainNetworkId]: z
            .string({ message: stepFields[StepFieldName.pinningChainNetworkId].step })
            .nonempty(stepFields[StepFieldName.pinningChainNetworkId].step),
        [StepFieldName.pinningChainNodeUrl]: z
            .string({ message: stepFields[StepFieldName.pinningChainNodeUrl].step })
            .nonempty(stepFields[StepFieldName.pinningChainNodeUrl].step)
            .url(stepFields[StepFieldName.pinningChainNodeUrl].step),
        [StepFieldName.pinningChainEpochLength]: bigNumberSchema({
            min: 10n,
            max: 100n,
            step: stepFields[StepFieldName.pinningChainEpochLength].step
        }),
        [StepFieldName.blockReward]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.blockReward].step
        }),
        [StepFieldName.pinningReward]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.pinningReward].step
        }),
        [StepFieldName.validatorCount]: bigNumberSchema({
            gt: 0n,
            step: stepFields[StepFieldName.validatorCount].step
        }),
        [StepFieldName.validatorBalance]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.validatorBalance].step
        }),
        [StepFieldName.validatorMinStake]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.validatorMinStake].step
        }),
        [StepFieldName.faucetInitBalance]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.faucetInitBalance].step
        }),
        [StepFieldName.treasuryInitBalance]: bigNumberSchema({
            gt: 0n,
            dec: pinningChainDecimals,
            step: stepFields[StepFieldName.treasuryInitBalance].step
        })
    })
    .transform((data, ctx) => {
        if (BigNumber(data.validatorBalance).isLessThan(data.validatorMinStake) && BigInt(data.validatorCount) > 0n) {
            ctx.addIssue({ code: z.ZodIssueCode.custom, message: Step.Four });
        }

        return data;
    })
    // convert into desired output
    .transform((data) => {
        const pinningChain = pinningChains.filter((c) => c.symbol === data.pinningChain).at(0)!;

        return {
            childBlockTime: BigInt(data.childBlockTime),
            childEpochLength: BigInt(
                BigNumber(data.pinningChainEpochLength)
                    .multipliedBy(pinningChain.blockTime)
                    .dividedBy(data.childBlockTime)
                    .toFixed(0)
            ), // TODO take next higher number for non absolute result?
            contractSourcesPrefix: pinningChain.contractSourcesPrefix,
            enablePinning: true,
            faucetInitBalance: expandDecimals(data.faucetInitBalance, pinningChain.decimals),
            fixedCoinbase: expandDecimals(data.blockReward, pinningChain.decimals),
            networkId: data.networkId,
            parentChain: {
                epochLength: BigInt(data.pinningChainEpochLength),
                networkId: data.pinningChainNetworkId,
                nodeURL: data.pinningChainNodeUrl,
                type: `AE2${pinningChain.symbol}`
            },
            pinningReward: expandDecimals(data.pinningReward, pinningChain.decimals),
            treasuryInitBalance: expandDecimals(data.treasuryInitBalance, pinningChain.decimals),
            validators: {
                count: BigInt(data.validatorCount),
                balance: expandDecimals(data.validatorBalance, pinningChain.decimals),
                validatorMinStake: expandDecimals(data.validatorMinStake, pinningChain.decimals)
            }
        };
    });

export type Step1FormValues = z.infer<typeof step1FormSchema>;
export type Step2FormValues = z.infer<typeof step2FormSchema>;
export type Step3FormValues = z.infer<typeof step3FormSchema>;
export type Step4FormValues = z.infer<typeof step4FormSchema>;
export type FormValues = z.infer<typeof formSchema>;
