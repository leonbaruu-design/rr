export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'Jersey' | 'Hoodie' | 'T-Shirt' | 'Accessory';
  image: string;
  description: string;
  isNew?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'RRQ Hoshi Official Jersey 2024',
    price: 350000,
    category: 'Jersey',
    image: 'https://picsum.photos/seed/rrq-jersey/800/1000',
    description: 'The official match jersey worn by RRQ Hoshi. Features aero-cooling technology and premium fabric.',
    isNew: true
  },
  {
    id: '2',
    name: 'RRQ Stealth Tech Hoodie',
    price: 450000,
    category: 'Hoodie',
    image: 'https://picsum.photos/seed/rrq-hoodie/800/1000',
    description: 'Minimalist tech hoodie with golden accents. Perfect for cold arena environments.',
    isNew: true
  },
  {
    id: '3',
    name: 'Kingdom Supporters Tee',
    price: 185000,
    category: 'T-Shirt',
    image: 'https://picsum.photos/seed/rrq-tee/800/1000',
    description: 'Show your support for the Kingdom with this classic oversized fit tee.'
  },
  {
    id: '4',
    name: 'RRQ Pro Gamer Cap',
    price: 125000,
    category: 'Accessory',
    image: 'https://picsum.photos/seed/rrq-cap/800/1000',
    description: 'Adjustable snapback featuring the iconic RRQ crown logo.'
  },
  {
    id: '5',
    name: 'RRQ Championship Windbreaker',
    price: 520000,
    category: 'Hoodie',
    image: 'https://picsum.photos/seed/rrq-windbreaker/800/1000',
    description: 'Limited edition windbreaker celebrating world championship victories.',
    isNew: true
  },
  {
    id: '6',
    name: 'RRQ Legacy Training Pants',
    price: 295000,
    category: 'Accessory',
    image: 'https://picsum.photos/seed/rrq-pants/800/1000',
    description: 'Comfortable training pants for long gaming sessions.'
  }
];
