import Image from 'next/image';

const Delegate4Page: React.FC = () => {
    return (
        <div className='flex flex-row justify-between gap-20 md:w-screen'>
            <div className='mt-11 flex grow flex-col md:mx-28 md:mt-20 xl:mr-0'>
                <Image src='/icon_success.png' alt='success' width={62} height={62} />
                <div className='mb-4 mt-6 text-2xl font-semibold md:text-4xl'>Success!</div>
                <span className='font-sans text-base text-muted-foreground'>Your delegation is all set</span>

                <div className='mt-8'>
                    <h3 className='text-lg font-semibold'>Guids for How-tos</h3>
                </div>
                <div className='mb-2 mt-4 font-sans text-base text-black'>
                    Still have some questions? Refer to hyperchain guide
                </div>
                <a className='mb-8 font-sans text-base text-pink underline' href='https://hyperchains.ae/'>
                    Check the guide
                </a>
            </div>
            <img
                src='/delegator_success.png'
                className='max-w- hidden object-contain object-top xl:block'
                alt='Success Screen'
            />
        </div>
    );
};

export default Delegate4Page;
