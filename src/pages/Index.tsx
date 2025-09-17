import Hero from "@/components/Hero";
import Header from "@/components/Header";
import { Link } from "react-router-dom";
import { ArrowRight, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        <Hero />
        
        {/* Call to Action Section */}
        <section className="py-20 px-6 bg-gradient-subtle">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-6">
              <Building className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Start Investing?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of investors who trust our encrypted platform for secure real estate investments. 
              Connect your wallet and explore premium investment opportunities.
            </p>
            <Link to="/invest">
              <Button size="lg" className="group">
                Explore Investment Pools
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <span className="text-lg font-bold text-foreground">RWA Capital</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Secure real world asset investments with fully homomorphic encryption
            </p>
            <p className="text-xs text-muted-foreground">
              © 2024 RWA Capital. All investments are encrypted until settlement.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;