import { useState } from 'react';
import axios from 'axios';

export default function Login({ onSwitchToSignUp, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await axios.post(
        // 'https://shopease-ai-faq-backend.onrender.com/auth/login', 
        `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'}/auth/login`,
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );

      localStorage.setItem('token', response.data.access_token);
      onLogin(response.data.access_token);

    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Login to ShopEase</h2>
        
        {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-400/10 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-[#0f172a] border border-slate-600 focus:border-blue-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#0f172a] border border-slate-600 focus:border-blue-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-bold transition-colors mt-2"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Don't have an account?{' '}
          <button 
            onClick={onSwitchToSignUp} 
            className="text-blue-400 font-semibold hover:underline"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}