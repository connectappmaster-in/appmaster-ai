import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Package, DollarSign, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const InsightsView = () => {
  const insights = [
    { title: 'Active Users', value: '0', change: '+0%', icon: Users, trend: 'up' },
    { title: 'Tool Usage', value: '0', change: '+0%', icon: Package, trend: 'up' },
    { title: 'Revenue (MTD)', value: '₹0', change: '+0%', icon: DollarSign, trend: 'up' },
    { title: 'Trial Conversions', value: '0%', change: '0%', icon: Activity, trend: 'neutral' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Insights & Analytics</h1>
        <p className="text-muted-foreground">Track performance and user engagement</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {insights.map((insight) => (
          <Card key={insight.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardDescription>{insight.title}</CardDescription>
              <insight.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{insight.value}</div>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={insight.trend === 'up' ? 'default' : 'secondary'} className="gap-1">
                  <TrendingUp className="h-3 w-3" />
                  {insight.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>New users over time</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Coming soon
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tool Adoption</CardTitle>
            <CardDescription>Most used tools</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Coming soon
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
