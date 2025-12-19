
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { HISTORICAL_STATS } from '../constants';

const AnalyticsBoard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Delay Trends */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            Regional Delay Trends
            <span className="text-[10px] font-normal bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full uppercase">Real-time</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={HISTORICAL_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="avgDelay" 
                  stroke="#3b82f6" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 6 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 italic text-center">Average system delay in hours across major US hubs</p>
        </div>

        {/* Success Rates */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
            On-Time Success Rate
            <span className="text-[10px] font-normal bg-emerald-100 text-emerald-600 px-2 py-0.5 rounded-full uppercase">Target: 95%</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={HISTORICAL_STATS}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="onTimeRate" radius={[4, 4, 0, 0]}>
                  {HISTORICAL_STATS.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.onTimeRate > 90 ? '#10b981' : entry.onTimeRate > 80 ? '#3b82f6' : '#f43f5e'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-400 mt-4 italic text-center">Percentage of deliveries meeting original ETA</p>
        </div>
      </div>

      {/* Global Efficiency Map Placeholder */}
      <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">OmniRoute Global Hub Monitor</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              AI-driven heatmaps identifying potential bottlenecks before they happen. Our predictive engine monitors 40,000+ data points per hour.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-emerald-500">System Healthy</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-500">Hub Congestion: Chicago</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
             <div className="text-center">
                <p className="text-3xl font-bold">14.2k</p>
                <p className="text-[10px] uppercase text-slate-500 font-bold">Active Trackers</p>
             </div>
             <div className="text-center">
                <p className="text-3xl font-bold">98.2%</p>
                <p className="text-[10px] uppercase text-slate-500 font-bold">AI Accuracy</p>
             </div>
          </div>
        </div>
        
        {/* Decorative Grid */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <defs>
               <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                 <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
               </pattern>
             </defs>
             <rect width="100" height="100" fill="url(#grid)" />
           </svg>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsBoard;
