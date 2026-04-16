/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar, Footer, CartDrawer } from './components/Navigation';
import { Hero, ProductGrid } from './components/Home';
import { PRODUCTS, Product, CartItem } from './types';
import { motion } from 'motion/react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)} 
      />
      
      <main>
        <Hero />
        
        {/* About Section / Brand Identity */}
        <section className="py-32 bg-white text-rrq-dark relative overflow-hidden border-y border-white/10">
          <div className="absolute top-0 right-0 p-12 opacity-[0.03] select-none pointer-events-none">
            <span className="font-sans font-black text-[30vw] leading-none tracking-tighter italic uppercase">VIVAT</span>
          </div>
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="w-16 h-1 bg-rrq-accent"></div>
                <h2 className="font-sans font-black text-6xl lg:text-8xl tracking-tighter italic uppercase leading-[0.85]">
                  BEYOND <br /> THE <br /> GAME
                </h2>
                <p className="text-xl text-rrq-dark/60 font-medium max-w-sm italic">
                  We are not just a team. We are a legacy. RRQ Apparel brings the championship mindset to your daily rotation.
                </p>
                <div className="flex gap-16 pt-8">
                  <div>
                    <span className="block font-sans font-black text-5xl mb-1 italic">20+</span>
                    <span className="block font-sans text-[9px] tracking-[0.3em] font-black uppercase opacity-40 italic">Major Titles</span>
                  </div>
                  <div>
                    <span className="block font-sans font-black text-5xl mb-1 italic">5M+</span>
                    <span className="block font-sans text-[9px] tracking-[0.3em] font-black uppercase opacity-40 italic">Kingdom Fans</span>
                  </div>
                </div>
              </div>
              <div className="relative aspect-[4/3] bg-rrq-dark overflow-hidden p-8 border border-rrq-dark/10">
                <img 
                  src="https://picsum.photos/seed/rrq-action-bold/1200/800" 
                  alt="Team Action" 
                  className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </section>

        <ProductGrid 
          products={PRODUCTS} 
          onAddToCart={addToCart} 
        />

        {/* Newsletter / Call to action */}
        <section className="py-32 bg-rrq-accent text-rrq-dark">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-10">
            <h2 className="font-sans font-black text-6xl md:text-9xl italic uppercase tracking-tighter leading-none">Join the <br /> Kingdom</h2>
            <p className="font-sans text-[10px] font-black uppercase tracking-[0.4em] max-w-lg mx-auto opacity-70 italic">
              Subscribe to get early access to limited edition drops, secret discount codes, and championship alerts.
            </p>
            <form className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 pt-10" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="YOUR EMAIL ADDRESS" 
                className="flex-1 bg-white border border-black h-16 px-6 font-sans font-black text-[10px] tracking-[0.2em] outline-none transition-all placeholder:text-black/30 italic"
              />
              <button className="h-16 px-12 bg-black text-white font-sans font-black text-xs uppercase tracking-widest hover:bg-rrq-dark transition-colors whitespace-nowrap italic">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
    </div>
  );
}
