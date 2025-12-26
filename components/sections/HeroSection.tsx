import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
      {/* Efeito de fumaça/brilho de fundo */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 165, 0, 0.4) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(255, 140, 0, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 md:space-y-12"
        >
          {/* Título principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-[0.9]">
            The future
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              of flavor
            </span>
          </h1>

          {/* Imagem central estilizada */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative mx-auto w-full max-w-md md:max-w-lg lg:max-w-xl mt-12 md:mt-16"
          >
            <div className="relative aspect-square">
              {/* Placeholder para imagem - pode ser substituído por imagem real */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 backdrop-blur-xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-50 blur-2xl" />
                </div>
              </div>
              
              {/* Efeito de brilho animado */}
              <motion.div
                className="absolute inset-0 rounded-3xl"
                animate={{
                  boxShadow: [
                    '0 0 60px rgba(255, 165, 0, 0.3)',
                    '0 0 100px rgba(255, 140, 0, 0.4)',
                    '0 0 60px rgba(255, 165, 0, 0.3)',
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </motion.div>

          {/* Botão CTA */}
          <motion.a
            href="#products"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="group inline-flex items-center gap-3 px-8 py-4 md:px-12 md:py-5 text-base md:text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:border-white/60 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span>Descubra os sabores</span>
            <ArrowRight 
              size={20} 
              className="transition-transform duration-300 group-hover:translate-x-1" 
            />
          </motion.a>
        </motion.div>
      </div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-orange-400/20"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </section>
  );
}

