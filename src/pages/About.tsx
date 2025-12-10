import { MainLayout } from '@/components/layout/MainLayout';
import { Shield, Truck, HeartHandshake, Award } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Trusted Quality',
    description: 'Every product is carefully vetted to ensure it meets our high standards.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Get your orders delivered quickly with our reliable shipping partners.',
  },
  {
    icon: HeartHandshake,
    title: 'Customer First',
    description: 'Your satisfaction is our priority. We\'re here to help 24/7.',
  },
  {
    icon: Award,
    title: 'Best Prices',
    description: 'Competitive pricing without compromising on quality or service.',
  },
];

const team = [
  { name: 'Sarah Chen', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Michael Torres', role: 'Head of Product', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Emily Watson', role: 'Design Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
  { name: 'David Kim', role: 'Tech Lead', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
];

export default function About() {
  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-gradient">AccentHubs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're on a mission to make premium shopping accessible to everyone. 
            Since 2020, we've been connecting customers with the best products at unbeatable prices.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              AccentHubs was born from a simple idea: everyone deserves access to quality products 
              without breaking the bank. What started as a small online store has grown into a 
              thriving marketplace serving customers worldwide.
            </p>
            <p className="text-muted-foreground">
              Today, we partner with hundreds of trusted brands and suppliers to bring you 
              a curated selection of electronics, fashion, home goods, and more. Our commitment 
              to quality, authenticity, and customer satisfaction remains at the heart of everything we do.
            </p>
          </div>
          <div 
            className="relative rounded-2xl overflow-hidden animate-fade-in" 
            style={{ animationDelay: '0.2s' }}
          >
            <div className="aspect-video bg-gradient-to-br from-primary/20 via-card to-secondary rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-heading font-bold text-gradient mb-2">500K+</div>
                <p className="text-muted-foreground">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className="p-6 rounded-xl bg-card border border-border text-center transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div>
          <h2 className="font-heading text-3xl font-bold text-foreground text-center mb-10">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div
                key={member.name}
                className="text-center animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-border ring-offset-2 ring-offset-background">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
