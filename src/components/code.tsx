import type { ReactNode } from 'react';

export const Code = ({ children }: { children: ReactNode }) => {
    return <code className='rounded-lg bg-gray-200 px-2 py-1'>{children}</code>;
};
