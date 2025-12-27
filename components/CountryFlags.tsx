import React from 'react';

export const BrazilFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 720 504" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="720" height="504" fill="#009c3b" />
    <polygon points="360,84 648,252 360,420 72,252" fill="#ffdf00" />
    <circle cx="360" cy="252" r="105" fill="#002776" />
    {/* Faixa branca curva */}
    <path d="M 265,280 Q 360,230 455,240 L 455,260 Q 360,250 265,300 Z" fill="#ffffff" />
    {/* Estrelas simplificadas */}
    <circle cx="360" cy="350" r="3" fill="#fff" />
    <circle cx="360" cy="180" r="3" fill="#fff" />
    <circle cx="320" cy="310" r="3" fill="#fff" />
    <circle cx="400" cy="310" r="3" fill="#fff" />
    <circle cx="300" cy="260" r="2" fill="#fff" />
  </svg>
);

export const SpainFlag = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 750 500" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="750" height="500" fill="#AA151B" />
    <rect y="125" width="750" height="250" fill="#F1BF00" />
    {/* Brasão simplificado */}
    <g transform="translate(200, 250)">
        <path d="M-30,-40 H30 V20 C30,40 10,60 0,60 C-10,60 -30,40 -30,20 Z" fill="#AA151B" stroke="#000" strokeWidth="2" opacity="0.6"/>
        <path d="M-30,-40 H30 V-50 H-30 Z" fill="#AA151B" />
    </g>
  </svg>
);

export const USAFlag = ({ className = "w-5 h-5" }: { className?: string }) => {
  // Gera grid de estrelas simplificado
  const stars = [];
  for(let y = 0; y < 9; y++) {
      for(let x = 0; x < 11; x++) {
          if ((x+y) % 2 === 0) {
             stars.push(<circle key={`${x}-${y}`} cx={30 + x * 45} cy={30 + y * 35} r="12" fill="#fff" />);
          }
      }
  }

  return (
    <svg viewBox="0 0 1235 650" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
         <g id="stripe">
             <rect width="1235" height="50" fill="#fff" />
         </g>
      </defs>
      <rect width="1235" height="650" fill="#B22234" />
      <use href="#stripe" y="50" />
      <use href="#stripe" y="150" />
      <use href="#stripe" y="250" />
      <use href="#stripe" y="350" />
      <use href="#stripe" y="450" />
      <use href="#stripe" y="550" />
      <rect width="494" height="350" fill="#3C3B6E" />
      {/* Estrelas */}
      <g transform="scale(0.9) translate(15, 15)">
        {stars}
      </g>
    </svg>
  );
};

