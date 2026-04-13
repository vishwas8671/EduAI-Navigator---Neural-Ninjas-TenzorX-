import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";

const steps = [
  { id: 1, title: "Personal Information", fields: ["Full Name", "Date of Birth", "SSN (last 4)", "Address"] },
  { id: 2, title: "Education Details", fields: ["University", "Program", "Start Date", "Expected Graduation"] },
  { id: 3, title: "Financial Information", fields: ["Annual Income", "Monthly Expenses", "Existing Loans", "Savings"] },
  { id: 4, title: "Loan Preferences", fields: ["Loan Amount", "Preferred Term", "Fixed/Variable Rate", "Co-signer Name"] },
  { id: 5, title: "Review & Submit", fields: [] },
];

export default function LoanAssistant() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold">Loan Application Assistant</h1>
        <p className="text-muted-foreground text-sm mt-1">Guided step-by-step loan application process</p>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.id} className="flex items-center">
            <button
              onClick={() => setCurrentStep(s.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                s.id === currentStep ? "gradient-primary text-primary-foreground" : s.id < currentStep ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
              }`}
            >
              {s.id < currentStep ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Circle className="w-3.5 h-3.5" />}
              {s.title}
            </button>
            {i < steps.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground mx-1 flex-shrink-0" />}
          </div>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            Step {currentStep}: {steps[currentStep - 1].title}
            <Badge variant="secondary" className="text-xs">{currentStep} of {steps.length}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep < 5 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {steps[currentStep - 1].fields.map((f) => (
                  <div key={f} className="space-y-2">
                    <Label>{f}</Label>
                    <Input placeholder={`Enter ${f.toLowerCase()}`} />
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4 p-3 bg-info/5 rounded-lg border border-info/10">
                💡 <strong>AI Tip:</strong> Make sure all information matches your official documents. Discrepancies can delay processing.
              </p>
            </>
          ) : (
            <div className="text-center py-8">
              <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Application Ready!</h3>
              <p className="text-sm text-muted-foreground mb-4">Review your information and submit your application. Our AI will match you with the best lenders.</p>
              <Button className="gradient-primary border-0">Submit Application</Button>
            </div>
          )}

          {currentStep < 5 && (
            <div className="flex justify-between mt-6">
              <Button variant="outline" disabled={currentStep === 1} onClick={() => setCurrentStep((s) => s - 1)}>Previous</Button>
              <Button onClick={() => setCurrentStep((s) => s + 1)} className="gradient-primary border-0">
                {currentStep === 4 ? "Review" : "Next Step"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
