"use client"
import React, { Dispatch, useState } from 'react'
import { motion } from 'framer-motion';
import { Button } from '../ui/button';
import { Heart, Home, Moon, Search, Settings, Sun, User } from 'lucide-react';
import { useTheme } from 'next-themes';
import useIsMounted from '@/app/hooks/useIsMounted';
import MobileNav from './mobile-nav';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

type Props = {}
const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: <Home size={20} />
  },
  {
    label: 'About',
    href: '/#about',
    icon: <Search size={20} />
  },
  {
    label: 'Experience',
    href: '/#experience',
    icon: <Heart size={20} />
  },
  {
    label: 'Contact',
    href: '/profile',
    icon: <User size={20} />
  }
];

// Theme toggle component
const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const path = usePathname();
  const navigate = useRouter();

  

  // Ensure it only runs after mount to avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </motion.div>
    </Button>
  );
};

function NavItem({section,activeSection,setActiveSection}:{section:string,
  activeSection:string,
  setActiveSection:Dispatch<React.SetStateAction<string>>}){

    function handleScrollToSection(id:string){

      const div = document.getElementById(id);
  
          if(div){
            div.scrollIntoView({
              behavior:"smooth"
            })
          }
  
  
  
    }
    return (<motion.div
      key={section}
      
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`cursor-pointer capitalize ${
        activeSection === section 
          ? 'text-blue-600 dark:text-blue-400 font-medium' 
          : 'hover:text-blue-600 dark:hover:text-blue-400'
      }`}
      onClick={() => {
        handleScrollToSection(section)
        setActiveSection(section)}}
    >
      {section}
    </motion.div>)
}

function Navbar({}: Props) {

  const [activeSection, setActiveSection] = useState('hero');

  const isMounted = useIsMounted();

  if(!isMounted) return null;
  return (
    <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
      {/* <Link href="/"> */}
    <motion.div 
      onClick={()=>{
        const div = document.getElementById("hero");

        if(div){
          div.scrollIntoView({
            behavior:"smooth"
          })
        }
      }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="text-xl font-bold"
    >
      Mudit<span className="text-blue-600 dark:text-blue-400">.dev</span>
    </motion.div>
      {/* </Link> */}
    
    <div className="flex items-center space-x-1 md:space-x-4">
      <nav className="hidden md:flex space-x-6">
        {['hero', 'about', 'projects', 'experience', 'contact'].map((section) => (
        <NavItem 
        section={section}
        setActiveSection={setActiveSection}
        activeSection={activeSection}/>
        ))}
      </nav>
      
      {/* <ThemeToggle /> */}
      
      {/* <Button variant="outline" size="sm" className="md:hidden"> */}
        <MobileNav 
        items={navItems}
        
        
        />
        {/* <motion.div
          whileTap={{ scale: 0.9 }}
          className="w-6 h-6 flex flex-col justify-center items-center space-y-1.5"
        >
          <span className="w-5 h-0.5 bg-current"></span>
          <span className="w-5 h-0.5 bg-current"></span>
          <span className="w-5 h-0.5 bg-current"></span>
        </motion.div> */}
      {/* </Button> */}
    </div>
  </div>
  )
}

export default Navbar