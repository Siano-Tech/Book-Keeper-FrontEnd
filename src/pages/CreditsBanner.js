import React from 'react';

export const CreditsBanner = () => {
    
    return(
        <div className='p-1 sm:p-3 rounded-lg bg-white text-left shadow-xl transition-all' style={styles}>
            <h1 className='text-xs sm:text-sm'>Created & Contributed by</h1>
            <p className='text-sm sm:text-md'>Anjan Bhat</p>
            <p className='text-xs sm:text-sm'>XII 'A' (2024-25)</p>
        </div>
    )
}

const styles = {
    // position: 'sticky',
    position: 'fixed',
    left: 0,
    // padding: '10px',
    bottom: 0,
    // width: '250px',
}