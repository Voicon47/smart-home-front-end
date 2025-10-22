import React, { useEffect, useState } from 'react';
import { QuickActions } from './QuickActions';
import { RoomGrid } from './RoomGrid';
import DashboardStat from './DashBoardStat';

const HomePage: React.FC = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Initialize WebSocket connection when the component mounts
    const socket = new WebSocket('http://192.168.0.201:8017'); // Replace with your WebSocket URL
    setWs(socket);

    socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'response') {
        setResponse(JSON.stringify(data.data, null, 2));
      } else if (data.type === 'error') {
        setError(data.error);
      }
    };

    socket.onerror = (event) => {
      console.error('WebSocket error:', event);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      if (socket) {
        socket.close();
      }
    };
  }, []);

  const handleSendMessage = () => {
    if (ws) {
      // Sending a sample API call message to the server
      const payload = { type: 'apiCall', payload: message };
      ws.send(JSON.stringify(payload));
      setMessage('');
    } else {
      setError('WebSocket connection is not established.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-balance">{"Welcome back, Sarah!"}</h1>
        <p className="text-muted-foreground text-lg">{"Manage your smart home devices across all your rooms"}</p>
      </div>

      <QuickActions />
      <RoomGrid />
    </main>
  );
};

export default HomePage;

