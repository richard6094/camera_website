import { useState } from 'react';
import { useLocation } from 'wouter';
import { Trash2, ChevronLeft, ShoppingCart } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/**
 * Shopping Cart Page
 * Design Philosophy: Minimalism + Cinematic Aesthetics
 * 
 * Features:
 * - Display cart items
 * - Adjust quantities
 * - Remove items
 * - Calculate totals
 * - Checkout button
 */

export default function Cart() {
  const [, navigate] = useLocation();
  const { items, removeItem, updateQuantity, clearCart, total, itemCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    setIsCheckingOut(true);
    // In a real app, this would redirect to Stripe checkout
    setTimeout(() => {
      navigate('/checkout');
    }, 500);
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Page Header */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/products')}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300 mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm tracking-widest">BACK TO PRODUCTS</span>
        </button>

        <h1 className="text-display text-4xl md:text-5xl mb-2">Shopping Cart</h1>
        <p className="text-foreground/60 text-sm tracking-widest">
          {itemCount} {itemCount === 1 ? 'ITEM' : 'ITEMS'}
        </p>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 pb-16">
        {items.length === 0 ? (
          // Empty Cart
          <div className="py-24 text-center">
            <ShoppingCart className="w-16 h-16 mx-auto mb-6 text-foreground/30" />
            <h2 className="text-display text-2xl mb-4">Your cart is empty</h2>
            <p className="text-foreground/60 mb-8 max-w-md mx-auto">
              Explore our collection of precision-engineered cameras and accessories.
            </p>
            <button
              onClick={handleContinueShopping}
              className="px-8 py-3 bg-foreground text-background font-semibold tracking-widest hover:bg-foreground/90 transition-all duration-300"
            >
              CONTINUE SHOPPING
            </button>
          </div>
        ) : (
          // Cart Items
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-8">
              <div className="border-t border-foreground/10 pt-8">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-6 pb-8 border-b border-foreground/10 last:border-b-0"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 bg-foreground/5 rounded-lg overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                      <p className="text-foreground/60 text-sm mb-4">
                        ${item.price.toLocaleString()}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-foreground/20 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.quantity - 1))
                            }
                            className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors"
                          >
                            −
                          </button>
                          <span className="px-4 py-1 border-l border-r border-foreground/20">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors"
                          >
                            +
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-foreground/60 hover:text-foreground transition-colors"
                          title="Remove from cart"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm text-foreground/60 mb-2">Subtotal</p>
                      <p className="font-semibold text-lg">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-foreground/5 rounded-lg p-8 border border-foreground/10">
                <h2 className="text-subtitle text-lg tracking-widest mb-6">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-8 pb-8 border-b border-foreground/10">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Subtotal</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="flex justify-between mb-8 text-lg">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold">
                    ${total.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full px-6 py-3 bg-foreground text-background font-semibold tracking-widest hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isCheckingOut ? 'PROCESSING...' : 'PROCEED TO CHECKOUT'}
                </button>

                <button
                  onClick={handleContinueShopping}
                  className="w-full px-6 py-3 border border-foreground/20 text-foreground font-semibold tracking-widest hover:border-foreground transition-all duration-300"
                >
                  CONTINUE SHOPPING
                </button>

                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full mt-4 px-6 py-2 text-foreground/60 hover:text-foreground text-sm tracking-widest transition-colors duration-300"
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
