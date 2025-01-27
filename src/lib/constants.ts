import { ParentChain } from '@/lib/types';

export const INITIATOR_STEP_1_STORAGE_KEY = 'InitiatorStep1';
export const INITIATOR_STEP_2_STORAGE_KEY = 'InitiatorStep2';
export const INITIATOR_STEP_3_STORAGE_KEY = 'InitiatorStep3';
export const INITIATOR_STEP_4_STORAGE_KEY = 'InitiatorStep4';

export const DEFAULT_FAUCET_INIT_BALANCE = 1000000000000000000000000000n;
export const DEFAULT_TREASURY_INIT_BALANCE = 1000000000000000000000000000000000000000000000000n;

export const parentChains: ParentChain[] = [
    {
        name: 'Aeternity',
        symbol: 'AE',
        blockTime: 180000,
        decimals: 18,
        contractSourcesPrefix: 'https://raw.githubusercontent.com/aeternity/aeternity/refs/tags/v7.3.0-rc2/'
    }
    // { name: 'Bitcoin', symbol: 'BTC', blockTime: 600000n, decimals: 18 }
];
