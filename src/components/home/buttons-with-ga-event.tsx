'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { sendGAEvent } from '@next/third-parties/google';

export const GetStartedButton = (props: ButtonProps) => {
    return (
        <Button
            onClick={() => sendGAEvent('event', 'button_get_started_clicked')}
            data-cy='button-get-started'
            className='w-fit self-center'
            variant='default'
            {...props}>
            Get Started
        </Button>
    );
};

export const AgreeButton = (props: ButtonProps) => {
    return (
        <Button onClick={() => sendGAEvent('event', 'button_agree')} data-cy='button-agree' type='submit' {...props}>
            Agree &amp; Continue
        </Button>
    );
};
