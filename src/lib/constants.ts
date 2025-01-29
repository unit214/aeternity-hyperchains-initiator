import { PinningChain } from '@/lib/types';

export const INITIATOR_STEP_1_STORAGE_KEY = 'InitiatorStep1';
export const INITIATOR_STEP_2_STORAGE_KEY = 'InitiatorStep2';
export const INITIATOR_STEP_3_STORAGE_KEY = 'InitiatorStep3';
export const INITIATOR_STEP_4_STORAGE_KEY = 'InitiatorStep4';

export const DOCUMENTATION_URL = 'https://github.com/aeternity/aeternity/blob/master/docs/hyperchains.md';

export const pinningChains: PinningChain[] = [
    {
        name: 'Aeternity',
        symbol: 'AE',
        blockTime: 180000,
        decimals: 18,
        contractSourcesPrefix: 'https://raw.githubusercontent.com/aeternity/aeternity/refs/tags/v7.3.0-rc2/'
    }
    // { name: 'Bitcoin', symbol: 'BTC', blockTime: 600000n, decimals: 18 }
];

export enum Step {
    'One' = '1',
    'Two' = '2',
    'Three' = '3',
    'Four' = '4'
}
export enum StepFieldName {
    networkId = 'networkId',
    childBlockTime = 'childBlockTime',
    pinningChain = 'pinningChain',
    pinningChainNetworkId = 'pinningChainNetworkId',
    pinningChainNodeUrl = 'pinningChainNodeUrl',
    pinningChainEpochLength = 'pinningChainEpochLength',
    blockReward = 'blockReward',
    pinningReward = 'pinningReward',
    validatorCount = 'validatorCount',
    validatorBalance = 'validatorBalance',
    validatorMinStake = 'validatorMinStake',
    faucetInitBalance = 'faucetInitBalance',
    treasuryInitBalance = 'treasuryInitBalance'
}

export const stepFields = {
    [StepFieldName.networkId]: {
        label: 'Hyperchain ID',
        tooltip: 'A unique identifier for your Hyperchain network.',
        step: Step.One
    },
    [StepFieldName.childBlockTime]: {
        label: 'Hyperchain Block Time',
        tooltip: 'The time (in milliseconds) between each key block creation.',
        step: Step.One
    },
    [StepFieldName.pinningChain]: {
        label: 'Pinning Chain',
        tooltip: 'The pinning blockchain where the Hyperchain commits its states.',
        step: Step.Two
    },
    [StepFieldName.pinningChainNetworkId]: {
        label: 'Pinning Chain Network ID',
        tooltip: 'The unique identifier for the pinning chain network the Hyperchain connects to.',
        step: Step.Two
    },
    [StepFieldName.pinningChainNodeUrl]: {
        label: 'Pinning Chain Node URL',
        tooltip: 'The API endpoint of a node in the pinning chain for syncing and block updates.',
        step: Step.Two
    },
    [StepFieldName.pinningChainEpochLength]: {
        label: 'Pinning Chain Epoch Length',
        tooltip: 'The number of blocks that make up an epoch on the pinning chain.',
        step: Step.Two
    },
    [StepFieldName.blockReward]: {
        label: 'Block Reward',
        tooltip: 'The amount of native Hyperchain tokens rewarded to the validator for producing a new block.',
        step: Step.Three
    },
    [StepFieldName.pinningReward]: {
        label: 'Pinning Reward',
        tooltip:
            'The amount of native Hyperchain tokens rewarded to validators for successfully committing the Hyperchain state to the pinning chain.',
        step: Step.Three
    },
    [StepFieldName.validatorCount]: {
        label: 'Number Of Validators',
        tooltip: 'The initial number of validators to participate in the Hyperchain network.',
        step: Step.Four
    },
    [StepFieldName.validatorBalance]: {
        label: 'Validator Balance',
        tooltip: 'The initial balance allocated to validators at the genesis of the Hyperchain.',
        step: Step.Four
    },
    [StepFieldName.validatorMinStake]: {
        label: 'Minimum Staking Amount',
        tooltip: 'The minimum number of native Hyperchain tokens required to stake and become a validator.',
        step: Step.Four
    },
    [StepFieldName.faucetInitBalance]: {
        label: 'Faucet Init Balance',
        tooltip: 'The initial balance of the faucet which can be employed to automatically fund accounts on the chain.',
        step: Step.Four
    },
    [StepFieldName.treasuryInitBalance]: {
        label: 'Treasury Init Balance',
        tooltip: 'The initial balance of the treasury which is used for manually funding accounts on the chain.',
        step: Step.Four
    }
};
