import React, { useState, useEffect } from 'react';
import { Send, User, CheckCheck, Sparkles, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getAlumni, getMessages, sendMessage } from '../../services/storageService';

export default function StudentMessages() {
  const { user } = useAuth();
  const [alumniList, setAlumniList] = useState([]);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const list = getAlumni();
    setAlumniList(list);
    if (list.length > 0) {
      setSelectedAlumni(list[0]); // Default to Rahul Sharma
    }
  }, []);

  useEffect(() => {
    if (selectedAlumni && user) {
      const msgs = getMessages(user.id || 'STU001', selectedAlumni.id);
      setMessages(msgs);
    }
  }, [selectedAlumni, user]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedAlumni) return;

    const newMsg = sendMessage(user?.id || 'STU001', selectedAlumni.id, inputText);
    setMessages(prev => [...prev, newMsg]);
    setInputText('');

    // Optional simulated mentor response
    setTimeout(() => {
      const replies = [
        "Sounds great! Happy to guide you through this.",
        "I reviewed your note, let's connect on Saturday!",
        "Feel free to share your resume and project link here.",
        "Great question! I'll prepare some pointers for our session."
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const autoReply = sendMessage(selectedAlumni.id, user?.id || 'STU001', randomReply);
      setMessages(prev => [...prev, autoReply]);
    }, 1200);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden h-[calc(100vh-12rem)] flex flex-col md:flex-row">
      
      {/* Left Conversations Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Alumni Mentors</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Chat directly with alumni</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {alumniList.map(alumni => {
            const isSelected = selectedAlumni?.id === alumni.id;
            return (
              <button
                key={alumni.id}
                onClick={() => setSelectedAlumni(alumni)}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition ${
                  isSelected ? 'bg-blue-50/70 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                }`}
              >
                <img
                  src={alumni.avatar}
                  alt={alumni.name}
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{alumni.name}</h4>
                  <p className="text-[11px] text-blue-600 font-medium truncate">{alumni.jobRole} @ {alumni.company}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{alumni.location}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Chat Area */}
      {selectedAlumni ? (
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/40">
          
          {/* Chat Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedAlumni.avatar}
                alt={selectedAlumni.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedAlumni.name}</h4>
                <p className="text-xs text-slate-500">
                  {selectedAlumni.jobRole} at {selectedAlumni.company} • {selectedAlumni.experience} yrs exp
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available to Mentor</span>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <p className="font-semibold text-slate-600">No messages yet with {selectedAlumni.name}.</p>
                <p className="mt-1">Say hello or ask a question about their career journey!</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.senderId === (user?.id || 'STU001');
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-xs shadow-sm'
                          : 'bg-white text-slate-800 border border-slate-200 rounded-bl-xs shadow-soft'
                      }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${selectedAlumni.name.split(' ')[0]}...`}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold transition shadow-sm flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-400 text-xs">
          Select a mentor from the left to start messaging.
        </div>
      )}

    </div>
  );
}
