import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface UserAccessProps {
  onBack: () => void;
}

const UserAccess = ({ onBack }: UserAccessProps) => {
  return (
    <div className="space-y-6 h-full overflow-auto">
      <Card>
        <CardHeader>
          <CardTitle>User & Access Management</CardTitle>
          <CardDescription>
            Manage user accounts, roles, and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <p>User management interface coming soon...</p>
            <p className="text-sm mt-2">This section will include user listing, role management, and permissions.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAccess;
