"use client";

import React, { useEffect, useRef, useState, useId } from 'react';
import { useTheme } from 'next-themes';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface ParticleBackgroundProps {
  id?: string;
  className?: string;
  background?: string;
  backgroundDark?: string;
  particleColorLight?: string;
  particleColorDark?: string;
  particleDensity?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  repulseDistance?: number;
  repulseDuration?: number;
  opacity?: number;
  density?: number;
  colorLight?: string;
  colorDark?: string;
  fontSize?: number;
  repulsionStrength?: number;
  repulsionRadius?: number;
  returnSpeed?: number;
  hideWelcome?: boolean; // Control visibility from parent
}

interface Particle {
  x: number;
  y: number;
  size: number;
  value: string;
  opacity: number;
  speedX: number;
  speedY: number;
  velocityX: number;
  velocityY: number;
  originalX?: number;
  originalY?: number;
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  id,
  className,
  background = 'transparent',
  backgroundDark = 'transparent',
  particleColorLight = '#1a1a1a',
  particleColorDark = '#e0e0e0',
  particleDensity = 30,
  minSize = 10,
  maxSize = 14,
  speed = 1,
  repulseDistance = 150,
  repulseDuration = 0.6,
  // Support for both naming conventions
  opacity,
  density,
  colorLight,
  colorDark,
  fontSize,
  repulsionStrength = 5,
  repulsionRadius,
  returnSpeed = 0.1,
  hideWelcome = false
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const { theme } = useTheme();
  const controls = useAnimation();
  const generatedId = useId();
  const canvasId = id || generatedId;
  const isDarkMode = theme === 'dark';
  
  // Use either naming convention
  const effectiveParticleColorLight = colorLight || particleColorLight;
  const effectiveParticleColorDark = colorDark || particleColorDark;
  const effectiveParticleDensity = density || particleDensity;
  const effectiveMinSize = fontSize || minSize;
  const effectiveMaxSize = fontSize ? fontSize * 1.4 : maxSize;
  const effectiveRepulseDistance = repulsionRadius || repulseDistance;
  
  // For tracking repulsion effect
  const repulseActive = useRef<boolean>(false);
  const repulseAnimationFrame = useRef<number | null>(null);
  const repulseTimeStamp = useRef<number>(0);
  
  // Animation for welcome text
  const textControls = useAnimation();
  const arrowControls = useAnimation();
  
  // Track direction change
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const lastScrollY = useRef(0);

  // Toggle between welcome messages
  const [showAlternateMessage, setShowAlternateMessage] = useState(false);

  useEffect(() => {
    // Start animations
    controls.start({ opacity: 1, transition: { duration: 1.5 } });
    
    // Sequence the text and arrow animations
    const sequence = async () => {
      await textControls.start({ 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1, delay: 0.5 } 
      });
      
      // Start arrow animation after text appears
      await arrowControls.start({ 
        opacity: 1,
        y: [0, 10, 0],
        transition: { 
          duration: 1.5,
          repeat: Infinity,
          repeatType: "loop"
        }
      });
    };
    
    sequence();
    
    // Add scroll event listener to detect scroll direction and control welcome message
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY.current) {
        setScrollDirection('up');
      }
      
      // Handle alternate message display when scrolling back up
      if (scrollDirection === 'up' && currentScrollY < window.innerHeight * 0.3) {
        setShowAlternateMessage(true);
      } else if (scrollDirection === 'down') {
        setShowAlternateMessage(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, textControls, arrowControls, scrollDirection]);

  // Initialize particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Keep a reference to the current mouse position that's accessible throughout the component
    const mousePos = { x: 0, y: 0 };
    
