import { cn } from "@/lib/utils";
import { useRef, useEffect } from "react";
import { useTheme } from "next-themes";

export const GlareCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { resolvedTheme } = useTheme();
  const isPointerInside = useRef(false);
  const refElement = useRef<HTMLDivElement>(null);
  const state = useRef({
    glare: {
      x: 50,
      y: 50,
    },
    background: {
      x: 50,
      y: 50,
    },
    rotate: {
      x: 0,
      y: 0,
    },
  });
  
  const isDarkMode = resolvedTheme === 'dark' || resolvedTheme === undefined; // Default to dark mode
  
  const containerStyle = {
    "--m-x": "50%",
    "--m-y": "50%",
    "--r-x": "0deg",
    "--r-y": "0deg",
    "--bg-x": "50%",
    "--bg-y": "50%",
    "--duration": "300ms",
    "--foil-size": "100%",
    "--opacity": "0",
    "--radius": "16px",
    "--easing": "ease",
    "--transition": "var(--duration) var(--easing)",
  } as any;
 
  const backgroundStyle = {
    "--step": "5%",
    "--shade-dark": "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(150,150,255,0.85) 0%, rgba(170,150,255,0.7) 15%, rgba(150,150,255,0.4) 40%, rgba(100,100,255,0.2) 60%, rgba(150,150,255,0) 80%) var(--bg-x) var(--bg-y)/300% no-repeat",
    "--shade-light": "radial-gradient(farthest-corner circle at var(--m-x) var(--m-y), rgba(255,100,200,0.7) 0%, rgba(255,150,230,0.6) 15%, rgba(255,170,220,0.4) 40%, rgba(255,180,220,0.2) 60%, rgba(255,150,220,0) 80%) var(--bg-x) var(--bg-y)/300% no-repeat",
    backgroundBlendMode: "overlay",
  };
 
  const updateStyles = () => {
    if (refElement.current) {
      const { background, rotate, glare } = state.current;
      refElement.current?.style.setProperty("--m-x", `${glare.x}%`);
      refElement.current?.style.setProperty("--m-y", `${glare.y}%`);
      refElement.current?.style.setProperty("--r-x", `${rotate.x}deg`);
      refElement.current?.style.setProperty("--r-y", `${rotate.y}deg`);
      refElement.current?.style.setProperty("--bg-x", `${background.x}%`);
      refElement.current?.style.setProperty("--bg-y", `${background.y}%`);
    }
  };

  // Effect to handle theme changes
  useEffect(() => {
    // Force re-render the correct theme styling
    if (refElement.current) {
      // Reset the style properties to apply the correct theme
      updateStyles();
    }
  }, [resolvedTheme]);

  return (
    <div
      style={containerStyle}
      className="relative isolate [contain:layout_style] [perspective:600px] transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] will-change-transform w-full [aspect-ratio:auto] h-full"
      ref={refElement}
      onPointerMove={(event) => {
        const rotateFactor = isDarkMode ? 0.15 : 0.15;
        const rect = event.currentTarget.getBoundingClientRect();
        const position = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
        };
        const percentage = {
          x: (100 / rect.width) * position.x,
          y: (100 / rect.height) * position.y,
        };
        const delta = {
          x: percentage.x - 50,
          y: percentage.y - 50,
        };
 
        const { background, rotate, glare } = state.current;
        background.x = 50 + percentage.x / 4 - 12.5;
        background.y = 50 + percentage.y / 3 - 16.67;
        rotate.x = -(delta.x / 3.5);
        rotate.y = delta.y / 2;
        rotate.x *= rotateFactor;
        rotate.y *= rotateFactor;
        glare.x = percentage.x;
        glare.y = percentage.y;
 
        updateStyles();
      }}
      onPointerEnter={() => {
        isPointerInside.current = true;
        if (refElement.current) {
          setTimeout(() => {
            if (isPointerInside.current) {
              refElement.current?.style.setProperty("--duration", "0s");
              refElement.current?.style.setProperty("--opacity", isDarkMode ? "0.9" : "0.8");
            }
          }, 300);
        }
      }}
      onPointerLeave={() => {
        isPointerInside.current = false;
        if (refElement.current) {
          refElement.current.style.removeProperty("--duration");
          refElement.current?.style.setProperty("--r-x", `0deg`);
          refElement.current?.style.setProperty("--r-y", `0deg`);
          refElement.current?.style.setProperty("--opacity", "0");
        }
      }}
    >
      <div className="h-full grid will-change-transform origin-center transition-transform duration-[var(--duration)] ease-[var(--easing)] delay-[var(--delay)] [transform:rotateY(var(--r-x))_rotateX(var(--r-y))] rounded-[var(--radius)] border border-slate-300 dark:border-slate-800 border-opacity-30 hover:[--duration:200ms] hover:[--easing:linear] hover:filter-none overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="w-full h-full grid [grid-area:1/1] [clip-path:inset(0_0_0_0_round_var(--radius))]">
          <div className={cn("h-full w-full bg-white dark:bg-slate-950", className)}>
            {children}
          </div>
        </div>
        <div
          className="w-full h-full grid [grid-area:1/1] mix-blend-overlay opacity-[var(--opacity)] will-change-background transition-opacity [clip-path:inset(0_0_1px_0_round_var(--radius))]"
          style={{ 
            ...backgroundStyle,
            background: isDarkMode 
              ? `var(--shade-dark)`
              : `var(--shade-light)`
          }}
        />
      </div>
    </div>
  );
};