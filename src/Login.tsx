import React, { useState } from 'react';

interface LoginProps {
  onAuthSuccess: (token: string) => void;
}

export default function Login({ onAuthSuccess }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [message, setMessage] = useState('');

  // Real-time Validation Rules Evaluators
  const satisfiesLength = password.length >= 8;
  const satisfiesNumber = /\d/.test(password);
  const satisfiesSpecial = /[!@#$%^&*(),.?":{}|<>_]/.test(password);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    
    // Strict submission guard validation (Only enforced during registration)
    if (isRegistering && (!satisfiesLength || !satisfiesNumber || !satisfiesSpecial)) {
      setMessage("VALIDATION ERROR: Security matrix rules not satisfied.");
      return;
    }

    const endpoint = isRegistering ? 'register' : 'login';

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.detail || "Authentication failure loop.");

      if (isRegistering) {
        setMessage("Account initialized! Proceeding to login gateway...");
        setIsRegistering(false);
        setPassword('');
      } else {
        localStorage.setItem("token", data.access_token);
        onAuthSuccess(data.access_token);
      }
    } catch (err: any) {
      setMessage(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#05070f] flex items-center justify-center font-mono p-4 antialiased">
      <div className="max-w-md w-full bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-8 shadow-[0_0_40px_rgba(6,182,212,0.15)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_10px_#22d3ee]" />
        
        <h2 className="text-sm font-black tracking-[0.2em] text-cyan-400 text-center uppercase mb-6">
          VERTEX CONTROL PORTAL // {isRegistering ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <div>
            <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1 uppercase">Node Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full text-xs bg-[#02040a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-all font-medium"
              required
            />
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 tracking-wider block mb-1 uppercase">
              Pass Key Sequence
            </label>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-xs bg-[#02040a] border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-slate-200 focus:outline-none focus:border-cyan-500/60 transition-all font-medium"
                required
              />
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-cyan-400 transition-colors duration-200 focus:outline-none px-1"
                title={showPassword ? "Hide Mask Sequence" : "Reveal Input Array"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* MAIN SUBMIT ACTION BUTTON */}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-cyan-600 to-indigo-600 border border-cyan-500/30 text-xs font-black uppercase tracking-widest text-white rounded-xl hover:from-cyan-500 hover:to-indigo-500 shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all active:scale-[0.98]"
          >
            {isRegistering ? "Initialize Node Profile" : "Access Workstation Grid"}
          </button>

          {/* 🎯 PERMANENTLY VISIBLE MATRIX RULES (Removed the conditional check wrapper) */}
          <div className="bg-[#02040a] border border-slate-800/80 rounded-xl p-3.5 space-y-2 mt-4">
            <span className="text-[9px] font-black text-slate-500 uppercase block tracking-widest border-b border-slate-800/60 pb-1.5 mb-1.5">
              Required Security Matrix Policies:
            </span>
            
            <div className={`text-[10px] flex items-center gap-2.5 font-bold transition-colors ${satisfiesLength ? 'text-emerald-400' : 'text-rose-500'}`}>
              <span className="text-xs">{satisfiesLength ? '✓' : '✗'}</span>
              <span className="tracking-wide">Minimum Baseline: 8+ Characters</span>
            </div>
            
            <div className={`text-[10px] flex items-center gap-2.5 font-bold transition-colors ${satisfiesNumber ? 'text-emerald-400' : 'text-rose-500'}`}>
              <span className="text-xs">{satisfiesNumber ? '✓' : '✗'}</span>
              <span className="tracking-wide">Contains Numeric Parameter (0-9)</span>
            </div>
            
            <div className={`text-[10px] flex items-center gap-2.5 font-bold transition-colors ${satisfiesSpecial ? 'text-emerald-400' : 'text-rose-500'}`}>
              <span className="text-xs">{satisfiesSpecial ? '✓' : '✗'}</span>
              <span className="tracking-wide">Contains Special Signature symbol (!@#$)</span>
            </div>
          </div>
        </form>

        {message && (
          <div className={`text-[10px] mt-4 text-center font-bold py-2.5 rounded-xl border ${
            message.includes("ERROR") 
              ? 'text-red-400 bg-red-950/20 border-red-900/30' 
              : 'text-indigo-400 bg-indigo-950/20 border-indigo-900/30'
          }`}>
            {message}
          </div>
        )}

        <div className="text-[10px] text-center mt-6 text-slate-500">
          <button type="button" onClick={() => { setIsRegistering(!isRegistering); setMessage(''); }} className="hover:text-cyan-400 underline transition-all focus:outline-none">
            {isRegistering ? "Already have structural identity access? Login" : "Need registration gateway sync? Signup"}
          </button>
        </div>
      </div>
    </div>
  );
}