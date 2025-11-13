import { BarChart3, ShoppingCart, Users, Briefcase, Package, Calendar } from "lucide-react";
const features = [{
  icon: Users,
  title: "Finance",
  description: "Automate invoicing, expenses, and financial reporting"
}, {
  icon: ShoppingCart,
  title: "HR",
  description: "Streamline recruitment, attendance, and employee management"
}, {
  icon: BarChart3,
  title: "IT",
  description: ""
}, {
  icon: Briefcase,
  title: "Shop",
  description: "Income and Expence tracker"
}, {
  icon: Package,
  title: "Manufacturing",
  description: "Real-time inventory tracking and warehouse management"
}, {
  icon: Calendar,
  title: "Sales",
  description: "Sales"
}, {
  icon: Package,
  title: "Marketing",
  description: "Marketing"
}, {
  icon: Package,
  title: "Productivity",
  description: "Productivity"
}, {
  icon: Package,
  title: "Custom",
  description: "Contact Us"  
}];
const Features = () => {
  return <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
          const Icon = feature.icon;
          return <div key={index} className="bg-card p-8 rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all group">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                
              </div>;
        })}
        </div>
      </div>
    </section>;
};
export default Features;