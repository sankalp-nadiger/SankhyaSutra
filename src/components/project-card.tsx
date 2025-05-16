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
import { useState } from "react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  index?: number; // Added index prop to determine left/right placement
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
  index = 0, // Default to 0 if not provided
}: Props) {
  const [isMediaOpen, setIsMediaOpen] = useState(false);
  const hasMedia = Boolean(video || image);
  const isEven = index % 2 === 0;

  // Determine media position based on index (alternating left/right)
  const mediaPosition = isEven ? "left" : "right";

  return (
    <div className="flex flex-row gap-4 w-full">
      {/* Show media on the left for even indexes when open */}
      {hasMedia && isMediaOpen && mediaPosition === "left" && (
        <div className="w-1/2 relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          )}
          {image && !video && (
            <div className="relative h-full min-h-64">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <button 
            onClick={() => setIsMediaOpen(false)}
            className="absolute top-2 right-2 bg-slate-800 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 transition-all"
          >
            ×
          </button>
        </div>
      )}

      {/* Card */}
      <div className={cn("p-4", hasMedia && isMediaOpen ? "w-1/2" : "w-full")}>
        <GlareCard
          className={cn(
            "flex flex-col overflow-hidden transition-all duration-300 ease-out h-full bg-gradient-to-br from-white via-rose-50 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950",
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
            {hasMedia && !isMediaOpen && (
              <button 
                onClick={() => setIsMediaOpen(true)}
                className="mb-3 text-sm font-medium py-1.5 px-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-md hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-sm"
              >
                {video ? "Play Video" : "View Image"}
              </button>
            )}
            
            {tags && tags.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {tags?.map((tag) => (
                  <Badge
                    className="px-2 py-0.5 text-xs font-medium bg-gradient-to-r from-purple-100 to-indigo-100 text-indigo-800 dark:from-indigo-900 dark:to-blue-900 dark:text-indigo-200 border border-indigo-200 dark:border-indigo-800 shadow-sm"
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
                  <Link href={link?.href} key={idx} target="_blank">
                    <Badge 
                      key={idx} 
                      className="flex gap-2 px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-teal-100 to-cyan-100 text-teal-800 dark:from-purple-900 dark:to-pink-900 dark:text-purple-200 border border-teal-200 dark:border-purple-800 shadow-sm hover:shadow-md transition-all"
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

      {/* Show media on the right for odd indexes when open */}
      {hasMedia && isMediaOpen && mediaPosition === "right" && (
        <div className="w-1/2 relative rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md transition-all duration-300">
          {video && (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              controls
              className="w-full h-full object-cover"
            />
          )}
          {image && !video && (
            <div className="relative h-full min-h-64">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <button 
            onClick={() => setIsMediaOpen(false)}
            className="absolute top-2 right-2 bg-slate-800 bg-opacity-70 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-100 transition-all"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}