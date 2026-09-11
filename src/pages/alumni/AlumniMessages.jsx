import React, { useState, useEffect } from 'react';
import { Send, User, MessageSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { getStudents, getMessages, sendMessage } from '../../services/storageService';

export default function AlumniMessages() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    const list = getStudents();
    setStudents(list);
    if (list.length > 0) {
      setSelectedStudent(list[0]);
    }
  }, []);

  useEffect(() => {
    if (selectedStudent && user) {
      const msgs = getMessages(user.id || 'ALU001', selectedStudent.id);
      setMessages(msgs);
    }
  }, [selectedStudent, user]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedStudent) return;

    const newMsg = sendMessage(user?.id || 'ALU001', selectedStudent.id, inputText);
    setMessages(prev => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-soft overflow-hidden h-[calc(100vh-12rem)] flex flex-col md:flex-row">
      
      {/* Students Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-200 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span>Mentees & Students</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Chat with student mentees</p>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {students.map(stu => {
            const isSelected = selectedStudent?.id === stu.id;
            return (
              <button
                key={stu.id}
                onClick={() => setSelectedStudent(stu)}
                className={`w-full p-3.5 flex items-center gap-3 text-left transition ${
                  isSelected ? 'bg-amber-50/70 border-l-4 border-amber-500' : 'hover:bg-slate-50'
                }`}
              >
                <img
                  src={stu.avatar}
                  alt={stu.name}
                  className="w-11 h-11 rounded-xl object-cover ring-1 ring-slate-200 shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs font-bold text-slate-900 truncate">{stu.name}</h4>
                  <p className="text-[11px] text-blue-600 font-medium truncate">{stu.department}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{stu.currentYear}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      {selectedStudent ? (
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/40">
          
          {/* Header */}
          <div className="p-4 bg-white border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={selectedStudent.avatar}
                alt={selectedStudent.name}
                className="w-10 h-10 rounded-xl object-cover ring-1 ring-slate-200"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-900">{selectedStudent.name}</h4>
                <p className="text-xs text-slate-500">
                  {selectedStudent.department} • {selectedStudent.currentYear}
                </p>
              </div>
            </div>

            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold">
              Undergraduate Student
            </span>
          </div>

          {/* Messages list */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                <p className="font-semibold text-slate-600">No messages yet with {selectedStudent.name}.</p>
                <p className="mt-1">Send a greeting or schedule a mentorship session!</p>
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.senderId === (user?.id || 'ALU001');
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
              placeholder={`Send message to ${selectedStudent.name.split(' ')[0]}...`}
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
          Select a student from the left to start messaging.
        </div>
      )}

    </div>
  );
}
