import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const mockPredictions = [
  { university: "MIT", probability: 72, factors: { gpa: 90, gre: 85, research: 70, lor: 65 } },
  { university: "Stanford", probability: 65, factors: { gpa: 90, gre: 85, research: 60, lor: 55 } },
  { university: "UC Berkeley", probability: 81, factors: { gpa: 90, gre: 85, research: 80, lor: 75 } },
  { university: "Georgia Tech", probability: 91, factors: { gpa: 95, gre: 90, research: 85, lor: 90 } },
];

export default function AdmissionPredictor() {
  const [predictions, setPredictions] = useState<typeof mockPredictions | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = () => {
    setLoading(true);
    setTimeout(() => { setPredictions(mockPredictions); setLoading(false); }, 1800);
  };

  const getColor = (val: number) => val >= 80 ? "text-success" : val >= 60 ? "text-warning" : "text-destructive";

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">Admission Probability Predictor</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered admission chance estimation</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Your Profile</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2"><Label>GPA (4.0)</Label><Input defaultValue="3.8" /></div>
            <div className="space-y-2"><Label>GRE Score</Label><Input defaultValue="328" /></div>
            <div className="space-y-2"><Label>Research Papers</Label><Input defaultValue="2" /></div>
            <div className="space-y-2"><Label>Work Experience (yrs)</Label><Input defaultValue="1" /></div>
          </div>
          <Button onClick={handlePredict} className="mt-4 gradient-primary border-0" disabled={loading}>
            {loading ? "Predicting..." : "Predict Admission Chances"}
          </Button>
        </CardContent>
      </Card>

      {predictions && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {predictions.map((p) => (
            <Card key={p.university}>
              <CardContent className="p-5">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold">{p.university}</h3>
                  <span className={`text-2xl font-bold ${getColor(p.probability)}`}>{p.probability}%</span>
                </div>
                <div className="space-y-3">
                  {Object.entries(p.factors).map(([key, val]) => (
                    <div key={key}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-muted-foreground capitalize">{key === "lor" ? "Recommendations" : key === "gre" ? "GRE Score" : key}</span>
                        <span className={`font-medium ${getColor(val)}`}>{val}%</span>
                      </div>
                      <Progress value={val} className="h-1.5" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
