"use client"
import { motion } from 'framer-motion';
import { Github, Linkedin, LucideIcon, Mail, Twitter } from 'lucide-react';
import React from 'react'

type Props = {}

const SocialIcon = ({ Icon }:{Icon:LucideIcon}) => {
    return (
      <motion.a 
        href="#" 
        whileHover={{ y: -3 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-600 dark:hover:border-blue-400 transition-colors"
      >
        <Icon size={18} />
      </motion.a>
    );
  };

const Footer = (props: Props) => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
<div className="container mx-auto px-4 md:px-6 text-center">
  <div className="flex justify-center space-x-6 mb-4">
    {/* <SocialIcon Icon={Github} />
    <SocialIcon Icon={Linkedin} />
    <SocialIcon Icon={Twitter} />
    <SocialIcon Icon={Mail} /> */}
  </div>
  <p className="text-gray-600 dark:text-gray-400">
    © {new Date().getFullYear()} Mudit Mathur. All rights reserved.
  </p>
</div>
</footer>
  )
}

export default Footer;