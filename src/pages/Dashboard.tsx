import { GraduationCap, TrendingUp, Clock, DollarSign, Compass, BarChart3, Calculator, MessageCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const recommendations = [
  { university: "MIT", program: "Computer Science", match: 92, deadline: "Jan 1, 2027" },
  { university: "Stanford", program: "Data Science", match: 88, deadline: "Dec 15, 2026" },
  { university: "UC Berkeley", program: "AI & ML", match: 85, deadline: "Dec 1, 2026" },
];

const modules = [
  { title: "Career Navigator", desc: "Get AI university recommendations", icon: Compass, url: "/career", color: "bg-primary/10 text-primary" },
  { title: "Admission Predictor", desc: "Check your admission chances", icon: BarChart3, url: "/admission", color: "bg-info/10 text-info" },
  { title: "ROI Calculator", desc: "Compare cost vs future salary", icon: Calculator, url: "/roi", color: "bg-success/10 text-success" },
  { title: "AI Mentor", desc: "Chat with your AI advisor", icon: MessageCircle, url: "/mentor", color: "bg-warning/10 text-warning" },
];

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 max-w-7xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, Student! 👋</h1>
        <p className="text-muted-foreground text-sm mt-1">Here's your education planning overview</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Match Score" value="92%" subtitle="Top university fit" icon={GraduationCap} gradient />
        <StatCard title="Avg. ROI" value="3.2x" subtitle="Expected return" icon={TrendingUp} trend="+12% vs last year" />
        <StatCard title="Next Deadline" value="45 days" subtitle="Stanford application" icon={Clock} />
        <StatCard title="Loan Pre-Approved" value="$85K" subtitle="Best rate: 4.2% APR" icon={DollarSign} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Top University Matches</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recommendations.map((r) => (
              <div key={r.university} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-card-foreground">{r.university}</p>
                    <p className="text-xs text-muted-foreground">{r.program}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant={r.match >= 90 ? "default" : "secondary"} className={r.match >= 90 ? "gradient-primary border-0" : ""}>
                    {r.match}% match
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{r.deadline}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {modules.map((m) => (
              <button
                key={m.title}
                onClick={() => navigate(m.url)}
                className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors text-left"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${m.color}`}>
                  <m.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-card-foreground">{m.title}</p>
                  <p className="text-xs text-muted-foreground">{m.desc}</p>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
