import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [err, setErr] = useState('');
    const [mod, setMod] = useState('DASHBOARD');
    const [dept, setDept] = useState('MAIN');

    const [beds, setBeds] = useState([
        { id: 1, n: 'PEDS-01', w: 'Pediatric Ward', s: 'AVAILABLE', t: 'KIDS' },
        { id: 2, n: 'ICU-05', w: 'Adult Intensive Care', s: 'OCCUPIED', t: 'ADULT' },
        { id: 3, n: 'TX-09', w: 'Organ Transplant Wing', s: 'DIRTY', t: 'ORGAN' }
    ]);

    const getTheme = () => {
        if (dept === 'KIDS') return { bg: 'bg-pink-50', h: 'bg-pink-400 text-white shadow', t: 'text-pink-900', c: 'bg-white border-2 border-pink-200 p-4 rounded-xl' };
        if (dept === 'ADULT') return { bg: 'bg-slate-900', h: 'bg-slate-800 text-white shadow border-b-2 border-blue-500', t: 'text-white', c: 'bg-slate-800 border border-slate-700 p-4 rounded-xl text-white' };
        if (dept === 'ORGAN') return { bg: 'bg-stone-100', h: 'bg-stone-800 text-emerald-400 shadow', t: 'text-stone-800', c: 'bg-stone-50 border border-emerald-300 p-4 rounded-xl' };
        return { bg: 'bg-slate-50', h: 'bg-white text-slate-900 shadow border-b-4 border-blue-600', t: 'text-slate-900', c: 'bg-white border-l-4 border-blue-500 p-4 shadow' };
    };
    const theme = getTheme();

    const login = (e) => {
        e.preventDefault(); setErr('');
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUser({ name: 'Admin', role: 'SUPER_ADMINISTRATOR', mods: ['DASHBOARD', 'BED_MANAGEMENT', 'FINANCE', 'CRM'] });
        } else if (email === 'doctor@wecure.hospital' && password === 'WecureDoc2026!') {
            setUser({ name: 'Dr. Sharma', role: 'ATTENDING_PHYSICIAN', mods: ['DASHBOARD', 'BED_MANAGEMENT'] });
        } else if (email === 'marketing@wecure.hospital' && password === 'WecureCrm2026!') {
            setUser({ name: 'Karan Singh', role: 'MARKETING_OFFICER', mods: ['DASHBOARD', 'CRM'] });
        } else { setErr('Invalid credentials.'); }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <form onSubmit={login} className="max-w-md w-full bg-white p-6 rounded-2xl shadow-xl border-t-8 border-blue-600 space-y-4">
                    <h2 className="text-center text-2xl font-black text-slate-900">Wecure Hospital ERP</h2>
                    {err && <div className="bg-rose-50 text-rose-600 p-2 text-xs font-bold text-center rounded">{err}</div>}
                    <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-2 border rounded shadow-sm" placeholder="Email" />
                    <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2 border rounded shadow-sm" placeholder="Password" />
                    <button type="submit" className="w-full py-2 bg-blue-600 text-white font-bold rounded">Authenticate Secure Session</button>
                </form>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} flex flex-col transition-all`}>
            <header className={`px-6 py-3 flex items-center justify-between ${theme.h}`}>
                <div><h1 className="text-md font-black">WECURE ERP ({user.name})</h1></div>
                <div className="flex bg-black bg-opacity-10 p-1 rounded gap-1">
                    <button onClick={() => setDept('MAIN')} className="px-2 py-1 text-xs font-bold rounded bg-white text-slate-900 shadow">Main</button>
                    <button onClick={() => setDept('KIDS')} className="px-2 py-1 text-xs font-bold rounded bg-pink-500 text-white shadow">Kids</button>
                    <button onClick={() => setDept('ADULT')} className="px-2 py-1 text-xs font-bold rounded bg-slate-700 text-white shadow">Adults</button>
                    <button onClick={() => setDept('ORGAN')} className="px-2 py-1 text-xs font-bold rounded bg-emerald-600 text-white shadow">Organs</button>
                </div>
            </header>
            <div className="flex flex-1">
                <aside className="w-56 bg-white border-r p-4 space-y-2">
                    {user.mods.map(m => (
                        <button key={m} onClick={() => setMod(m)} className={`w-full text-left p-2 text-xs font-bold rounded ${mod === m ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}>{m}</button>
                    ))}
                    <button onClick={() => setUser(null)} className="w-full text-center py-2 text-xs font-bold text-rose-600 border mt-4 rounded">Logout</button>
                </aside>
                <main className="flex-1 p-6 space-y-4">
                    {mod === 'DASHBOARD' && (
                        <div className="space-y-4">
                            <h2 className={`text-xl font-black ${theme.t}`}>Hospital Overview Analytics</h2>
                            <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-4 rounded-xl text-white shadow">
                                <h4 className="text-xs font-bold">🤖 AI Autonomous Operational Agent</h4>
                                <p className="text-[11px] text-blue-100 mt-1">"Operational checks successful. Data streams are completely balanced across ledgers."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className={theme.c}><h6>Beds Tracked</h6><p className="text-xl font-black">{beds.length} Monitored</p></div>
                                <div className={theme.c}><h6>Audit Trail</h6><p className="text-xl font-black text-emerald-600">✓ Balanced</p></div>
                                <div className={theme.c}><h6>CRM Flows</h6><p className="text-xl font-black">Active</p></div>
                            </div>
                        </div>
                    )}
                    {mod === 'BED_MANAGEMENT' && (
                        <div className="space-y-4">
                            <h2 className={`text-xl font-black ${theme.t}`}>Infrastructure Telemetry Beds Map</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {beds.map(b => (
                                    <div key={b.id} onClick={() => setBeds(beds.map(x => x.id === b.id ? { ...x, s: x.s === 'AVAILABLE' ? 'OCCUPIED' : 'AVAILABLE' } : x))} className={`${theme.c} cursor-pointer h-24 flex flex-col justify-between`}>
                                        <span className="font-black">{b.n}</span>
                                        <div className="flex justify-between text-xs font-bold"><span>{b.w}</span><span className="text-blue-500">{b.s}</span></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {mod === 'FINANCE' && (
                        <div className="space-y-4">
                            <h2 className={`text-xl font-black ${theme.t}`}>Double-Entry Ledger Bookkeeping Accounts</h2>
                            <div className="bg-white border rounded-xl p-4 divide-y">
                                <div className="flex justify-between py-2 text-xs font-bold"><span>1010-CASH - Main Cash Registry</span><span>₹4,50,000.00</span></div>
                                <div className="flex justify-between py-2 text-xs font-bold"><span>4010-OPD-REV - Consultation Fees</span><span>₹3,20,000.00</span></div>
                            </div>
                        </div>
                    )}
                    {mod === 'CRM' && (
                        <div className="space-y-4">
                            <h2 className={`text-xl font-black ${theme.t}`}>Patient Acquisition CRM Streams</h2>
                            <div className="bg-white p-4 border rounded-xl">
                                <h4 className="font-bold text-sm text-slate-800">Aarav Mehta (Facebook Ads Lead Channel)</h4>
                                <p className="text-xs text-slate-500 mt-1">Inquiry logged regarding Pediatric Wellness Consultation Packages.</p>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
