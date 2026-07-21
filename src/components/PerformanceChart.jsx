import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const data = [
  {
    name: "Communication",
    score: 85,
  },
  {
    name: "Technical",
    score: 90,
  },
  {
    name: "Confidence",
    score: 82,
  },
  {
    name: "Problem Solving",
    score: 89,
  },
];

function PerformanceChart() {
  return (
    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "20px",
      marginTop: "40px",
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)"
    }}>

      <h2>Performance Analytics</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="score" fill="#6d28d9" />
        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default PerformanceChart;