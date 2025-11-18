import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Subscription {
  id: string;
  plan_name: string;
  status: string;
  renewal_date: string;
  trial_end_date: string;
  limits: any;
}

export const SubscriptionsView = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadSubscription();
  }, []);

  const loadSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from('users')
        .select('organisation_id')
        .eq('auth_user_id', user.id)
        .single();

      if (!userData) return;

      const { data } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('organisation_id', userData.organisation_id)
        .single();

      setSubscription(data);
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const plans = [
    {
      name: 'FREE',
      price: 0,
      features: ['3 users max', '1 tool', 'Basic features'],
      limits: { max_users: 3, max_tools: 1 }
    },
    {
      name: 'STARTER',
      price: 999,
      features: ['10 users', '5 tools', 'Advanced features'],
      limits: { max_users: 10, max_tools: 5 }
    },
    {
      name: 'PRO',
      price: 2999,
      features: ['Unlimited users', 'All tools', 'Premium features'],
      limits: { max_users: -1, max_tools: -1 }
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Subscription Management</h1>
        <p className="text-muted-foreground">Manage your subscription and billing</p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          {/* Current Subscription */}
          {subscription && (
            <Card>
              <CardHeader>
                <CardTitle>Current Subscription</CardTitle>
                <CardDescription>Your active plan and usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{subscription.plan_name.toUpperCase()}</h3>
                    <Badge className="mt-1">
                      {subscription.status === 'active' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                      {subscription.status === 'trialing' && <Clock className="h-3 w-3 mr-1" />}
                      {subscription.status === 'cancelled' && <XCircle className="h-3 w-3 mr-1" />}
                      {subscription.status}
                    </Badge>
                  </div>
                  <Button>Manage Subscription</Button>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Renewal Date:</span>
                    <p className="font-medium">{subscription.renewal_date ? new Date(subscription.renewal_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Trial Ends:</span>
                    <p className="font-medium">{subscription.trial_end_date ? new Date(subscription.trial_end_date).toLocaleDateString() : 'N/A'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Available Plans */}
          <div>
            <h2 className="text-xl font-bold mb-4">Available Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <Card key={plan.name} className={plan.name === subscription?.plan_name.toUpperCase() ? 'border-primary' : ''}>
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="text-3xl font-bold">
                      ₹{plan.price}
                      <span className="text-sm font-normal text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full" variant={plan.name === subscription?.plan_name.toUpperCase() ? 'outline' : 'default'}>
                      {plan.name === subscription?.plan_name.toUpperCase() ? 'Current Plan' : 'Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
