"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * A single circle component that follows the mouse with a given transition.
 * @param {object} props - The component props.
 * @param {object} props.mousePosition - The {x, y} coordinates of the mouse.
 * @param {object} props.transition - The Framer Motion transition config.
 * @param {number} props.size - The diameter of the circle.
 * @param {string} props.background - The CSS background for the circle.
 */
const Follower = ({ mousePosition, transition, size, background }: { mousePosition: object; transition: object; size: number; background: string; }) => {
  // Return null if mouse position is not available yet
  if (!mousePosition) return null;

  return (
    <motion.div
      // This div is the visual circle
      className="fixed rounded-full"
      style={{
        width: size,
        height: size,
        left: 0,
        top: 0,
        pointerEvents: 'none', // Allows clicking through the element
        background,
        zIndex: 9999, // Ensures it's on top of other content
      }}
      // Animate the circle to the mouse position, offsetting by half its size to center it
      animate={{
        x: mousePosition.x - size / 2,
        y: mousePosition.y - size / 2,
      }}
      // Apply the unique spring animation transition
      transition={transition}
    />
  );
};

/**
 * Manages the state and renders multiple follower circles.
 */
export const MouseFollowerEffect = () => {
    // State to hold the current mouse position
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Effect to add and clean up the mousemove event listener
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePosition({ x: event.clientX, y: event.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Configuration for each of the three follower circles
    const followersConfig = [
        {
            size: 60,
            // A soft purple radial gradient
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.6) 0%, rgba(168, 85, 247, 0) 70%)',
            // A slow, heavy spring for the largest circle
            transition: { type: 'spring', stiffness: 200, damping: 20, mass: 0.5 },
        },
        {
            size: 45,
            // A soft red radial gradient
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0) 70%)',
            // A medium-speed spring
            transition: { type: 'spring', stiffness: 400, damping: 30, mass: 0.5 },
        },
        {
            size: 30,
            // A soft blue radial gradient
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.6) 0%, rgba(59, 130, 246, 0) 70%)',
            // A fast, snappy spring for the smallest circle
            transition: { type: 'spring', stiffness: 600, damping: 40, mass: 0.5 },
        },
    ];

    return (
        <>
            {/* Map over the config to render each follower circle */}
            {followersConfig.map((config, index) => (
                <Follower
                    key={index}
                    mousePosition={mousePosition}
                    size={config.size}
                    background={config.background}
                    transition={config.transition}
                />
            ))}
        </>
    );
};

export default MouseFollowerEffect;

