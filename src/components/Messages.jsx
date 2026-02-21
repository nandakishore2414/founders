import React, { useState } from 'react';
import { Search, MoreHorizontal, Phone, Video, Send, Paperclip, Check, CheckCheck } from 'lucide-react';

const Messages = () => {
    const [activeChat, setActiveChat] = useState(0);

    const CONVERSATIONS = [
        {
            id: 0,
            name: "Sarah Miller",
            startup: "HealthBridge",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            type: "Partnership",
            lastMessage: "That sounds great! Let's schedule a call for Tuesday.",
            time: "10:30 AM",
            unread: 0,
            online: true
        },
        {
            id: 1,
            name: "Alex Chen",
            startup: "DevFlow",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            type: "Integration",
            lastMessage: "I've sent over the API documentation.",
            time: "Yesterday",
            unread: 2,
            online: false
        }
    ];

    const MESSAGES = [
        { sender: 'them', text: "Hi! I saw you're building in the HealthTech space. We're looking for pilot partners.", time: "10:00 AM" },
        { sender: 'me', text: "Hey Sarah, thanks for reaching out. We are actually looking for integration partners right now.", time: "10:05 AM" },
        { sender: 'them', text: "That sounds great! Let's schedule a call for Tuesday.", time: "10:30 AM" }
    ];

    const getTypeColor = (type) => {
        const colors = {
            'Partnership': 'bg-blue-50 text-blue-700 border-blue-100',
            'Integration': 'bg-blue-100 text-blue-800 border-blue-200',
            'Hiring': 'bg-green-50 text-green-700 border-green-100',
        };
        return colors[type] || 'bg-gray-50 text-gray-600 border-gray-100';
    };

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-6rem)] pb-4 px-4 md:px-0 flex gap-6 pt-4">
            {/* List */}
            <div className="w-full md:w-80 lg:w-96 bg-white rounded-2xl border border-blue-100 shadow-sm flex flex-col overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="font-bold text-xl text-gray-900 mb-4">Messages</h2>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search messages..."
                            className="w-full pl-10 pr-4 py-2 rounded-xl border border-blue-100 bg-blue-50/50 focus:bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {CONVERSATIONS.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => setActiveChat(chat.id)}
                            className={`p-4 flex gap-3 cursor-pointer transition-colors border-b border-blue-50 ${activeChat === chat.id ? 'bg-blue-100/60' : 'hover:bg-blue-50/50'
                                }`}
                        >
                            <div className="relative flex-shrink-0">
                                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                                {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                    <h3 className={`font-bold text-sm truncate ${activeChat === chat.id ? 'text-blue-900' : 'text-gray-900'}`}>{chat.name}</h3>
                                    <span className="text-[10px] text-gray-400 whitespace-nowrap">{chat.time}</span>
                                </div>
                                <div className="flex items-center gap-1.5 mb-1">
                                    <span className="text-[10px] text-gray-500 font-medium">{chat.startup}</span>
                                    <span className={`text-[9px] px-1.5 py-0.5 rounded border ${getTypeColor(chat.type)}`}>
                                        {chat.type}
                                    </span>
                                </div>
                                <p className={`text-xs truncate ${chat.unread > 0 ? 'font-bold text-gray-900' : 'text-gray-500'}`}>
                                    {chat.lastMessage}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="hidden md:flex flex-1 bg-white rounded-2xl border border-blue-100 shadow-sm flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white z-10">
                    <div className="flex items-center gap-3">
                        <img src={CONVERSATIONS[activeChat].avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                        <div>
                            <h3 className="font-bold text-gray-900">{CONVERSATIONS[activeChat].name}</h3>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-500">{CONVERSATIONS[activeChat].startup}</span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${getTypeColor(CONVERSATIONS[activeChat].type)}`}>
                                    {CONVERSATIONS[activeChat].type}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <Video className="w-5 h-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50">
                    <div className="flex justify-center">
                        <span className="text-[10px] font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                            Connected via {CONVERSATIONS[activeChat].type} • Oct 24
                        </span>
                    </div>

                    {MESSAGES.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl p-4 shadow-sm ${msg.sender === 'me'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white text-gray-800 border border-blue-100 rounded-bl-none'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                                <div className={`text-[10px] mt-1 text-right ${msg.sender === 'me' ? 'text-gray-400' : 'text-gray-400'}`}>
                                    {msg.time}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className="p-4 bg-white border-t border-gray-100">
                    <div className="flex gap-2 items-end">
                        <button className="p-3 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
                            <Paperclip className="w-5 h-5" />
                        </button>
                        <textarea
                            placeholder="Type a message..."
                            rows={1}
                            className="flex-1 bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-400 focus:bg-white resize-none min-h-[46px] max-h-32"
                        />
                        <button className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95">
                            <Send className="w-5 h-5 ml-0.5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
