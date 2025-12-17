'use client';

import React from 'react';

// Função auxiliar para combinar classes (similar ao cn do shadcn)
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

type MenuToggleProps = React.ComponentProps<'svg'> & {
	open: boolean;
	duration?: number;
};

export function MenuToggleIcon({
	open,
	className,
	fill = 'none',
	stroke = 'currentColor',
	strokeWidth = 2.5,
	strokeLinecap = 'round',
	strokeLinejoin = 'round',
	duration = 500,
	...props
}: MenuToggleProps) {
	return (
		<svg
			strokeWidth={strokeWidth}
			fill={fill}
			stroke={stroke}
			viewBox="0 0 32 32"
			strokeLinecap={strokeLinecap}
			strokeLinejoin={strokeLinejoin}
			className={cn(
				'transition-transform ease-in-out',
				open && '-rotate-45',
				className,
			)}
			style={{
				transitionDuration: `${duration}ms`,
			}}
			{...props}
		>
			<path d="M7 10 27 10" />
			<path d="M14 22 27 22" />
		</svg>
	);
}

interface MenuToggleButtonProps {
	isMenuOpen: boolean;
	onClick: () => void;
	isDark?: boolean;
}

export function MenuToggleButton({ isMenuOpen, onClick, isDark = false }: MenuToggleButtonProps) {
	const strokeColor = isDark || isMenuOpen ? 'black' : 'white';
	
	return (
		<button
			onClick={onClick}
			className={`focus:outline-none relative w-9 h-9 flex items-center justify-center group transition-all duration-300 ${isDark || isMenuOpen ? 'text-black' : 'text-white'}`}
			aria-label="Toggle Menu"
		>
		<div className="relative w-full h-full flex items-center justify-center rounded">
			<MenuToggleIcon
				open={isMenuOpen}
				className="w-full h-full"
				stroke={strokeColor}
				strokeWidth={2.5}
				duration={300}
			/>
		</div>
		</button>
	);
}

