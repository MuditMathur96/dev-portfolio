import { Variants } from "framer-motion";

  // Animation variants
  export const fadeIn:Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };
  export const scaleUp:Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1, 
      transition: { type: "spring", stiffness: 100 } 
    }
  };

  export const staggerContainer:Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
 
  
export const skillBarVariant = (level:number):Variants => ({
    hidden: { width: 0 },
    visible: { 
      width: `${level}%`, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  });