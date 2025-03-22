import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
}

interface MobileNavProps {
  items: NavItem[];
  logo?: React.ReactNode;
}

const MobileNav: React.FC<MobileNavProps> = ({ items, logo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Circle to rectangle animation variants
  const containerVariants = {
    closed: {
      clipPath: "circle(0px at calc(100% - 32px) 32px)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    },
    open: {
      clipPath: "circle(1000px at calc(100% - 32px) 32px)",
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 20,
        when: "beforeChildren",
        staggerChildren: 0.07,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    closed: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.2 }
    },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  return (
    <>
      <div className="md:hidden px-4  flex items-center justify-between">
        {/* <div className="flex items-center">
          <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-xl font-bold"
              >
                Mudit<span className="text-blue-600 dark:text-blue-400">.dev</span>
              </motion.div>
        </div> */}
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="relative z-50"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-0 right-0 w-full h-screen bg-background overflow-hidden"
            initial="closed"
            animate="open"
            exit="closed"
            variants={containerVariants}
          >
            {/* Empty space to account for the header */}
            <div className="h-16"></div>
            
            <div className="px-4 py-2">
              {items.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="flex items-center py-3 px-2 my-1 rounded-md hover:bg-accent text-foreground hover:text-accent-foreground transition-colors"
                  variants={itemVariants}
                  onClick={() => setIsOpen(false)}
                  whileHover={{ x: 10, transition: { duration: 0.1 } }}
                >
                  {item.icon && <span className="mr-3">{item.icon}</span>}
                  <span className="font-medium">{item.label}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    
    </>
  );
};

export default MobileNav;