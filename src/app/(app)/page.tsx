import React from 'react';
import Head from 'next/head';

import HeroSection from '@/components/hero-section';
import { getAll } from '@/lib/firebase/repository';
import About from './_components/about';
import Projects from './_components/projects';
import Experience from './_components/experience';
import Contact from './_components/contact';
import { ThemeProvider } from 'next-themes';
import { ExperienceType, ProjectType, SkillType } from '@/types';
import { unstable_cache } from 'next/cache';

  // Animation variants
  export const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  export const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  export const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
 
  
export const skillBarVariant = (level:number) => ({
    hidden: { width: 0 },
    visible: { 
      width: `${level}%`, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  });

const  getCachedData = unstable_cache(async()=>{
  return await getData();
},
["root_data"],{
  revalidate:3600
})

async function getData(){

    try{

      const projectsPromise = getAll<ProjectType>("projects");
      const skillsPromise = getAll<SkillType>("skills");
      const experiencePromise = getAll<ExperienceType>("experiences");
      const resumeLinkPromise = getAll<{link:string}>("resumes");


      const [projects,skills,experience,resumeLink] = await Promise.all([projectsPromise,skillsPromise,experiencePromise,resumeLinkPromise]);
      console.log(projects && projects[0].tags);
      return {
        projects,
        skills,
        experience,
        resumeLink
      }


    }catch{

    }



  }
export default async function Home() {

  const pageData = await getCachedData();
  console.log("page data:",pageData);



  
  

  
 

  
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Head>
          <title>Developer Portfolio | Mudit Mathur</title>
          <meta name="description" content="Professional portfolio of John Doe, a full-stack developer" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        
        <main>
          {/* Hero Section */}
          <section 
          id="hero" className="min-h-screen flex items-center pt-16">
            <HeroSection
            
            />
          </section>
          
          {/* About Section */}
          <About 
          skills={pageData?.skills || []}
          resume={pageData?.resumeLink?pageData?.resumeLink[0] : null}
          />ont
          
          
          {/* Projects Section */}
          <Projects projects={pageData?.projects || []} />
          
          {/* Experience Section */}
          <Experience experiences={pageData?.experience || []} />


          {/* Contact Section */}
          <Contact />
          
        </main>
        
       
      </div>
    </ThemeProvider>
  );
}

// Component for social icons




// Component for section headers






