import { motion } from "motion/react";
import { useEffect, useState } from "react";

// Detectar se deve reduzir animações para melhor performance
const shouldReduceMotion = () => {
  // Verificar preferência do usuário
  if (typeof window !== 'undefined') {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return true;
    
    // Verificar se é dispositivo móvel
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    return isMobile;
  }
  return false;
};

export function BackgroundAnimation() {
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(shouldReduceMotion());
  }, []);

  // Se reduzir movimento, retornar versão simplificada
  if (reduceMotion) {
    return (
      <div className="absolute inset-0 z-[10] w-full h-full overflow-visible pointer-events-none bg-transparent">
        <div className="absolute inset-0 opacity-30">
          <div 
            className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(192, 132, 252, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
          <div 
            className="absolute bottom-[10%] right-[10%] w-[50%] h-[60%] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(96, 165, 250, 0.3) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-[10] w-full h-full overflow-visible pointer-events-none bg-transparent">
      {/* Camada de Simulação de Fumaça/Neblina */}
      <div className="absolute inset-0 opacity-100">
        {/* Blob Roxo - Canto Superior Esquerdo - Blur reduzido para melhor performance */}
        <motion.div 
          className="absolute top-[10%] left-[10%] w-[60%] h-[60%] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(192, 132, 252, 1) 0%, rgba(168, 85, 247, 0.95) 25%, rgba(147, 51, 234, 0.8) 50%, rgba(126, 34, 206, 0.5) 75%, transparent 100%)',
            filter: 'blur(2px) brightness(2.5) saturate(1.8)', // Reduzido de 4px para 2px
            boxShadow: '0 0 80px 40px rgba(192, 132, 252, 0.4)', // Reduzido
            zIndex: 10,
            willChange: 'transform', // Otimização
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
        
        {/* Blob Azul - Canto Inferior Direito - Blur reduzido */}
        <motion.div 
          className="absolute bottom-[10%] right-[10%] w-[50%] h-[60%] rounded-full opacity-100"
          style={{
            background: 'radial-gradient(circle, rgba(96, 165, 250, 1) 0%, rgba(59, 130, 246, 0.95) 25%, rgba(37, 99, 235, 0.8) 50%, rgba(29, 78, 216, 0.5) 75%, transparent 100%)',
            filter: 'blur(2px) brightness(2.5) saturate(1.8)', // Reduzido de 4px para 2px
            boxShadow: '0 0 80px 40px rgba(96, 165, 250, 0.4)', // Reduzido
            zIndex: 10,
            willChange: 'transform', // Otimização
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
        
        {/* Blob Cinza - Centro - Removido para melhor performance */}
      </div>

      {/* Camada de Ruído (Noise Texture) - Removida para melhor performance */}
    </div>
  );
}


