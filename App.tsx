import React, { useState, useEffect, useRef, useMemo } from 'react';
import { HashRouter, Routes, Route, Link, useLocation, useParams } from 'react-router-dom';
import Prism from 'prismjs';
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { BlogPost, Language, ProfileData, Certificate } from './types';
import { BLOG_POSTS, PROFILE, CERTIFICATES } from './constants';

// --- Icons ---
const IconGlobe = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
);
const IconMusic = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
);
const IconSearch = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const IconArrowLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
);
const IconAward = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);
const IconUpload = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);
const IconGitHub = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
);
const IconEmail = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
);
const IconPhone = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);

// --- Advanced UI Components ---

// 1. Custom Cyber Button
const CyberButton: React.FC<{ 
  children: React.ReactNode; 
  onClick?: () => void; 
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
}> = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseColor = variant === 'primary' ? 'cyan' : variant === 'danger' ? 'red' : 'purple';
  
  return (
    <button 
      onClick={onClick}
      className={`relative group px-8 py-3 bg-transparent border-0 outline-none cursor-none ${className}`}
    >
      {/* Background Shapes */}
      <div className={`absolute inset-0 bg-${baseColor}-500/10 clip-button transition-all duration-300 group-hover:bg-${baseColor}-500/20`}></div>
      <div className={`absolute inset-0 border border-${baseColor}-500/50 clip-button transition-all duration-300 group-hover:border-${baseColor}-400 group-hover:shadow-[0_0_15px_rgba(0,243,255,0.3)]`}></div>
      
      {/* Corner Accents */}
      <div className={`absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-${baseColor}-400`}></div>
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-${baseColor}-400`}></div>
      
      {/* Glitch Overlay on Hover */}
      <div className={`absolute inset-0 bg-${baseColor}-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 ease-in-out skew-x-12`}></div>

      {/* Content */}
      <span className={`relative z-10 font-bold uppercase tracking-widest text-${baseColor}-300 group-hover:text-white transition-colors flex items-center justify-center gap-2`}>
        {children}
      </span>
    </button>
  );
};

// Snowfall Background Effect
const Snowfall = () => {
  const [snowflakes, setSnowflakes] = useState<{
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    blur: number;
  }[]>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 3,
      blur: Math.random() * 1.5
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden will-change-transform">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            left: `${flake.x}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            filter: `blur(${flake.blur}px)`,
            boxShadow: '0 0 8px rgba(255,255,255,0.4)',
            willChange: 'transform'
          }}
          animate={{
            y: ['0vh', '110vh'],
            x: [0, Math.sin(flake.id) * 40, 0],
            opacity: [0, 0.6, 0.6, 0],
            rotate: [0, 360]
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  );
};

// 2. Custom Cursor with Light Trail Effect
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let animationFrame: number;
    let lastTime = Date.now();
    
    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      // Add trail point every 40ms for better performance
      if (now - lastTime > 40) {
        const newTrail = {
          x: e.clientX,
          y: e.clientY,
          id: now + Math.random()
        };
        setTrail(prev => [...prev.slice(-15), newTrail]);
        lastTime = now;
      }
      
      // Check if hovering over clickable elements
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };
    
    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    
    // Clean up old trail points
    const cleanupInterval = setInterval(() => {
      setTrail(prev => prev.slice(-15));
    }, 200);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      clearInterval(cleanupInterval);
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <>
      {/* Light Trail */}
      {trail.map((point, index) => {
        const progress = index / trail.length;
        const size = 8 + progress * 28;
        const opacity = progress * 0.5;
        
        return (
          <motion.div
            key={point.id}
            className="cursor-trail-point"
            style={{
              left: point.x,
              top: point.y,
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              willChange: 'transform, opacity'
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          />
        );
      })}
      
      {/* Main Cursor Dot */}
      <motion.div
        className="cursor-glow-dot"
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: hovered ? 1.5 : 1
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 600, mass: 0.1 }}
      />
      
      {/* Outer Glow Ring */}
      <motion.div
        className={`cursor-glow-ring ${hovered ? 'hovered' : ''}`}
        style={{ willChange: 'transform' }}
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: hovered ? 1.3 : 1
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 450, mass: 0.2 }}
      />
    </>
  );
};

// 3. Scroll Progress Bar
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 origin-left z-50 shadow-[0_0_10px_rgba(0,243,255,0.7)]"
      style={{ scaleX }}
    />
  );
};

// --- Custom Hooks ---
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
};

// --- Background Component ---
const NetworkBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; baseVx: number; baseVy: number; size: number }[] = [];
    const particleCount = 70;
    const connectionDistance = 140;

    for (let i = 0; i < particleCount; i++) {
      const vx = (Math.random() - 0.5) * 0.3;
      const vy = (Math.random() - 0.5) * 0.3;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx,
        vy,
        baseVx: vx,
        baseVy: vy,
        size: Math.random() * 2 + 1
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        // Mouse interaction
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 250;
        
        if (dist < maxDist) {
            const force = (maxDist - dist) / maxDist;
            const angle = Math.atan2(dy, dx);
            // Repel slightly
            p.vx -= Math.cos(angle) * force * 0.05;
            p.vy -= Math.sin(angle) * force * 0.05;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Bounce off walls
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Friction
        p.vx = p.vx * 0.99 + p.baseVx * 0.01;
        p.vy = p.vy * 0.99 + p.baseVy * 0.01;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${0.3 + (Math.random() * 0.2)})`; // Twinkle effect
        ctx.fill();
      });

      // Draw connections
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const opacity = 1 - (dist / connectionDistance);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${opacity * 0.2})`;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full -z-20 bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#000000]"
    />
  );
};

