"use client"
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import React, { FormEvent, useState } from 'react'
import { Github, Linkedin, Loader, Mail } from 'lucide-react'
import useIsMounted from '@/app/hooks/useIsMounted'
import { SectionHeader } from './section-header'
import { sendContactEmail } from '@/lib/email-service'
import Configs from '@/config'
import { toast } from 'sonner'
import { fadeIn } from '../animation-variants'

type Props = {}



// Component for contact information
const ContactInfo = ({ icon, title, value, link }:any) => {
    return (
      <a
        href={link}
        target='_blank'
        className="flex items-start gap-4 group"
      >
        <div className="mt-1 w-10 h-10 rounded-lg bg-blue-600/10 dark:bg-blue-400/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-gray-600 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {value}
          </p>
        </div>
      </a>
    );
  };

const Contact = (props: Props) => {

    const isMounted = useIsMounted();
    const [formData,setFormData] = useState({
      from:"",
      subject:"",
      message:"",
      name:""
    });

    const [loading,setLoading] = useState(false);


    if(!isMounted) return null;

    async function handleSubmit(e:FormEvent){
      e.preventDefault();

    //  const res = await fetch("/api/email",{
    //     method:"POST",
    //     body:JSON.stringify(formData)
    //   });

    try{
      setLoading(true);
      await sendContactEmail(formData.from,formData.name,formData.subject,formData.message);
      toast("Email was successfully sent! will get back to as soon as possible");

    }catch{
      toast.success("Something went wrong, please try again later");


    }finally{
    
      setLoading(false);
    }



    }

    function handleInputChange(key:string,value:string){
      setFormData(prev=>({...prev,[key]:value.trimStart()}));
    }
  return (
    <section id="contact" className="py-20 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6">
              <SectionHeader 
                title="Contact" 
                subtitle="Get in touch" 
              />
              
              <div className="grid md:grid-cols-2 gap-12 mt-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                >
                  <h3 className="text-2xl font-semibold mb-6">Let&apos;s discuss your project</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-8">
                    I&apos;m interested in freelance opportunities – especially ambitious or large projects.
                    However, if you have other requests or questions, don&apos;t hesitate to contact me.
                  </p>
                  
                  <div className="space-y-6">
                    <ContactInfo 
                      icon={<Mail size={20} />}
                      title="Email"
                      value="iammudit21@gmail.com"
                      link={"mailto:"+Configs.email}
                    />
                    <ContactInfo 
                      icon={<Linkedin size={20} />}
                      title="LinkedIn"
                      value="Mudit Mathur"
                      link={Configs.linkedInUrl}
                    />
                    <ContactInfo 
                      icon={<Github size={20} />}
                      title="GitHub"
                      value="Github"
                      link={Configs.githubUrl}
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={fadeIn}
                  className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-lg"
                >
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-1">
                          Name
                        </label>
                        <input
                        disabled={loading}
                        required
                          type="text"
                          id="name"
                          placeholder="Your name"
                          onChange={(e)=>handleInputChange("name",e.target.value)}
                          value={formData.name}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-1">
                          Email
                        </label>
                        <input
                        required
                        disabled={loading}
                          type="email"
                          id="email"
                          placeholder="Your email"
                          onChange={(e)=>handleInputChange("from",e.target.value)}
                          value={formData.from}
                          className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-1">
                        Subject
                      </label>
                      <input
                      disabled={loading}
                        required
                        minLength={4}
                        type="text"
                        id="subject"
                        placeholder="Subject"
                        onChange={(e)=>handleInputChange("subject",e.target.value)}
                          value={formData.subject}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        disabled={loading}
                        required
                        minLength={5}
                        rows={5}
                        placeholder="Your message"
                        onChange={(e)=>handleInputChange("message",e.target.value)}
                          value={formData.message}
                        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-transparent px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                      ></textarea>
                    </div>
                    <Button
                    disabled={loading}
                    type="submit" className="w-full">
                      {loading?<Loader className='animate-spin' />:"Send Message"}
                    </Button>
                  </form>
                </motion.div>
              </div>
            </div>
          </section>
  )
}

export default Contact