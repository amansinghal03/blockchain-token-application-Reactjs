import React from 'react';

function Footer(props) {
    return (
        <>
        <div className=' bottom-0 mb-0 w-full h-[60px] bg-[#242424] flex items-center justify-center gap-[3.5rem] '>

        <span className='font-Brother1816 font-normal text-base leading-6 mt-2 text-white cursor-pointer'>Privacy</span>
        <span className='font-Brother1816 font-normal text-base leading-6 mt-2 text-white cursor-pointer'>Terms & Condition</span>
        <span className='font-Brother1816 font-normal text-base leading-6 mt-2 text-white cursor-pointer'>Contact us</span>
        </div>
        </>
    );
}

export default Footer;