import React, { useState, useEffect, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import Dashboard from './components/Dashboard';
import AgentStatus from './components/AgentStatus';
import HumanApproval from './components/HumanApproval';
import { createWebSocket, getDashboardStats } from './api';

function generateSessionId() {
  return 'sess_' + Math.random().toString(36).substring(2, 10);
}

export default function App() {
  const [activeView, setActiveView] = useState('chat');
  const [sessionId] = useState(generateSessionId);
  const [agentStatuses, setAgentStatuses] = useState({});
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const socket = createWebSocket(sessionId, (data) => {
      if (data.type === 'agent_status') {
        setAgentStatuses(prev => ({
          ...prev,
          [data.agent]: { status: data.status, duration_ms: data.duration_ms },
        }));
      } else if (data.type === 'human_approval_required') {
        setPendingApprovals(prev => [...prev, ...data.approvals]);
      }
    });
    return () => socket.close();
  }, [sessionId]);

  useEffect(() => {
    if (activeView === 'dashboard') {
      getDashboardStats().then(setDashboardData).catch(console.error);
    }
  }, [activeView]);

  const handleApprovalResolved = useCallback((id) => {
    setPendingApprovals(prev => prev.filter(a => a.approval_id !== id));
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeView={activeView} onViewChange={setActiveView} pendingCount={pendingApprovals.length} />
      <div className="flex flex-1 overflow-hidden">
        {activeView === 'chat' ? (
          <>
            <div className="flex-1 flex flex-col">
              <ChatPanel sessionId={sessionId} />
            </div>
            <div className="w-80 border-l border-gray-200 bg-white flex flex-col overflow-y-auto">
              <AgentStatus statuses={agentStatuses} />
              {pendingApprovals.length > 0 && (
                <HumanApproval approvals={pendingApprovals} onResolved={handleApprovalResolved} />
              )}
            </div>
          </>
        ) : (
          <Dashboard data={dashboardData} />
        )}
      </div>
    </div>
  );
}
