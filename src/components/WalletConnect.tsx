import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card } from "@/components/ui/card";
import { Wallet } from "lucide-react";

const WalletConnect = () => {
  return (
    <Card className="bg-gradient-card border-border p-6 text-center animate-slide-up">
      <div className="mb-4">
        <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-3">
          <Wallet className="h-6 w-6 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Connect Your Wallet</h3>
        <p className="text-sm text-muted-foreground">
          Connect your wallet to access secure investment pools
        </p>
      </div>
      <ConnectButton 
        chainStatus="icon"
        accountStatus="address"
        showBalance={false}
      />
    </Card>
  );
};

export default WalletConnect;