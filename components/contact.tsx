"use client";
import React from 'react'
import SectionHeading from './section-heading'
import { FaPaperPlane } from 'react-icons/fa'
import { motion } from 'framer-motion'
import { useSectionInView } from '@/lib/hooks';

export default function Contact() {
    const { ref } = useSectionInView("Contact");
  return (
    <motion.section id='contact' ref={ref} className='mb-20 sm:mb-28 w-[min(100%,38rem)] text-center ' initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      transition={{
        duration: 1,
      }}
      viewport={{
        once: true,
      }}
      >
        <SectionHeading>Contact Me</SectionHeading>
        <p className='text-gray-700'>Please call me directly at <a className='underline' href='mailto:kunjsonker@gmail.com'>kunjsonker@gmail.com</a> or through this form.</p>
        <form className='mt-10 flex flex-col'>
            <input className=' -mt-6 h-14 rounded-lg borderBlack px-4' type="email" required maxLength={500} placeholder='Your email' />
            <textarea className='h-52 my-3 rounded-lg borderBlack p-4' placeholder='Your message' required maxLength={5000} />
            <button type='submit' className='group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-900 text-white rounded-full outline-none transition-all focus:scale-110 hover:scale-110 hover:bg-gray-900 active:scale-105 '>Submit
                <FaPaperPlane className='text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1  '/>{" "}</button>
        </form>
    </motion.section>
  )
}
