import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { items, updateQuantity, removeFromCart, getSubtotal } = useCart();
  const navigate = useNavigate();
  const subtotal = getSubtotal();
  const total = subtotal;

  if (items.length === 0) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto text-center py-16">
          <ShoppingBag className="w-20 h-20 mx-auto text-muted-foreground mb-6" />
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products yet.</p>
          <Button onClick={() => navigate('/products')} className="bg-primary hover:bg-primary/90">
            Continue Shopping
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-4 rounded-xl bg-card border border-border"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-xl font-bold text-primary">${item.price}</p>
                  
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Minus className="w-4 h-4 text-foreground" />
                    </button>
                    <span className="w-8 text-center font-medium text-foreground">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center hover:bg-accent transition-colors"
                    >
                      <Plus className="w-4 h-4 text-foreground" />
                    </button>
                  </div>
                </div>
                
                {/* Delete Button */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="self-start p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                >
                  <Trash2 className="w-5 h-5 text-destructive" />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-card border border-border p-6 sticky top-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/products')}
                  className="w-full border-border text-foreground hover:bg-accent"
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
