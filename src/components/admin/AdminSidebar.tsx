import { NavLink } from "@/components/NavLink";
import { Users, CreditCard, DollarSign, Wrench, Activity, FileText, Settings, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Users", href: "/admin?tab=users", icon: Users },
  { name: "Subscriptions", href: "/admin?tab=subscriptions", icon: CreditCard },
  { name: "Billing", href: "/admin?tab=billing", icon: DollarSign },
  { name: "Tools Access", href: "/admin?tab=tools", icon: Wrench },
  { name: "Insights", href: "/admin?tab=insights", icon: Activity },
  { name: "Audit Logs", href: "/admin?tab=logs", icon: FileText },
  { name: "Settings", href: "/admin?tab=settings", icon: Settings },
  { name: "Integrations", href: "/admin?tab=integrations", icon: Plug },
];

export const AdminSidebar = () => {
  return (
    <aside className="w-64 bg-gradient-to-b from-card to-accent/5 border-r border-border h-screen sticky top-0 shadow-sm">
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-primary/10">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Admin Panel
        </h2>
        <p className="text-xs text-muted-foreground mt-1">Management Console</p>
      </div>
      <nav className="p-3">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all duration-200 mb-1 group"
            )}
            activeClassName="bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm border-l-2 border-primary"
          >
            <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};
