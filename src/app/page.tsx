// app/page.tsx
'use client';

import React, { useState, useEffect } from 'react';

export default function Home() {
  // Add mounted state to prevent hydration issues
  const [mounted, setMounted] = useState(false);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [notifications, setNotifications] = useState<Array<{id: number, text: string, isError: boolean}>>([]);

  // Handle initial mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  // If not mounted yet, return null or a loading state
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  const simulateAPICall = async () => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      addNotification('API call successful!');
    } catch (error) {
      addNotification('API call failed!', true);
    } finally {
      setLoading(false);
    }
  };

  const addNotification = (text: string, isError = false) => {
    const newNotification = {
      id: Date.now(),
      text,
      isError
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 3));
  };

  const handleMessageSubmit = () => {
    if (message.trim()) {
      addNotification(`Message: ${message}`);
      setMessage('');
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            React Vercel Template
          </h1>
          <p className="text-gray-600">
            A testing template for Vercel deployment
          </p>
        </div>

        <div className="space-y-2 mb-8">
          {notifications.map(notification => (
            <div 
              key={notification.id}
              className={`p-4 rounded-md ${
                notification.isError 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
              }`}
            >
              {notification.text}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">Counter Test</h2>
          <div className="text-center">
            <p className="text-4xl font-bold mb-4">{count}</p>
            <div className="space-x-2">
              <button
                onClick={() => setCount(prev => prev - 1)}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100"
                type="button"
              >
                Decrease
              </button>
              <button
                onClick={() => setCount(prev => prev + 1)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700"
                type="button"
              >
                Increase
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md mb-8 p-6">
          <h2 className="text-xl font-bold mb-4">API Test</h2>
          <div className="space-y-4">
            <button 
              onClick={simulateAPICall}
              disabled={loading}
              className={`w-full px-4 py-2 bg-blue-500 text-white rounded-md transition-all ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-blue-600 active:bg-blue-700'
              }`}
              type="button"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : 'Test API Call'}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Input Test</h2>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleMessageSubmit();
                }
              }}
            />
            <button
              onClick={handleMessageSubmit}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 active:bg-blue-700 transition-colors"
              type="button"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}