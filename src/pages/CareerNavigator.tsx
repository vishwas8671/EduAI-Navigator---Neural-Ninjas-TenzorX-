import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, MapPin, DollarSign, Star } from "lucide-react";

const mockResults = [
  { name: "MIT", location: "Cambridge, MA", program: "Computer Science", ranking: 1, tuition: "$57,590", match: 94, scholarships: "Merit-based available" },
  { name: "Stanford University", location: "Stanford, CA", program: "Computer Science", ranking: 2, tuition: "$56,169", match: 91, scholarships: "Need-based aid" },
  { name: "Carnegie Mellon", location: "Pittsburgh, PA", program: "Computer Science", ranking: 3, tuition: "$58,924", match: 87, scholarships: "TA positions" },
  { name: "ETH Zurich", location: "Zurich, Switzerland", program: "Computer Science", ranking: 5, tuition: "$1,500/yr", match: 82, scholarships: "Excellence scholarship" },
];

export default function CareerNavigator() {
  const [results, setResults] = useState<typeof mockResults | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => { setResults(mockResults); setLoading(false); }, 1500);
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold">AI Career Navigator</h1>
        <p className="text-muted-foreground text-sm mt-1">Get personalized university and program recommendations</p>
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">Your Preferences</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Field of Study</Label>
              <Select defaultValue="cs">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="ds">Data Science</SelectItem>
                  <SelectItem value="mba">Business (MBA)</SelectItem>
                  <SelectItem value="eng">Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Preferred Region</Label>
              <Select defaultValue="us">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="us">United States</SelectItem>
                  <SelectItem value="eu">Europe</SelectItem>
                  <SelectItem value="uk">United Kingdom</SelectItem>
                  <SelectItem value="any">Anywhere</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>GPA</Label>
              <Input type="number" placeholder="3.8" step="0.1" min="0" max="4" defaultValue="3.8" />
            </div>
            <div className="space-y-2">
              <Label>Budget (per year)</Label>
              <Input type="text" placeholder="$60,000" defaultValue="$60,000" />
            </div>
          </div>
          <Button onClick={handleSearch} className="mt-4 gradient-primary border-0" disabled={loading}>
            {loading ? "Analyzing..." : "Get AI Recommendations"}
          </Button>
        </CardContent>
      </Card>

      {results && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {results.map((r) => (
            <Card key={r.name} className="hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{r.name}</h3>
                      <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{r.location}</p>
                    </div>
                  </div>
                  <Badge className="gradient-primary border-0 text-primary-foreground">{r.match}%</Badge>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-muted-foreground">Program</span><span className="font-medium">{r.program}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Ranking</span><span className="font-medium flex items-center gap-1"><Star className="w-3 h-3 text-warning" />#{r.ranking}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Tuition</span><span className="font-medium flex items-center gap-1"><DollarSign className="w-3 h-3" />{r.tuition}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Aid</span><span className="font-medium text-success">{r.scholarships}</span></div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
