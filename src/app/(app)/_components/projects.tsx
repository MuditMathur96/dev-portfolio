"use client"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import React from 'react'
import { ExternalLink, Github } from 'lucide-react'
import useIsMounted from '@/app/hooks/useIsMounted'
import { SectionHeader } from './section-header'
import { ProjectType } from '@/types'
import { fadeIn, scaleUp, staggerContainer } from '../animation-variants'


type Props = {
    projects:ProjectType[]
}

// Component for project cards
const ProjectCard = ({project}:{project:ProjectType}) => {

  
  
   
    return (
      <motion.div
        variants={scaleUp}
        whileHover={{ y: -10 }}
        className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg transition-all"
      >
        <div className="overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href={project.githubUrl} target='_blank' className="flex items-center gap-1">
                <Github size={16} />
                <span>Code</span>
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href={project.liveUrl} target='_blank' className="flex items-center gap-1">
                <ExternalLink size={16} />
                <span>Demo</span>
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    );
  };

const Projects = ({projects}: Props) => {
  
  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader 
                title="Projects" 
                subtitle="My recent work" 
              />
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
              >
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </motion.div>
              
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeIn}
                className="text-center mt-12"
              >
                <Button variant="outline" size="lg">
                  View All Projects
                </Button>
              </motion.div>
            </div>
          </section>
  )
}

export default Projects