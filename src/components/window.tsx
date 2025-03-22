import { useMediaQuery } from '@uidotdev/usehooks'
import { motion } from 'framer-motion'
import React, { ReactNode } from 'react'

type Props = {
    title: string,
    children: ReactNode
}



function Window({ title, children }: Props) {
    
    

  
    return (
        <motion.div
           
            className='w-screen h-screen 
    px-4 md:px-24 lg:px-32
    '
        >
            <div className='w-full h-full md:h-3/4 bg-blue-200
        rounded-md 
        flex flex-col items-center justify-start
        overflow-hidden

        '>
                {/* Window heading */}
                <div
                    className='min-h-8 bg-slate-400 w-full
                     flex items-center justify-between
                    '

                >
                    {/* Title */}
                    <h3
                        className='px-4 text-slate-700 font-semibold '
                    >{title}</h3>

                    {/* Visuals */}
                    <div className='flex items-center gap-2 px-4'>
                        <div className='w-4 h-4 rounded-full bg-slate-300' />
                        <div className='w-4 h-4 rounded-full bg-blue-300' />
                        <div className='w-4 h-4 rounded-full bg-red-400' />
                    </div>


                </div>
                {/* Children or Body */}
                <div className='flex-1 px-8 flex flex-col justify-start '>
                    {children}
                </div>
            </div>

        </motion.div>
    )
}

export default Window