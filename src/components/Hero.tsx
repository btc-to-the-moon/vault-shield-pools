import { Shield, Lock, TrendingUp } from "lucide-react";
import buildingSilhouettes from "@/assets/building-silhouettes.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero">
        <div 
          className="absolute bottom-0 left-0 right-0 h-96 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${buildingSilhouettes})` }}
        />
      </div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-slide-up">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Fully Homomorphic Encryption</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Secure RWA Investments 
            <span className="block text-primary">with FHE</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed">
            Invest in tokenized real estate pools where your capital remains encrypted until settlement, 
            preventing frontrunning and protecting your investment strategies.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-gradient-card border border-border rounded-lg p-6 text-center hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Private Investments</h3>
            <p className="text-sm text-muted-foreground">
              Your investment amounts stay encrypted until pool settlement
            </p>
          </div>
          
          <div className="bg-gradient-card border border-border rounded-lg p-6 text-center hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">No Frontrunning</h3>
            <p className="text-sm text-muted-foreground">
              Advanced encryption prevents others from spying on capital flows
            </p>
          </div>
          
          <div className="bg-gradient-card border border-border rounded-lg p-6 text-center hover:shadow-card transition-all duration-300">
            <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Real Estate Access</h3>
            <p className="text-sm text-muted-foreground">
              Invest in premium tokenized real estate opportunities
            </p>
          </div>
        </div>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-glow-pulse" />
    </section>
  );
};

export default Hero;