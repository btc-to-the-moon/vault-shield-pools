import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PoolsDashboard from "@/components/PoolsDashboard";

const InvestPage = () => {
  const [wallet, setWallet] = useState({
    address: null,
    isConnected: false,
    provider: null,
  });

  // Listen for wallet connection changes
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWallet({
              address: accounts[0],
              isConnected: true,
              provider: window.ethereum,
            });
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();

    // Listen for account changes
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setWallet({
            address: accounts[0],
            isConnected: true,
            provider: window.ethereum,
          });
        } else {
          setWallet({
            address: null,
            isConnected: false,
            provider: null,
          });
        }
      });
    }

    return () => {
      if (typeof window.ethereum !== 'undefined') {
        window.ethereum.removeListener('accountsChanged', (accounts: string[]) => {
          // Remove the specific listener
        });
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-20">
        <PoolsDashboard isWalletConnected={wallet.isConnected} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <div className="h-6 w-6 bg-gradient-primary rounded" />
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

export default InvestPage;