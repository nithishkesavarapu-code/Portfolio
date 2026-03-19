import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Save, RefreshCw, Plus, Trash2, Copy, Check, Settings, Trophy } from 'lucide-react';
import { ratingData as initialData, platforms } from '../data/contestRatings';

const ContestManager = ({ onClose, onUpdate }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [data, setData] = useState([]);
  const [newEntry, setNewEntry] = useState({ date: new Date().toISOString().split('T')[0], platform: 'LeetCode', rating: '' });
  const [handle, setHandle] = useState('');
  const [syncPlatform, setSyncPlatform] = useState('Codeforces');
  const [loading, setLoading] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('contest_ratings_data');
    if (saved) {
      setData(JSON.parse(saved));
    } else {
      setData(initialData);
    }

    if (sessionStorage.getItem('contest_manager_auth') === 'true') {
      setIsAuthorized(true);
    }
  }, []);

  const handleAuth = () => {
    if (passcode === import.meta.env.VITE_PASSCODE) {
      setIsAuthorized(true);
      sessionStorage.setItem('contest_manager_auth', 'true');
    } else {
      alert('Incorrect Master Key');
    }
  };

  const handleSave = (updatedData) => {
    const sorted = [...updatedData].sort((a, b) => new Date(a.date) - new Date(b.date));
    setData(sorted);
    localStorage.setItem('contest_ratings_data', JSON.stringify(sorted));
    onUpdate(sorted);
  };

  const addEntry = () => {
    if (!newEntry.rating) return;
    
    const existingIndex = data.findIndex(d => d.date === newEntry.date);
    let newData;
    if (existingIndex > -1) {
      newData = [...data];
      newData[existingIndex] = { ...newData[existingIndex], [newEntry.platform]: parseInt(newEntry.rating) };
    } else {
      newData = [...data, { date: newEntry.date, [newEntry.platform]: parseInt(newEntry.rating) }];
    }
    
    handleSave(newData);
    setNewEntry({ ...newEntry, rating: '' });
  };

  const removeEntry = (index) => {
    const newData = data.filter((_, i) => i !== index);
    handleSave(newData);
  };

  const syncData = async () => {
    if (!handle) return;
    setLoading(true);
    let updatedData = [...data];

    try {
      if (syncPlatform === 'Codeforces') {
        const response = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
        const json = await response.json();

        if (json.status === 'OK') {
          json.result.forEach((contest) => {
            const date = new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0];
            const existing = updatedData.find((d) => d.date === date);
            if (existing) {
              existing.Codeforces = contest.newRating;
            } else {
              updatedData.push({ date, Codeforces: contest.newRating });
            }
          });
        }
      } else if (syncPlatform === 'LeetCode') {
        const response = await fetch(`https://alfa-leetcode-api.onrender.com/${handle}/contest/history`);
        const json = await response.json();

        if (json.contestHistory) {
          json.contestHistory.forEach((item) => {
            if (item.rating) {
              const date = new Date(item.contest.startTime * 1000).toISOString().split('T')[0];
              const existing = updatedData.find((d) => d.date === date);
              if (existing) {
                existing.LeetCode = Math.round(item.rating);
              } else {
                updatedData.push({ date, LeetCode: Math.round(item.rating) });
              }
            }
          });
        }
      } else if (syncPlatform === 'CodeChef') {
        const response = await fetch(`https://cp-rating-api.vercel.app/codechef/${handle}`);
        const json = await response.json();

        if (json.contests) {
          json.contests.forEach((contest) => {
            if (contest.rating) {
              const date = new Date(contest.end_time || contest.date).toISOString().split('T')[0];
              const existing = updatedData.find((d) => d.date === date);
              if (existing) {
                existing.CodeChef = parseInt(contest.rating);
              } else {
                updatedData.push({ date, CodeChef: parseInt(contest.rating) });
              }
            }
          });
        }
      }

      handleSave(updatedData);
      alert(`${syncPlatform} ratings synced!`);
    } catch (error) {
      console.error('Sync error:', error);
      alert(`Failed to sync from ${syncPlatform}. The community API might be down.`);
    } finally {
      setLoading(false);
    }
  };
  const generateCode = () => {
    const code = `export const ratingData = ${JSON.stringify(data, null, 2)};`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl bg-black/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500/10 rounded-xl">
              <Trophy className="text-cyan-400" size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Rating Manager</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {!isAuthorized ? (
          <div className="p-12 flex flex-col items-center justify-center space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <Settings className="text-gray-400" size={32} />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">Owner Authentication</h3>
              <p className="text-sm text-gray-500">Please enter your Master Key to manage contest ratings.</p>
            </div>
            <div className="w-full max-w-sm flex flex-col gap-3">
              <input 
                type="password"
                placeholder="Enter Master Key"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAuth()}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-center focus:outline-none focus:border-cyan-500/50 transition-colors"
              />
              <button 
                onClick={handleAuth}
                className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-3 rounded-xl transition-all shadow-lg shadow-cyan-500/10"
              >
                Unlock Manager
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Automated Sync</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-[0.3]">
                <select 
                  value={syncPlatform}
                  onChange={(e) => setSyncPlatform(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 appearance-none cursor-pointer"
                >
                  <option value="Codeforces" className="bg-gray-900 text-white">Codeforces</option>
                  <option value="LeetCode" className="bg-gray-900 text-white">LeetCode</option>
                  <option value="CodeChef" className="bg-gray-900 text-white">CodeChef</option>
                </select>
              </div>
              <div className="relative flex-1">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                <input 
                  type="text"
                  placeholder="Platform Handle"
                  value={handle}
                  onChange={(e) => setHandle(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                />
              </div>
              <button 
                onClick={syncData}
                disabled={loading || !handle}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/10 min-w-[120px]"
              >
                {loading ? <RefreshCw className="animate-spin" size={18} /> : <RefreshCw size={18} />}
                {loading ? "Syncing..." : "Sync Now"}
              </button>
            </div>
            <p className="text-[10px] text-gray-500">Using third-party community APIs for LeetCode and CodeChef. Stability may vary.</p>
          </section>

          <section className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Manual Entry</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input 
                type="date"
                value={newEntry.date}
                onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none flex-1"
              />
              <select 
                value={newEntry.platform}
                onChange={(e) => setNewEntry({...newEntry, platform: e.target.value})}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none flex-1"
              >
                {platforms.map(p => (
                  <option key={p.key} value={p.key} className="bg-gray-900 text-white">{p.key}</option>
                ))}
              </select>
              <div className="flex gap-2 flex-[1.2]">
                <input 
                  type="number"
                  placeholder="Rating"
                  value={newEntry.rating}
                  onKeyDown={(e) => e.key === 'Enter' && addEntry()}
                  onChange={(e) => setNewEntry({...newEntry, rating: e.target.value})}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none"
                />
                <button 
                  onClick={addEntry} 
                  className="px-4 bg-cyan-500 rounded-xl text-black hover:bg-cyan-400 transition-colors shrink-0 flex items-center justify-center"
                  title="Add Entry"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Contest History</h3>
              <span className="text-xs text-gray-500">{data.length} Entries</span>
            </div>
            <div className="space-y-2">
              {data.slice().reverse().map((entry, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/5 rounded-xl group">
                  <div className="flex items-center gap-6">
                    <span className="text-sm font-mono text-gray-400">{entry.date}</span>
                    <div className="flex gap-4">
                      {platforms.map(p => entry[p.key] && (
                        <div key={p.key} className="flex items-center gap-1.5 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: p.color }} />
                          <span className="text-xs font-bold text-white">{entry[p.key]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => removeEntry(data.length - 1 - idx)} className="p-1.5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
            </div>

            <div className="p-6 border-t border-white/5 bg-white/[0.02] flex items-center justify-between">
              <p className="text-xs text-gray-500 max-w-[60%]">
                Changes are saved to your browser. Use the copy button to get the code for your <code className="text-cyan-400">contestRatings.js</code> file.
              </p>
              <button 
                onClick={generateCode}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl transition-all"
              >
                {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                {copied ? "Copied!" : "Copy Code"}
              </button>
            </div>
          </>
        )}
      </motion.div>

    </div>
  );
};

export default ContestManager;
