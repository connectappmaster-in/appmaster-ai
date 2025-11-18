import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Package, DollarSign, TrendingUp } from 'lucide-react';

export const DashboardView = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeTools: 0,
    revenue: 0,
    growth: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get organisation ID
      const { data: userData } = await supabase
        .from('users')
        .select('organisation_id')
        .eq('auth_user_id', user.id)
        .single();

      if (!userData) return;

      // Count users
      const { count: usersCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true })
        .eq('organisation_id', userData.organisation_id);

      // Get active tools
      const { data: org } = await supabase
        .from('organisations')
        .select('active_tools')
        .eq('id', userData.organisation_id)
        .single();

      setStats({
        totalUsers: usersCount || 0,
        activeTools: org?.active_tools?.length || 0,
        revenue: 0,
        growth: 12.5,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const statCards = [
    { title: 'Total Users', value: stats.totalUsers, icon: Users, color: 'text-blue-500' },
    { title: 'Active Tools', value: stats.activeTools, icon: Package, color: 'text-green-500' },
    { title: 'Monthly Revenue', value: `₹${stats.revenue}`, icon: DollarSign, color: 'text-yellow-500' },
    { title: 'Growth', value: `${stats.growth}%`, icon: TrendingUp, color: 'text-purple-500' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your organisation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
