import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Building2, Shield, TrendingUp, Users } from "lucide-react";
import { toast } from "sonner";

interface Pool {
  id: string;
  name: string;
  location: string;
  totalValue: string;
  minimumInvestment: string;
  expectedReturn: string;
  duration: string;
  raised: number;
  target: number;
  investors: number;
  status: "active" | "funding" | "closed";
  encryption: boolean;
}

interface InvestmentPoolProps {
  pool: Pool;
  onInvest: (poolId: string, amount: string) => void;
}

const InvestmentPool = ({ pool, onInvest }: InvestmentPoolProps) => {
  const [investAmount, setInvestAmount] = useState("");
  const [isInvesting, setIsInvesting] = useState(false);

  const progressPercentage = (pool.raised / pool.target) * 100;

  const handleInvest = async () => {
    if (!investAmount || parseFloat(investAmount) < parseFloat(pool.minimumInvestment)) {
      toast.error(`Minimum investment is ${pool.minimumInvestment} ETH`);
      return;
    }

    setIsInvesting(true);
    try {
      await onInvest(pool.id, investAmount);
      setInvestAmount("");
      toast.success("Investment submitted successfully! Your investment is encrypted until settlement.");
    } catch (error) {
      toast.error("Investment failed. Please try again.");
    } finally {
      setIsInvesting(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-primary text-primary-foreground";
      case "funding":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="bg-gradient-card border-border p-6 hover:shadow-card transition-all duration-300 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Building2 className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{pool.name}</h3>
            <p className="text-sm text-muted-foreground">{pool.location}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {pool.encryption && (
            <div className="p-1 rounded bg-primary/10">
              <Shield className="h-4 w-4 text-primary" />
            </div>
          )}
          <Badge className={getStatusColor(pool.status)}>
            {pool.status}
          </Badge>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Total Value</p>
            <p className="font-semibold text-foreground">{pool.totalValue}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Expected Return</p>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-primary" />
              <p className="font-semibold text-foreground">{pool.expectedReturn}</p>
            </div>
          </div>
          <div>
            <p className="text-muted-foreground">Duration</p>
            <p className="font-semibold text-foreground">{pool.duration}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Min. Investment</p>
            <p className="font-semibold text-foreground">{pool.minimumInvestment}</p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Funding Progress</span>
            <span className="text-foreground font-medium">
              {pool.raised} / {pool.target} ETH
            </span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{progressPercentage.toFixed(1)}% funded</span>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{pool.investors} investors</span>
            </div>
          </div>
        </div>

        {pool.status === "funding" && (
          <div className="pt-4 border-t border-border">
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Amount (ETH)"
                value={investAmount}
                onChange={(e) => setInvestAmount(e.target.value)}
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button
                onClick={handleInvest}
                disabled={isInvesting || !investAmount}
                variant="hero"
              >
                {isInvesting ? "Investing..." : "Invest"}
              </Button>
            </div>
            {pool.encryption && (
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Shield className="h-3 w-3" />
                Your investment amount will be encrypted until settlement
              </p>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default InvestmentPool;
export type { Pool };