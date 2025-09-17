import { Link, useLocation } from "react-router-dom";
import WalletConnect from "@/components/WalletConnect";
import { Building } from "lucide-react";

const Header = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="p-2 rounded-lg bg-primary/10">
              <Building className="h-6 w-6 text-primary" />
            </div>
            <span className="text-lg font-bold text-foreground">RWA Capital</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/invest" 
              className={`text-sm font-medium transition-colors ${
                location.pathname === "/invest" 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Investment Pools
            </Link>
          </nav>

          <div className="max-w-md">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;