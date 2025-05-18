"use client";

import React, { useEffect, useState, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Expand, ZoomIn, ZoomOut, X } from 'lucide-react';

interface VideoData {
  videoSrc?: string;
  title?: string;
  id: string;
}

interface VideoPosition {
  top: number;
  side: 'left' | 'right';
}

interface VisibleVideoWithPosition extends VideoData {
  position: VideoPosition;
}

interface VideoSidePanelsContextType {
  registerProjectCard: (
    ref: React.RefObject<HTMLElement>,
    side: 'left' | 'right',
    id: string,
    video?: string,
    title?: string
  ) => void;
}

export const VideoSidePanelsContext = createContext<VideoSidePanelsContextType>({
  registerProjectCard: () => {}
});

interface MediaComponentProps {
  data: VisibleVideoWithPosition;
  onFullscreen: (video: VideoData) => void;
}

interface VideoSidePanelsProviderProps {
  children: React.ReactNode;
}

const MediaComponent = ({ data, onFullscreen }: MediaComponentProps) => {
  const { videoSrc, title, position } = data;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ 
        opacity: 0, 
        x: position.side === "left" ? -60 : 60,
        scale: 0.95 
      }}
      animate={{ 
        opacity: 1, 
        x: 0,
        scale: 1 
      }}
      exit={{ 
        opacity: 0,
        x: position.side === "left" ? -60 : 60,
        scale: 0.9,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        "fixed w-[360px]",
        position.side === "left" ? "left-3" : "right-3"
      )}
      style={{ top: `${position.top}px`, pointerEvents: 'none' }}
    >
      <motion.div 
        className="relative rounded-lg overflow-hidden shadow-xl bg-black/5 backdrop-blur-sm group"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        style={{ pointerEvents: 'auto' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video object-cover rounded-lg"
        />
          <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => onFullscreen(data)}
          className="absolute top-2 right-2 p-2 rounded-lg bg-black/20 backdrop-blur-sm text-white/90 hover:bg-black/40 hover:text-white transition-all pointer-events-auto"
        >
          <Expand className="w-5 h-5" />
        </motion.button>

        {title && (
          <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
            <p className="text-white text-sm font-medium">{title}</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export function VideoSidePanelsProvider({ children }: VideoSidePanelsProviderProps) {
  const [mounted, setMounted] = useState(false);
  const [visibleVideos, setVisibleVideos] = useState<VisibleVideoWithPosition[]>([]);
  const [fullscreenVideo, setFullscreenVideo] = useState<VideoData | null>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    setMounted(true);
    
    // Setup intersection observer for project cards
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const element = entry.target as HTMLElement;
          const id = element.dataset.id;
          const side = element.dataset.side as 'left' | 'right';
          const videoSrc = element.dataset.videoSrc;
          const title = element.dataset.title;
          
          if (!id || !side || !videoSrc) return;

          if (entry.isIntersecting) {
            const rect = element.getBoundingClientRect();
            setVisibleVideos(prev => {
              // Check if video is already in the list
              if (prev.some(v => v.id === id)) return prev;
              
              return [...prev, {
                id,
                videoSrc,
                title,
                position: {
                  top: rect.top,
                  side
                }
              }];
            });
          } else {
            setVisibleVideos(prev => prev.filter(v => v.id !== id));
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '-100px 0px -100px 0px' // Add some margin to trigger earlier
      }
    );
    
    // Find all project cards and observe them
    const projectCards = document.querySelectorAll<HTMLElement>('[data-side]');
    projectCards.forEach(card => observer.observe(card));
    
    // Update positions on scroll
    const handleScroll = () => {
      setVisibleVideos(prev => {
        const updated = prev.map(video => {
          const element = document.querySelector(`[data-id="${video.id}"]`);
          if (!element) return video;
          
          const rect = element.getBoundingClientRect();
          return {
            ...video,
            position: {
              ...video.position,
              top: rect.top
            }
          };
        });
        return updated;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      projectCards.forEach(card => observer.unobserve(card));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!fullscreenVideo) {
      setZoom(1);
    }
  }, [fullscreenVideo]);

  const value: VideoSidePanelsContextType = {
    registerProjectCard: (ref, side, id, video, title) => {
      if (ref.current) {
        ref.current.dataset.side = side;
        ref.current.dataset.id = id;
        if (video) ref.current.dataset.videoSrc = video;
        if (title) ref.current.dataset.title = title;
      }
    }
  };

  return (
    <VideoSidePanelsContext.Provider value={value}>
      {children}
      {mounted && createPortal(
        <AnimatePresence>
          {visibleVideos.map((video) => (
            <MediaComponent
              key={video.id}
              data={video}
              onFullscreen={setFullscreenVideo}
            />
          ))}
          {fullscreenVideo && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90"
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full h-full max-w-7xl mx-auto p-4 flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button 
                    onClick={() => setZoom(prev => Math.max(1, prev - 0.25))}
                    className="p-2 rounded-lg bg-black/50 text-white/90 hover:bg-black/70 hover:text-white transition-all"
                    disabled={zoom <= 1}
                  >
                    <ZoomOut className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setZoom(prev => Math.min(2, prev + 0.25))}
                    className="p-2 rounded-lg bg-black/50 text-white/90 hover:bg-black/70 hover:text-white transition-all"
                    disabled={zoom >= 2}
                  >
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setFullscreenVideo(null)}
                    className="p-2 rounded-lg bg-black/50 text-white/90 hover:bg-black/70 hover:text-white transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="relative w-full max-h-[90vh] overflow-auto">
                  <motion.div
                    animate={{ scale: zoom }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="origin-center"
                  >
                    <video
                      src={fullscreenVideo.videoSrc}
                      autoPlay
                      controls
                      className="w-full rounded-lg shadow-2xl"
                      style={{ maxHeight: '85vh' }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </VideoSidePanelsContext.Provider>
  );
}

// Hook to use side panels in components
export function useVideoSidePanels() {
  const context = useContext(VideoSidePanelsContext);
  if (!context) {
    throw new Error('useVideoSidePanels must be used within a VideoSidePanelsProvider');
  }
  return context;
}

// Standalone component that just renders the side panels
export default function VideoSidePanels() {
  return (
    <VideoSidePanelsProvider>
      <style jsx global>{`
        @media (min-width: 1200px) {
          .max-w-2xl {
            max-width: 42rem !important;
            margin-left: auto !important;
            margin-right: auto !important;
            position: relative;
            z-index: 10;
          }
        }
      `}</style>
    </VideoSidePanelsProvider>
  );
}