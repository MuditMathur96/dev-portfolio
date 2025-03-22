"use client"
import { motion } from 'framer-motion'
import React from 'react'
import { fadeIn, staggerContainer } from '../page'
import useIsMounted from '@/app/hooks/useIsMounted'
import { SectionHeader } from './section-header'
import { ExperienceType } from '@/types'

type Props = {
    experiences:ExperienceType[]
}

const Experience = ({experiences}: Props) => {

    const isMounted = useIsMounted();
  
    if(!isMounted) return null;
  return (
    <section id="experience" className="py-20">
    <div className="container mx-auto px-4 md:px-6">
      <SectionHeader 
        title="Experience" 
        subtitle="My professional journey" 
      />
      
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="mt-12 space-y-8"
      >
        {experiences
        .sort((a,b)=>a.index>b.index?1:-1   )
        .map((exp, i) => (
          <motion.div
            key={exp.id}
            variants={fadeIn}
            className="relative pl-8 md:pl-0"
          >
            <div className="md:grid md:grid-cols-5 md:gap-6">
              <div className="md:col-span-1 flex md:justify-end">
                <div className="mb-4 md:mb-0">
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">
                    {exp.period}
                  </span>
                </div>
              </div>
              
              <div className="md:col-span-4 relative border-l-2 border-gray-300 dark:border-gray-600 pl-6 pb-8 md:border-l-0 md:pl-0">
                {/* Timeline dot (only visible on mobile) */}
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-400 md:hidden"></div>
                
                <h3 className="text-xl font-semibold">{exp.position}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">{exp.company}</p>
                <ul className='list-disc'>

                {
                  exp.description.map(desc=>( <li key={exp.id}><p  className="text-gray-600 dark:text-gray-300">
                    {desc}
                  </p></li>
                   ))
                }
               
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
  
  )
}

export default Experience