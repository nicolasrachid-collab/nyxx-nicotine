import React, { useEffect, useState, ReactNode } from 'react';
import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
  label: string; // Para tradução
}

interface TubelightNavbarProps {
  items: NavItem[];
  activeTab?: string;
  onTabChange?: (name: string) => void;
  className?: string;
  leftElement?: ReactNode; // Para o logo
  rightElement?: ReactNode; // Para o botão de idioma
}

export function TubelightNavbar({ 
  items, 
  activeTab, 
  onTabChange,
  className,
  leftElement,
  rightElement
}: TubelightNavbarProps) {
  const [currentActiveTab, setCurrentActiveTab] = useState(activeTab || items[0].name);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (activeTab) {
      setCurrentActiveTab(activeTab);
    }
  }, [activeTab]);

  const handleClick = (item: NavItem, e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setCurrentActiveTab(item.name);
    if (onTabChange) {
      onTabChange(item.name);
    }
    
    // Scroll suave para a seção
    const target = document.querySelector(item.url);
    if (target) {
      const headerOffset = 100;
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className={cn(
        'relative',
        className,
      )}
    >
      <div className="flex items-center gap-4 sm:gap-6 bg-black/50 border border-white/10 backdrop-blur-lg py-2 px-3 rounded-full shadow-lg">
        {/* Logo à esquerda */}
        {leftElement && (
          <div className="flex items-center px-2">
            {leftElement}
          </div>
        )}
        
        {/* Itens de navegação */}
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentActiveTab === item.name;

          return (
            <a
              key={item.name}
              href={item.url}
              onClick={(e) => handleClick(item, e)}
              className={cn(
                'relative cursor-pointer text-sm sm:text-base font-semibold px-6 sm:px-8 py-2.5 rounded-full transition-colors',
                'text-white/80 hover:text-white',
                isActive && 'bg-black text-white',
              )}
            >
              <span className="hidden md:inline">{item.label}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-black rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </a>
          );
        })}
        
        {/* Botão de idioma à direita */}
        {rightElement && (
          <div className="flex items-center px-2">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
}

