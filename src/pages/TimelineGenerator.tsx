import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, AlertCircle } from "lucide-react";

const mockTimeline = [
  { month: "Jun 2026", tasks: [{ text: "Research universities", status: "done" }, { text: "Take GRE", status: "done" }] },
  { month: "Aug 2026", tasks: [{ text: "Request recommendation letters", status: "done" }, { text: "Finalize Statement of Purpose", status: "current" }] },
  { month: "Oct 2026", tasks: [{ text: "Submit UC Berkeley application", status: "upcoming" }, { text: "Submit Georgia Tech application", status: "upcoming" }] },
  { month: "Dec 2026", tasks: [{ text: "Submit Stanford application", status: "upcoming" }, { text: "Apply for scholarships", status: "upcoming" }] },
  { month: "Jan 2027", tasks: [{ text: "Submit MIT application", status: "upcoming" }, { text: "Complete financial aid forms", status: "upcoming" }] },
  { month: "Mar 2027", tasks: [{ text: "Receive admission decisions", status: "upcoming" }, { text: "Compare financial packages", status: "upcoming" }] },
];

const statusIcon = { done: CheckCircle2, current: Clock, upcoming: Circle };
const statusColor = { done: "text-success", current: "text-warning", upcoming: "text-muted-foreground" };

export default function TimelineGenerator() {
  const [timeline, setTimeline] = useState<typeof mockTimeline | null>(null);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Application Timeline Generator</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-generated personalized application schedule</p>
      </div>

      {!timeline ? (
        <Card>
          <CardContent className="p-8 text-center">
            <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Generate Your Timeline</h3>
            <p className="text-sm text-muted-foreground mb-4">Based on your target universities and deadlines, we'll create a personalized application timeline.</p>
            <Button onClick={() => setTimeline(mockTimeline)} className="gradient-primary border-0">Generate Timeline</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="relative">
          <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border" />
          <div className="space-y-6">
            {timeline.map((period) => (
              <div key={period.month} className="relative pl-12">
                <div className="absolute left-[10px] top-1 w-4 h-4 rounded-full gradient-primary border-2 border-background" />
                <div>
                  <Badge variant="secondary" className="mb-3 font-semibold">{period.month}</Badge>
                  <Card>
                    <CardContent className="p-4 space-y-2">
                      {period.tasks.map((task) => {
                        const Icon = statusIcon[task.status as keyof typeof statusIcon];
                        return (
                          <div key={task.text} className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 flex-shrink-0 ${statusColor[task.status as keyof typeof statusColor]}`} />
                            <span className={`text-sm ${task.status === "done" ? "line-through text-muted-foreground" : ""}`}>{task.text}</span>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
