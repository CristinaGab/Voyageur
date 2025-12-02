import React, { useState, useEffect, useRef } from 'react';
import { Send, Sparkles, X, Map } from 'lucide-react';
import { createTravelChat, hasApiKey, suggestItinerary } from '../services/geminiService';
import { ChatMessage } from '../types';
import { GenerateContentResponse } from '@google/genai';

interface ChatWidgetProps {
  location: string;
  isOpen: boolean;
  onClose: () => void;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ location, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatSessionRef.current && hasApiKey()) {
      chatSessionRef.current = createTravelChat();
      // Initial greeting
      setMessages([
        { role: 'model', text: `Bonjour! I'm your Voyageur Concierge. I can help you plan your trip to ${location}. Ask me anything!` }
      ]);
    }
  }, [isOpen, location]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
        const result = await chatSessionRef.current.sendMessageStream({ message: `Context: User is viewing a property in ${location}. ${userMsg}` });
        
        let fullText = '';
        setMessages(prev => [...prev, { role: 'model', text: '', isThinking: true }]);
        
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            fullText += c.text;
            setMessages(prev => {
                const newArr = [...prev];
                newArr[newArr.length - 1] = { role: 'model', text: fullText, isThinking: false };
                return newArr;
            });
        }
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: 'model', text: "I'm having trouble connecting to the concierge service right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateItinerary = async () => {
      setMessages(prev => [...prev, { role: 'user', text: "Generate a 3-day itinerary for me." }]);
      setIsLoading(true);
      const itinerary = await suggestItinerary(location, 3);
      setMessages(prev => [...prev, { role: 'model', text: itinerary }]);
      setIsLoading(false);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden z-[60] border border-gray-100 font-sans">
      {/* Header */}
      <div className="bg-emerald-600 p-4 flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          <h3 className="font-semibold">Concierge AI</h3>
        </div>
        <button onClick={onClose} className="hover:bg-emerald-700 p-1 rounded-full transition">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-none' 
                : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
            }`}>
              {msg.text}
              {msg.isThinking && <span className="animate-pulse ml-1">...</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
       <div className="px-4 py-2 bg-gray-50 flex gap-2 overflow-x-auto scrollbar-hide">
            <button 
                onClick={handleGenerateItinerary}
                className="text-xs bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition whitespace-nowrap flex items-center gap-1"
            >
                <Map className="w-3 h-3" />
                3-Day Itinerary
            </button>
            <button 
                onClick={() => { setInput(`Best restaurants in ${location}?`); handleSend(); }}
                className="text-xs bg-white border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-full hover:bg-emerald-50 transition whitespace-nowrap"
            >
                Food nearby
            </button>
       </div>

      {/* Input */}
      <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about the area..."
          className="flex-1 bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="p-2.5 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition shadow-sm"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};