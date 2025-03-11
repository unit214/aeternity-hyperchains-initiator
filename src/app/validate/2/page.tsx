'use client'

import * as React from "react";
import {ReactNode, useEffect, useState} from "react";
import {clearLocalStorage, getFromLocalStorage} from "@/lib/local-storage";
import {NODE_DATA, VALIDATOR_STEP_1_STORAGE_KEY} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import {sendGAEvent} from "@next/third-parties/google";
import {downloadYaml} from "@/lib/file";
import {ValidatorNodeConfig} from "@/app/validate/types/types";

const Initiator: React.FC = () => {
    const [data, setData] = useState<ValidatorNodeConfig | undefined>();
    const [error, setError] = useState<ReactNode | undefined>();
    const fileName = 'validate.yaml';
    useEffect(() => {
        const storedData = getFromLocalStorage<ValidatorNodeConfig>(NODE_DATA);
        if (storedData) {
            setData(storedData);
            // validate data
        } else {
            setError('No data found');
        }
    }, []);

    const downloadFileAndClearCache = async () => {
        downloadYaml(fileName, data);
        clearLocalStorage([VALIDATOR_STEP_1_STORAGE_KEY]);
        clearLocalStorage([NODE_DATA]);
    };

    return (
        <div className='flex flex-row justify-between gap-20'>
            <div className='mt-11 flex flex-col md:mx-28 md:mt-20 xl:mr-0'>
                {error && (
                    <>
                        <div className='mb-4 text-2xl font-semibold md:text-4xl'>Error parsing form data</div>
                        <span className='mb-16 font-sans text-base text-muted-foreground md:mb-24'>{error}</span>
                    </>
                )}
                {!error && data && (
                    <div>Download a file
                        <Button
                            data-cy='button-download'
                            variant='default'
                            className='ml-auto hidden w-32 md:flex'
                            onClick={() => {
                                sendGAEvent('event', 'button_download');
                                downloadFileAndClearCache();
                            }}>
                            Download
                        </Button>
                        <Button
                            data-cy='button-download-mobile'
                            variant='default'
                            className='mt-2 w-full md:hidden'
                            onClick={() => {
                                sendGAEvent('event', 'button_download');
                                downloadFileAndClearCache();
                            }}>
                            Download
                        </Button>
                    </div>)}
            </div>
        </div>)
}

export default Initiator;
