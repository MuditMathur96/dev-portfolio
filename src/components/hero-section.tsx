"use client"
import useIsMounted from "@/app/hooks/useIsMounted";
import { motion } from "framer-motion";
import Link from "next/link";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  name = "Mudit",
  title = "Full-Stack Developer & UX Specialist",
  description = "Transforming ideas into elegant, functional digital solutions. Let's build something extraordinary together."
}) => {

  const isMounted = useIsMounted();

  if (!isMounted) return null;
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="dark:bg-gray-900 min-h-screen w-full relative overflow-hidden" id="hero">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        {/* Animated gradient background */}
        <div className="absolute inset-0 
        bg-gray-50
        dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-gray-900
        "></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(120, 120, 255, 0.2)" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#grid-pattern)"></rect>
          </svg>
        </div>

        {/* Floating particles */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `rgba(${Math.random() * 100 + 100}, ${Math.random() * 100 + 100}, 255, ${Math.random() * 0.5 + 0.2})`,
              }}
              animate={{
                y: [0, Math.random() * 100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-16 md:py-32">
        <motion.div
          className="flex flex-col max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Terminal-inspired welcome */}
          <motion.div
            variants={itemVariants}
            className="inline-block font-mono text-sm px-4 py-2 rounded-md bg-gray-800 text-green-400 mb-6 border border-gray-700 shadow-xl"
          >
            <span className="text-purple-400">~</span> <span className="text-blue-400">$</span> <span className="typing-animation">welcome --name="{name}" --status="online"</span>
          </motion.div>

          {/* Name and title */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 dark:text-white"
          >
            <span className="block">{"Hi, I'm"} {name}</span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
              {title}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg dark:text-gray-300 mb-8"
          >
            {description}
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 mb-16"
          >
            <Link href="/#projects">
              <motion.button
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-medium shadow-lg hover:shadow-xl transition-all"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                View My Projects
              </motion.button>
            </Link>

            <Link href="/#contact">
              <motion.button
                className="px-8 py-3 rounded-lg 
              
              border-2 border-gray-600 
              dark:text-gray-300 
              font-medium hover:border-gray-400 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </Link>
          </motion.div>

          {/* Stats and highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            {/* {[
              { label: "Projects Completed", value: "25+" },
              { label: "Years Experience", value: "5+" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-gray-800 bg-opacity-50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)" }}
              >
                <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))} */}
          </motion.div>
        </motion.div>
      </div>

      {/* Tech stack */}
      <motion.div
        className="py-4 px-6 absolute bottom-0 left-0 right-0 bg-gray-800 bg-opacity-70 backdrop-blur-sm border-t border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
      >
        <div className="container mx-auto flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          <span className="text-gray-400 font-medium text-sm mr-2">Tech Stack:</span>
          {['React', 'TypeScript', 'Node.js', 'Tailwind', 'GraphQL'].map((tech, index) => (
            <motion.div
              key={tech}
              className="flex items-center text-gray-300 text-sm font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.1, color: "#a5f3fc" }}
            >
              <span className="mr-1.5 text-cyan-400">#</span>{tech}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;