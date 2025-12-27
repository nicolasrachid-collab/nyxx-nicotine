import { motion } from 'motion/react';

interface MarqueeSeparatorProps {
  text?: string;
  speed?: number;
  className?: string;
}

export function MarqueeSeparator({ 
  text = 'NYXX • PREMIUM • TECNOLOGIA • INOVAÇÃO • QUALIDADE • EXCELÊNCIA • SEGURANÇA • SABOR • FRESCOR • CONTROLE •',
  speed = 50,
  className = ''
}: MarqueeSeparatorProps) {
  return (
    <div className={`w-full overflow-hidden bg-white bg-light-pattern text-black border-2 border-gray-300 outline-none py-4 md:py-6 ${className}`}>
      <div className="flex">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{
            x: [0, -1000],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: speed,
              ease: "linear",
            },
          }}
        >
          <span className="text-base md:text-lg lg:text-xl font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase px-16 md:px-24 lg:px-32 xl:px-40">
            {text}
          </span>
          <span className="text-base md:text-lg lg:text-xl font-semibold tracking-[0.2em] md:tracking-[0.3em] uppercase px-16 md:px-24 lg:px-32 xl:px-40">
            {text}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

