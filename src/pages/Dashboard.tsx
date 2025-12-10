import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

const stats = [
  { 
    label: 'Total Revenue', 
    value: '$45,231.89', 
    change: '+20.1%', 
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    label: 'Orders', 
    value: '2,350', 
    change: '+15.2%', 
    trend: 'up',
    icon: ShoppingCart,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    label: 'Customers', 
    value: '12,234', 
    change: '+8.4%', 
    trend: 'up',
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    label: 'Products', 
    value: '573', 
    change: '-2.5%', 
    trend: 'down',
    icon: Package,
    color: 'from-orange-500 to-red-500'
  },
];

const recentOrders = [
  { id: '#ORD-7892', customer: 'John Smith', amount: '$299.00', status: 'Completed', date: 'Dec 10, 2024' },
  { id: '#ORD-7891', customer: 'Emily Chen', amount: '$449.00', status: 'Processing', date: 'Dec 10, 2024' },
  { id: '#ORD-7890', customer: 'Mike Johnson', amount: '$129.00', status: 'Shipped', date: 'Dec 9, 2024' },
  { id: '#ORD-7889', customer: 'Sarah Williams', amount: '$899.00', status: 'Completed', date: 'Dec 9, 2024' },
  { id: '#ORD-7888', customer: 'David Brown', amount: '$199.00', status: 'Pending', date: 'Dec 8, 2024' },
];

const topProducts = [
  { name: 'Wireless Headphones Pro', sales: 234, revenue: '$69,966' },
  { name: 'Smart Watch Series X', sales: 189, revenue: '$84,861' },
  { name: 'Premium Backpack', sales: 156, revenue: '$20,124' },
  { name: 'Designer Sunglasses', sales: 142, revenue: '$28,258' },
];

export default function Dashboard() {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <Navigate to="/explore" replace />;
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="p-6 rounded-xl bg-card border border-border animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-5 h-5 text-foreground" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div 
            className="lg:col-span-2 p-6 rounded-xl bg-card border border-border animate-fade-in"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Recent Orders</h2>
              <button className="text-sm text-primary hover:underline">View all</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Order</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Customer</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="border-b border-border/50 last:border-0">
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{order.id}</td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{order.customer}</td>
                      <td className="py-3 px-2 text-sm font-medium text-foreground">{order.amount}</td>
                      <td className="py-3 px-2">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          order.status === 'Completed' ? 'bg-green-500/10 text-green-500' :
                          order.status === 'Processing' ? 'bg-blue-500/10 text-blue-500' :
                          order.status === 'Shipped' ? 'bg-purple-500/10 text-purple-500' :
                          'bg-amber-500/10 text-amber-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div 
            className="p-6 rounded-xl bg-card border border-border animate-fade-in"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-bold text-foreground">Top Products</h2>
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-foreground truncate max-w-[140px]">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.sales} sales</p>
                    </div>
                  </div>
                  <p className="text-sm font-bold text-foreground">{product.revenue}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
