import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const roiData = [
  { university: "MIT", cost: 230, salary: 145, roi: 3.8 },
  { university: "Stanford", cost: 225, salary: 140, roi: 3.5 },
  { university: "Berkeley", cost: 140, salary: 125, roi: 4.2 },
  { university: "Georgia Tech", cost: 110, salary: 115, roi: 4.8 },
];

const earningsData = [
  { year: "Year 1", withDegree: 120, without: 55 },
  { year: "Year 3", withDegree: 145, without: 62 },
  { year: "Year 5", withDegree: 175, without: 70 },
  { year: "Year 10", withDegree: 220, without: 85 },
  { year: "Year 15", withDegree: 280, without: 100 },
];

export default function ROICalculator() {
  const [showResults, setShowResults] = useState(false);

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">ROI Calculator</h1>
        <p className="text-muted-foreground text-sm mt-1">Compare education cost vs expected salary outcomes</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Parameters</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2"><Label>Program Duration (yrs)</Label><Input defaultValue="2" /></div>
            <div className="space-y-2"><Label>Expected Starting Salary</Label><Input defaultValue="$120,000" /></div>
            <div className="space-y-2"><Label>Discount Rate (%)</Label><Input defaultValue="5" /></div>
          </div>
          <Button onClick={() => setShowResults(true)} className="mt-4 gradient-primary border-0">Calculate ROI</Button>
        </CardContent>
      </Card>

      {showResults && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Cost vs Starting Salary ($K)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="university" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="cost" fill="hsl(217, 91%, 50%)" name="Total Cost ($K)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="salary" fill="hsl(168, 71%, 41%)" name="Starting Salary ($K)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle className="text-base">Earnings Trajectory ($K)</CardTitle></CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={280}>
                  <LineChart data={earningsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
                    <XAxis dataKey="year" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="withDegree" stroke="hsl(217, 91%, 50%)" strokeWidth={2} name="With Degree" dot={{ r: 4 }} />
                    <Line type="monotone" dataKey="without" stroke="hsl(220, 10%, 70%)" strokeWidth={2} name="Without Degree" dot={{ r: 4 }} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader><CardTitle className="text-base">ROI Summary</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roiData.map((r) => (
                  <div key={r.university} className="p-4 rounded-lg bg-secondary/50 text-center">
                    <p className="text-sm font-medium">{r.university}</p>
                    <p className="text-2xl font-bold text-primary mt-1">{r.roi}x</p>
                    <p className="text-xs text-muted-foreground">10-year ROI</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
