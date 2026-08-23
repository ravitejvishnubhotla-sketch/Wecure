import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [userSession, setUserSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const [activeModule, setActiveModule] = useState('DASHBOARD');
    const [selectedDepartment, setSelectedDepartment] = useState('MAIN');

    const [liveBeds] = useState([
        { id: 1, number: 'PEDS-01', ward: 'Pediatric Ward', status: 'AVAILABLE', type: 'KIDS' },
        { id: 2, number: 'ICU-05', ward: 'Adult Intensive Care', status: 'OCCUPIED', type: 'ADULT' },
        { id: 3, number: 'TX-09', ward: 'Organ Transplant Wing', status: 'DIRTY', type: 'ORGAN' }
    ]);
    
    const [crmLeads] = useState([
        { id: 'l1', name: 'Aarav Mehta', channel: 'Facebook Lead', status: 'NEW', details: 'Inquiry for Pediatric Wellness Package' }
    ]);

    const [generalLedger] = useState([
        { code: '1010-CASH', name: 'Main Vault Account', type: 'ASSET', balance: 450000.00 },
        { code: '4010-OPD-REV', name: 'Outpatient Revenue Line', type: 'REVENUE', balance: 320000.00 }
    ]);

    const getThemeStyles = () => {
        if (selectedDepartment === 'KIDS') return { bg: 'bg-pink-50', header: 'bg-gradient-to-r from-pink-400 to-blue-300 text-white shadow-md', text: 'text-pink-900', card: 'bg-white border-2 border-pink-200 p-6 rounded-2xl shadow-sm' };
        if (selectedDepartment === 'ADULT') return { bg: 'bg-slate-900', header: 'bg-slate-800 text-white shadow-md border-b-2 border-blue-500', text: 'text-white', card: 'bg-slate-800 border border-slate-700 p-6 rounded-xl text-white shadow-md' };
        if (selectedDepartment === 'ORGAN') return { bg: 'bg-stone-100', header: 'bg-stone-800 text-emerald-400 shadow-md', text: 'text-stone-800', card: 'bg-stone-50 border border-emerald-300 p-6 rounded-lg shadow-sm' };
        return { bg: 'bg-slate-50', header: 'bg-white text-slate-900 shadow-md border-b-4 border-blue-600', text: 'text-slate-900', card: 'bg-white border-l-4 border-blue-500 p-6 shadow-md' };
    };

    const currentTheme = getThemeStyles();

    const mockAuthenticate = (e) => {
        e.preventDefault();
        setLoginError('');
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUserSession({ name: 'Chief Administrator', role: 'SUPER_ADMINISTRATOR', allowedModules: ['DASHBOARD', 'BED_MANAGEMENT', 'FINANCE', 'CRM'] });
        } else if (email === 'doctor@wecure.hospital' && password === 'WecureDoc2026!') {
            setUserSession({ name: 'Dr. Anand Sharma', role: 'ATTENDING_PHYSICIAN', allowedModules: ['DASHBOARD', 'BED_MANAGEMENT'] });
        } else if (email === 'marketing@wecure.hospital' && password === 'WecureCrm2026!') {
            setUserSession({ name: 'Karan Singh', role: 'MARKETING_OFFICER', allowedModules: ['DASHBOARD', 'CRM'] });
        } else {
            setLoginError('Invalid qualifications mapped.');
        }
    };

    if (!userSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-blue-600">
                    <h2 className="text-center text-3xl font-black text-slate-900">Wecure Core</h2>
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Multi-Specialty ERP Gate</p>
                    {loginError && <div className="mb-4 bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold text-center">{loginError}</div>}
                    <form onSubmit={mockAuthenticate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Identity</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-xl outline-none" placeholder="admin@wecure.hospital" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2 border rounded-xl outline-none" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full py-3 font-bold text-sm bg-blue-600 text-white rounded-xl shadow-md">Authenticate</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-all duration-300 flex flex-col`}>
            <header className={`px-6 py-4 flex items-center justify-between ${currentTheme.header}`}>
                <div className="flex items-center gap-4">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded font-black text-sm">WECURE</div>
                    <div>
                        <h1 className="text-lg font-black tracking-tight">Hospital ERP</h1>
                        <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{userSession.name} ({userSession.role})</p>
                    </div>
                </div>
                <div className="flex bg-black bg-opacity-20 p-1.5 rounded-xl gap-1">
                    <button onClick={() => setSelectedDepartment('MAIN')} className="px-3 py-1 text-xs font-bold rounded-lg bg-white text-slate-900 shadow">Main</button>
                    <button onClick={() => setSelectedDepartment('KIDS')} className="px-3 py-1 text-xs font-bold rounded-lg bg-pink-500 text-white shadow">Kids</button>
                    <button onClick={() => setSelectedDepartment('ADULT')} className="px-3 py-1 text-xs font-bold rounded-lg bg-slate-700 text-white shadow">Adults</button>
                    <button onClick={() => setSelectedDepartment('ORGAN')} className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-600 text-white shadow">Organs</button>
                </div>
            </header>

            <div className="flex flex-1">
                <aside className="w-64 bg-white border-r border-slate-200 p-4 space-y-2 flex flex-col justify-between">
                    <div className="space-y-1">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">Modules</p>
                        {userSession.allowedModules.map((mod) => (
                            <button key={mod} onClick={() => setActiveModule(mod)} className={`w-full text-left px-3 py-2 text-xs font-bold rounded-xl ${activeModule === mod ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}>
                                {mod}
                            </button>
                        ))}
                    </div>
                    <button onClick={() => setUserSession(null)} className="w-full text-center py-2 text-xs font-bold rounded-xl text-rose-600 border">Logout</button>
                </aside>

                <main className="flex-1 p-6 space-y-6">
                    {activeModule === 'DASHBOARD' && (
                        <div className="space-y-6">
                            <h2 className={`text-2xl font-black ${currentTheme.text}`}>Overview Analytics</h2>
                            <div className="bg-gradient-to-r from-blue-700 to-purple-800 p-6 rounded-2xl shadow text-white relative">
                                <h4 className="text-base font-bold">🤖 AI Operational Clinical Agent</h4>
                                <p className="text-xs text-blue-100 mt-1">"System evaluation complete. 1 transfer pending validation. Ledgers match data constraints flawlessly."</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className={currentTheme.card}><h4>Beds Map</h4><p className="text-2xl font-black mt-2">{liveBeds.length} Monitored</p></div>
                                <div className={currentTheme.card}><h4>CRM Leads</h4><p className="text-2xl font-black mt-2">{crmLeads.length} Pipelines</p></div>
                                <div className={currentTheme.card}><h4>Audit Status</h4><p className="text-2xl font-black mt-2 text-emerald-600">✓ Balanced</p></div>
                            </div>
                        </div>
                    )}

                    {activeModule === 'BED_MANAGEMENT' && (
                        <div className="space-y-6">
                            <h2 className={`text-2xl font-black ${currentTheme.text}`}>Real-Time Beds Map</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {liveBeds.map(bed => (
                                    <div key={bed.id} className={`${currentTheme.card} flex flex-col justify-between h-28`}>
                                        <h3 className="font-black text-lg">{bed.number}</h3>
                                        <div className="flex justify-between text-xs font-bold">
                                            <span>{bed.ward}</span>
                                            <span className="text-blue-600">{bed.status}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeModule === 'FINANCE' && (
                        <div className="space-y-6">
                            <h2 className={`text-2xl font-black ${currentTheme.text}`}>Double-Entry General Ledger</h2>
