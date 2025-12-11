import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  discount?: number;
  images?: string[];
  description?: string;
  category?: string;
}

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('API Error:', err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToBag = () => {
    if (!product) return;
    
    const finalPrice = product.discount 
      ? product.price - (product.price * product.discount / 100)
      : product.price;

    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.images?.length ? product.images[0] : "https://placehold.co/400",
    });
    
    toast({
      title: 'Added to Bag',
      description: `${product.name} has been added to your bag.`,
    });
    navigate('/cart');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-20 text-lg font-semibold">Loading product...</div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">Product not found.</p>
          <Button onClick={() => navigate('/products')} className="mt-4">
            Back to Products
          </Button>
        </div>
      </MainLayout>
    );
  }

  const discountedPrice = product.discount 
    ? product.price - (product.price * product.discount / 100)
    : null;

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-secondary border border-border">
            <img
              src={product.images?.length ? product.images[0] : "https://placehold.co/600"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
                {product.name}
              </h1>
              {product.category && (
                <span className="text-sm text-muted-foreground">{product.category}</span>
              )}
            </div>

            {/* Price Section */}
            <div className="space-y-2">
              {discountedPrice ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-primary">
                    Rs {discountedPrice.toFixed(0)}
                  </span>
                  <span className="text-xl text-muted-foreground line-through">
                    Rs {product.price}
                  </span>
                  <span className="bg-destructive text-destructive-foreground px-2 py-1 rounded text-sm font-semibold">
                    {product.discount}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-primary">
                  Rs {product.price}
                </span>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Add to Bag Button */}
            <Button
              size="lg"
              className="w-full md:w-auto bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={handleAddToBag}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Add to Bag
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
