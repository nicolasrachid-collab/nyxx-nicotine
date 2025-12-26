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
          containerRef.current.innerHTML = svgText;
          
          const svg = containerRef.current.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.position = 'absolute';
            svg.style.inset = '0';
            
            const paths = svg.querySelectorAll('path');
            
            // Criar gradiente SVG com cores dos sabores diretamente no SVG
            const svgNS = 'http://www.w3.org/2000/svg';
            let defs = svg.querySelector('defs');
            if (!defs) {
              defs = document.createElementNS(svgNS, 'defs');
              svg.insertBefore(defs, svg.firstChild);
            }
            
            // Obter viewBox do SVG para coordenadas do gradiente
            const viewBox = svg.getAttribute('viewBox');
            let width = 21000, height = 29700; // Valores padrão do viewBox
            if (viewBox) {
              const [x, y, w, h] = viewBox.split(' ').map(Number);
              width = w;
              height = h;
            }
            
            // Criar gradiente linear com cores dos sabores
            const gradient = document.createElementNS(svgNS, 'linearGradient');
            gradient.setAttribute('id', 'flavor-gradient');
            gradient.setAttribute('x1', '0');
            gradient.setAttribute('y1', '0');
            gradient.setAttribute('x2', width.toString());
            gradient.setAttribute('y2', '0');
            gradient.setAttribute('gradientUnits', 'userSpaceOnUse');
            
            // Adicionar stops com cores dos sabores - cores mais vibrantes
            const colors = [
              { offset: '0%', color: '#8B5A2B', opacity: '0.6' },   // Coffee
              { offset: '20%', color: '#FFB800', opacity: '1' },    // Energy
              { offset: '40%', color: '#FF9500', opacity: '1' },    // Mango
              { offset: '60%', color: '#FF6B7A', opacity: '1' },   // Watermelon
              { offset: '80%', color: '#00C896', opacity: '1' },    // Menthol
              { offset: '100%', color: '#8B5A2B', opacity: '0.6' } // Coffee (volta)
            ];
            
            colors.forEach(({ offset, color, opacity }) => {
              const stop = document.createElementNS(svgNS, 'stop');
              stop.setAttribute('offset', offset);
              stop.setAttribute('stop-color', color);
              stop.setAttribute('stop-opacity', opacity);
              gradient.appendChild(stop);
            });
            
            // Criar animação para mover o gradiente (efeito de luz passando)
            const animate = document.createElementNS(svgNS, 'animateTransform');
            animate.setAttribute('attributeName', 'gradientTransform');
            animate.setAttribute('type', 'translate');
            animate.setAttribute('values', `-${width} 0; ${width} 0`);
            animate.setAttribute('dur', '4s');
            animate.setAttribute('repeatCount', 'indefinite');
            gradient.appendChild(animate);
            
            defs.appendChild(gradient);
            
            // Preparar paths para animação
            paths.forEach((path) => {
              const length = path.getTotalLength?.() || 1000;
              const computedStyle = window.getComputedStyle(path);
              const currentFill = computedStyle.fill;
              
              // Salvar fill original
              path.setAttribute('data-original-fill', currentFill);
              
              // Aplicar gradiente RGB no stroke (efeito de luz passando diretamente no desenho)
              path.setAttribute('stroke', 'url(#flavor-gradient)');
              path.setAttribute('stroke-width', '4');
              path.setAttribute('stroke-linecap', 'round');
              path.setAttribute('stroke-linejoin', 'round');
              
              // Esconder fill inicialmente
              path.style.fill = 'transparent';
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
                
                // Animação do stroke - desenho progressivo mais visível
                path.style.transition = `stroke-dashoffset ${pathDuration}s ease-out ${delay}s, fill ${pathDuration * 0.3}s ease-in-out ${delay + pathDuration * 0.7}s`;
                
                // Trigger animation
                requestAnimationFrame(() => {
                  path.style.strokeDashoffset = '0';
                  // Aplicar gradiente também no fill após animação para maior visibilidade
                  setTimeout(() => {
                    path.setAttribute('fill', 'url(#flavor-gradient)');
                  }, (delay + pathDuration * 0.7) * 1000);
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
      }}
    />
  );
}
