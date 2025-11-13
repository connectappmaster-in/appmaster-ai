import { BarChart3, ShoppingCart, Users, Briefcase, Package, Calendar } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "CRM",
    description: "Manage leads, opportunities, and customer relationships in one place"
  },
  {
    icon: ShoppingCart,
    title: "eCommerce",
    description: "Build and scale your online store with integrated inventory"
  },
  {
    icon: BarChart3,
    title: "Accounting",
    description: "Automate invoicing, expenses, and financial reporting"
  },
  {
    icon: Briefcase,
    title: "Project Management",
    description: "Plan, track, and collaborate on projects effectively"
  },
  {
    icon: Package,
    title: "Inventory",
    description: "Real-time inventory tracking and warehouse management"
  },
  {
    icon: Calendar,
    title: "HR Management",
    description: "Streamline recruitment, attendance, and employee management"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-card p-8 rounded-xl border border-border hover:shadow-lg hover:border-primary/50 transition-all group"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
