import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('admin@wecure.hospital');
    const [password, setPassword] = useState('WecureAdmin2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [dept, setDept] = useState('MAIN');

    // Modals & Forms State
    const [showAdmissionModal, setShowAdmissionModal] = useState(false);
    const [admPatient, setAdmPatient] = useState('Rajesh Kumar (WEC-2026-001)');
    const [admBed, setAdmBed] = useState('GEN-12');
    const [admDeposit, setAdmDeposit] = useState('25000');

    const [beds, setBeds] = useState([
        { id: 1, bed_code: 'PEDS-01', ward_name: 'Pediatric Neonatal ICU', department: 'KIDS', status: 'AVAILABLE', patient_name: null },
        { id: 2, bed_code: 'PEDS-02', ward_name: 'Pediatric General Ward', department: 'KIDS', status: 'OCCUPIED', patient_name: 'Baby Ananya (4y)' },
        { id: 3, bed_code: 'ICU-05', ward_name: 'Adult Critical Care Bay 1', department: 'ADULT', status: 'OCCUPIED', patient_name: 'Rajesh K. (58y)' },
        { id: 4, bed_code: 'ICU-06', ward_name: 'Adult High Dependency Unit', department: 'ADULT', status: 'CLEANING', patient_name: null },
        { id: 5, bed_code: 'TX-09', ward_name: 'Renal Transplant Sterile Wing', department: 'ORGAN', status: 'DIRTY', patient_name: null },
        { id: 6, bed_code: 'GEN-12', ward_name: 'General Medicine Ward B', department: 'MAIN', status: 'AVAILABLE', patient_name: null }
    ]);

    const [labOrders] = useState([
        {
            id: 'ORD-101',
            uhid: 'WEC-2026-001',
            patient: 'Rajesh Kumar',
            test: 'Complete Blood Count (CBC) with Diff',
            priority: 'STAT',
            status: 'COMPLETED',
            results: [
                { param: 'Hemoglobin', val: '13.8 g/dL', normal: '13.0 - 17.0', alert: false },
                { param: 'White Blood Cell (WBC)', val: '14,200 /uL', normal: '4,500 - 11,000', alert: true },
                { param: 'Platelets', val: '240,000 /uL', normal: '150,000 - 450,000', alert: false }
            ]
        },
        {
            id: 'ORD-102',
            uhid: 'WEC-2026-002',
            patient: 'Baby Ananya',
            test: 'Comprehensive Metabolic & Electrolyte Panel',
            priority: 'URGENT',
            status: 'PROCESSING',
            results: []
        }
    ]);

    const [ledgers, setLedgers] = useState([
        { code: '1010-CASH', name: 'Main Cash Operations Registry', dr: '₹4,75,000.00', cr: '₹0.00' },
        { code: '1020-BANK', name: 'HDFC Escrow Current Account', dr: '₹12,40,000.00', cr: '₹0.00' },
        { code: '2010-DEPOSITS', name: 'Patient Admission Advance Escrow', dr: '₹0.00', cr: '₹25,000.00' },
        { code: '4010-OPD-REV', name: 'Outpatient Consultation Revenues', dr: '₹0.00', cr: '₹16,90,000.00' }
    ]);

    const getTheme = () => {
        switch (dept) {
            case 'KIDS':
                return {
                    bg: 'bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100',
                    header: 'bg-rose-500 text-white shadow-lg border-b border-rose-300',
                    card: 'bg-white/90 backdrop-blur-md border border-pink-200 shadow-sm rounded-2xl p-5',
                    btnActive: 'bg-rose-600 text-white shadow'
                };
            case 'ADULT':
                return {
                    bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-slate-100',
                    header: 'bg-slate-900/90 text-white border-b border-blue-500/30 backdrop-blur-md',
                    card: 'bg-slate-900/80 backdrop-blur-md border border-slate-700/60 shadow-lg rounded-2xl p-5 text-slate-100',
                    btnActive: 'bg-blue-600 text-white shadow-lg shadow-blue-500/20'
                };
            case 'ORGAN':
                return {
                    bg: 'bg-gradient-to-br from-stone-100 via-emerald-50 to-stone-200',
                    header: 'bg-stone-900 text-emerald-400 border-b border-emerald-500 shadow-md',
                    card: 'bg-white/95 backdrop-blur-md border border-emerald-200 shadow-sm rounded-2xl p-5',
                    btnActive: 'bg-emerald-700 text-white shadow'
                };
            default:
                return {
                    bg: 'bg-slate-50 text-slate-900',
                    header: 'bg-white text-slate-900 border-b border-slate-200 shadow-sm',
                    card: 'bg-white border border-slate-200 shadow-sm rounded-2xl p-5',
                    btnActive: 'bg-blue-600 text-white shadow-md'
                };
        }
    };
    const currentTheme = getTheme();

    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUser({ name: 'Dr. Sarah Jenkins', role: 'SUPER_ADMINISTRATOR', mods: ['DASHBOARD', 'BED_MANAGEMENT', 'ADMISSIONS_ADT', 'LABS', 'FINANCE', 'CRM'] });
        } else {
            setErr('Invalid credentials. Use admin@wecure.hospital / WecureAdmin2026!');
        }
    };

    const toggleBed = (id) => {
        const cycle = ['AVAILABLE', 'OCCUPIED', 'CLEANING', 'DIRTY'];
        setBeds(beds.map(b => b.id === id ? { ...b, status: cycle[(cycle.indexOf(b.status) + 1) % cycle.length] } : b));
    };

    const handleCreateAdmission = (e) => {
        e.preventDefault();
        setBeds(beds.map(b => b.bed_code === admBed ? { ...b, status: 'OCCUPIED', patient_name: admPatient } : b));
        setLedgers([
            ...ledgers.map(l => l.code === '1010-CASH' ? { ...l, dr: `₹${(475000 + parseFloat(admDeposit)).toLocaleString('en-IN')}.00` } : l)
        ]);
        setShowAdmissionModal(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-slate-950 to-slate-950"></div>
                <div className="relative w-full max-w-md bg-white/95 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-xl mb-3 shadow-lg shadow-blue-500/30">W</div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Wecure Health Core</h2>
                        <p className="text-xs text-slate-500 mt-1 font-medium">Enterprise Multi-Specialty Clinical ERP</p>
                    </div>
                    {err && <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl text-center">{err}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Staff Workstation ID</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Encrypted Passphrase</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition">
                            Authenticate Clinical Session
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    const filteredBeds = dept === 'MAIN' ? beds : beds.filter(b => b.department === dept);

    return (
        <div className={`min-h-screen ${currentTheme.bg} flex flex-col font-sans`}>
            {/* COMMAND BAR */}
            <header className={`px-6 py-3.5 flex items-center justify-between ${currentTheme.header} sticky top-0 z-40`}>
                <div className="flex items-center space-x-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-black text-sm">W</span>
                    <div>
                        <h1 className="text-sm font-black tracking-wide">WECURE ENTERPRISE</h1>
                        <p className="text-[10px] opacity-75 font-semibold">{user.name} • {user.role.replace(/_/g, ' ')}</p>
                    </div>
                </div>

                <div className="flex items-center bg-black/10 backdrop-blur-md p-1 rounded-xl space-x-1">
                    {['MAIN', 'KIDS', 'ADULT', 'ORGAN'].map(d => (
                        <button key={d} onClick={() => setDept(d)} className={`px-3 py-1 text-xs font-bold rounded-lg transition ${dept === d ? currentTheme.btnActive : 'opacity-70 hover:opacity-100'}`}>
                            {d}
                        </button>
                    ))}
                </div>
            </header>

            <div className="flex flex-1">
                {/* SIDEBAR NAVIGATION */}
                <aside className="w-64 border-r border-slate-200/40 p-4 space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-3 mb-2">Hospital Modules</div>
                    {user.mods.map(m => (
                        <button key={m} onClick={() => setActiveTab(m)} className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between ${activeTab === m ? 'bg-blue-600 text-white shadow-md' : 'opacity-75 hover:opacity-100'}`}>
                            <span>{m.replace(/_/g, ' ')}</span>
                            {activeTab === m && <span className="w-1.5 h-1.5 rounded-full bg-white"></span>}
                        </button>
                    ))}
                    <button onClick={() => setUser(null)} className="w-full text-left px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 mt-6 rounded-xl border border-rose-200">
                        Logout Session
                    </button>
                </aside>

                {/* WORKSPACE */}
                <main className="flex-1 p-8 space-y-6 overflow-y-auto">
                    {/* ADMISSIONS & PATIENT ADT */}
                    {activeTab === 'ADMISSIONS_ADT' && (
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-black">Admission, Discharge & Transfer (ADT)</h2>
                                    <p className="text-xs opacity-75">Assign beds and automatically trigger escrow deposit ledger entries.</p>
                                </div>
                                <button onClick={() => setShowAdmissionModal(true)} className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl shadow">
                                    + New Patient Admission
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className={currentTheme.card}>
                                    <h4 className="font-bold text-sm">Active Inpatients</h4>
                                    <div className="mt-3 space-y-2">
                                        {beds.filter(b => b.status === 'OCCUPIED').map(b => (
                                            <div key={b.id} className="p-3 bg-black/5 rounded-xl flex justify-between items-center text-xs">
                                                <div>
                                                    <p className="font-black">{b.patient_name}</p>
                                                    <p className="opacity-75">{b.bed_code} - {b.ward_name}</p>
                                                </div>
                                                <span className="px-2 py-1 rounded bg-rose-100 text-rose-700 font-bold">ADMITTED</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* LAB ORDERS & OBSERVATIONS */}
                    {activeTab === 'LABS' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black">Laboratory Information System (LIS)</h2>
                            <div className="space-y-4">
                                {labOrders.map(o => (
                                    <div key={o.id} className={currentTheme.card}>
                                        <div className="flex justify-between items-start border-b border-slate-200/30 pb-3">
                                            <div>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-black text-sm">{o.test}</span>
                                                    <span className={`px-2 py-0.5 text-[10px] font-black rounded ${o.priority === 'STAT' ? 'bg-rose-500 text-white' : 'bg-amber-100 text-amber-800'}`}>{o.priority}</span>
                                                </div>
                                                <p className="text-xs opacity-75 mt-0.5">{o.patient} ({o.uhid})</p>
                                            </div>
                                            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-lg">{o.status}</span>
                                        </div>
                                        {o.results.length > 0 ? (
                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                                                {o.results.map((r, idx) => (
                                                    <div key={idx} className={`p-3 rounded-xl border ${r.alert ? 'bg-rose-50/50 border-rose-300' : 'bg-black/5 border-transparent'}`}>
                                                        <div className="text-[11px] opacity-75 font-semibold">{r.param}</div>
                                                        <div className={`text-base font-black mt-0.5 ${r.alert ? 'text-rose-600' : ''}`}>{r.val}</div>
                                                        <div className="text-[10px] opacity-50">Ref: {r.normal}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs opacity-50 italic mt-3">Samples in processing inside central automated analyzer...</p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* BED TELEMETRY ARRAY */}
                    {activeTab === 'BED_MANAGEMENT' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black">Bed Telemetry Infrastructure</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {filteredBeds.map(b => (
                                    <div key={b.id} onClick={() => toggleBed(b.id)} className={`${currentTheme.card} cursor-pointer hover:scale-[1.02] transition h-36 flex flex-col justify-between`}>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <span className="text-base font-black">{b.bed_code}</span>
                                                <p className="text-xs opacity-75">{b.ward_name}</p>
                                            </div>
                                            <span className="px-2 py-0.5 text-[10px] font-black rounded border">{b.status}</span>
                                        </div>
                                        <div className="text-xs font-semibold flex justify-between">
                                            <span>{b.patient_name || 'No Patient'}</span>
                                            <span className="text-blue-500 font-bold">Cycle →</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GENERAL LEDGERS */}
                    {activeTab === 'FINANCE' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-black">Double-Entry General Ledgers</h2>
                            <div className={`${currentTheme.card} divide-y divide-slate-200/30 p-0 overflow-hidden`}>
                                <div className="p-4 bg-black/5 flex justify-between text-xs font-black uppercase">
                                    <span>Account Code & Name</span>
                                    <div className="space-x-12"><span>Debit (DR)</span><span>Credit (CR)</span></div>
                                </div>
                                {ledgers.map(l => (
                                    <div key={l.code} className="p-4 flex justify-between text-xs font-bold">
                                        <span>{l.code} - {l.name}</span>
                                        <div className="space-x-12">
                                            <span className="text-emerald-500 font-black">{l.dr}</span>
                                            <span className="text-blue-500 font-black">{l.cr}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* OVERVIEW DASHBOARD */}
                    {activeTab === 'DASHBOARD' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div className={currentTheme.card}><p className="text-xs opacity-75 font-bold uppercase">Total Beds</p><h3 className="text-2xl font-black mt-1">{beds.length}</h3></div>
                                <div className={currentTheme.card}><p className="text-xs opacity-75 font-bold uppercase">Inpatients</p><h3 className="text-2xl font-black mt-1 text-rose-500">{beds.filter(b => b.status === 'OCCUPIED').length}</h3></div>
                                <div className={currentTheme.card}><p className="text-xs opacity-75 font-bold uppercase">Lab Orders Active</p><h3 className="text-2xl font-black mt-1 text-blue-500">{labOrders.length}</h3></div>
                                <div className={currentTheme.card}><p className="text-xs opacity-75 font-bold uppercase">Cash Escrow</p><h3 className="text-2xl font-black mt-1 text-emerald-500">₹4.75L</h3></div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

            {/* ADMISSION MODAL */}
            {showAdmissionModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleCreateAdmission} className="bg-white rounded-3xl p-6 max-w-md w-full text-slate-900 space-y-4 shadow-2xl">
                        <h3 className="text-lg font-black">Patient Inpatient Admission</h3>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Select Patient</label>
                            <input type="text" value={admPatient} onChange={e => setAdmPatient(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Assign Bed</label>
                            <select value={admBed} onChange={e => setAdmBed(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                {beds.filter(b => b.status === 'AVAILABLE').map(b => (
                                    <option key={b.bed_code} value={b.bed_code}>{b.bed_code} ({b.ward_name})</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Admission Deposit (INR)</label>
                            <input type="number" value={admDeposit} onChange={e => setAdmDeposit(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowAdmissionModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold shadow">Admit Patient</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
