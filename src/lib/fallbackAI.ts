export function fallbackMentor(question: string) {

  const q = question.toLowerCase();

  if (q.includes("best country") || q.includes("ai masters")) {
    return "Top countries for AI Masters are USA, Canada, UK, and Germany. USA has the best research opportunities, Canada has easier PR options, and Germany has low tuition fees.";
  }

  if (q.includes("loan") || q.includes("education loan")) {
    return "Students can apply for education loans through banks or NBFCs. Eligibility depends on admission offer, academic score, and co-applicant income.";
  }

  if (q.includes("cost") || q.includes("fees")) {
    return "Average cost of MS abroad ranges from $25,000 to $70,000 depending on the country and university.";
  }

  if (q.includes("gpa") || q.includes("admission")) {
    return "For top universities, a GPA above 8.5/10 and strong projects or internships significantly improve admission chances.";
  }

  return "AI Mentor suggests exploring top universities, checking ROI, and evaluating loan options before applying.";
}