    const resizeCanvas = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };
    
    const initParticles = () => {
      const particles: Particle[] = [];
      
      // Calculate number of particles based on density
      const totalArea = canvas.width * canvas.height;
      const particleCount = Math.floor(totalArea / (40000 / effectiveParticleDensity));
      
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * (effectiveMaxSize - effectiveMinSize) + effectiveMinSize;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedFactor = Math.random() * 0.5 + 0.2; // Random speed multiplier
        
        particles.push({
          x,
          y,
          size,
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: opacity !== undefined ? opacity : Math.random() * 0.7 + 0.1,
          speedX: (Math.random() - 0.5) * speed * speedFactor,
          speedY: (Math.random() - 0.5) * speed * speedFactor,
          velocityX: 0,
          velocityY: 0,
          originalX: x,  // Store original position
          originalY: y   // Store original position
        });
      }
      
      particlesRef.current = particles;
    };
    
    // Handle mouse movement - COMPLETE REWRITE
    const handleMouseMove = (e: MouseEvent) => {
      // Always update mouse position regardless of any element interactions
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
      
      if (!canvas) return;
      
      // Convert to canvas coordinates
      const rect = canvas.getBoundingClientRect();
      const canvasX = mousePos.x - rect.left;
      const canvasY = mousePos.y - rect.top;
      
      // Store latest mouse position for use in animation loop
      setMousePosition({ x: canvasX, y: canvasY });
      
      // Trigger repulse immediately (don't wait for animation frame)
      triggerRepulse(canvasX, canvasY);
    };
    
    // Handle touch events - COMPLETE REWRITE
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        // Always update touch position
        mousePos.x = e.touches[0].clientX;
        mousePos.y = e.touches[0].clientY;
        
        if (!canvas) return;
        
        // Convert to canvas coordinates
        const rect = canvas.getBoundingClientRect();
        const canvasX = mousePos.x - rect.left;
        const canvasY = mousePos.y - rect.top;
        
        // Store latest touch position
        setMousePosition({ x: canvasX, y: canvasY });
        
        // Trigger repulse immediately
        triggerRepulse(canvasX, canvasY);
      }
    };
    
    // Handle clicks to push particles - REWRITTEN
    const handleClick = (e: MouseEvent) => {
      if (!canvas) return;
      
      // Convert to canvas coordinates
      const rect = canvas.getBoundingClientRect();
      const canvasX = e.clientX - rect.left;
      const canvasY = e.clientY - rect.top;
      
      // Always add particles regardless of click position
      for (let i = 0; i < 4; i++) {
        const size = Math.random() * (effectiveMaxSize - effectiveMinSize) + effectiveMinSize;
        const angle = Math.random() * Math.PI * 2; // Random angle
        const velocity = Math.random() * 2 + 1; // Random velocity
        
        particlesRef.current.push({
          x: canvasX,
          y: canvasY,
          size,
          value: Math.random() > 0.5 ? '1' : '0',
          opacity: opacity !== undefined ? opacity : Math.random() * 0.7 + 0.1,
          speedX: Math.cos(angle) * velocity,
          speedY: Math.sin(angle) * velocity,
          velocityX: 0,
          velocityY: 0,
          originalX: canvasX,
          originalY: canvasY
        });
      }
    };
    
    // Handle touch start - REWRITTEN
    const handleTouchStart = (e: TouchEvent) => {
      if (!canvas) return;
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const canvasX = e.touches[0].clientX - rect.left;
        const canvasY = e.touches[0].clientY - rect.top;
        
        // Always add particles regardless of touch position
        for (let i = 0; i < 4; i++) {
          const size = Math.random() * (effectiveMaxSize - effectiveMinSize) + effectiveMinSize;
          const angle = Math.random() * Math.PI * 2;
          const velocity = Math.random() * 2 + 1;
          
          particlesRef.current.push({
            x: canvasX,
            y: canvasY,
            size,
            value: Math.random() > 0.5 ? '1' : '0',
            opacity: opacity !== undefined ? opacity : Math.random() * 0.7 + 0.1,
            speedX: Math.cos(angle) * velocity,
            speedY: Math.sin(angle) * velocity,
            velocityX: 0,
            velocityY: 0,
            originalX: canvasX,
            originalY: canvasY
          });
        }
      }
    };
    
    // Trigger repulse effect - MODIFIED for better performance
    const triggerRepulse = (x: number, y: number) => {
      // Always process repulse effect immediately
      repulseTimeStamp.current = Date.now();
      
      // Cancel any previous animation frame
      if (repulseAnimationFrame.current !== null) {
        cancelAnimationFrame(repulseAnimationFrame.current);
      }
      
      // Start a new repulse animation
      repulseAnimationFrame.current = requestAnimationFrame(() => {
        repulseParticles(x, y);
      });
    };
    
    // Repulse particles away from cursor - OPTIMIZED
    const repulseParticles = (x: number, y: number) => {
      const currentTime = Date.now();
      const duration = repulseDuration * 1000; // Convert to milliseconds
      
      if (currentTime - repulseTimeStamp.current < duration) {
        const distanceToTimeFactor = (duration - (currentTime - repulseTimeStamp.current)) / duration;
        
        particlesRef.current.forEach(particle => {
          const dx = particle.x - x;
          const dy = particle.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only apply force if distance is within range and greater than 0
          if (distance > 0 && distance <= effectiveRepulseDistance) {
            // Calculate repulsion force with improved formula
            const force = (-1 * Math.pow(effectiveRepulseDistance / distance, 2) * distanceToTimeFactor) * repulsionStrength;
            const factor = force / distance;
            
            // Apply force more aggressively
            particle.velocityX += dx * factor * 1.5;
            particle.velocityY += dy * factor * 1.5;
          }
        });
        
        // Continue the repulsion animation
        repulseAnimationFrame.current = requestAnimationFrame(() => {
          repulseParticles(x, y);
        });
      }
    };
    
    // Animation loop - IMPROVED for continuous effect
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set background based on theme
      ctx.fillStyle = isDarkMode ? backgroundDark : background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Set particle color based on theme
      ctx.fillStyle = isDarkMode ? effectiveParticleColorDark : effectiveParticleColorLight;
      ctx.font = `${effectiveMinSize}px monospace`;
      ctx.textAlign = 'center';
      
      // This ensures that mouse position is continuously used in the animation loop
      const { x: mouseX, y: mouseY } = mousePosition;
      
      particlesRef.current.forEach((particle) => {
        // Add velocities to regular movement
        particle.x += particle.speedX + particle.velocityX;
        particle.y += particle.speedY + particle.velocityY;
        
        // Gradually return to original position
        if (particle.originalX !== undefined && particle.originalY !== undefined) {
          const dx = particle.originalX - particle.x;
          const dy = particle.originalY - particle.y;
          particle.x += dx * returnSpeed;
          particle.y += dy * returnSpeed;
        }
        
        // Decrease velocity over time (damping)
        particle.velocityX *= 0.9;
        particle.velocityY *= 0.9;
        
        // Handle edge bouncing - "bounce" mode
        if (particle.x < 0) {
          particle.x = 0;
          particle.speedX *= -1;
        } else if (particle.x > canvas.width) {
          particle.x = canvas.width;
          particle.speedX *= -1;
        }
        
        if (particle.y < 0) {
          particle.y = 0;
          particle.speedY *= -1;
        } else if (particle.y > canvas.height) {
          particle.y = canvas.height;
          particle.speedY *= -1;
        }
        
        // Set opacity
        ctx.globalAlpha = particle.opacity;
        
        // Draw the binary digit
        ctx.fillText(particle.value, particle.x, particle.y);
      });
      
      frameRef.current = requestAnimationFrame(animate);
    };
    
    // Set up canvas and start animation
    resizeCanvas();
    
    // Add event listeners globally to window with high priority capture
    window.addEventListener('mousemove', handleMouseMove, { passive: true, capture: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true, capture: true });
    window.addEventListener('click', handleClick, { capture: true });
    window.addEventListener('touchstart', handleTouchStart, { capture: true });
    window.addEventListener('resize', resizeCanvas);
    
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove, { capture: true });
      window.removeEventListener('touchmove', handleTouchMove, { capture: true });
      window.removeEventListener('click', handleClick, { capture: true });
      window.removeEventListener('touchstart', handleTouchStart, { capture: true });
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(frameRef.current);
      
      if (repulseAnimationFrame.current !== null) {
        cancelAnimationFrame(repulseAnimationFrame.current);
      }
    };
  }, [
    effectiveParticleColorLight, 
    effectiveParticleColorDark, 
    effectiveParticleDensity, 
    effectiveMinSize, 
    effectiveMaxSize, 
    speed, 
    effectiveRepulseDistance, 
    repulseDuration, 
    background, 
    backgroundDark, 
    isDarkMode,
    opacity,
    repulsionStrength,
    returnSpeed
  ]);
  
  return (
    <>
      <motion.canvas
        initial={{ opacity: 0 }}
        animate={controls}
        ref={canvasRef}
        id={canvasId}
        className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ''}`}
      />
      
      {/* Welcome section with animation - show unless hideWelcome prop is true */}
      <AnimatePresence>
        {!hideWelcome && (
          <motion.div 
            className="fixed top-0 left-0 w-full h-screen flex flex-col items-center justify-center z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {/* Show alternate message when scrolling back up */}
            {showAlternateMessage ? (
  <motion.div
    key="alternate-message"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 20 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col items-center justify-center w-full"
  >
    <motion.h1 className="text-5xl md:text-7xl font-bold mb-6 text-center w-full">
      See potential?
    </motion.h1>
    <motion.p className="text-xl md:text-2xl mb-8 text-center max-w-2xl mx-auto px-4">
      Let’s collaborate and build something meaningful.
    </motion.p>
    <motion.div className="flex justify-center w-full">
      <button className="bg-foreground text-background px-6 py-3 rounded-lg font-medium pointer-events-auto">
        Get in Touch
      </button>
    </motion.div>
  </motion.div>
) : (
              // Original welcome message
              <>
                <motion.h1 
                  className="text-5xl md:text-7xl font-bold mb-6 text-center"
                  initial={{ opacity: 0, y: -20 }}
                  animate={textControls}
                >
                  Welcome to My Portfolio
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl mb-12 text-center max-w-2xl px-4"
                  initial={{ opacity: 0, y: -10 }}
                  animate={textControls}
                >
                  Explore my work and discover my journey in technology
                </motion.p>
                
                <motion.div
                  className="mt-16 flex flex-col items-center"
                  initial={{ opacity: 0 }}
                  animate={arrowControls}
                >
                  <svg 
                    width="40" 
                    height="40" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M7 13l5 5 5-5"></path>
                    <path d="M7 6l5 5 5-5"></path>
                  </svg>
                  <p className="text-sm mt-2 text-center">Scroll to know more</p>
                </motion.div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ParticleBackground;