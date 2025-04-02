"use client"
import { motion } from 'framer-motion'
import React from 'react'

import RotatingLanguages from '@/components/language-circle'
import { Button } from '@/components/ui/button'
import useIsMounted from '@/app/hooks/useIsMounted'
import { SectionHeader } from './section-header'
import { SkillType } from '@/types'
import Link from 'next/link'
import { fadeIn, scaleUp, skillBarVariant } from '../animation-variants'

// Component for statistics
const Stat = ({ number, text }:{number:number | string,text:string}) => {
  return (
    <div className="text-center">
      <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{number}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{text}</p>
    </div>
  );
};

const About = ({skills,resume}:{skills:SkillType[],resume:{link:string} | null}) => {

    const isMounted = useIsMounted();
  
    if(!isMounted) return null;
  return (
    <section id="about" className="py-20">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader title="About Me" subtitle="My introduction" />
              
              <div className="grid md:grid-cols-2 gap-12 items-center mt-12 ">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={scaleUp}
                  className="relative"
                >
                
                   <div className="  md:p-1">
                    <RotatingLanguages
                    width={"90%"}
                    className='mx-auto'
                    
                    />
                   
                </div>
                </motion.div>
                
                <motion.div
                  className='  '
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h3 className="text-2xl font-semibold mb-4">
                    A passionate Full-Stack Developer based in India
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-left text-clip  ">
                    With 4+ years of experience in web development,I specialize in creating
                    user-friendly applications with modern technologies.
                    I enjoy solving complex
                    problems and learning new skills. My approach combines technical expertise with
                    creative design thinking.
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-8 ">
                    Outside of coding, I am an otaku, I love reading blogs and tech news. I&apos;m constantly exploring new technologies and methodologies
                    to improve my craft.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                    <Stat number="4+" text="Years of Experience" />
                    <Stat number="10+" text="Completed Projects" />
                    <Stat number="10+" text="Happy Clients" />
                  </div>
                  
                  <Button>
                    <Link href={resume?.link || "/#not-found"} target='_blank'>
                    Download CV
                    </Link>
                  </Button>
                </motion.div>
              </div>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeIn}
                className="mt-20"
              >
                <h3 className="text-2xl font-semibold mb-8 text-center">My Skills</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {skills.map((skill, index) => (
                    <div key={index} className="mb-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial="hidden"
                          whileInView="visible"
                          viewport={{ once: true }}
                          variants={skillBarVariant(skill.level)}
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
  )
}

export default About;