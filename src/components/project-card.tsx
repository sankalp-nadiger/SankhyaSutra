"use client";

import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { GlareCard } from "./ui/glareCard";
import { useState, useEffect, useRef, useContext } from "react";
import { VideoSidePanelsContext } from "@/lib/videoPanel";

interface ProjectCardProps {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  videoSide?: "left" | "right";
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  videoSide = "right",
  links,
  className,
  index = 0, // Default to 0 if not provided
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const { registerProjectCard } = useContext(VideoSidePanelsContext);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const swipeDistance = touchEnd - touchStart;
    
    // Only flip if the swipe distance is significant (more than 50px)
    if (Math.abs(swipeDistance) > 50) {
      setIsFlipped(prev => !prev);
    }
  };

  // Check if the device is mobile or tablet
  useEffect(() => {
    const checkDeviceType = () => {
      setIsMobile(window.innerWidth < 1200); // Higher breakpoint for this layout
    };

    // Initial check
    checkDeviceType();

    // Add event listener for window resize
    window.addEventListener("resize", checkDeviceType);

    // Clean up
    return () => window.removeEventListener("resize", checkDeviceType);
  }, []);

  // Register with the video side panels system
  useEffect(() => {
    if (video && !isMobile) {
      // Use index to determine the side: even indices (0,2,4) on left, odd on right
      const side = index % 2 === 0 ? "left" : "right";
      registerProjectCard(ref, side, title, video, title);
    }
  }, [registerProjectCard, index, title, video, isMobile]);

  // Mobile media component that appears within the card
  const MobileMediaComponent = () => (
    <div className="relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300">
      {isFlipped ? (
        video ? (
          <div className="relative aspect-video">
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          image && (
            <div className="relative aspect-video">
              <Image src={image} alt={title} fill className="object-cover" />
            </div>
          )
        )
      ) : (
        <div className="relative aspect-video">
          <Image
            src={image || "/api/placeholder/400/320"}
            alt={title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                <svg 
                  viewBox="0 0 24 24" 
                  className="w-6 h-6 text-indigo-600"
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white text-sm font-medium px-3 py-1 rounded-full bg-black/40 backdrop-blur-sm">
                Swipe to preview
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative project-card"
      ref={ref}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main card content - always centered */}
      <div className={cn("w-full relative", isMobile && "perspective-1000")}>
        <GlareCard
          style={{
            transform: isMobile && isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
            transformStyle: 'preserve-3d',
          }}
          className={cn(
            "flex flex-col overflow-hidden transition-all duration-500 ease-out h-full relative backface-hidden",
            index % 2 === 0
              ? "bg-gradient-to-br from-white via-rose-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950"
              : "bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-950 dark:via-slate-800 dark:to-slate-950",
            className
          )}
        >
          <CardHeader className="px-4 pt-4">
            <div className="space-y-2">
              <CardTitle className="mt-1 text-lg font-medium text-slate-900 dark:text-slate-50">
                {title}
              </CardTitle>
              <time className="font-sans text-xs text-slate-700 dark:text-slate-400">
                {dates}
              </time>
              {link && (
                <div className="font-sans text-xs text-indigo-600 dark:text-blue-400 hover:underline">
                  <Link href={link} target="_blank">
                    {link.replace("https://", "").replace("www.", "")}
                  </Link>
                </div>
              )}
              <Markdown className="prose max-w-full text-pretty font-sans text-xs text-slate-600 dark:text-slate-400">
                {description}
              </Markdown>
            </div>
          </CardHeader>

          <CardContent className="mt-auto flex flex-col px-4">
            {/* Show media for mobile devices inside the card */}
            {(video || image) && isMobile && (
              <div className="relative mb-4">
                <MobileMediaComponent />
              </div>
            )}

            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags?.map((tag) => (
                  <Badge
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium shadow-sm",
                      index % 2 === 0
                        ? "bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 dark:from-indigo-900 dark:to-blue-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800"
                        : "bg-gradient-to-r from-rose-100 to-orange-100 text-rose-800 dark:from-rose-900 dark:to-orange-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800"
                    )}
                    key={tag}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>

          <CardFooter className="px-4 pb-4">
            {links && links.length > 0 && (
              <div className="flex flex-row flex-wrap items-start gap-2">
                {links?.map((link, idx) => (
                  <Link 
                    key={idx}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block hover:scale-105 transition-transform cursor-pointer" 
                  >
                    <Badge
                      className={cn(
                        "flex items-center gap-2 px-3 py-1.5 text-xs font-medium shadow-sm hover:shadow-md transition-all cursor-pointer",
                        index % 2 === 0
                          ? "bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 border border-teal-200 dark:border-purple-800"
                          : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-800 dark:from-amber-900 dark:to-orange-900 dark:text-amber-200 border border-amber-200 dark:border-amber-800"
                      )}
                    >
                      {link.icon}
                      {link.type}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </CardFooter>
        </GlareCard>
      </div>
    </div>
  );
};