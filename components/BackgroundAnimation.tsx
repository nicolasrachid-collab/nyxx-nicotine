import { motion } from "motion/react";
import { useEffect } from "react";

export function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 z-[10] w-full h-full overflow-visible pointer-events-none bg-transparent">
      {/* Camada de Simulação de Fumaça/Neblina */}
      <div className="absolute inset-0 opacity-100">
        {/* Blob Roxo - Canto Superior Esquerdo - Blur suave para glow */}
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 1) 0%, rgba(168, 85, 247, 0.95) 25%, rgba(147, 51, 234, 0.8) 50%, rgba(126, 34, 206, 0.5) 75%, transparent 100%)',
            filter: 'blur(4px) brightness(2.5) saturate(1.8)',
            boxShadow: '0 0 100px 50px rgba(192, 132, 252, 0.5)',
            zIndex: 10,
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Blob Azul - Canto Inferior Direito - Blur suave para glow */}
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[50%] h-[60%] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 1) 0%, rgba(59, 130, 246, 0.95) 25%, rgba(37, 99, 235, 0.8) 50%, rgba(29, 78, 216, 0.5) 75%, transparent 100%)',
            filter: 'blur(4px) brightness(2.5) saturate(1.8)',
            boxShadow: '0 0 100px 50px rgba(96, 165, 250, 0.5)',
            zIndex: 10,
          }}
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Blob Cinza - Centro - Blur suave para glow */}
        <motion.div 
          className="absolute top-[35%] left-[25%] w-[50%] h-[50%] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(229, 231, 235, 0.95) 25%, rgba(209, 213, 219, 0.8) 50%, rgba(156, 163, 175, 0.5) 75%, transparent 100%)',
            filter: 'blur(3px) brightness(2.5) saturate(1.8)',
            boxShadow: '0 0 80px 40px rgba(255, 255, 255, 0.4)',
            zIndex: 10,
          }}
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -20, 20, 0],
            opacity: [0.9, 1, 0.9],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5,
          }}
        />
      </div>

      {/* Camada de Ruído (Noise Texture) - Reduzida para não interferir */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
}


