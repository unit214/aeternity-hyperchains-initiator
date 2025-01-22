import BigNumber from 'bignumber.js';
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// @ts-expect-error allow converting bigint to json
BigInt.prototype.toJSON = function () {
    return this.toString();
};

export const expandDecimals = (val: string, decimals: number) => BigInt(BigNumber(val).shiftedBy(decimals).toFixed(0));
