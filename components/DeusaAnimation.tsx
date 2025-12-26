import { useEffect, useRef } from 'react';

interface DeusaAnimationProps {
  className?: string;
  duration?: number;
}

export function DeusaAnimation({ className = '', duration = 4 }: DeusaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadAndAnimateSvg = async () => {
      try {
        const response = await fetch('/deusa_vetor.svg');
        const svgText = await response.text();
        
        if (containerRef.current) {
          // Usar innerHTML diretamente
          containerRef.current.innerHTML = svgText;
          
          const svg = containerRef.current.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.position = 'absolute';
            svg.style.inset = '0';
            
            const paths = svg.querySelectorAll('path');
            
            // Preparar paths para animação (sem efeitos de cor)
            paths.forEach((path, pathIndex) => {
              const length = path.getTotalLength?.() || 1000;
              
              // Iniciar com stroke transparente para animação progressiva
              path.style.strokeDasharray = `${length}`;
              path.style.strokeDashoffset = `${length}`;
            });

            // Iniciar animação imediatamente após preparação (sem delay)
            requestAnimationFrame(() => {
              // Animar cada path
              const pathDuration = duration * 0.5; // Reduzido de 0.6 para 0.5 para animação mais rápida
              const totalAnimationTime = duration * 1000; // em milissegundos
              
              paths.forEach((path, index) => {
                const delay = (index / paths.length) * (duration * 0.08); // Reduzido de 0.1 para 0.08 para começar ainda mais rápido
                
                // Animação do stroke primeiro (desenho progressivo)
                path.style.transition = `stroke-dashoffset ${pathDuration}s ease-out ${delay}s`;
                
                // Trigger animation do stroke
                requestAnimationFrame(() => {
                  path.style.strokeDashoffset = '0';
                });
              });

              // Adicionar efeito de partículas flutuantes após a animação terminar
              timeoutRef.current = setTimeout(() => {
                const svgContainer = svg.parentElement;
                if (!svgContainer) return;

                const particleContainer = document.createElement('div');
                particleContainer.style.cssText = `
                  position: absolute;
                  inset: 0;
                  pointer-events: none;
                  overflow: hidden;
                  z-index: 1;
                `;
                svgContainer.appendChild(particleContainer);
                particleContainerRef.current = particleContainer;

                // Criar animação CSS para as partículas (apenas se não existir)
                let styleElement = document.getElementById('deusa-particles-animation');
                if (!styleElement) {
                  styleElement = document.createElement('style');
                  styleElement.id = 'deusa-particles-animation';
                  styleElement.textContent = `
                    @keyframes floatUp {
                      0% {
                        transform: translateY(0) scale(1);
                        opacity: 0.6;
                      }
                      100% {
                        transform: translateY(-100vh) scale(0);
                        opacity: 0;
                      }
                    }
                  `;
                  document.head.appendChild(styleElement);
                }

                const createParticle = () => {
                  if (!particleContainerRef.current) return;
                  
                  const particle = document.createElement('div');
                  particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: rgba(255, 255, 255, 0.6);
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    bottom: 0;
                    animation: floatUp 4s ease-out forwards;
                  `;
                  particleContainerRef.current.appendChild(particle);
                  
                  setTimeout(() => {
                    if (particle.parentElement) {
                      particle.remove();
                    }
                  }, 4000);
                };

                // Criar múltiplas partículas por ciclo
                const createMultipleParticles = () => {
                  const particleCount = 2 + Math.floor(Math.random() * 2); // 2-3 partículas por ciclo
                  for (let i = 0; i < particleCount; i++) {
                    createParticle();
                  }
                };

                // Criar partículas periodicamente (intervalo reduzido para mais frequência)
                particleIntervalRef.current = setInterval(() => {
                  if (containerRef.current && particleContainerRef.current?.parentElement) {
                    createMultipleParticles();
                  } else {
                    if (particleIntervalRef.current) {
                      clearInterval(particleIntervalRef.current);
                      particleIntervalRef.current = null;
                    }
                  }
                }, 350);
              }, totalAnimationTime);
            }); // Removido o setTimeout de 100ms
          }
        }
      } catch (error) {
        console.error('Failed to load SVG:', error);
      }
    };

    loadAndAnimateSvg();

    // Função de limpeza do useEffect
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (particleIntervalRef.current) {
        clearInterval(particleIntervalRef.current);
        particleIntervalRef.current = null;
      }
      if (particleContainerRef.current?.parentElement) {
        particleContainerRef.current.remove();
        particleContainerRef.current = null;
      }
    };
  }, [duration]);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundColor: '#050505',
        width: 'calc(100% - 4px)',
        height: 'calc(100% - 4px)',
        margin: '2px',
      }}
    />
  );
}
