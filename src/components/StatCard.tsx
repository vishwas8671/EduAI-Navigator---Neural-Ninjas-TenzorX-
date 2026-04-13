import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: LucideIcon;
  trend?: string;
  gradient?: boolean;
}

export function StatCard({ title, value, subtitle, icon: Icon, trend, gradient }: StatCardProps) {
  return (
    <Card className={gradient ? "gradient-primary border-0" : ""}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className={`text-xs font-medium ${gradient ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{title}</p>
            <p className={`text-2xl font-bold mt-1 ${gradient ? "text-primary-foreground" : "text-card-foreground"}`}>{value}</p>
            {subtitle && <p className={`text-xs mt-1 ${gradient ? "text-primary-foreground/60" : "text-muted-foreground"}`}>{subtitle}</p>}
            {trend && <p className="text-xs text-success mt-1 font-medium">{trend}</p>}
          </div>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${gradient ? "bg-primary-foreground/20" : "bg-primary/10"}`}>
            <Icon className={`w-5 h-5 ${gradient ? "text-primary-foreground" : "text-primary"}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
