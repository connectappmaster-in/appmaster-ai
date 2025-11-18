import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Building2, Save } from 'lucide-react';

interface Organisation {
  id: string;
  name: string;
  logo_url: string;
  timezone: string;
  billing_email: string;
  gst_number: string;
  address: string;
}

export const OrganisationSettings = () => {
  const [org, setOrg] = useState<Organisation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadOrganisation();
  }, []);

  const loadOrganisation = async () => {
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
        .from('organisations')
        .select('*')
        .eq('id', userData.organisation_id)
        .single();

      setOrg(data);
    } catch (error) {
      console.error('Error loading organisation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!org) return;

    setSaving(true);
    try {
      const { error } = await supabase
        .from('organisations')
        .update({
          name: org.name,
          timezone: org.timezone,
          billing_email: org.billing_email,
          gst_number: org.gst_number,
          address: org.address,
        })
        .eq('id', org.id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Organisation settings updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update organisation settings',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Organisation Settings</h1>
        <p className="text-muted-foreground">Manage your organisation details</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Organisation Information
          </CardTitle>
          <CardDescription>Update your organisation profile and contact information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Organisation Name</Label>
            <Input
              id="name"
              value={org?.name || ''}
              onChange={(e) => setOrg(org ? { ...org, name: e.target.value } : null)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Billing Email</Label>
            <Input
              id="email"
              type="email"
              value={org?.billing_email || ''}
              onChange={(e) => setOrg(org ? { ...org, billing_email: e.target.value } : null)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input
                id="timezone"
                value={org?.timezone || ''}
                onChange={(e) => setOrg(org ? { ...org, timezone: e.target.value } : null)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gst">GST Number</Label>
              <Input
                id="gst"
                value={org?.gst_number || ''}
                onChange={(e) => setOrg(org ? { ...org, gst_number: e.target.value } : null)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={org?.address || ''}
              onChange={(e) => setOrg(org ? { ...org, address: e.target.value } : null)}
              rows={3}
            />
          </div>

          <Button onClick={handleSave} disabled={saving} className="gap-2">
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
