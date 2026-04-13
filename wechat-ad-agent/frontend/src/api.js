const API_BASE = '/api';

export async function sendMessage(sessionId, message) {
  const res = await fetch(`${API_BASE}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, message }),
  });
  return res.json();
}

export async function getHistory(sessionId) {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/history`);
  return res.json();
}

export async function getApprovals(sessionId) {
  const res = await fetch(`${API_BASE}/sessions/${sessionId}/approvals`);
  return res.json();
}

export async function submitApproval(approvalId, decision, feedback = '') {
  const res = await fetch(`${API_BASE}/approvals/${approvalId}/decide`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ approval_id: approvalId, decision, feedback }),
  });
  return res.json();
}

export async function getDashboardStats() {
  const res = await fetch(`${API_BASE}/dashboard/stats`);
  return res.json();
}

export function createWebSocket(sessionId, onMessage) {
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const ws = new WebSocket(`${protocol}//${window.location.host}/ws/${sessionId}`);
  ws.onmessage = (e) => onMessage(JSON.parse(e.data));
  ws.onerror = (err) => console.error('WebSocket error:', err);
  return ws;
}
