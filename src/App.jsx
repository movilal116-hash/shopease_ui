import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';


export default function App() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Trained on a 60-question ShopEase FAQ PDF. Try asking about Orders, Payments, or Returns!' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const BACKEND_URL = 'https://rag-based-faq-chatbot-backend.onrender.com/chat';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(BACKEND_URL, { request: input });
      const aiMessage = { role: 'assistant', content: response.data.ans };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: ' **Error:** Could not reach the server. The backend might be waking up. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex flex-col md:flex-row flex-wrap items-start md:items-center justify-center gap-8 p-4 md:p-8">


      {/* --- LEFT SIDE: LARGER CHAT INTERFACE --- */}
      <div className="w-full max-w-2xl h-[80vh] md:h-[85vh] bg-[#1e293b] rounded-2xl shadow-[0_0_40px_rgba(59,130,246,0.2)] border border-slate-700 flex flex-col overflow-hidden">
        
        {/* Glowing Header */}
        <header className="bg-gradient-to-r from-[#0f172a] to-[#1e293b] px-6 py-5 border-b border-slate-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl shadow-lg shadow-blue-500/50">
            🤖
          </div>
          <div>
            {/* <h1 className="text-white font-bold text-xl">Business AI Assistant</h1> */}
            <h1 className="text-white font-bold text-xl">Business AI Assistant</h1>
            
            <p className="text-blue-400 text-xs font-medium"> Online and Ready</p>
          </div>
        </header>

        {/* Chat Window */}
        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-5">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm shadow-md shrink-0 text-white">
                  Bot
                </div>
              )}
              <div className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-br-sm shadow-md' 
                  : 'bg-[#334155] text-slate-100 rounded-bl-sm shadow-sm'
              }`}>
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 self-start max-w-[85%]">
              <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-sm shadow-md shrink-0 text-white">Bot</div>
              <div className="px-5 py-4 bg-[#334155] rounded-2xl rounded-bl-sm flex gap-1.5 items-center">
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={sendMessage} className="p-5 bg-[#0f172a] border-t border-slate-700 flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            // placeholder="Trained on a 60-question ShopEase FAQ PDF. Try asking about Orders, Payments, or Returns!"
            placeholder='Type your question here... (First reply may take 60s to load.).'
            disabled={isLoading}
            className="flex-1 bg-[#1e293b] border border-slate-600 text-white rounded-xl px-5 py-3.5 text-[15px] focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-400 disabled:bg-slate-700 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-lg shadow-blue-500/30"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>



      {/* --- RIGHT SIDE: SHORT AD BANNER (Smaller) --- */}
      <div className="w-full max-w-sm bg-gradient-to-br from-[#1e293b] via-[#0f172a] to-[#3b82f6] rounded-2xl shadow-xl border border-slate-700 p-6 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-overlay"></div>
        
        <div className="relative z-10 flex flex-col gap-6 text-white">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white mb-2">Business Specific Rag Based Chatbot </h2>
            <ul className=" text-sm text-slate-300 text-bold">
              <li className="flex items-center gap-1"><span className="text-blue-400 text-lg">✓</span> I read your business PDF</li>
              <li className="flex items-center gap-1"><span className="text-blue-400 text-lg">✓</span> I organize your data so the AI can find it instantly</li>
              <li className="flex items-center gap-1"><span className="text-blue-400 text-lg">✓</span> When a customer asks a question, the AI searches your PDF, reads the exact answer, and replies to the customer safely.</li>
              <li className="flex items-center gap-1"><span className="text-blue-400 text-lg">✓</span> Answers only from your document</li>
              <li className="flex items-center gap-1"><span className="text-blue-400 text-lg">✓</span> Says "I don't know" when not covered"</li>
            </ul>
          </div>

          <div className="mt-6 bg-slate-900/80 backdrop-blur-md p-4 rounded-xl border border-slate-600">
            <p className="text-sm font-semibold mb-2"> Available for Freelance</p>
            <p className="text-xs text-slate-400 mb-4 leading-relaxed">
              Need a custom AI chatbot for your business? Let's discuss your project
            </p>
            
          </div>
        </div>
      </div>

      

    </div>
  );
}