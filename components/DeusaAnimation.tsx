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
          // Usar innerHTML diretamente (mais compatível com referências de gradiente)
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
            
            // Cores dos sabores para animação sequencial
            const flavorColors = [
              { name: 'Coffee', color: '#8B5A2B' },
              { name: 'Energy', color: '#FFB800' },
              { name: 'Mango', color: '#FF9500' },
              { name: 'Watermelon', color: '#FF6B7A' },
              { name: 'Menthol', color: '#00C896' }
            ];

            // Criar um único gradiente que será animado
            const animatedGradient = document.createElementNS(svgNS, 'linearGradient');
            animatedGradient.setAttribute('id', 'flavor-animated');
            animatedGradient.setAttribute('x1', '0%');
            animatedGradient.setAttribute('y1', '0%');
            animatedGradient.setAttribute('x2', '100%');
            animatedGradient.setAttribute('y2', '0%');
            
            // Criar stops que serão animados
            const stop1 = document.createElementNS(svgNS, 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', flavorColors[0].color);
            stop1.setAttribute('stop-opacity', '0.9');
            animatedGradient.appendChild(stop1);
            
            const stop2 = document.createElementNS(svgNS, 'stop');
            stop2.setAttribute('offset', '50%');
            stop2.setAttribute('stop-color', flavorColors[0].color);
            stop2.setAttribute('stop-opacity', '1');
            animatedGradient.appendChild(stop2);
            
            const stop3 = document.createElementNS(svgNS, 'stop');
            stop3.setAttribute('offset', '100%');
            stop3.setAttribute('stop-color', flavorColors[0].color);
            stop3.setAttribute('stop-opacity', '0.9');
            animatedGradient.appendChild(stop3);
            
            defs.appendChild(animatedGradient);
            
            // Armazenar referências aos stops para animação
            (animatedGradient as any).stops = [stop1, stop2, stop3];
            
            // Preparar paths para animação
            paths.forEach((path, pathIndex) => {
              const length = path.getTotalLength?.() || 1000;
              const computedStyle = window.getComputedStyle(path);
              const currentFill = computedStyle.fill;
              
              // Salvar fill original
              path.setAttribute('data-original-fill', currentFill);
              
              // Iniciar com o gradiente animado
              // Remover fill/stroke existentes primeiro para forçar atualização
              path.removeAttribute('fill');
              path.removeAttribute('stroke');
              
              // Aplicar gradiente usando setAttributeNS para garantir namespace correto
              const svgNS = 'http://www.w3.org/2000/svg';
              path.setAttributeNS(null, 'fill', 'url(#flavor-animated)');
              path.setAttributeNS(null, 'stroke', 'url(#flavor-animated)');
              path.setAttributeNS(null, 'stroke-width', '2');
              path.setAttributeNS(null, 'stroke-linecap', 'round');
              path.setAttributeNS(null, 'stroke-linejoin', 'round');
              
              // Usar atributo SVG para fill-opacity (não CSS style, que não funciona bem com SVGs dinâmicos)
              path.setAttributeNS(null, 'fill-opacity', '0');
              
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
                  
                  // Revelar o fill com gradiente RGB usando animação SVG nativa (fill-opacity não anima com CSS transition)
                  const fillRevealDelay = (delay + pathDuration * 0.6) * 1000;
                  setTimeout(() => {
                    // Criar animação SVG nativa para fill-opacity
                    const animateFillOpacity = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
                    animateFillOpacity.setAttribute('attributeName', 'fill-opacity');
                    animateFillOpacity.setAttribute('from', '0');
                    animateFillOpacity.setAttribute('to', '1');
                    animateFillOpacity.setAttribute('dur', `${pathDuration * 0.4}s`);
                    animateFillOpacity.setAttribute('fill', 'freeze');
                    path.appendChild(animateFillOpacity);
                    animateFillOpacity.beginElement();
                  }, fillRevealDelay);
                });
              });

              // Iniciar ciclo de cores após animação inicial (começar mais cedo)
              const startColorCycle = () => {
                const colorChangeDuration = 3000; // 3 segundos por cor
                let currentColorIndex = 0;
                
                const changeColor = () => {
                  // Mudar para próxima cor
                  currentColorIndex = (currentColorIndex + 1) % flavorColors.length;
                  const newColor = flavorColors[currentColorIndex].color;
                  
                  // Animar os stops do gradiente diretamente usando animação SVG
                  const stops = (animatedGradient as any).stops;
                  if (stops && stops.length > 0) {
                    stops.forEach((stop: SVGStopElement) => {
                      // Remover animações anteriores
                      const existingAnimate = stop.querySelector('animate');
                      if (existingAnimate) {
                        stop.removeChild(existingAnimate);
                      }
                      
                      // Obter cor atual
                      const currentColor = stop.getAttribute('stop-color') || flavorColors[0].color;
                      
                      // Criar nova animação SVG
                      const animate = document.createElementNS(svgNS, 'animate');
                      animate.setAttribute('attributeName', 'stop-color');
                      animate.setAttribute('from', currentColor);
                      animate.setAttribute('to', newColor);
                      animate.setAttribute('dur', '2s');
                      animate.setAttribute('fill', 'freeze');
                      
                      stop.appendChild(animate);
                      
                      // Iniciar animação
                      try {
                        animate.beginElement();
                      } catch (e) {
                        // Fallback: mudar cor diretamente se animação falhar
                        stop.setAttribute('stop-color', newColor);
                      }
                    });
                  }
                };
                
                // Iniciar primeira mudança de cor após um pequeno delay
                setTimeout(() => {
                  changeColor();
                }, 1000);
                
                // Continuar mudando cor a cada intervalo
                const colorInterval = setInterval(() => {
                  changeColor();
                }, colorChangeDuration);
                
                // Armazenar intervalo para limpeza
                (window as any).deusaColorInterval = colorInterval;
              };
              
              // Começar ciclo de cores mais cedo (após 50% da animação)
              setTimeout(() => {
                startColorCycle();
              }, totalAnimationTime * 0.5);

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
      // Limpar intervalo de cores
      if ((window as any).deusaColorInterval) {
        clearInterval((window as any).deusaColorInterval);
        (window as any).deusaColorInterval = null;
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
