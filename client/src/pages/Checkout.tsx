import { useState } from 'react';
import { useLocation } from 'wouter';
import { ChevronLeft, Lock } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

/**
 * Checkout Page
 * Design Philosophy: Minimalism + Cinematic Aesthetics
 * 
 * Features:
 * - Shipping information form
 * - Billing address
 * - Payment method selection
 * - Order review
 * - Stripe integration placeholder
 */

export default function Checkout() {
  const [, navigate] = useLocation();
  const { items, total, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate form
    if (!formData.firstName || !formData.email || !formData.address) {
      alert('Please fill in all required fields');
      setIsProcessing(false);
      return;
    }

    // In a real app, this would integrate with Stripe
    setTimeout(() => {
      alert('Payment processing would happen here with Stripe integration');
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-display text-3xl mb-4">No items in cart</h1>
          <button
            onClick={() => navigate('/products')}
            className="px-8 py-3 bg-foreground text-background font-semibold tracking-widest hover:bg-foreground/90 transition-all duration-300"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-20">
      {/* Header */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-foreground/60 hover:text-foreground transition-colors duration-300 mb-8"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm tracking-widest">BACK TO CART</span>
        </button>

        <h1 className="text-display text-4xl md:text-5xl">Checkout</h1>
      </div>

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="border-t border-foreground/10 pt-8">
                <h2 className="text-subtitle text-lg tracking-widest mb-6">
                  SHIPPING INFORMATION
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name *"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  placeholder="Street Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors mb-6"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 bg-foreground/5 border border-foreground/20 rounded-lg focus:outline-none focus:border-foreground transition-colors"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="border-t border-foreground/10 pt-8">
                <h2 className="text-subtitle text-lg tracking-widest mb-6">
                  PAYMENT METHOD
                </h2>

                <div className="p-6 bg-foreground/5 border border-foreground/20 rounded-lg flex items-center gap-4">
                  <Lock className="w-5 h-5 text-foreground/60" />
                  <div>
                    <p className="font-semibold mb-1">Secure Payment with Stripe</p>
                    <p className="text-sm text-foreground/60">
                      Your payment information is encrypted and secure
                    </p>
                  </div>
                </div>

                <p className="text-xs text-foreground/60 mt-6">
                  In a production environment, Stripe payment form would appear here.
                </p>
              </div>

              {/* Submit Button */}
              <div className="border-t border-foreground/10 pt-8">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full px-6 py-4 bg-foreground text-background font-semibold tracking-widest hover:bg-foreground/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'PROCESSING...' : 'COMPLETE PURCHASE'}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-foreground/5 rounded-lg p-8 border border-foreground/10">
              <h2 className="text-subtitle text-lg tracking-widest mb-6">
                ORDER SUMMARY
              </h2>

              <div className="space-y-4 mb-8 pb-8 border-b border-foreground/10">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-foreground/60">
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-8 pb-8 border-b border-foreground/10">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Shipping</span>
                  <span>TBD</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/60">Tax</span>
                  <span>TBD</span>
                </div>
              </div>

              <div className="flex justify-between text-lg">
                <span className="font-semibold">Total</span>
                <span className="font-bold">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
