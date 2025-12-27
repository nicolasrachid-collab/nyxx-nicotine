import React, { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export function GridBackground({ className, children }: GridBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const patternId = useRef(`grid-pattern-${Math.random().toString(36).substr(2, 9)}`);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const gridOffsetX = useMotionValue(0);
  const gridOffsetY = useMotionValue(0);

  const speedX = 0.5;
  const speedY = 0.5;

  const [maskImage, setMaskImage] = useState('radial-gradient(300px circle at 0px 0px, black, transparent)');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    mouseX.set(x);
    mouseY.set(y);
    setMaskImage(`radial-gradient(300px circle at ${x}px ${y}px, black, transparent)`);
  };

  useEffect(() => {
    const animate = () => {
      const currentX = gridOffsetX.get();
      const currentY = gridOffsetY.get();
      gridOffsetX.set((currentX + speedX) % 40);
      gridOffsetY.set((currentY + speedY) % 40);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [gridOffsetX, gridOffsetY]);


  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("absolute inset-0 w-full h-full bg-white", className)}
    >
      {/* Grid pattern base (opacidade baixa) */}
      <div className="absolute inset-0 z-[1] opacity-[0.25]" style={{ pointerEvents: 'none' }}>
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} patternId={patternId.current} />
      </div>

      {/* Grid pattern interativo (seguindo o mouse) */}
      <motion.div
        className="absolute inset-0 z-[1] opacity-70"
        style={{ 
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
          pointerEvents: 'none'
        }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} patternId={patternId.current} />
      </motion.div>

      {/* Gradientes de fundo */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <div className="absolute right-[-20%] top-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 blur-[120px]" />
        <div className="absolute right-[10%] top-[-10%] w-[20%] h-[20%] rounded-full bg-orange-400/30 blur-[100px]" />
        <div className="absolute left-[-10%] bottom-[-20%] w-[40%] h-[40%] rounded-full bg-orange-500/40 blur-[120px]" />
      </div>

      {/* Conteúdo */}
      <div className="relative z-[2] w-full h-full">{children}</div>
    </div>
  );
}

interface GridPatternProps {
  offsetX: any;
  offsetY: any;
  patternId: string;
}

function GridPattern({ offsetX, offsetY, patternId }: GridPatternProps) {
  const x = useTransform(offsetX, (value) => value);
  const y = useTransform(offsetY, (value) => value);

  return (
    <svg 
      className="w-full h-full" 
      style={{ display: 'block', position: 'absolute', inset: 0, pointerEvents: 'none' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <motion.pattern
          id={patternId}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-400"
          />
        </motion.pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} />
    </svg>
  );
}

