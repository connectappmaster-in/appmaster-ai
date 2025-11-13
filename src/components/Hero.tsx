import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
const Hero = () => {
  return <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/10 pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent md:text-6xl">
            One Platform for All Your Business Needs
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto">
            Streamline operations with our all-in-one business management suite.                                                                                                                                                                                                                                                                                                                                                                                        
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary-glow text-primary-foreground px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-6 text-lg border-2 hover:bg-accent">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;