"use client"

import React from 'react'
import SectionHeading from './section-heading'
import {motion} from "framer-motion";

export default function About() {
  return (
    <motion.section className='mb-28 max-w-[45rem] text-center leading-8 sm:mb-40'
    initial={{opacity:0,y:100}}
    animate={{opacity:1,y:0}}
    transition={{delay:0.175}}>
        <SectionHeading>About Me</SectionHeading>
        <p className='mb-3'>
  Hi! I'm <strong>Kunj</strong>, a sophomore at <strong>Indian Institute of Information Technology Allahabad</strong> with a deep passion for{" "}
  <span className="font-medium"><strong>web development</strong></span>. I'm currently exploring the world of web technologies, building projects that combine{" "}
  creativity with functionality. I enjoy{" "}
  <span className="italic">learning new things</span>, experimenting with different tech stacks, and finding innovative solutions to real-world problems.
  <br /><br />
  I'm particularly interested in{" "}
  <span className="font-medium">front-end development</span>, where I love to bring ideas to life with <strong>HTML</strong>, <strong>CSS</strong>, <strong>JavaScript</strong>, and frameworks like{" "}
  <strong>React</strong> and <strong>Next.js</strong>. I also work with <strong>TypeScript</strong> and enjoy building <strong>full-stack projects</strong>. I'm{" "}
  <span className="italic">excited</span> about the endless possibilities that web development offers.
</p>

<span className="italic">When I am not coding</span>, you’ll probably find me <strong>listening to music</strong>, trying to figure out my next travel destination, or getting lost in a good book. I’m always up for a{" "}
<span className="font-medium">spontaneous adventure</span> or a deep dive into random topics — whether that’s <strong>food</strong>, <strong>sports</strong>, or just things that make life interesting.
<p></p>

    </motion.section>
  )
}
