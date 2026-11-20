import { useState } from 'react';
import axios from 'axios';

export default function SignUp({ onSwitchToLogin, onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Register the user in MySQL
      await axios.post('http://127.0.0.1:8000/auth/register', {
        name: name,
        email: email,
        password: password
      });
      
      // 2. Automatically log them in to get the JWT token
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);
      
      const loginResponse = await axios.post(
        'http://127.0.0.1:8000/auth/login', 
        formData,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
      );
      
      localStorage.setItem('token', loginResponse.data.access_token);
      onLogin(loginResponse.data.access_token);

    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Registration failed. Try a different email.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white">
      <div className="bg-[#1e293b] p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-700">
        <h2 className="text-2xl font-bold mb-6 text-center text-cyan-400">Create an Account</h2>
        
        {error && <p className="text-red-400 text-sm mb-4 text-center bg-red-400/10 p-2 rounded">{error}</p>}
        
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-lg bg-[#0f172a] border border-slate-600 focus:border-cyan-500 outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg bg-[#0f172a] border border-slate-600 focus:border-cyan-500 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg bg-[#0f172a] border border-slate-600 focus:border-cyan-500 outline-none"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-500 p-3 rounded-lg font-bold transition-colors mt-2"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account?{' '}
          <button 
            onClick={onSwitchToLogin} 
            className="text-cyan-400 font-semibold hover:underline"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}