// --- Music Player Component ---
const MusicPlayer: React.FC = () => {
  const [playing, setPlaying] = useState(false);
  const [error, setError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // URL encode the filename to handle spaces and special characters
    const audioPath = import.meta.env.MODE === 'production' ? '/Portfolio/music.mp3' : '/music.mp3';
    audioRef.current = new Audio(audioPath);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;
    
    // Add error listener
    audioRef.current.addEventListener('error', (e) => {
      console.error("Audio load error:", e);
      setError(true);
    });
    
    // Add canplay listener
    audioRef.current.addEventListener('canplay', () => {
      console.log("Audio ready to play");
      setError(false);
    });
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current && !error) {
      if (playing) {
        audioRef.current.pause();
        setPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => {
            setPlaying(true);
            console.log("Playing audio");
          })
          .catch(e => {
            console.error("Audio play failed:", e);
            setError(true);
            setPlaying(false);
          });
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
        {/* Equalizer Visualizer Simulation */}
        <div className={`flex items-end justify-center gap-1 h-8 mb-2 transition-opacity duration-300 ${playing ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-1 bg-cyan-400 animate-[pulse_0.6s_ease-in-out_infinite] h-4"></div>
            <div className="w-1 bg-purple-400 animate-[pulse_0.8s_ease-in-out_infinite] h-6"></div>
            <div className="w-1 bg-pink-400 animate-[pulse_1.0s_ease-in-out_infinite] h-3"></div>
            <div className="w-1 bg-cyan-400 animate-[pulse_0.5s_ease-in-out_infinite] h-5"></div>
        </div>

        <button 
        onClick={togglePlay}
        className={`p-4 rounded-full border backdrop-blur-xl transition-all duration-300 shadow-2xl group relative overflow-hidden ${
          error ? 'bg-red-900/40 border-red-400 text-red-300' :
          playing ? 'bg-cyan-900/40 border-cyan-400 text-cyan-300' : 
          'bg-white/5 border-white/20 text-gray-400'
        }`}
        title={error ? 'Audio file not found' : playing ? 'Pause music' : 'Play music'}
        >
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity`}></div>
        <div className={`absolute inset-0 rounded-full border border-cyan-400 opacity-0 transition-all ${playing ? 'animate-ping opacity-30' : ''}`} />
        <IconMusic />
        </button>
    </div>
  );
};

// --- Navbar Component ---
const Navbar: React.FC<{ lang: Language, setLang: (l: Language) => void }> = ({ lang, setLang }) => {
  const location = useLocation();
  
  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.hash = '#/';
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <nav className="sticky top-4 z-40 w-full px-4">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto rounded-3xl border border-white/30 bg-white/[0.02] backdrop-blur-2xl backdrop-saturate-150 shadow-[0_8px_32px_0_rgba(31,38,135,0.2)] hover:border-cyan-300/50 hover:bg-white/[0.05] hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.3)] transition-all duration-500 relative overflow-hidden group"
        style={{ 
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)'
        }}
      >
        {/* Very subtle frosted glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-3xl"></div>
        
        {/* Glass reflection - top highlight */}
        <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent rounded-t-3xl opacity-40"></div>
        
        {/* Animated shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out skew-x-12"></div>
        
        {/* Inner glow */}
        <div className="absolute inset-[1px] rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Top border highlight */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
        
        {/* Hover color glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-2xl -z-10"></div>
        
        <div className="flex items-center justify-between h-20 lg:h-24 px-8 lg:px-12 relative z-10">
          <Link to="/" onClick={scrollToTop} className="flex-shrink-0 group/logo relative">
             <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-lg opacity-0 group-hover/logo:opacity-30 blur-xl transition-opacity duration-500 animate-pulse"></div>
            <span className="text-3xl lg:text-4xl xl:text-5xl font-black tracking-tighter text-white glitch-text group-hover/logo:text-transparent group-hover/logo:bg-clip-text group-hover/logo:bg-gradient-to-r group-hover/logo:from-cyan-400 group-hover/logo:via-purple-400 group-hover/logo:to-pink-400 transition-all duration-300" data-text="PHÙNG TRỌNG HƯNG">PHÙNG TRỌNG HƯNG</span>
          </Link>
          <div className="hidden md:block">
            <div className="ml-12 flex items-baseline space-x-10 lg:space-x-12">
              <Link 
                to="/"
                onClick={scrollToTop}
                className="relative px-5 py-3 text-base lg:text-lg font-bold text-gray-300 hover:text-white transition-all group/item overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                
                <span className="relative z-10">
                  {lang === 'vi' ? 'Trang Chủ' : 'Home'}
                </span>
                
                {/* Bottom gradient line */}
                <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 group-hover/item:w-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                
                {/* Top gradient line */}
                <span className="absolute top-0 left-0 w-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 group-hover/item:w-full transition-all duration-500 opacity-0 group-hover/item:opacity-100"></span>
                
                {/* Glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-cyan-500/20 to-purple-500/20"></span>
              </Link>
              <button
                onClick={() => scrollToSection('about')}
                className="relative px-5 py-3 text-base lg:text-lg font-bold text-gray-300 hover:text-white transition-all group/item cursor-none overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                
                <span className="relative z-10">
                  {lang === 'vi' ? 'Về Tôi' : 'About'}
                </span>
                
                {/* Bottom gradient line */}
                <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 group-hover/item:w-full transition-all duration-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                
                {/* Top gradient line */}
                <span className="absolute top-0 left-0 w-0 h-1.5 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 group-hover/item:w-full transition-all duration-500 opacity-0 group-hover/item:opacity-100"></span>
                
                {/* Glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20"></span>
              </button>
              <button
                onClick={() => scrollToSection('blog')}
                className="relative px-5 py-3 text-base lg:text-lg font-bold text-gray-300 hover:text-white transition-all group/item cursor-none overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                
                <span className="relative z-10">Blog</span>
                
                {/* Bottom gradient line */}
                <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 group-hover/item:w-full transition-all duration-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
                
                {/* Top gradient line */}
                <span className="absolute top-0 left-0 w-0 h-1.5 bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 group-hover/item:w-full transition-all duration-500 opacity-0 group-hover/item:opacity-100"></span>
                
                {/* Glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20"></span>
              </button>
              <button
                onClick={() => scrollToSection('certificates')}
                className="relative px-5 py-3 text-base lg:text-lg font-bold text-gray-300 hover:text-white transition-all group/item cursor-none overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-cyan-500/10 scale-x-0 group-hover/item:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></div>
                
                <span className="relative z-10">
                  {lang === 'vi' ? 'Chứng Chỉ' : 'Certificates'}
                </span>
                
                {/* Bottom gradient line */}
                <span className="absolute bottom-0 left-0 w-0 h-1.5 bg-gradient-to-r from-pink-400 via-rose-400 to-cyan-400 group-hover/item:w-full transition-all duration-500 shadow-[0_0_10px_rgba(236,72,153,0.8)]"></span>
                
                {/* Top gradient line */}
                <span className="absolute top-0 left-0 w-0 h-1.5 bg-gradient-to-r from-cyan-400 via-rose-400 to-pink-400 group-hover/item:w-full transition-all duration-500 opacity-0 group-hover/item:opacity-100"></span>
                
                {/* Glow effect */}
                <span className="absolute inset-0 opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 blur-xl bg-gradient-to-r from-pink-500/20 to-cyan-500/20"></span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={() => setLang(lang === 'vi' ? 'en' : 'vi')}
              className="flex items-center gap-3 text-sm font-bold text-cyan-300 hover:text-white transition-all bg-gradient-to-r from-cyan-900/30 to-purple-900/30 px-6 py-3 rounded-full border-2 border-cyan-500/40 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] cursor-none backdrop-blur-sm"
            >
              <IconGlobe className="w-5 h-5" />
              <span className="uppercase tracking-widest text-base">{lang}</span>
            </button>
          </div>
        </div>
      </motion.div>
    </nav>
  );
};

