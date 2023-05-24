import React from 'react'

export default function SingleClient() {
    return (
        <div className='flex flex-col items-center'>
            <div className='flex justify-center mt-5'>
                <div className="tabs">
                    <a className="tab tab-lifted tab-lg ">Formulas</a>
                    <a className="tab tab-lifted tab-lg  tab-active">Info</a>
                    <a className="tab tab-lifted tab-lg ">Large</a>
                </div>
            </div>
            <div className='card border border-base-300 mt-0 w-96'>
There's content in here
            </div>
        </div>
    )
}
