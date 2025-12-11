import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { User, Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { items, getSubtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  
  const subtotal = getSubtotal();
  const shippingFee = 250;
  const total = subtotal + shippingFee - discount;

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'SAVE10') {
      const discountAmount = subtotal * 0.1;
      setDiscount(discountAmount);
      toast({
        title: 'Discount Applied',
        description: '10% discount has been applied to your order.',
      });
    } else {
      toast({
        title: 'Invalid Code',
        description: 'The discount code you entered is not valid.',
        variant: 'destructive',
      });
    }
  };

  const handlePlaceOrder = () => {
    toast({
      title: 'Order Placed Successfully!',
      description: 'Thank you for your purchase. Your order is being processed.',
    });
    clearCart();
    navigate('/products');
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-5 h-5 text-primary" />
          </div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Customer Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-foreground">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="mt-1 bg-secondary border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-foreground">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="mt-1 bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Shipping Address</h2>
              <div className="grid gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address" className="text-foreground">Street Address</Label>
                  <Input
                    id="address"
                    placeholder="123 Main Street"
                    className="mt-1 bg-secondary border-border"
                  />
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-foreground">City</Label>
                    <Input
                      id="city"
                      placeholder="New York"
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state" className="text-foreground">State</Label>
                    <Input
                      id="state"
                      placeholder="NY"
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zip" className="text-foreground">ZIP Code</Label>
                    <Input
                      id="zip"
                      placeholder="10001"
                      className="mt-1 bg-secondary border-border"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="country" className="text-foreground">Country</Label>
                  <Input
                    id="country"
                    placeholder="United States"
                    className="mt-1 bg-secondary border-border"
                  />
                </div>
              </div>
            </div>

            <Button
              onClick={handlePlaceOrder}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              Place Order
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="rounded-xl bg-card border border-border p-6 sticky top-6">
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Order Summary</h2>
              
              {/* Products */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <Label className="text-foreground text-sm">Discount Code</Label>
                <div className="flex gap-2 mt-1">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      value={discountCode}
                      onChange={(e) => setDiscountCode(e.target.value)}
                      placeholder="Enter code"
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                  <Button
                    onClick={handleApplyDiscount}
                    variant="outline"
                    className="border-border hover:bg-accent"
                  >
                    Apply
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-border pt-4">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>${shippingFee.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-500">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
