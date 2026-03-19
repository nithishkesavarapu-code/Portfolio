import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const ratingData = [
  { contest: "Jan '24", LeetCode: 1200, CodeChef: 1400, Codeforces: 900  },
  { contest: "Feb '24", LeetCode: 1280, CodeChef: 1380, Codeforces: 930  },
  { contest: "Mar '24", LeetCode: 1350, CodeChef: 1420, Codeforces: 970  },
  { contest: "Apr '24", LeetCode: 1290, CodeChef: 1460, Codeforces: 950  },
  { contest: "May '24", LeetCode: 1400, CodeChef: 1500, Codeforces: 1010 },
  { contest: "Jun '24", LeetCode: 1480, CodeChef: 1490, Codeforces: 980  },
  { contest: "Jul '24", LeetCode: 1520, CodeChef: 1530, Codeforces: 1050 },
  { contest: "Aug '24", LeetCode: 1560, CodeChef: 1510, Codeforces: 1080 },
  { contest: "Sep '24", LeetCode: 1610, CodeChef: 1580, Codeforces: 1120 },
  { contest: "Oct '24", LeetCode: 1590, CodeChef: 1620, Codeforces: 1100 },
  { contest: "Nov '24", LeetCode: 1650, CodeChef: 1660, Codeforces: 1150 },
  { contest: "Dec '24", LeetCode: 1700, CodeChef: 1700, Codeforces: 1190 },
];

const platforms = [
  { key: 'LeetCode',   color: '#f97316', label: 'LeetCode'   },
  { key: 'CodeChef',   color: '#fbbf24', label: 'CodeChef'   },
  { key: 'Codeforces', color: '#60a5fa', label: 'Codeforces' },
];

const CustomDot = ({ cx, cy, stroke }) => (
  <circle cx={cx} cy={cy} r={5} fill={stroke} stroke="#0a0a0a" strokeWidth={2} />
);

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="backdrop-blur-md bg-black/80 border border-white/10 rounded-xl px-4 py-3 text-sm shadow-xl">
      <p className="text-gray-400 font-semibold mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.dataKey} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
          <span className="text-gray-300">{p.dataKey}:</span>
          <span className="font-bold text-white">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const RatingGraph = () => {
  const [hidden, setHidden] = useState({});

  const toggleLine = (key) => {
    setHidden(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section className="relative z-10 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="p-6 md:p-10 rounded-3xl backdrop-blur-md bg-black/50 border border-white/10 shadow-2xl"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Contest Rating{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-blue-400">
                  History
                </span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Performance across competitive programming platforms</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {platforms.map((p) => (
                <button
                  key={p.key}
                  onClick={() => toggleLine(p.key)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300 ${
                    hidden[p.key]
                      ? 'border-white/10 text-gray-600 bg-white/5'
                      : 'border-white/20 text-white bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="w-3 h-0.5 rounded-full" style={{ backgroundColor: hidden[p.key] ? '#4b5563' : p.color }} />
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <ResponsiveContainer width="100%" height={340}>
            <LineChart data={ratingData} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis
                dataKey="contest"
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#6b7280', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                domain={['auto', 'auto']}
              />
              <Tooltip content={<CustomTooltip />} />
              {platforms.map((p) =>
                !hidden[p.key] ? (
                  <Line
                    key={p.key}
                    type="monotone"
                    dataKey={p.key}
                    stroke={p.color}
                    strokeWidth={2.5}
                    dot={<CustomDot stroke={p.color} />}
                    activeDot={{ r: 7, fill: p.color, stroke: '#0a0a0a', strokeWidth: 2 }}
                    animationDuration={1000}
                  />
                ) : null
              )}
            </LineChart>
          </ResponsiveContainer>

          <p className="text-center text-gray-600 text-xs mt-4">
            Update <code className="text-gray-500">src/data/ratingData.js</code> with your real contest history
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RatingGraph;
