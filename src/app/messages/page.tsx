'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockMessages, mockConversations, mockCurrentUser, mockDrivers } from '@/lib/mock-data';
import { Message } from '@/types/message';
import {
  Send,
  Car,
  Info,
  CheckCheck,
} from 'lucide-react';
import { VerificationBadge } from '@/components/ui/VerificationBadge';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const activeConversation = mockConversations[0];
  const driver = mockDrivers[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      connection_id: activeConversation.connection_id,
      sender_id: mockCurrentUser.id,
      receiver_id: driver.id,
      message: inputText.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulate driver reply after 1.5s
    setTimeout(() => {
      const driverReply: Message = {
        id: `msg_${Date.now() + 1}`,
        connection_id: activeConversation.connection_id,
        sender_id: driver.id,
        receiver_id: mockCurrentUser.id,
        message: 'Sounds great! I have added you to my navigation waypoint. See you on Friday morning.',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, driverReply]);
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">Rider Messaging</h1>
        <p className="mt-1 text-sm text-slate-500">
          Direct, private communication between connected riders for Pune → Hyderabad trip.
        </p>
      </div>

      {/* Main Messaging Container */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[560px]">
        {/* Left: Conversation List */}
        <div className="md:col-span-4 border-r border-slate-200 bg-slate-50/50 p-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            Active Ride Chats
          </div>

          <button
            type="button"
            className="w-full text-left p-3 rounded-2xl bg-white border border-sky-200 shadow-xs space-y-1 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-900">{driver.full_name}</span>
              <span className="text-[10px] text-slate-400">Online</span>
            </div>
            <div className="text-xs text-slate-600 flex items-center gap-1">
              <Car className="w-3.5 h-3.5 text-sky-600" />
              <span>{activeConversation.trip_route}</span>
            </div>
            <p className="text-xs text-slate-500 truncate pt-1">
              {messages[messages.length - 1]?.message}
            </p>
          </button>
        </div>

        {/* Right: Message Window */}
        <div className="md:col-span-8 flex flex-col justify-between bg-white">
          {/* Chat Header */}
          <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-800 text-white font-bold flex items-center justify-center text-sm">
                {driver.full_name.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-slate-900">{driver.full_name}</span>
                  <VerificationBadge status={driver.verification_status} size="sm" />
                </div>
                <div className="text-xs text-slate-500 flex items-center gap-2">
                  <span>Pune ➔ Hyderabad</span>
                  <span>•</span>
                  <span>25 Sep, 08:00 AM</span>
                </div>
              </div>
            </div>

            <Link
              href={`/trips/trip_101`}
              className="text-xs font-semibold text-sky-600 hover:text-sky-700 bg-sky-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              Trip Details
            </Link>
          </div>

          {/* Privacy & Safe Chat Callout */}
          <div className="mx-4 my-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-500 flex items-center gap-2">
            <Info className="w-4 h-4 text-sky-600 shrink-0" />
            <span>
              Direct peer connection chat. Coordinate pickup landmark, luggage space, and fuel contribution.
            </span>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 max-h-[380px]">
            {messages.map((msg) => {
              const isMine = msg.sender_id === mockCurrentUser.id;
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${
                      isMine
                        ? 'bg-sky-600 text-white rounded-br-xs'
                        : 'bg-slate-100 text-slate-900 rounded-bl-xs'
                    }`}
                  >
                    {msg.message}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-1 px-1">
                    <span>
                      {new Date(msg.created_at).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    {isMine && <CheckCheck className="w-3 h-3 text-sky-600" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-slate-100 flex items-center gap-2 bg-slate-50/50"
          >
            <input
              type="text"
              placeholder="Type your message to coordinate pickup or contribution..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
