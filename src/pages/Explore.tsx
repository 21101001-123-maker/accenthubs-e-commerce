import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, TrendingUp, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredCategories = [
  { name: 'Electronics', icon: Zap, count: 234, color: 'from-blue-500 to-cyan-500' },
  { name: 'Fashion', icon: Sparkles, count: 567, color: 'from-pink-500 to-rose-500' },
  { name: 'Home & Living', icon: Star, count: 189, color: 'from-amber-500 to-orange-500' },
  { name: 'Trending', icon: TrendingUp, count: 89, color: 'from-green-500 to-emerald-500' },
];

const trendingProducts = [
  { id: 1, name: 'Wireless Headphones Pro', price: '$299', rating: 4.9, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
  { id: 2, name: 'Smart Watch Series X', price: '$449', rating: 4.8, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
  { id: 3, name: 'Premium Backpack', price: '$129', rating: 4.7, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop' },
  { id: 4, name: 'Designer Sunglasses', price: '$199', rating: 4.9, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop' },
];

export default function Explore() {
  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/20 via-card to-card p-8 md:p-12">
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-primary/20 text-primary">
              New Collection 2024
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Amazing<br />
              <span className="text-gradient">Products</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-md mb-6">
              Discover our curated selection of premium products at unbeatable prices.
            </p>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-6">
                Shop Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/2 w-48 h-48 bg-accent/20 rounded-full blur-2xl" />
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredCategories.map((category, index) => (
              <div
                key={category.name}
                className="group relative overflow-hidden rounded-xl bg-card p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground mb-1">{category.name}</h3>
                <p className="text-sm text-muted-foreground">{category.count} products</p>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Trending Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-heading text-2xl font-bold text-foreground">Trending Now</h2>
            <Link to="/products" className="text-primary hover:underline text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {trendingProducts.map((product, index) => (
              <div
                key={product.id}
                className="group rounded-xl bg-card overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-square overflow-hidden bg-secondary">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-foreground mb-1 truncate">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold">{product.price}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm text-muted-foreground">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
