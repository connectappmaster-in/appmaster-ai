import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const usePermission = (permissionKey: string) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setHasPermission(false);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.rpc('has_permission', {
          user_id_param: user.id,
          permission_key: permissionKey
        });

        if (!error && data) {
          setHasPermission(data);
        }
      } catch (error) {
        console.error('Error checking permission:', error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [permissionKey]);

  return { hasPermission, loading };
};

export const useRole = (role: 'admin' | 'manager' | 'user' | 'super_admin') => {
  const [hasRole, setHasRole] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkRole = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setHasRole(false);
          setLoading(false);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('tenant_id')
          .eq('id', user.id)
          .single();

        if (!profile) {
          setHasRole(false);
          setLoading(false);
          return;
        }

        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _tenant_id: profile.tenant_id,
          _role: role
        });

        if (!error && data) {
          setHasRole(data);
        }
      } catch (error) {
        console.error('Error checking role:', error);
        setHasRole(false);
      } finally {
        setLoading(false);
      }
    };

    checkRole();
  }, [role]);

  return { hasRole, loading };
};
