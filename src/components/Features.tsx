import { BarChart3, ShoppingCart, Users, Briefcase, Package, Calendar, TrendingDown, FileText, Clock, UserPlus, Ticket, CreditCard, Laptop, Store, Box, PhoneCall, Target, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const features = [{
  icon: Users,
  title: "Finance",
  tools: [
    { name: "Depreciation", path: "/depreciation", icon: TrendingDown },
    { name: "Invoicing", path: "/invoicing", icon: FileText }
  ]
}, {
  icon: ShoppingCart,
  title: "HR",
  tools: [
    { name: "Attendance", path: "/attendance", icon: Clock },
    { name: "Recruitment", path: "/recruitment", icon: UserPlus }
  ]
}, {
  icon: BarChart3,
  title: "IT",
  tools: [
    { name: "Tickets Handling", path: "/tickets", icon: Ticket },
    { name: "Subscriptions", path: "/subscriptions", icon: CreditCard },
    { name: "Assets", path: "/assets", icon: Laptop }
  ]
}, {
  icon: Briefcase,
  title: "Shop",
  tools: [
    { name: "Income & Expenditure Tracker", path: "/shop-income-expense", icon: Store }
  ]
}, {
  icon: Package,
  title: "Manufacturing",
  tools: [
    { name: "Inventory", path: "/inventory", icon: Box }
  ]
}, {
  icon: Calendar,
  title: "Sales",
  tools: [
    { name: "CRM", path: "/crm", icon: Target }
  ]
}, {
  icon: Package,
  title: "Marketing",
  tools: [
    { name: "Marketing", path: "/marketing", icon: CheckCircle }
  ]
}, {
  icon: Package,
  title: "Productivity",
  tools: [
    { name: "Personal Expense Tracker", path: "/personal-expense", icon: CheckCircle }
  ]
}, {
  icon: Package,
  title: "Custom",
  tools: [
    { name: "Contact Us", path: "/contact", icon: PhoneCall }
  ]
}];
const Features = () => {
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <div key={index} className="bg-card p-8 rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <div className="space-y-2">
                  {feature.tools.map((tool, toolIndex) => {
                    const ToolIcon = tool.icon;
                    return (
                      <Link 
                        key={toolIndex} 
                        to={tool.path}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors group/tool"
                      >
                        <ToolIcon className="h-4 w-4 text-muted-foreground group-hover/tool:text-primary transition-colors" />
                        <span className="text-sm text-muted-foreground group-hover/tool:text-foreground transition-colors">
                          {tool.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default Features;