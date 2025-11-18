import { Home, Users, Shield, CreditCard, DollarSign, Package, FileText, BarChart3, Settings, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeView: string;
  setActiveView: (view: string) => void;
}

export const AdminSidebar = ({ isOpen, onClose, activeView, setActiveView }: AdminSidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'roles', label: 'Roles & Permissions', icon: Shield },
    { id: 'subscriptions', label: 'Subscriptions', icon: CreditCard },
    { id: 'billing', label: 'Billing', icon: DollarSign },
    { id: 'tools', label: 'Tools Access', icon: Package },
    { id: 'logs', label: 'Audit Logs', icon: FileText },
    { id: 'insights', label: 'Insights', icon: BarChart3 },
    { id: 'settings', label: 'Organisation', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-gradient-to-b from-card to-card/80 border-r border-border shadow-2xl transition-transform duration-300 ease-in-out lg:w-56 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                Admin Panel
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">AppMaster Control</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id);
                  onClose();
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                  activeView === item.id
                    ? "bg-gradient-to-r from-primary/10 to-primary-glow/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              v1.0.0 • AppMaster
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};
