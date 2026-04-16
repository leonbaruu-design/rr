import { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Instagram, Twitter, Youtube, Facebook, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, CartItem } from '../types';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export function Navbar({ cartCount, onCartClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-rrq-dark/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer group">
          <span className="font-sans font-black text-xl tracking-tighter text-white uppercase italic">RRQ <span className="text-white/30 px-1">/</span> STORE</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {['COLLECTION', 'PRO KIT', 'COLLABS', 'ABOUT'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/50 hover:text-rrq-accent transition-colors relative group uppercase"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-[10px] font-black tracking-widest text-rrq-dim uppercase">
            <div className="w-1.5 h-1.5 rounded-full bg-rrq-accent animate-pulse"></div>
            Live Drop 04
          </div>
          <button 
            onClick={onCartClick}
            className="relative text-white/70 hover:text-white transition-colors group"
          >
            <ShoppingCart size={18} />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-rrq-accent text-rrq-dark text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center italic"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-rrq-dark border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
             {['JERSEYS', 'HOODIES', 'LIFESTYLE', 'LIMITED'].map((link) => (
              <a 
                key={link} 
                href="#" 
                className="font-display text-3xl tracking-tighter text-white hover:text-rrq-gold"
              >
                {link}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="bg-rrq-surface border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-b border-white/5 pb-12 mb-12">
          <div className="text-[10px] font-black tracking-[0.2em] text-rrq-dim uppercase italic">
            EST. 2013 — INDONESIA PRIDE
          </div>
          
          <div className="flex gap-10">
            {['Instagram', 'Twitter', 'Facebook'].map((link) => (
              <a key={link} href="#" className="text-[10px] font-black tracking-widest text-white hover:text-rrq-accent transition-colors uppercase italic">
                {link}
              </a>
            ))}
          </div>

          <div className="text-[10px] font-black tracking-[0.2em] text-rrq-dim uppercase italic">
            SHIPPING WORLDWIDE
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[9px] font-bold tracking-[0.3em]">
          <p>© 2024 RRQ Apparel. All Rights Reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white uppercase">Privacy Policy</a>
            <a href="#" className="hover:text-white uppercase">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

export function CartDrawer({ isOpen, onClose, items, onRemove, onUpdateQuantity }: CartDrawerProps) {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-rrq-dark border-l border-white/10 z-[101] flex flex-col"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="font-display text-2xl tracking-tight">YOUR CART</h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                  <ShoppingCart size={48} strokeWidth={1} />
                  <p className="font-mono text-sm uppercase tracking-widest">Cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="w-24 h-32 bg-rrq-navy rounded overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-bold text-sm leading-tight pr-4">{item.name}</h3>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-white/30 hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-rrq-accent font-mono text-sm leading-none">Rp {item.price.toLocaleString()}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/10 rounded group">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center border-r border-white/10 hover:bg-white/5"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border-l border-white/10 hover:bg-white/5"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              ))}
            </div>

            <div className="p-6 bg-rrq-surface border-t border-white/10 space-y-6">
              <div className="flex justify-between items-end">
                <span className="font-sans text-[10px] opacity-50 uppercase tracking-[0.2em] font-black italic">SUBTOTAL</span>
                <span className="font-display text-4xl tracking-tighter text-white">Rp {total.toLocaleString()}</span>
              </div>
              <button 
                disabled={items.length === 0}
                className="w-full bg-white text-rrq-dark font-display text-xl h-16 tracking-tighter hover:bg-rrq-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed uppercase italic border border-white"
              >
                Checkout Now
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
