import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DashboardLayout } from "@/components/DashboardLayout";
import Dashboard from "@/pages/Dashboard";
import CareerNavigator from "@/pages/CareerNavigator";
import AdmissionPredictor from "@/pages/AdmissionPredictor";
import ROICalculator from "@/pages/ROICalculator";
import TimelineGenerator from "@/pages/TimelineGenerator";
import AIMentor from "@/pages/AIMentor";
import LoanEligibility from "@/pages/LoanEligibility";
import LoanAssistant from "@/pages/LoanAssistant";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/career" element={<CareerNavigator />} />
            <Route path="/admission" element={<AdmissionPredictor />} />
            <Route path="/roi" element={<ROICalculator />} />
            <Route path="/timeline" element={<TimelineGenerator />} />
            <Route path="/mentor" element={<AIMentor />} />
            <Route path="/loan-eligibility" element={<LoanEligibility />} />
            <Route path="/loan-assistant" element={<LoanAssistant />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
