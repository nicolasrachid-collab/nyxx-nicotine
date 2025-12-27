import { useEffect, useRef, useState } from 'react';
import { AnimatedGradient } from './AnimatedGradient';

interface DeusaAnimationProps {
  className?: string;
  duration?: number;
}

export function DeusaAnimation({ className = '', duration = 4 }: DeusaAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const particleContainerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const stop1Ref = useRef<SVGStopElement | null>(null);
  const stop2Ref = useRef<SVGStopElement | null>(null);
  const [gradientReady, setGradientReady] = useState(false);

  useEffect(() => {
    const loadAndAnimateSvg = async () => {
      try {
        const response = await fetch('/deusa_vetor.svg');
        const svgText = await response.text();
        
        if (containerRef.current) {
          // Usar innerHTML diretamente
          containerRef.current.innerHTML = svgText;
          
          const svg = containerRef.current.querySelector('svg');
          
          // #region agent log
          fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DeusaAnimation.tsx:25',message:'SVG loaded',data:{svgExists:!!svg,svgId:svg?.id,svgNamespace:svg?.namespaceURI,containerInnerHTML:containerRef.current.innerHTML.substring(0,200)},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
          // #endregion
          
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.position = 'absolute';
            svg.style.inset = '0';
            
            const paths = svg.querySelectorAll('path');
            
            // Remover TODOS os estilos CSS do SVG original que podem estar sobrescrevendo o fill
            const styleElement = svg.querySelector('style');
            if (styleElement) {
              styleElement.remove();
            }
            
            // Remover TODOS os fills de TODOS os elementos do SVG ANTES de aplicar o gradiente
            // Isso é crítico - o SVG original pode ter fills que estão sendo mantidos
            const allSvgElements = svg.querySelectorAll('*');
            allSvgElements.forEach((element) => {
              if (element instanceof SVGElement) {
                element.removeAttribute('fill');
                element.removeAttribute('fill-opacity');
                element.removeAttribute('class'); // Remover classes que podem ter estilos CSS
                (element as any).style.fill = '';
                (element as any).style.fillOpacity = '';
              }
            });
            
            // Criar ou obter defs para o gradiente
            const svgNS = 'http://www.w3.org/2000/svg';
            let defs = svg.querySelector('defs');
            if (!defs) {
              defs = document.createElementNS(svgNS, 'defs');
              svg.insertBefore(defs, svg.firstChild);
            }
            
            // Remover gradiente existente se houver
            const existingGradient = defs.querySelector('#gradient-animado');
            if (existingGradient) {
              defs.removeChild(existingGradient);
            }
            
            // Criar gradiente linear animado
            const linearGradient = document.createElementNS(svgNS, 'linearGradient');
            linearGradient.setAttribute('id', 'gradient-animado');
            linearGradient.setAttribute('x1', '0%');
            linearGradient.setAttribute('y1', '0%');
            linearGradient.setAttribute('x2', '0%');
            linearGradient.setAttribute('y2', '100%');
            
            // Cores para animação do gradiente
            const colors = ["#6D4A30", "#FFD867", "#E17237", "#E5989B", "#94C1D5"];
            const colorsShifted = [...colors.slice(1), colors[0]];
            
            // Criar primeiro stop (0%)
            const stop1 = document.createElementNS(svgNS, 'stop');
            stop1.setAttribute('offset', '0%');
            stop1.setAttribute('stop-color', colors[0]);
            stop1.setAttribute('stop-opacity', '1');
            stop1Ref.current = stop1;
            linearGradient.appendChild(stop1);
            
            // Criar segundo stop (100%)
            const stop2 = document.createElementNS(svgNS, 'stop');
            stop2.setAttribute('offset', '100%');
            stop2.setAttribute('stop-color', colorsShifted[0]);
            stop2.setAttribute('stop-opacity', '1');
            stop2Ref.current = stop2;
            linearGradient.appendChild(stop2);
            
            defs.appendChild(linearGradient);
            
            // #region agent log
            const gradientInDefs = defs.querySelector('#gradient-animado');
            const gradientParent = linearGradient.parentElement;
            const gradientOwnerSVG = linearGradient.ownerSVGElement;
            fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DeusaAnimation.tsx:81',message:'Gradient created - detailed',data:{gradientId:'gradient-animado',defsExists:!!defs,gradientInDefs:!!gradientInDefs,gradientParent:gradientParent?.tagName,gradientOwnerSVG:gradientOwnerSVG?.id,svgId:svg.id,stop1Color:stop1.getAttribute('stop-color'),stop2Color:stop2.getAttribute('stop-color'),defsParent:defs.parentElement?.tagName},timestamp:Date.now(),sessionId:'debug-session',runId:'run2',hypothesisId:'F'})}).catch(()=>{});
            // #endregion
            
            // Forçar o navegador a processar o gradiente ANTES de aplicá-lo
            // Isso é crítico para garantir que a referência seja resolvida
            svg.style.display = 'none';
            svg.offsetHeight; // Force reflow
            svg.style.display = '';
            
            // Aguardar múltiplos frames para garantir que o navegador processe tudo
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                // Aplicar gradiente em todos os paths
                paths.forEach((path, index) => {
                  // Remover fills novamente para garantir
                  path.removeAttribute('fill');
                  path.removeAttribute('fill-opacity');
                  path.removeAttribute('class');
                  path.style.fill = '';
                  path.style.fillOpacity = '';
                  
                  // Primeiro, aplicar uma cor de fallback temporária para garantir visibilidade
                  path.setAttributeNS(svgNS, 'fill', colors[0]);
                  path.setAttributeNS(svgNS, 'fill-opacity', '1');
                  
                  // Forçar reflow
                  path.offsetHeight;
                  
                  // Depois, aplicar o gradiente
                  setTimeout(() => {
                    path.setAttributeNS(svgNS, 'fill', 'url(#gradient-animado)');
                    path.setAttributeNS(svgNS, 'fill-opacity', '1');
                    path.setAttributeNS(svgNS, 'fill-rule', 'evenodd');
                    
                    // Verificar se o gradiente foi aplicado corretamente
                    const computedFill = window.getComputedStyle(path).fill;
                    if (computedFill === 'rgb(0, 0, 0)' || computedFill.includes('rgb(0, 0, 0)')) {
                      // Se ainda estiver preto, tentar novamente sem namespace
                      path.removeAttribute('fill');
                      path.setAttribute('fill', 'url(#gradient-animado)');
                    }
                  }, 50);
                });
                
                // Verificar se o gradiente está sendo aplicado
                const firstPath = paths[0];
                if (firstPath) {
                  setTimeout(() => {
                    const computedStyle = window.getComputedStyle(firstPath);
                    const fillAttr = firstPath.getAttribute('fill');
                    const gradientExists = svg.getElementById('gradient-animado');
                    console.log('Gradient check:', {
                      fillAttr,
                      computedFill: computedStyle.fill,
                      gradientExists: !!gradientExists,
                      gradientInDefs: !!defs.querySelector('#gradient-animado')
                    });
                  }, 500);
                }
              });
            });
            
            // Preparar paths para animação
            paths.forEach((path, pathIndex) => {
              const length = path.getTotalLength?.() || 1000;
              
              // Iniciar com stroke transparente para animação progressiva
              path.style.strokeDasharray = `${length}`;
              path.style.strokeDashoffset = `${length}`;
            });
            
            // #region agent log
            fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DeusaAnimation.tsx:99',message:'Before setGradientReady',data:{stop1RefCurrent:!!stop1Ref.current,stop2RefCurrent:!!stop2Ref.current,gradientReady:false},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion
            
            // O componente AnimatedGradient será renderizado e sincronizará os valores
            setGradientReady(true);
            
            // #region agent log
            fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'DeusaAnimation.tsx:103',message:'After setGradientReady',data:{gradientReady:true},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'C'})}).catch(()=>{});
            // #endregion

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
    <>
      <div 
        ref={containerRef}
        className={`absolute inset-0 ${className}`}
        style={{
          backgroundColor: 'transparent',
          width: 'calc(100% - 4px)',
          height: 'calc(100% - 4px)',
          margin: '2px',
          transformOrigin: 'center center',
          animation: 'deusaFloat 6s ease-in-out infinite',
        }}
      />
      <style>{`
        @keyframes deusaFloat {
          0%, 100% {
            transform: scale(0.95) translateY(0px);
          }
          50% {
            transform: scale(0.95) translateY(-20px);
          }
        }
      `}</style>
      {gradientReady && (
        <AnimatedGradient 
          gradientId="gradient-animado"
          stop1Ref={stop1Ref}
          stop2Ref={stop2Ref}
        />
      )}
    </>
  );
}
