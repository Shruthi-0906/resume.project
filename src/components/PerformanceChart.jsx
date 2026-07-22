import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";
import { CANDIDATE_METRICS } from "../data/analyticsData";

export function SkillRadarChart() {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={CANDIDATE_METRICS.skillProficiency}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis dataKey="subject" stroke="#94a3b8" fontSize={11} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" fontSize={9} />
          <Radar
            name="Your Rating"
            dataKey="A"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
          />
          <Radar
            name="Target Benchmark"
            dataKey="B"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={0.15}
          />
          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
          <Tooltip contentStyle={{ background: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function MockPerformanceChart() {
  return (
    <div style={{ width: "100%", height: 260 }}>
      <ResponsiveContainer>
        <LineChart data={CANDIDATE_METRICS.mockHistory}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="session" stroke="#64748b" fontSize={11} />
          <YAxis stroke="#64748b" fontSize={11} domain={[60, 100]} />
          <Tooltip contentStyle={{ background: "#0f172a", borderColor: "#334155", color: "#f8fafc" }} />
          <Line
            type="monotone"
            dataKey="score"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 5, fill: "#10b981", stroke: "#0b0f19", strokeWidth: 2 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
export default SkillRadarChart;