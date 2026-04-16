import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

export function Hero() {
  return (
    <div className="relative h-screen flex flex-col justify-center overflow-hidden pt-20">
      {/* Giant Background Text */}
      <div className="absolute right-[-5%] top-[25%] font-black text-[30vw] text-white/[0.02] select-none pointer-events-none uppercase italic">
        RRQ
      </div>
      
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="accent-box">New Season Drop</div>
            <h1 className="text-[12vw] lg:text-[10rem] mb-6 italic">
              BORN<br />READY
            </h1>
            <p className="text-rrq-dim text-lg max-w-sm leading-relaxed mb-10 font-medium">
              The 2024 Pro Apparel Collection is engineered for performance and styled for the streets.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="px-10 h-16 bg-white text-rrq-dark font-sans font-black text-xs tracking-[0.2em] flex items-center gap-3 hover:bg-rrq-accent transition-all group uppercase italic border border-white">
                Shop Collection
              </button>
            </div>
          </motion.div>

          <div className="hidden lg:flex justify-end pr-20">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-md aspect-[3/4] bg-rrq-surface border border-white/10 p-6 group"
            >
              <div className="w-full h-full bg-rrq-dark overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/rrq-hero-bold/800/1200" 
                  alt="RRQ Model" 
                  className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
  key?: string;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] bg-rrq-surface overflow-hidden p-6 mb-4 border border-transparent transition-all hover:border-rrq-accent">
        {product.isNew && (
          <div className="tag-float italic">BEST SELLER</div>
        )}
        
        <div className="w-full h-full bg-rrq-dark relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center translate-y-4 group-hover:translate-y-0 duration-300">
          <button 
            onClick={() => onAddToCart(product)}
            className="px-6 py-3 bg-white text-rrq-dark font-sans font-black text-[10px] tracking-widest hover:bg-rrq-accent transition-colors uppercase italic"
          >
            Add to Bag
          </button>
        </div>
      </div>

      <div className="space-y-1">
        <h3 className="font-black text-xs leading-none tracking-widest uppercase italic transition-colors group-hover:text-rrq-accent cursor-pointer">{product.name}</h3>
        <p className="font-sans text-xs font-bold text-rrq-accent italic">IDR {product.price.toLocaleString()}</p>
      </div>
    </motion.div>
  );
}

export function ProductGrid({ products, onAddToCart }: { products: Product[], onAddToCart: (p: Product) => void }) {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6 border-l border-white/10">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
        <div>
          <h2 className="font-black text-4xl lg:text-7xl italic uppercase tracking-tighter leading-none">Featured<br />Products</h2>
        </div>
        <div className="flex gap-4">
          {['ALL', 'JERSEYS', 'HOODIES', 'TEE'].map(filter => (
            <button key={filter} className="font-sans text-[9px] font-black tracking-[0.3em] px-4 py-2 hover:text-rrq-accent transition-colors uppercase italic">
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
}
