import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Landmark } from "lucide-react";

const mockOffers = [
  { lender: "Federal Direct Loan", rate: "3.73%", amount: "$20,500", term: "10 years", eligible: true, score: 95 },
  { lender: "Sallie Mae", rate: "4.25%", amount: "$75,000", term: "15 years", eligible: true, score: 88 },
  { lender: "Discover Student Loans", rate: "4.49%", amount: "$65,000", term: "15 years", eligible: true, score: 82 },
  { lender: "SoFi", rate: "4.99%", amount: "$85,000", term: "10 years", eligible: false, score: 45 },
];

export default function LoanEligibility() {
  const [results, setResults] = useState<typeof mockOffers | null>(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    setTimeout(() => { setResults(mockOffers); setLoading(false); }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Loan Eligibility Estimator</h1>
        <p className="text-muted-foreground text-sm mt-1">Check your eligibility across multiple lenders</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Financial Profile</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Annual Income</Label><Input defaultValue="$45,000" /></div>
            <div className="space-y-2"><Label>Credit Score</Label><Input defaultValue="720" /></div>
            <div className="space-y-2"><Label>Loan Amount Needed</Label><Input defaultValue="$60,000" /></div>
            <div className="space-y-2"><Label>Co-signer Available?</Label><Input defaultValue="Yes" /></div>
            <div className="space-y-2"><Label>Existing Debt</Label><Input defaultValue="$5,000" /></div>
            <div className="space-y-2"><Label>Employment Status</Label><Input defaultValue="Part-time" /></div>
          </div>
          <Button onClick={handleCheck} className="mt-4 gradient-primary border-0" disabled={loading}>
            {loading ? "Checking..." : "Check Eligibility"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="space-y-4">
          {results.map((offer) => (
            <Card key={offer.lender} className={!offer.eligible ? "opacity-60" : ""}>
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${offer.eligible ? "bg-primary/10" : "bg-muted"}`}>
                      <Landmark className={`w-5 h-5 ${offer.eligible ? "text-primary" : "text-muted-foreground"}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-sm">{offer.lender}</h3>
                        {offer.eligible ? (
                          <Badge className="bg-success/10 text-success border-0 text-xs"><CheckCircle2 className="w-3 h-3 mr-1" />Eligible</Badge>
                        ) : (
                          <Badge variant="secondary" className="text-xs"><XCircle className="w-3 h-3 mr-1" />Not Eligible</Badge>
                        )}
                      </div>
                      <div className="flex gap-4 mt-1 text-xs text-muted-foreground">
                        <span>Rate: <b className="text-foreground">{offer.rate}</b></span>
                        <span>Max: <b className="text-foreground">{offer.amount}</b></span>
                        <span>Term: <b className="text-foreground">{offer.term}</b></span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 sm:w-48">
                    <Progress value={offer.score} className="h-2 flex-1" />
                    <span className="text-sm font-bold text-primary">{offer.score}%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
