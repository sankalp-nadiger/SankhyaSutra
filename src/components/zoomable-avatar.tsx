"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ZoomableAvatarProps {
  src: string;
  alt: string;
  fallback?: string;
  className?: string;
}

export function ZoomableAvatar({ src, alt, fallback, className }: ZoomableAvatarProps) {
  return (
    <Avatar 
      className={cn(
        "cursor-pointer transition-transform duration-200 hover:scale-110",
        className
      )}
    >
      <AvatarImage alt={alt} src={src} />
      {fallback && <AvatarFallback>{fallback}</AvatarFallback>}
    </Avatar>
  );
}