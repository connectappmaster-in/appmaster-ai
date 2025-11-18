import { ReactNode } from 'react';
import { useRole } from '@/hooks/usePermission';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ShieldAlert } from 'lucide-react';

interface RoleGuardProps {
  role: 'admin' | 'manager' | 'user' | 'super_admin';
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard = ({ role, children, fallback }: RoleGuardProps) => {
  const { hasRole, loading } = useRole(role);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!hasRole) {
    return fallback || (
      <Alert variant="destructive" className="m-4">
        <ShieldAlert className="h-4 w-4" />
        <AlertDescription>
          You don't have the required role to access this resource.
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
};
