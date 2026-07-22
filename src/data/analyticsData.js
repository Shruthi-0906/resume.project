// Lead Data Analyst Curated Candidate Performance & Metric Analytics

export const CANDIDATE_METRICS = {
  name: "Shruthi",
  streakDays: 7,
  overallXp: 2840,
  level: 5,
  nextLevelXp: 3000,
  
  // Readiness index scores by target company
  companyReadiness: [
    { name: "Google", score: 78, difficulty: "Hard", passRate: "6.8%" },
    { name: "Amazon", score: 82, difficulty: "Hard", passRate: "11.4%" },
    { name: "Microsoft", score: 84, difficulty: "Medium", passRate: "12.8%" },
    { name: "Zoho", score: 90, difficulty: "Medium", passRate: "9.6%" },
    { name: "TCS", score: 96, difficulty: "Easy", passRate: "18.4%" },
    { name: "Infosys", score: 95, difficulty: "Easy", passRate: "16%" }
  ],

  // Core technical capabilities (for Radar Chart visualization)
  skillProficiency: [
    { subject: "Data Structures", A: 92, B: 85, fullMark: 100 },
    { subject: "Algorithms", A: 88, B: 80, fullMark: 100 },
    { subject: "System Design", A: 76, B: 70, fullMark: 100 },
    { subject: "Low-Level Design", A: 84, B: 75, fullMark: 100 },
    { subject: "STAR Method / HR", A: 86, B: 90, fullMark: 100 },
    { subject: "SQL & Databases", A: 95, B: 85, fullMark: 100 }
  ],

  // Historical mock interview performance telemetry (for Line Chart)
  mockHistory: [
    { session: "Session 8", score: 76 },
    { session: "Session 9", score: 79 },
    { session: "Session 10", score: 82 },
    { session: "Session 11", score: 80 },
    { session: "Session 12", score: 85 },
    { session: "Session 13", score: 84 },
    { session: "Session 14", score: 88 }
  ],

  // Candidate weak spots and recommended actions
  weaknessAudit: [
    {
      domain: "System Design",
      issue: "Insufficient partitioning design depth for massive scales",
      impact: "High",
      recommendation: "Review Google Spanner partitioning schemes and Cassandra ring architectures in the RAG Chatbot."
    },
    {
      domain: "STAR Behavioral",
      issue: "Result section in STAR stories lacks quantifiable business metrics",
      impact: "Medium",
      recommendation: "Focus on metrics like % load reduced, $ saved, or exact millisecond latency improvements."
    },
    {
      domain: "Graph Algorithms",
      issue: "Complexity in topological sorting patterns and cycle detection",
      impact: "High",
      recommendation: "Practice cycle detection in directed graphs using BFS Kahn's algorithm."
    }
  ]
};
export default CANDIDATE_METRICS;
