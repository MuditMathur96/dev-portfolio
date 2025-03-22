import { motion } from "framer-motion";
import { fadeIn } from "../page";

export const SectionHeader = ({ title, subtitle }:{title:string,subtitle:string}) => {
    return (
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center mb-4"
      >
        <h2 className="text-3xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 dark:text-gray-300">{subtitle}</p>
        <div className="w-16 h-1 bg-blue-600 dark:bg-blue-400 mx-auto mt-4"></div>
      </motion.div>
    );
  };