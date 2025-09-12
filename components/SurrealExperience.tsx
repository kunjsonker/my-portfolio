'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, Transition } from 'framer-motion';

// ------------------- Types -------------------

interface MousePosition {
  x: number;
  y: number;
}

interface FollowerProps {
  mousePosition: MousePosition | null;
  transition: Transition;
  size: number;
  background: string;
}

interface FollowerConfig {
  size: number;
  background: string;
  transition: Transition;
}

// ------------------- Mouse Follower -------------------

const Follower = ({ mousePosition, transition, size, background }: FollowerProps) => {
  if (!mousePosition) return null;

  return (
    <motion.div
      className="fixed rounded-full"
      style={{
        width: size,
        height: size,
        left: 0,
        top: 0,
        pointerEvents: 'none',
        background,
        zIndex: 9999,
      }}
      animate={{
        x: mousePosition.x - size / 2,
        y: mousePosition.y - size / 2,
      }}
      transition={transition}
    />
  );
};

const MouseFollowerEffect = () => {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) =>
      setMousePosition({ x: event.clientX, y: event.clientY });

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const followersConfig: FollowerConfig[] = [
    {
      size: 60,
      background:
        'radial-gradient(circle, rgba(168, 85, 247, 0.5) 0%, rgba(168, 85, 247, 0) 70%)',
      transition: { type: 'spring', stiffness: 200, damping: 20, mass: 0.5 },
    },
    {
      size: 45,
      background:
        'radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, rgba(239, 68, 68, 0) 70%)',
      transition: { type: 'spring', stiffness: 400, damping: 30, mass: 0.5 },
    },
    {
      size: 30,
      background:
        'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0) 70%)',
      transition: { type: 'spring', stiffness: 600, damping: 40, mass: 0.5 },
    },
  ];

  return (
    <>
      {followersConfig.map((config, index) => (
        <Follower key={index} mousePosition={mousePosition} {...config} />
      ))}
    </>
  );
};

// ------------------- Starry Background -------------------

const StarryBackground = ({
  running,
  mode,
}: {
  running: boolean;
  mode: 'high' | 'smooth';
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const animationFrameId = useRef<number>();

  const drawScene = useCallback(
    (ctx: CanvasRenderingContext2D, particles: Particle[], canvas: HTMLCanvasElement) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => p.update(ctx, canvas));
      connect(ctx, particles, canvas, mouse.current, mode);
    },
    [mode]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particlesArray: Particle[] = [];

    const colors: string[] = ['#8b5cf6', '#db2777', '#2563eb'];

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;

      constructor(x: number, y: number, dx: number, dy: number, size: number, color: string) {
        this.x = x;
        this.y = y;
        this.directionX = dx;
        this.directionY = dy;
        this.size = size;
        this.color = color;
      }

      draw(ctx: CanvasRenderingContext2D) {
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.size * 2
        );
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(1, 'transparent');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2, false);
        ctx.fill();
      }

      update(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
        if (this.x > canvas.width || this.x < 0) this.directionX = -this.directionX;
        if (this.y > canvas.height || this.y < 0) this.directionY = -this.directionY;
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw(ctx);
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles =
        mode === 'high'
          ? (canvas.width * canvas.height) / 20000
          : (canvas.width * canvas.height) / 35000;

      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 2 + 1.5;
        const x = Math.random() * (canvas.width - size * 2) + size * 2;
        const y = Math.random() * (canvas.height - size * 2) + size * 2;
        const dx = Math.random() * 0.4 - 0.2;
        const dy = Math.random() * 0.4 - 0.2;
        const color = colors[Math.floor(Math.random() * colors.length)];
        particlesArray.push(new Particle(x, y, dx, dy, size, color));
      }
    };

    let frameCount = 0;
    const animate = () => {
      if (!running) return;
      animationFrameId.current = requestAnimationFrame(animate);

      frameCount++;
      if (mode === 'smooth' && frameCount % 2 !== 0) return;

      drawScene(ctx, particlesArray, canvas);
    };

    const handleResize = () => {
      setCanvasDimensions();
      init();
    };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current = { x: event.clientX, y: event.clientY };
    };

    setCanvasDimensions();
    init();
    animate();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [running, drawScene, mode]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        background: 'linear-gradient(45deg, #fff1f2, #eff6ff, #f5f3ff, #fdf2f8)',
      }}
    />
  );
};

// ------------------- Connect Particles -------------------

function connect(
  ctx: CanvasRenderingContext2D,
  particlesArray: any[],
  canvas: HTMLCanvasElement,
  mouse: { x: number | null; y: number | null },
  mode: 'high' | 'smooth'
) {
  const connectDistance = mode === 'high' ? 160 * 160 : 120 * 120;

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = dx * dx + dy * dy;
      if (distance < connectDistance) {
        const opacity = 1 - distance / 20000;
        ctx.strokeStyle = `rgba(55, 65, 81, ${Math.max(0, opacity * 0.3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
    if (mouse.x && mouse.y) {
      const dx = particlesArray[a].x - mouse.x;
      const dy = particlesArray[a].y - mouse.y;
      const distanceToMouse = dx * dx + dy * dy;
      if (distanceToMouse < connectDistance) {
        const opacity = 1 - distanceToMouse / 20000;
        ctx.strokeStyle = `rgba(55, 65, 81, ${Math.max(0, opacity * 0.5)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }
    }
  }
}

// ------------------- Main Component -------------------

const SurrealExperience = () => {
  const [running, setRunning] = useState(true);
  const [mode, setMode] = useState<'high' | 'smooth'>('high');

  return (
    <motion.div style={{ minHeight: '0vh' }}>
      <StarryBackground running={running} mode={mode} />
      {/* <MouseFollowerEffect /> */}

      <div className="fixed bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={() => setRunning((prev) => !prev)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg shadow-lg"
        >
          {running ? 'Pause Animations' : 'Resume Animations'}
        </button>

        <button
          onClick={() => setMode(mode === 'high' ? 'smooth' : 'high')}
          className="px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg"
        >
          {mode === 'high' ? 'Switch to Smooth Mode' : 'Switch to High Quality'}
        </button>
      </div>
    </motion.div>
  );
};

export default SurrealExperience;
