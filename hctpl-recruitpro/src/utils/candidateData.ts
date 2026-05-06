export interface Candidate {
  id: string;
  name: string;
  role: string;
  experience: string;
  availability: string;
  status: "Screening" | "Shortlisted" | "Technical" | "Hired" | "Rejected" | "Waiting for 2nd Round";
  score: number;
  matchScore: number;
  notes: string;
  summary: string;
  email: string;
  emailSent: boolean;
  phone: string;
}

export const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Sarah Chen",
    role: "Frontend Lead",
    experience: "8 Years",
    availability: "Immediate",
    status: "Technical",
    score: 92,
    matchScore: 98,
    notes: "Very strong React internal knowledge. Led team of 5.",
    summary: "Ideal candidate for senior leadership. Expert in Next.js and hydration strategies.",
    email: "sarah.chen@example.com",
    emailSent: true,
    phone: "+1 (555) 010-1234"
  },
  {
    id: "2",
    name: "Alex Rivera",
    role: "Senior Node Developer",
    experience: "5 Years",
    availability: "2 Weeks Notice",
    status: "Shortlisted",
    score: 88,
    matchScore: 92,
    notes: "Deep understanding of microservices. Slightly quiet communicator.",
    summary: "Technically proficient, but needs to work on collaborative pitching.",
    email: "alex.r@example.com",
    emailSent: true,
    phone: "+1 (555) 010-5678"
  },
  {
    id: "3",
    name: "James Wilson",
    role: "Fullstack Engineer",
    experience: "3 Years",
    availability: "Immediate",
    status: "Screening",
    score: 65,
    matchScore: 75,
    notes: "Good basic skills. Lacks deep architectural experience.",
    summary: "Solid mid-level dev. Might need more mentoring for a senior role.",
    email: "james.w@example.com",
    emailSent: false,
    phone: "+1 (555) 010-9999"
  },
  {
    id: "4",
    name: "Elena Kostic",
    role: "UI Designer",
    experience: "6 Years",
    availability: "1 Month Notice",
    status: "Hired",
    score: 95,
    matchScore: 94,
    notes: "Brilliant portfolio. Excellent communication during AI call.",
    summary: "Top-tier designer with strong UX research background.",
    email: "elena.k@example.com",
    emailSent: true,
    phone: "+1 (555) 010-4444"
  },
  {
    id: "5",
    name: "Marcus Thorne",
    role: "DevOps Engineer",
    experience: "4 Years",
    availability: "Immediate",
    status: "Rejected",
    score: 45,
    matchScore: 50,
    notes: "Failed to answer basic Docker networking questions.",
    summary: "Does not meet the technical threshold for current requirements.",
    email: "m.thorne@example.com",
    emailSent: false,
    phone: "+1 (555) 010-1111"
  },
  {
    id: "6",
    name: "Priya Sharma",
    role: "Java Architect",
    experience: "12 Years",
    availability: "Flexible",
    status: "Screening",
    score: 0,
    matchScore: 88,
    notes: "",
    summary: "",
    email: "priya.s@example.com",
    emailSent: false,
    phone: "+91 98765 43210"
  },
  {
    id: "7",
    name: "Tom Becker",
    role: "QA Automation",
    experience: "7 Years",
    availability: "Immediate",
    status: "Screening",
    score: 0,
    matchScore: 82,
    notes: "",
    summary: "",
    email: "tom.b@example.com",
    emailSent: false,
    phone: "+49 176 12345678"
  },
  {
    id: "8",
    name: "User Demo",
    role: "AI Recruitment Lead",
    experience: "5 Years",
    availability: "Immediate",
    status: "Screening" as const,
    score: 0,
    matchScore: 100,
    notes: "Direct test candidate for voice validation.",
    summary: "Validation profile for real-time voice call simulation.",
    email: "demo@hctpl.com",
    emailSent: false,
    phone: "+91 6301655968"
  }
];