// --- Certificates Section ---
const CertificatesSection: React.FC<{ lang: Language }> = ({ lang }) => {
  return (
    <section id="certificates" className="py-32 relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[150px] -z-10"></div>
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-cyan-600/10 rounded-full blur-[120px] -z-10"></div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                {lang === 'vi' ? 'Chứng Nhận' : 'Certifications'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
              {lang === 'vi' ? 'Thành Tựu' : 'Achievements'}
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto">
              {lang === 'vi' ? 'Những chứng chỉ chuyên nghiệp và thành tựu đáng tự hào' : 'Professional certificates and proud achievements'}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {CERTIFICATES.map((cert, idx) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.03, duration: 0.3 }}
                whileHover={{ y: -5, scale: 1.005 }}
                className="group relative rounded-xl bg-white/[0.02] backdrop-blur-xl border border-cyan-500/20 overflow-hidden shadow-lg hover:border-cyan-400/60 hover:bg-white/[0.05] transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] will-change-transform"
              >
                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
                
                <div className="h-48 overflow-hidden relative rounded-t-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f1729] via-transparent to-transparent z-10 opacity-60"></div>
                  <img 
                    src={cert.image} 
                    alt="Certificate" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale-[0.3] group-hover:grayscale-0" 
                  />
                  <div className="absolute top-4 right-4 z-20 bg-cyan-500/10 backdrop-blur-sm p-2.5 rounded-lg border border-cyan-500/30 group-hover:scale-110 transition-transform">
                     <IconAward className="text-cyan-400 w-5 h-5" />
                  </div>
                </div>
                <div className="p-6 relative z-20">
                  <div className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded text-[9px] font-bold uppercase tracking-widest text-cyan-400 mb-3 backdrop-blur-sm">
                    {cert.issuer}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 leading-snug group-hover:text-cyan-400 transition-colors duration-300">
                    {lang === 'vi' ? cert.title.vi : cert.title.en}
                  </h3>
                  <p className="text-gray-500 text-xs font-mono flex items-center gap-2">
                    Verified {cert.date}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Interactive "Upload" Area */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative p-[2px] bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30 rounded-3xl group mt-20"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="bg-gradient-to-br from-black/20 to-[#050505]/20 backdrop-blur-xl rounded-[22px] p-12 lg:p-16 text-center relative overflow-hidden border border-white/10">
                {/* Animated border line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-purple-500 to-transparent translate-x-[100%] group-hover:translate-x-[-100%] transition-transform duration-1000"></div>
                
                <h3 className="text-3xl lg:text-4xl xl:text-5xl font-black text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent leading-tight">
                {lang === 'vi' ? 'Bạn muốn hợp tác?' : 'Want to collaborate?'}
                </h3>
                <p className="text-gray-300 text-base lg:text-lg xl:text-xl max-w-4xl mx-auto leading-relaxed">
                {lang === 'vi' 
                    ? 'Tôi luôn tìm kiếm cơ hội để hợp tác trong các dự án AI, Machine Learning và phát triển ứng dụng web. Với kinh nghiệm trong việc xây dựng các giải pháp công nghệ sáng tạo và hiệu quả, tôi tin rằng chúng ta có thể cùng nhau tạo ra những sản phẩm tuyệt vời. Nếu bạn có ý tưởng thú vị, dự án cần đối tác kỹ thuật đáng tin cậy, hoặc đơn giản là muốn trao đổi về công nghệ, đừng ngần ngại liên hệ với tôi qua email, điện thoại, hoặc các kênh mạng xã hội. Hãy cùng nhau biến ý tưởng thành hiện thực và xây dựng tương lai công nghệ!' 
                    : 'I am always looking for opportunities to collaborate on AI, Machine Learning and web application development projects. With experience in building creative and effective technology solutions, I believe we can create amazing products together. If you have an interesting idea, a project that needs a reliable technical partner, or simply want to discuss technology, don\'t hesitate to contact me via email, phone, or social media channels. Let\'s turn ideas into reality and build the future of technology together!'}
                </p>
            </div>
          </motion.div>
       </div>
    </section>
  )
}

// --- Home Page Component ---
const HomePage: React.FC<{ lang: Language }> = ({ lang }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const typedRole = useTypewriter(PROFILE.role[lang]);
  
  const categories = [
    { id: 'all', name: { vi: 'Tất cả', en: 'All' }, color: 'cyan' },
    { id: 'python', name: { vi: 'Python/AI', en: 'Python/AI' }, color: 'blue' },
    { id: 'java', name: { vi: 'Java', en: 'Java' }, color: 'orange' },
    { id: 'javascript', name: { vi: 'JavaScript', en: 'JavaScript' }, color: 'yellow' }
  ];
  
  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const title = lang === 'vi' ? post.vi.title : post.en.title;
      const titleMatch = title.toLowerCase().includes(searchTerm.toLowerCase());
      const categoryMatch = selectedCategory === 'all' || post.codeLanguage.toLowerCase() === selectedCategory;
      return titleMatch && categoryMatch;
    });
  }, [searchTerm, lang, selectedCategory]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden flex flex-col justify-center min-h-[95vh]">
        {/* Decorative Grid & Background Effects */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20 lg:gap-24">
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 text-center lg:text-left w-full"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="relative inline-flex items-center gap-3 px-6 py-3.5 mb-10 text-sm font-bold tracking-[0.2em] text-cyan-300 uppercase rounded-full border border-cyan-500/40 backdrop-blur-md overflow-hidden group"
                style={{ minWidth: '200px', whiteSpace: 'nowrap' }}
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/30 via-purple-900/40 to-cyan-900/30 animate-[gradient_3s_ease_infinite] bg-[length:200%_100%]"></div>
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                
                {/* Content */}
                <span className="relative w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)] flex-shrink-0"></span>
                <span className="relative z-10 font-semibold" style={{ letterSpacing: '0.15em' }}>
                  {PROFILE.role[lang]}
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black text-white mb-10 tracking-tighter leading-[0.85]"
              >
                {lang === 'vi' ? 'KẾT NỐI' : 'CONNECT'} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500 glitch-text" data-text={lang === 'vi' ? 'TƯƠNG LAI' : 'THE FUTURE'}>
                  {lang === 'vi' ? 'TƯƠNG LAI' : 'THE FUTURE'}
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light"
              >
                {PROFILE.bio[lang]}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start max-w-2xl"
              >
                {/* Download CV Button - Primary CTA */}
                <a 
                  href="/CV_PHUNGTRONGHUNG_EN.pdf" 
                  download="CV_PhungTrongHung.pdf"
                  className="group relative inline-flex items-center justify-center px-6 py-3.5 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-full font-bold text-white text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-105 cursor-none overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700"></div>
                  <IconUpload className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform relative z-10" />
                  <span className="relative z-10">{lang === 'vi' ? 'Tải CV' : 'Download CV'}</span>
                </a>
                
                {/* Contact Buttons - Secondary CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="https://github.com/Thung0808" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group relative inline-flex items-center justify-center px-5 py-3 bg-black/40 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 rounded-full font-semibold text-cyan-300 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:scale-105 cursor-none"
                  >
                    <IconGitHub className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                    <span>GitHub</span>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md border border-cyan-500/30 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      <div className="text-xs text-cyan-300 font-mono">github.com/Thung0808</div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-cyan-500/30 rotate-45"></div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:phungtronghung0808@gmail.com"
                    className="group relative inline-flex items-center justify-center px-5 py-3 bg-black/40 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400 rounded-full font-semibold text-purple-300 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:scale-105 cursor-none"
                  >
                    <IconEmail className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                    <span>Email</span>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md border border-purple-500/30 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      <div className="text-xs text-purple-300 font-mono">phungtronghung0808@gmail.com</div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-purple-500/30 rotate-45"></div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:0398655377"
                    className="group relative inline-flex items-center justify-center px-5 py-3 bg-black/40 backdrop-blur-sm border border-pink-500/30 hover:border-pink-400 rounded-full font-semibold text-pink-300 hover:text-white text-sm uppercase tracking-wide transition-all duration-300 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] hover:scale-105 cursor-none"
                  >
                    <IconPhone className="w-4 h-4 mr-2 transition-transform group-hover:rotate-12" />
                    <span>Phone</span>
                    {/* Tooltip */}
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900/95 backdrop-blur-md border border-pink-500/30 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-50">
                      <div className="text-xs text-pink-300 font-mono">0398655377</div>
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-pink-500/30 rotate-45"></div>
                    </div>
                  </a>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
              className="flex-1 relative flex justify-center w-full lg:w-auto"
            >
              {/* Advanced 3D Card Effect */}
              <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:w-[450px] lg:h-[550px] group perspective-1000">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-[2.5rem] blur-[80px] opacity-50 group-hover:opacity-70 transition-opacity duration-700 animate-pulse-fast"></div>
                
                <div className="relative w-full h-full rounded-[2.5rem] border-2 border-white/20 overflow-hidden shadow-[0_0_60px_rgba(0,243,255,0.3)] transform transition-all duration-700 group-hover:rotate-y-5 group-hover:rotate-x-5 group-hover:scale-[1.02] group-hover:border-cyan-400/40 group-hover:shadow-[0_0_80px_rgba(0,243,255,0.5)]">
                   {/* Scanline Effect */}
                   <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[2px] animate-[scan_3s_linear_infinite] z-30 opacity-60"></div>
                   
                   {/* Corner Accents */}
                   <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 z-20"></div>
                   <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-400/60 z-20"></div>
                   
                   <img 
                    src={PROFILE.avatar} 
                    alt="Profile" 
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100"
                   />
                   
                   {/* Gradient Overlay - lighter for consistency */}
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity"></div>
                   
                   <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
                      <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">{PROFILE.name}</h2>
                      <p className="text-cyan-400 font-mono text-sm tracking-widest uppercase flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        {lang === 'vi' ? 'Kỹ sư AI' : 'AI Engineer'}
                      </p>
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-3 mb-6 px-6 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-full backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">
                {lang === 'vi' ? 'Giới Thiệu' : 'Introduction'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 bg-gradient-to-r from-white via-cyan-300 to-white bg-clip-text text-transparent">
              {lang === 'vi' ? 'Về Tôi' : 'About Me'}
            </h2>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              {lang === 'vi' 
                ? 'Kỹ sư AI với đam mê sâu sắc về Machine Learning và Deep Learning. Chuyên xây dựng các giải pháp AI đột phá và ứng dụng công nghệ vào thực tế.'
                : 'AI Engineer with deep passion for Machine Learning and Deep Learning. Specialized in building breakthrough AI solutions and real-world applications.'
              }
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0 }}
              className="group relative cursor-pointer"
              onClick={() => window.open('https://github.com/Thung0808', '_blank')}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-cyan-500/30 rounded-xl p-8 text-center hover:border-cyan-400/60 hover:bg-white/[0.05] transition-all duration-300">
                <div className="text-5xl font-black text-cyan-400 mb-3">10+</div>
                <div className="text-sm text-gray-300 font-semibold mb-1">
                  {lang === 'vi' ? 'Dự Án' : 'Projects'}
                </div>
                <div className="text-xs text-gray-500">
                  {lang === 'vi' ? 'Hoàn Thành' : 'Completed'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="group relative cursor-pointer"
              onClick={() => {
                const certSection = document.getElementById('certificates');
                certSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-purple-500/30 rounded-xl p-8 text-center hover:border-purple-400/60 hover:bg-white/[0.05] transition-all duration-300">
                <div className="text-5xl font-black text-purple-400 mb-3">6+</div>
                <div className="text-sm text-gray-300 font-semibold mb-1">
                  {lang === 'vi' ? 'Chứng Chỉ' : 'Certificates'}
                </div>
                <div className="text-xs text-gray-500">
                  {lang === 'vi' ? 'Chuyên Nghiệp' : 'Professional'}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="group relative"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl opacity-20 group-hover:opacity-40 blur transition-opacity"></div>
              <div className="relative bg-white/[0.02] backdrop-blur-xl border border-pink-500/30 rounded-xl p-8 text-center hover:border-pink-400/60 hover:bg-white/[0.05] transition-all duration-300">
                <div className="text-3xl font-black text-pink-400 mb-3">🎓</div>
                <div className="text-sm text-gray-300 font-semibold mb-1">
                  {lang === 'vi' ? 'Đại Học' : 'University'}
                </div>
                <div className="text-xs text-gray-500">
                  Hutech University
                </div>
              </div>
            </motion.div>
          </div>

          {/* Skills & Contact Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Skills */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 text-xl">⚡</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {lang === 'vi' ? 'Chuyên Môn' : 'Expertise'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Python', level: '95%' },
                    { name: 'Machine Learning', level: '90%' },
                    { name: 'Deep Learning', level: '85%' },
                    { name: 'Java', level: '80%' },
                    { name: 'JavaScript', level: '75%' },
                    { name: 'AI Systems', level: '88%' }
                  ].map((skill, idx) => (
                    <div key={idx} className="bg-gray-800/40 border border-gray-700/50 rounded-lg px-4 py-3 hover:border-cyan-500/40 hover:bg-gray-800/60 transition-all group">
                      <div className="text-sm font-semibold text-gray-200 mb-1">{skill.name}</div>
                      <div className="text-xs text-cyan-400 font-mono">{skill.level}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 flex items-center justify-center">
                    <span className="text-purple-400 text-xl">🎓</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {lang === 'vi' ? 'Học Vấn' : 'Education'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-cyan-500/30">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                    <div className="text-xs text-cyan-400 font-mono mb-1">{lang === 'vi' ? 'Hiện tại' : 'Current'}</div>
                    <div className="text-sm font-semibold text-white mb-1">
                      Hutech University
                    </div>
                    <div className="text-xs text-gray-400">
                      {lang === 'vi' ? 'Ngành Trí tuệ Nhân tạo' : 'Artificial Intelligence'}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >

              <div className="bg-white/[0.02] backdrop-blur-xl border border-cyan-500/20 rounded-xl p-8 hover:border-cyan-400/40 hover:bg-white/[0.05] transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
                    <span className="text-cyan-400 text-xl">📧</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {lang === 'vi' ? 'Liên Hệ' : 'Get In Touch'}
                  </h3>
                </div>
                <div className="space-y-4">
                  <a href="mailto:phungtronghung0808@gmail.com" className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/40 rounded-lg transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconEmail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Email</div>
                      <div className="text-sm text-gray-200 font-mono">phungtronghung0808@gmail.com</div>
                    </div>
                  </a>
                  <a href="tel:0398655377" className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/40 rounded-lg transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconPhone className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Phone</div>
                      <div className="text-sm text-gray-200 font-mono">0398655377</div>
                    </div>
                  </a>
                  <a href="https://github.com/Thung0808" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/40 rounded-lg transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconGitHub className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">GitHub</div>
                      <div className="text-sm text-gray-200 font-mono">github.com/Thung0808</div>
                    </div>
                  </a>
                  <a href="https://www.facebook.com/pth.88204" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 hover:border-cyan-500/40 rounded-lg transition-all group">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500 mb-1">Facebook</div>
                      <div className="text-sm text-gray-200 font-mono">Phùng Trọng Hưng</div>
                    </div>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent my-20">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
      </div>

      {/* Blog List Section */}
      <section id="blog" className="py-40 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-cyan-900/5 to-transparent"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/5 rounded-full blur-[150px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 pb-12 border-b-2 border-gradient-to-r from-cyan-500/30 via-purple-500/30 to-cyan-500/30"
            style={{ borderImage: 'linear-gradient(to right, rgba(6,182,212,0.3), rgba(188,19,254,0.3), rgba(6,182,212,0.3)) 1' }}
          >
            <div className="flex-1">
               <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-tight">
                 {lang === 'vi' ? 'Bài Viết Mới' : 'Latest Logs'}
               </h2>
               <p className="text-base md:text-lg text-gray-400 font-light">
                 {lang === 'vi' ? 'Chia sẻ kiến thức & trải nghiệm' : 'Sharing knowledge & experiences'}
               </p>
            </div>
            
            <div className="relative w-full md:w-96 group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg opacity-0 group-focus-within:opacity-20 blur transition-opacity"></div>
              <input 
                type="text"
                placeholder={lang === 'vi' ? 'Tìm dữ liệu...' : 'Search data...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative w-full bg-black/60 border-2 border-white/20 rounded-lg py-4 pl-14 pr-6 text-cyan-100 focus:outline-none focus:border-cyan-500 focus:bg-black/80 transition-all placeholder:text-gray-500 font-mono text-sm backdrop-blur-sm"
              />
              <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                <IconSearch />
              </div>
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-cyan-500 opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
            </div>
          </motion.div>

          {/* Category Tabs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative flex flex-wrap gap-3 mb-16 justify-center"
          >
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 blur-3xl -z-10 rounded-full"></div>
            
            {categories.map((category, index) => {
              const isActive = selectedCategory === category.id;
              const colorMap: Record<string, { border: string; bg: string; text: string; glow: string; gradient: string }> = {
                cyan: { 
                  border: 'border-cyan-400/40', 
                  bg: 'bg-gradient-to-br from-cyan-500/15 to-blue-500/10', 
                  text: 'text-cyan-300',
                  glow: 'shadow-[0_4px_20px_rgba(6,182,212,0.25),0_0_40px_rgba(6,182,212,0.15)]',
                  gradient: 'from-cyan-400 via-cyan-500 to-blue-500'
                },
                blue: { 
                  border: 'border-blue-400/40', 
                  bg: 'bg-gradient-to-br from-blue-500/15 to-indigo-500/10', 
                  text: 'text-blue-300',
                  glow: 'shadow-[0_4px_20px_rgba(59,130,246,0.25),0_0_40px_rgba(59,130,246,0.15)]',
                  gradient: 'from-blue-400 via-blue-500 to-indigo-500'
                },
                orange: { 
                  border: 'border-orange-400/40', 
                  bg: 'bg-gradient-to-br from-orange-500/15 to-red-500/10', 
                  text: 'text-orange-300',
                  glow: 'shadow-[0_4px_20px_rgba(249,115,22,0.25),0_0_40px_rgba(249,115,22,0.15)]',
                  gradient: 'from-orange-400 via-orange-500 to-red-500'
                },
                yellow: { 
                  border: 'border-yellow-400/40', 
                  bg: 'bg-gradient-to-br from-yellow-500/15 to-amber-500/10', 
                  text: 'text-yellow-300',
                  glow: 'shadow-[0_4px_20px_rgba(234,179,8,0.25),0_0_40px_rgba(234,179,8,0.15)]',
                  gradient: 'from-yellow-400 via-yellow-500 to-amber-500'
                }
              };
              
              const colors = colorMap[category.color];
              
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.08, duration: 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`group relative overflow-hidden rounded-full px-8 py-3.5 font-bold uppercase tracking-wide text-xs backdrop-blur-md transition-all duration-500 ${
                    isActive 
                      ? `border-2 ${colors.border} ${colors.bg} ${colors.text} ${colors.glow}`
                      : 'border border-white/10 bg-black/40 text-gray-400 hover:border-white/25 hover:bg-white/5 hover:text-gray-200 shadow-sm'
                  }`}
                >
                  {/* Animated gradient border glow for active state */}
                  {isActive && (
                    <>
                      {/* Inner glow */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-full`}
                        animate={{
                          scale: [1, 1.05, 1],
                          opacity: [0.05, 0.08, 0.05]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                      />
                      {/* Rotating shimmer */}
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-full`}
                        style={{ backgroundSize: '200% 100%' }}
                        animate={{ 
                          backgroundPosition: ['0% 50%', '200% 50%']
                        }}
                        transition={{ 
                          duration: 2.5, 
                          repeat: Infinity, 
                          ease: 'linear',
                          repeatDelay: 0.5
                        }}
                      />
                      {/* Pulse ring */}
                      <motion.div
                        className={`absolute inset-0 rounded-full border-2 ${colors.border}`}
                        animate={{
                          scale: [1, 1.15],
                          opacity: [0.5, 0]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: 'easeOut'
                        }}
                      />
                    </>
                  )}
                  
                  {/* Category name with icons */}
                  <span className="relative z-10 flex items-center gap-2">
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className={`w-1.5 h-1.5 rounded-full ${colors.bg} border ${colors.border}`}
                      />
                    )}
                    <span className={isActive ? 'font-extrabold' : 'font-semibold'}>
                      {lang === 'vi' ? category.name.vi : category.name.en}
                    </span>
                    {isActive && (
                      <motion.span
                        initial={{ scale: 0, rotate: 180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        className={`w-1.5 h-1.5 rounded-full ${colors.bg} border ${colors.border}`}
                      />
                    )}
                  </span>
                  
                  {/* Hover glow effect for inactive tabs */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500" />
                  )}
                </motion.button>
              );
            })}
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">{filteredPosts.map((post, idx) => (
              <Link to={`/post/${post.slug}`} key={post.id} className="group h-full">
                <motion.article 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.03, duration: 0.3 }}
                  whileHover={{ y: -5, scale: 1.005 }}
                  className="h-full bg-white/[0.02] backdrop-blur-xl border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-400/60 hover:bg-white/[0.05] transition-all duration-300 flex flex-col relative group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] will-change-transform"
                >
                  {/* Corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-full"></div>
                  
                  <div className="p-6 flex-1 flex flex-col relative">
                    {/* Date, read time and language badge in one row */}
                    <div className="flex justify-between items-center text-[11px] mb-3 font-mono">
                      <div className="flex items-center gap-2 text-gray-500">
                        <span>{lang === 'vi' ? post.vi.date : post.en.date}</span>
                        <span className="text-gray-400">• {lang === 'vi' ? post.vi.readTime : post.en.readTime}</span>
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-widest bg-cyan-500/10 text-cyan-400 px-2.5 py-1 border border-cyan-500/30 backdrop-blur-sm rounded">
                        {post.codeLanguage || 'DEV'}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-base lg:text-lg font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300 leading-snug line-clamp-2 min-h-[3rem]">
                      {lang === 'vi' ? post.vi.title : post.en.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-gray-400 text-xs lg:text-sm mb-5 line-clamp-3 flex-1 leading-relaxed">
                      {lang === 'vi' ? post.vi.excerpt : post.en.excerpt}
                    </p>
                    
                    {/* Tags at bottom */}
                    <div className="flex gap-2 flex-wrap mt-auto">
                        {post.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[9px] text-gray-500 bg-gray-800/40 px-2.5 py-1 rounded border border-gray-700/50 hover:border-cyan-500/40 hover:text-cyan-400 transition-colors font-medium">
                                # {tag}
                            </span>
                        ))}
                    </div>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CertificatesSection lang={lang} />
    </motion.div>
  );
};

// --- Post Detail Page Component ---
const PostPage: React.FC<{ lang: Language }> = ({ lang }) => {
  const { slug } = useParams();
  const post = BLOG_POSTS.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
    Prism.highlightAll();
  }, [post, lang]);

  if (!post) return <div className="text-center py-20 text-white">Post not found</div>;

  const content = lang === 'vi' ? post.vi : post.en;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen pt-20 pb-24 relative"
    >
      <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-cyan-900/10 via-purple-900/5 to-transparent -z-10"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[150px] -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/#blog" className="inline-flex items-center text-gray-400 hover:text-cyan-400 mb-12 transition-all gap-3 group px-5 py-3 hover:bg-gradient-to-r hover:from-cyan-900/20 hover:to-purple-900/20 rounded-full cursor-none border border-transparent hover:border-cyan-500/30">
          <IconArrowLeft />
          <span className="font-mono text-sm font-semibold group-hover:-translate-x-1 transition-transform uppercase tracking-wider">{lang === 'vi' ? 'QUAY LẠI' : 'RETURN'}</span>
        </Link>

        <article className="relative">
          {/* Header */}
          <div className="mb-16 relative">
             <div className="absolute -left-4 md:-left-12 top-0 bottom-0 w-1.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-transparent opacity-60 shadow-[0_0_20px_rgba(6,182,212,0.5)]"></div>
             <div className="flex flex-wrap gap-3 mb-8">
                {post.tags.map(tag => (
                  <span key={tag} className="text-xs font-black uppercase tracking-widest text-cyan-300 bg-gradient-to-r from-cyan-900/40 to-purple-900/40 border-2 border-cyan-500/40 px-4 py-2 rounded-lg backdrop-blur-sm shadow-[0_0_15px_rgba(6,182,212,0.2)] hover:border-cyan-400/60 transition-all">
                    {tag}
                  </span>
                ))}
             </div>
             <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-8 leading-[1.05] tracking-tighter bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
               {content.title}
             </h1>
             <div className="flex flex-wrap items-center text-sm text-gray-400 font-mono gap-6">
               <span className="flex items-center gap-2">
                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60"></span>
                 {content.date}
               </span>
               <span>// {content.readTime}</span>
               <span className="text-green-400 flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]"></span>
                 Live
               </span>
             </div>
          </div>

          {/* Featured Image */}
          <div className="relative h-[450px] md:h-[500px] w-full rounded-2xl overflow-hidden mb-16 border-2 border-white/10 group hover:border-cyan-500/40 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(6,182,212,0.3)]">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/0 via-purple-500/30 to-cyan-500/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10"></div>
            <img src={post.image} alt={post.slug} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105 transform duration-1000" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-a:text-cyan-400 prose-strong:text-cyan-200">
            <p className="lead text-2xl text-white font-light mb-12 leading-relaxed">
              {content.excerpt}
            </p>
            
            <div className="text-gray-300 space-y-8 leading-relaxed font-light">
               {content.content}
            </div>

            {post.codeSnippet && (
              <div className="mt-16 mb-12 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                <div className="relative bg-[#050505] border border-white/10 shadow-2xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                      <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-xs text-gray-500 font-mono uppercase">{post.codeLanguage || 'CODE'}</span>
                  </div>
                  <pre className="!m-0 !p-6 !bg-transparent text-sm md:text-base overflow-x-auto">
                    <code className={`language-${post.codeLanguage || 'javascript'}`}>
                      {post.codeSnippet}
                    </code>
                  </pre>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </motion.div>
  );
};

// --- Footer Component ---
const Footer: React.FC<{ lang: Language }> = ({ lang }) => (
  <footer className="bg-gradient-to-b from-black via-[#050505] to-black border-t-2 border-white/10 py-20 relative z-10 overflow-hidden">
    {/* Background Effects */}
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-cyan-500/5 via-purple-500/5 to-transparent rounded-full blur-[150px]"></div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-16">
        {/* Column 1: About */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3 justify-center md:justify-start">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
            {PROFILE.name}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {PROFILE.role[lang]}
          </p>
          <p className="text-gray-500 text-xs leading-relaxed">
            {lang === 'vi' 
              ? 'Đam mê phát triển các giải pháp AI cho bài toán thực tế.' 
              : 'Passionate about developing AI solutions for real-world problems.'}
          </p>
        </motion.div>

        {/* Column 2: Quick Links */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-bold text-cyan-400 mb-6 uppercase tracking-wider">
            {lang === 'vi' ? 'Liên kết' : 'Quick Links'}
          </h3>
          <div className="space-y-3">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm w-full text-left"
            >
              {lang === 'vi' ? 'Trang chủ' : 'Home'}
            </button>
            <button 
              onClick={() => {
                const blogSection = document.getElementById('blog');
                blogSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm w-full text-left"
            >
              Blog
            </button>
            <button 
              onClick={() => {
                const certSection = document.getElementById('certificates');
                certSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm w-full text-left"
            >
              {lang === 'vi' ? 'Chứng chỉ' : 'Certificates'}
            </button>
          </div>
        </motion.div>

        {/* Column 3: Contact */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center md:text-left"
        >
          <h3 className="text-lg font-bold text-purple-400 mb-6 uppercase tracking-wider">
            {lang === 'vi' ? 'Liên hệ' : 'Contact'}
          </h3>
          <div className="space-y-3">
            <a 
              href="mailto:phungtronghung0808@gmail.com" 
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm justify-center md:justify-start group"
            >
              <IconEmail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="truncate">phungtronghung0808@gmail.com</span>
            </a>
            <a 
              href="tel:0398655377" 
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm justify-center md:justify-start group"
            >
              <IconPhone className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>0398 655 377</span>
            </a>
            <a 
              href="https://github.com/Thung0808" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-purple-400 transition-colors text-sm justify-center md:justify-start group"
            >
              <IconGitHub className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>github.com/Thung0808</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Divider */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-500 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.8)]"></div>
      </div>

      {/* Bottom Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="flex flex-col md:flex-row justify-between items-center gap-6"
      >
        <div className="flex items-center gap-2 text-gray-600 text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 animate-pulse"></span>
          © {new Date().getFullYear()} {PROFILE.name}. {lang === 'vi' ? 'Bản quyền được bảo lưu' : 'All rights reserved'}.
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-600 text-xs">
            {lang === 'vi' ? 'Được xây dựng bằng' : 'Built with'}
          </span>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 rounded-full border border-cyan-500/20">
            <span className="text-cyan-400 text-xs font-bold">React</span>
            <span className="text-gray-600">+</span>
            <span className="text-purple-400 text-xs font-bold">TypeScript</span>
          </div>
        </div>
      </motion.div>
    </div>
  </footer>
);

// --- Main App Component ---
const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_lang');
    return (saved as Language) || 'vi';
  });

  useEffect(() => {
    localStorage.setItem('app_lang', language);
  }, [language]);

  return (
    <HashRouter>
      <div className="relative min-h-screen text-slate-200 font-sans cursor-none">
        {/* Global Overlays */}
        <div className="bg-noise"></div>
        <Snowfall />
        <CustomCursor />
        <ScrollProgress />
        <NetworkBackground />
        
        <Navbar lang={language} setLang={setLanguage} />
        
        <main className="relative z-10">
          <AnimatePresence mode='wait'>
            <Routes>
              <Route path="/" element={<HomePage lang={language} />} />
              <Route path="/post/:slug" element={<PostPage lang={language} />} />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer lang={language} />
        <MusicPlayer />
      </div>
    </HashRouter>
  );
};

export default App;