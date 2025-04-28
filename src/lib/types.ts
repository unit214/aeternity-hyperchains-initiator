export type PinningChain = {
    name: string;
    symbol: string;
    blockTime: number;
    decimals: number;
    contractSourcesPrefix: string;
};

interface FunctionAci {
    arguments: unknown[];
    name: string;
    payable: boolean;
    returns: unknown;
    stateful: boolean;
}
export type Aci = Array<{
    contract?: {
        name: string;
        event?: unknown;
        functions: FunctionAci[];
        kind: string;
        payable: boolean;
        typedefs: unknown[];
        state?: unknown;
    };
}>;
