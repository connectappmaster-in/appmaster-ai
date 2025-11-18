import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Role {
  id: string;
  role_name: string;
  description: string;
}

interface Permission {
  id: string;
  key: string;
  label: string;
  module: string;
}

export const RolesView = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from('users')
        .select('organisation_id')
        .eq('auth_user_id', user.id)
        .single();

      if (!userData) return;

      const [rolesData, permsData] = await Promise.all([
        supabase.from('roles').select('*').eq('organisation_id', userData.organisation_id),
        supabase.from('permissions').select('*')
      ]);

      setRoles(rolesData.data || []);
      setPermissions(permsData.data || []);
    } catch (error) {
      console.error('Error loading roles:', error);
    } finally {
      setLoading(false);
    }
  };

  const groupedPermissions = permissions.reduce((acc, perm) => {
    const module = perm.module || 'general';
    if (!acc[module]) acc[module] = [];
    acc[module].push(perm);
    return acc;
  }, {} as Record<string, Permission[]>);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Roles & Permissions</h1>
          <p className="text-muted-foreground">Configure role-based access control</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Role
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Roles */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Roles
            </CardTitle>
            <CardDescription>Default roles in your organisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {loading ? (
              <div className="text-center py-8">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
              </div>
            ) : (
              <>
                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Admin</h3>
                    <Badge>System</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Full access to manage users, subscription, and activate tools
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Manager</h3>
                    <Badge>System</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Can manage team members and assign tasks
                  </p>
                </div>

                <div className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Employee</h3>
                    <Badge>System</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Basic access to tools and features
                  </p>
                </div>

                {roles.map((role) => (
                  <div key={role.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{role.role_name}</h3>
                      <Badge variant="outline">Custom</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{role.description}</p>
                  </div>
                ))}
              </>
            )}
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card>
          <CardHeader>
            <CardTitle>Permission Matrix</CardTitle>
            <CardDescription>Atomic capabilities for each module</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(groupedPermissions).map(([module, perms]) => (
              <div key={module} className="space-y-2">
                <h4 className="font-semibold capitalize text-sm">{module}</h4>
                <div className="space-y-2 pl-4">
                  {perms.map((perm) => (
                    <div key={perm.id} className="flex items-center space-x-2">
                      <Checkbox id={perm.id} />
                      <Label htmlFor={perm.id} className="text-sm cursor-pointer">
                        {perm.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
