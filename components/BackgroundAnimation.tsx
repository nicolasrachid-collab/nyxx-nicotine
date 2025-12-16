import { motion } from "motion/react";
import { useEffect } from "react";

export function BackgroundAnimation() {
  // #region agent log
  useEffect(() => {
    const container = document.querySelector('div.absolute.inset-0.z-\\[2\\].w-full.h-full.overflow-hidden') || document.querySelector('div.absolute.inset-0[style*="z-index: 2"]') || document.querySelector('div.absolute.inset-0.w-full.h-full.overflow-hidden');
    // Tentar diferentes seletores para encontrar os blobs
    const blobs1 = container?.querySelectorAll('[class*="motion"]');
    const blobs2 = container?.querySelectorAll('div[class*="absolute"][class*="top"]');
    const blobs3 = container?.querySelectorAll('div[class*="bg-purple"], div[class*="bg-blue"], div[class*="bg-gray"]');
    const allBlobs = container?.querySelectorAll('div');
    const motionBlobs = container?.querySelectorAll('[class*="motion"]');
    const allMotionDivs = Array.from(container?.querySelectorAll('div') || []).filter((el: Element) => {
      const style = (el as HTMLElement).style;
      return style.background && style.background.includes('radial-gradient');
    });
    const noiseLayer = container?.querySelector('div[class*="bg-\\[url"]') || container?.querySelector('div[style*="background"]');
    const blobLayer = container?.querySelector('div[class*="opacity-100"]');
    const purpleBlob = Array.from(allMotionDivs).find((el: Element) => {
      const style = (el as HTMLElement).style;
      return style.background && style.background.includes('192, 132, 252');
    });
    const blueBlob = Array.from(allMotionDivs).find((el: Element) => {
      const style = (el as HTMLElement).style;
      return style.background && style.background.includes('96, 165, 250');
    });
    const grayBlob = Array.from(allMotionDivs).find((el: Element) => {
      const style = (el as HTMLElement).style;
      return style.background && style.background.includes('209, 213, 219');
    });
    const purpleBlobFilter = purpleBlob ? window.getComputedStyle(purpleBlob as Element).filter : null;
    const purpleBlobBlur = purpleBlob ? window.getComputedStyle(purpleBlob as Element).backdropFilter : null;
    const purpleBlobRect = purpleBlob ? (purpleBlob as HTMLElement).getBoundingClientRect() : null;
    const blueBlobFilter = blueBlob ? window.getComputedStyle(blueBlob as Element).filter : null;
    const blueBlobRect = blueBlob ? (blueBlob as HTMLElement).getBoundingClientRect() : null;
    const grayBlobFilter = grayBlob ? window.getComputedStyle(grayBlob as Element).filter : null;
    const grayBlobRect = grayBlob ? (grayBlob as HTMLElement).getBoundingClientRect() : null;
    const purpleBlobBg = purpleBlob ? (purpleBlob as HTMLElement).style.background : null;
    const blueBlobBg = blueBlob ? (blueBlob as HTMLElement).style.background : null;
    const grayBlobBg = grayBlob ? (grayBlob as HTMLElement).style.background : null;
    fetch('http://127.0.0.1:7247/ingest/8d140757-7318-41f0-a0f8-97af37d4b0c5',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'BackgroundAnimation.tsx:3',message:'BackgroundAnimation component rendered - detailed check',data:{containerExists:!!container,containerZIndex:container?window.getComputedStyle(container as Element).zIndex:null,containerOpacity:container?window.getComputedStyle(container as Element).opacity:null,containerBgColor:container?window.getComputedStyle(container as Element).backgroundColor:null,blobsCount1:blobs1?.length||0,blobsCount2:blobs2?.length||0,blobsCount3:blobs3?.length||0,motionBlobsCount:motionBlobs?.length||0,allMotionDivsCount:allMotionDivs.length,allDivsCount:allBlobs?.length||0,noiseLayerExists:!!noiseLayer,noiseLayerOpacity:noiseLayer?window.getComputedStyle(noiseLayer as Element).opacity:null,blobLayerExists:!!blobLayer,blobLayerOpacity:blobLayer?window.getComputedStyle(blobLayer as Element).opacity:null,purpleBlobExists:!!purpleBlob,purpleBlobOpacity:purpleBlob?window.getComputedStyle(purpleBlob as Element).opacity:null,purpleBlobBg:purpleBlobBg,purpleBlobFilter:purpleBlobFilter,purpleBlobBlur:purpleBlobBlur,purpleBlobRect:purpleBlobRect?{x:purpleBlobRect.x,y:purpleBlobRect.y,width:purpleBlobRect.width,height:purpleBlobRect.height,top:purpleBlobRect.top,left:purpleBlobRect.left}:null,blueBlobExists:!!blueBlob,blueBlobOpacity:blueBlob?window.getComputedStyle(blueBlob as Element).opacity:null,blueBlobBg:blueBlobBg,blueBlobFilter:blueBlobFilter,blueBlobRect:blueBlobRect?{x:blueBlobRect.x,y:blueBlobRect.y,width:blueBlobRect.width,height:blueBlobRect.height,top:blueBlobRect.top,left:blueBlobRect.left}:null,grayBlobExists:!!grayBlob,grayBlobOpacity:grayBlob?window.getComputedStyle(grayBlob as Element).opacity:null,grayBlobBg:grayBlobBg,grayBlobFilter:grayBlobFilter,grayBlobRect:grayBlobRect?{x:grayBlobRect.x,y:grayBlobRect.y,width:grayBlobRect.width,height:grayBlobRect.height,top:grayBlobRect.top,left:grayBlobRect.left}:null,containerChildren:container?.children.length||0},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
  }, []);
  // #endregion
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


