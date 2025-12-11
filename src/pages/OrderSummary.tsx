import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CartItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    image_url: string;
  };
}

interface OrderSummaryProps {
  cartItems: CartItem[];
  shippingCost: number;
}

const OrderSummary = ({ cartItems, shippingCost }: OrderSummaryProps) => {
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product.price;
    const discountedPrice = item.product.discount 
      ? price - (price * item.product.discount / 100) 
      : price;
    return acc + discountedPrice * item.quantity;
  }, 0);

  const total = subtotal + shippingCost - discount;

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

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>

      {/* Products */}
      <div className="space-y-4">
        {cartItems.map((item) => {
          const originalPrice = item.product.price;
          const discountedPrice = item.product.discount
            ? originalPrice - (originalPrice * item.product.discount / 100)
            : originalPrice;

          return (
            <div key={item.id} className="flex gap-4 items-start">
              <div className="relative">
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-lg border border-border"
                />
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{item.product.name}</p>
                {item.product.discount > 0 && (
                  <p className="text-xs text-muted-foreground line-through">
                    Rs {originalPrice.toFixed(2)}
                  </p>
                )}
              </div>
              <p className="text-sm font-semibold text-foreground">
                Rs {(discountedPrice * item.quantity).toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>

      {/* Discount Code */}
      <div className="pt-4 border-t border-border">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              placeholder="Discount code"
              className="pl-9 bg-white"
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
          <span>Rs {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Shipping</span>
          <span>{shippingCost > 0 ? `Rs ${shippingCost.toFixed(2)}` : 'FREE'}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>-Rs {discount.toFixed(2)}</span>
          </div>
        )}
        <div className="border-t border-border pt-3 flex justify-between text-foreground font-bold text-lg">
          <span>Total</span>
          <span>Rs {total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
