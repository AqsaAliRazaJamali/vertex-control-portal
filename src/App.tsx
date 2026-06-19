import React, { useState } from 'react';
import Login from './Login'; // Importing authentication guard container

export default function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [idea, setIdea] = useState('Build an interactive search visualizer platform');
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('pm');
  const [logs, setLogs] = useState<string[]>([]);
  const [data, setData] = useState({ requirements: '', code: '', tester_feedback: '', documentation: '' });

  const triggerBuild = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || !token) return;

    setLoading(true);
    setLogs([]);

    const steps = [
      "CRITICAL // Initializing secure access pipeline routing layers...",
      "CRITICAL // Compiling token matrix configurations...",
      "CRITICAL // Fetching workspace specifications payload node...",
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setLogs((prev) => [...prev, steps[i]]);
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/develop", {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // ATTACHING SECURE VALIDATION TOKEN HERE
        },
        body: JSON.stringify({ idea: idea })
      });
      
      if (response.status === 401) {
        handleLogout();
        throw new Error("Session access expired. Security termination initialized.");
      }
      if (!response.ok) throw new Error("Network execution matrix fault.");
      
      const payload = await response.json();
      setData(payload);
      setLogs((prev) => [...prev, "SUCCESS // Workspace synchronized successfully."]);
    } catch (error: any) {
      setLogs((prev) => [...prev, `ERROR // ${error.message}`]);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const handleDownload = (filename: string, content: string) => {
    if (!content) return; 
    const element = document.createElement("a");
    const file = new Blob([content], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 🚧 THE SECURITY ROUTE GUARD CONDITIONS DETONATOR
  if (!token) {
    return <Login onAuthSuccess={(newToken) => setToken(newToken)} />;
  }

  return (
    <div className="min-h-screen bg-[#05070f] text-[#f1f5f9] flex flex-col font-mono antialiased selection:bg-cyan-500/30 tracking-tight">
      {/* HEADER CONTROL BAR */}
      <header className="bg-[#0b0e17]/80 border-b border-slate-800/80 px-8 py-4 flex items-center justify-between backdrop-blur-md sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-pulse" />
          <h1 className="text-xs font-black tracking-[0.25em] text-transparent bg-clip-text bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 uppercase">
            VERTEX WORKSPACE
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-950/30 border border-cyan-800/40 px-3 py-1.5 rounded-full shadow-[0_0_10px_rgba(34,211,238,0.15)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block shadow-[0_0_6px_#34d399]" />
            Auth State // <span className="text-white font-black">SECURE</span>
          </div>
          {/* TERMINATE WORKSPACE SESSION BUTTON */}
          <button 
            onClick={handleLogout}
            className="text-[10px] font-black uppercase text-red-400 hover:text-red-300 transition-all border border-red-900/40 px-3 py-1.5 rounded-xl bg-red-950/10 hover:bg-red-950/20"
          >
            LOGOUT // DISCONNECT
          </button>
        </div>
      </header>

      {/* CORE WORKSPACE CONTENT GRID */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 space-y-6 flex flex-col justify-center">
        {/* UPPER ROW: INPUT CONTROLLER WITH NEON GLOW */}
        <section className="bg-[#0b0e17]/90 border border-slate-800 rounded-2xl p-6 shadow-[0_0_25px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group hover:border-cyan-500/40 transition-all duration-300">
          <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-500 to-blue-600 shadow-[0_0_10px_#22d3ee]" />
          
          <div className="flex-1 w-full space-y-2 pl-2">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-cyan-400">Target Config Directive</h2>
            <form onSubmit={triggerBuild} className="flex flex-col sm:flex-row gap-3 mt-1">
              <input
                type="text"
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                disabled={loading}
                className="flex-1 text-xs bg-[#02040a] border border-slate-800 rounded-xl px-4 py-3 text-slate-200 placeholder-slate-700 focus:outline-none focus:border-cyan-500/60 focus:shadow-[0_0_15px_rgba(34,211,238,0.1)] transition-all font-medium"
                placeholder="Specify concept targets..."
              />
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-3 rounded-xl text-xs uppercase tracking-widest font-black transition-all duration-300 border shadow-md whitespace-nowrap ${
                  loading 
                    ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 border-cyan-500/30 text-white hover:from-cyan-500 hover:to-blue-500 active:scale-[0.98] shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                }`}
              >
                {loading ? 'Compiling...' : 'Run Pipeline'}
              </button>
            </form>
          </div>

          {/* EXPORTS CORE INTERACTIVE ASSETS */}
          <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 flex flex-col sm:flex-row md:flex-col gap-2 min-w-[190px]">
            <button
              type="button"
              disabled={!data.code || loading}
              onClick={() => handleDownload("app_script.py", data.code)}
              className={`flex-1 text-center py-2.5 px-4 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all duration-300 border ${
                !data.code || loading
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                  : 'bg-[#02040a] text-cyan-400 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-950/30 shadow-[0_0_10px_rgba(34,211,238,0.1)] active:scale-[0.98]'
              }`}
            >
              Download Script (.py)
            </button>
            <button
              type="button"
              disabled={!data.documentation || loading}
              onClick={() => handleDownload("README.md", data.documentation)}
              className={`flex-1 text-center py-2.5 px-4 rounded-xl text-[10px] uppercase font-black tracking-wider transition-all duration-300 border ${
                !data.documentation || loading
                  ? 'bg-slate-900/50 border-slate-800 text-slate-600 cursor-not-allowed opacity-40'
                  : 'bg-[#02040a] text-indigo-400 border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-950/30 shadow-[0_0_10px_rgba(99,102,241,0.1)] active:scale-[0.98]'
              }`}
            >
              Export Manual (.md)
            </button>
          </div>
        </section>

        {/* BOTTOM RENDER ENGINE SECTION (REMAINS EXACT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <section className="lg:col-span-8 bg-[#0b0e17]/90 border border-slate-800 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden min-h-[460px] relative group hover:border-indigo-500/30 transition-all duration-300">
            <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-indigo-500 to-purple-600 shadow-[0_0_10px_#6366f1]" />
            <div className="bg-[#070910] border-b border-slate-800/80 p-2 flex gap-1.5 z-10 pl-3">
              {[{ id: 'pm', label: '01 PLANNING' }, { id: 'dev', label: '02 SOURCE' }, { id: 'qa', label: '03 STABILITY' }, { id: 'docs', label: '04 MANIFEST' }].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 border ${activeTab === tab.id ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex-1 p-6 overflow-auto text-xs text-slate-300 leading-relaxed bg-[#02040a]/80 shadow-inner z-10 pl-7">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-3">
                  <div className="h-5 w-5 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shadow-[0_0_8px_#22d3ee]" />
                  <div className="text-[10px] uppercase tracking-widest font-bold text-cyan-400 animate-pulse">Streaming compilation buffer arrays...</div>
                </div>
              ) : (
                <div className="whitespace-pre-wrap font-medium tracking-normal selection:bg-cyan-500/20">
                  {activeTab === 'pm' && (data.requirements || '// Matrix stream buffer clear. Active input required.')}
                  {activeTab === 'dev' && (data.code || '# Code structural fields standing by.')}
                  {activeTab === 'qa' && (data.tester_feedback || '// Environment performance tracking analytics empty.')}
                  {activeTab === 'docs' && (data.documentation || '# Operation markdown specifications uncompiled.')}
                </div>
              )}
            </div>
          </section>

          <section className="lg:col-span-4 bg-[#0b0e17]/90 text-slate-200 rounded-2xl p-5 border border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.6)] flex flex-col gap-4 relative group hover:border-cyan-500/30 transition-all duration-300">
            <div className="absolute right-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-blue-600 to-cyan-500 shadow-[0_0_10px_#3b82f6]" />
            <div className="pr-2"><h3 className="text-[10px] font-black uppercase text-slate-100 tracking-widest border-b border-slate-800 pb-2 flex items-center justify-between"><span>STDOUT Monitor</span><span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" /></h3></div>
            <div className="flex-1 text-[11px] space-y-2.5 overflow-y-auto max-h-[360px] pr-2 shadow-inner">
              {logs.length === 0 ? <div className="text-slate-500 italic leading-relaxed">// Awaiting sequence pipeline run parameters...</div> : logs.map((log, index) => <div key={index} className={`leading-relaxed border-l-2 pl-2 ${log.includes("SUCCESS") ? 'text-emerald-400 border-emerald-500 font-bold bg-emerald-950/20 py-0.5 rounded px-1 shadow-[0_0_10px_rgba(16,185,129,0.1)]' : 'text-cyan-300 border-slate-800'}`}>{log}</div>)}
            </div>
            <div className="bg-[#02040a] rounded-xl p-3 text-[9px] uppercase tracking-wider font-bold text-slate-300 flex justify-between border border-slate-800 shadow-inner mr-2"><span className="text-slate-400">Environment</span><span className="text-cyan-400 font-black tracking-wide">LOCAL_SANDBOX_V1</span></div>
          </section>
        </div>
      </main>
    </div>
  );
}