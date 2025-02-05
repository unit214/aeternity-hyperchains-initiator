'use client';

import { useEffect, useState } from 'react';

import CookieConsent from '@/components/cookie-consent';
import { GoogleAnalytics } from '@next/third-parties/google';

const CookieConsentAndGoogleAnalytics = () => {
    const [googleAnalyticsEnabled, setGoogleAnalyticsEnabled] = useState(false);
    useEffect(() => {
        if (document.cookie.includes('cookieConsent=true')) {
            setGoogleAnalyticsEnabled(true);
        }
    }, []);
    const enableGoogleAnalytics = () => {
        setGoogleAnalyticsEnabled(true);
    };

    return (
        <>
            <CookieConsent onAcceptCallback={enableGoogleAnalytics} />
            {googleAnalyticsEnabled && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || ''} />}
        </>
    );
};

export default CookieConsentAndGoogleAnalytics;
