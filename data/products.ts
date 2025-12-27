import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'coffee',
    name: 'Coffee',
    nameKey: 'productCoffee',
    image: '/Coffee.png',
    imageSide: '/Coffee_lado.png',
    imageFront: '/Coffee_frente.png',
    color: '#6D4A30',
    descriptionKey: 'productCoffeeDesc',
    features: ['Intenso', 'Cremoso', 'Premium']
  },
  {
    id: 'energy',
    name: 'Energy',
    nameKey: 'productEnergy',
    image: '/Energy.png',
    imageSide: '/Energy_lado.png',
    imageFront: '/Energy_frente.png',
    color: '#FFD867',
    descriptionKey: 'productEnergyDesc',
    features: ['Energizante', 'Único', 'Foco']
  },
  {
    id: 'mango',
    name: 'Mango',
    nameKey: 'productMango',
    image: '/Mango.png',
    imageSide: '/Mango_lado.png',
    imageFront: '/Mango_frente.png',
    color: '#E17237',
    descriptionKey: 'productMangoDesc',
    features: ['Tropical', 'Doce', 'Refrescante']
  },
  {
    id: 'watermelon',
    name: 'Watermelon',
    nameKey: 'productWatermelon',
    image: '/Watermelon.png',
    imageSide: '/Watermelon_lado.png',
    imageFront: '/Watermelon_frente.png',
    color: '#E5989B',
    descriptionKey: 'productWatermelonDesc',
    features: ['Suave', 'Doce', 'Leve']
  },
  {
    id: 'menthol',
    name: 'Menthol',
    nameKey: 'productMenthol',
    image: '/Menthol.png',
    imageSide: '/Menthol_lado.png',
    imageFront: '/Menthol_frente.png',
    color: '#94C1D5',
    descriptionKey: 'productMentholDesc',
    features: ['Intenso', 'Fresco', 'Limpo']
  }
];

