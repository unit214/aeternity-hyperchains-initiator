import Image from 'next/image';

const HomePage: React.FC = () => {
    return (
        <div className='font-clash'>
            <div className='text-4xl font-semibold'>Welcome to Your Chain Builder</div>
            <div className='font-roboto text-muted-foreground'>
                Ready to create your own blockchain? With just a few onboarding steps, you will receive your chain
            </div>
            <div className='flex gap-6'>
                <div className='flex w-64 flex-col items-start rounded-xl bg-primary-foreground p-4'>
                    <Image
                        className='h-40 self-center'
                        src='/home_illustration_1.png'
                        alt='Home illustration 1'
                        width={222}
                        height={154}
                    />
                    <span className='font-roboto text-pink text-sm'>Step 1</span>
                    <span className='text-2xl font-semibold'>Generate Your Custom Chain</span>
                    <span className='font-roboto text-sm leading-8 text-muted-foreground'>
                        Define the parameters, security, and functionality of your new chain.
                    </span>
                </div>
                <div className='flex w-64 flex-col items-start rounded-xl bg-primary-foreground p-4'>
                    <Image
                        className='h-40 self-center'
                        src='/home_illustration_2.png'
                        alt='Home illustration 2'
                        width={222}
                        height={154}
                    />
                    <span className='font-roboto text-pink text-sm'>Step 2</span>
                    <span className='text-2xl font-semibold'>Download Your Config File</span>
                    <span className='font-roboto text-sm leading-8 text-muted-foreground'>
                        Instantly receive the configuration file tailored for your chain setup.
                    </span>
                </div>
                <div className='flex w-64 flex-col items-start rounded-xl bg-primary-foreground p-4'>
                    <Image
                        className='h-40 self-center'
                        src='/home_illustration_3.png'
                        alt='Home illustration 3'
                        width={222}
                        height={154}
                    />
                    <span className='font-roboto text-pink text-sm'>Step 3</span>
                    <span className='text-2xl font-semibold'>Start Running Your Chain</span>
                    <span className='font-roboto text-sm leading-8 text-muted-foreground'>
                        Launch your chain and take the first step towards decentralization.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
