import type { ReactNode } from 'react';

export const Code = ({ children }: { children: ReactNode }) => {
    return <div className='text-normal inline-flex w-fit rounded-lg bg-gray-200 px-2 py-1 font-mono'>{children}</div>;
};
