import { useState } from "react";
import InvestmentPool, { Pool } from "@/components/InvestmentPool";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Building2, Shield } from "lucide-react";

const mockPools: Pool[] = [
  {
    id: "1",
    name: "Manhattan Premium Office",
    location: "New York, NY",
    totalValue: "$12.5M",
    minimumInvestment: "0.5 ETH",
    expectedReturn: "8.5% APY",
    duration: "24 months",
    raised: 850,
    target: 1200,
    investors: 47,
    status: "funding",
    encryption: true,
  },
  {
    id: "2",
    name: "Miami Luxury Condos",
    location: "Miami, FL",
    totalValue: "$8.2M",
    minimumInvestment: "0.3 ETH",
    expectedReturn: "9.2% APY",
    duration: "18 months",
    raised: 620,
    target: 800,
    investors: 32,
    status: "funding",
    encryption: true,
  },
  {
    id: "3",
    name: "Austin Tech Hub",
    location: "Austin, TX",
    totalValue: "$15.8M",
    minimumInvestment: "1.0 ETH",
    expectedReturn: "10.1% APY",
    duration: "36 months",
    raised: 1580,
    target: 1580,
    investors: 68,
    status: "active",
    encryption: true,
  },
  {
    id: "4",
    name: "Seattle Commercial Plaza",
    location: "Seattle, WA",
    totalValue: "$22.3M",
    minimumInvestment: "0.8 ETH",
    expectedReturn: "7.8% APY",
    duration: "30 months",
    raised: 1950,
    target: 2230,
    investors: 89,
    status: "funding",
    encryption: true,
  },
];

interface PoolsDashboardProps {
  isWalletConnected: boolean;
}

const PoolsDashboard = ({ isWalletConnected }: PoolsDashboardProps) => {
  const [selectedFilter, setSelectedFilter] = useState<"all" | "funding" | "active">("all");

  const filteredPools = mockPools.filter(pool => 
    selectedFilter === "all" || pool.status === selectedFilter
  );

  const handleInvest = async (poolId: string, amount: string) => {
    if (!isWalletConnected) {
      throw new Error("Wallet not connected");
    }
    
    // Simulate investment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log(`Investing ${amount} ETH in pool ${poolId}`);
  };

  const totalStats = {
    totalValue: "$58.8M",
    totalPools: mockPools.length,
    activeInvestors: mockPools.reduce((sum, pool) => sum + pool.investors, 0),
    avgReturn: "8.9%"
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Private RWA Investment Pools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover encrypted investment opportunities in premium real estate assets. 
            All investments remain private until settlement.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-card border-border p-6 text-center">
            <div className="p-2 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{totalStats.totalValue}</p>
            <p className="text-sm text-muted-foreground">Total Asset Value</p>
          </Card>
          
          <Card className="bg-gradient-card border-border p-6 text-center">
            <div className="p-2 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{totalStats.totalPools}</p>
            <p className="text-sm text-muted-foreground">Active Pools</p>
          </Card>
          
          <Card className="bg-gradient-card border-border p-6 text-center">
            <div className="p-2 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{totalStats.avgReturn}</p>
            <p className="text-sm text-muted-foreground">Avg. Expected Return</p>
          </Card>
          
          <Card className="bg-gradient-card border-border p-6 text-center">
            <div className="p-2 rounded-full bg-primary/10 w-fit mx-auto mb-3">
              <div className="h-5 w-5 rounded-full bg-primary" />
            </div>
            <p className="text-2xl font-bold text-foreground mb-1">{totalStats.activeInvestors}</p>
            <p className="text-sm text-muted-foreground">Total Investors</p>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2 mb-8">
          {["all", "funding", "active"].map((filter) => (
            <Badge
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              className={`cursor-pointer capitalize transition-colors ${
                selectedFilter === filter 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-primary/10"
              }`}
              onClick={() => setSelectedFilter(filter as any)}
            >
              {filter}
            </Badge>
          ))}
        </div>

        {/* Pool Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredPools.map((pool) => (
            <InvestmentPool
              key={pool.id}
              pool={pool}
              onInvest={handleInvest}
            />
          ))}
        </div>

        {!isWalletConnected && (
          <div className="text-center mt-12 p-8 bg-gradient-card border border-border rounded-lg">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Connect Your Wallet to Invest
            </h3>
            <p className="text-muted-foreground">
              Connect your wallet above to access private investment pools with encrypted capital flows.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PoolsDashboard;