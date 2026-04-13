import React from 'react';
import { Brain, Search, Target, Palette, BarChart3, ShieldCheck, Swords, Loader2, CheckCircle2, XCircle, Clock } from 'lucide-react';

const AGENT_META = {
  orchestrator: { label: 'Orchestrator', icon: Brain },
  insight: { label: 'Insight', icon: Search },
  strategy: { label: 'Strategy', icon: Target },
  creative: { label: 'Creative', icon: Palette },
  analytics: { label: 'Analytics', icon: BarChart3 },
  compliance: { label: 'Compliance', icon: ShieldCheck },
  ci: { label: 'Competitive Intel', icon: Swords },
};

export default function AgentStatus({ statuses }) {
  return (
    <div className="p-4 border-b border-gray-100">
      <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Agent Status</h3>
      <div className="space-y-2">
        {Object.entries(AGENT_META).map(([key, meta]) => {
          const Icon = meta.icon;
          const s = statuses[key] || {};
          const status = s.status || 'idle';
          return (
            <div key={key} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <Icon className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-700 flex-1">{meta.label}</span>
              {status === 'running' || status === 'planning' || status === 'synthesizing'
                ? <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                : status === 'completed'
                ? <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                : status === 'failed'
                ? <XCircle className="w-3.5 h-3.5 text-red-500" />
                : <Clock className="w-3.5 h-3.5 text-gray-300" />}
              <span className="text-xs text-gray-400 w-14 text-right">
                {s.duration_ms ? `${s.duration_ms}ms` : status === 'running' ? 'running' : 'idle'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
