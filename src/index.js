import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
    // 1. COMPREHENSIVE APPLICATION STATE MATRIX
    const [userSession, setUserSession] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    
    // Core Domain Management States
    const [activeModule, setActiveModule] = useState('DASHBOARD');
    const [selectedDepartment, setSelectedDepartment] = useState('MAIN'); // MAIN, KIDS, ADULT, ORGAN
    const [liveBeds, setLiveBeds] = useState([
        { id: 1, number: 'PEDS-01', ward: 'Pediatric Ward', status: 'AVAILABLE', type: 'KIDS' },
        { id: 2, number: 'ICU-05', ward: 'Adult Intensive Care', status: 'OCCUPIED', type: 'ADULT' },
        { id: 3, number: 'TX-09', ward: 'Organ Transplant Wing', status: 'DIRTY', type: 'ORGAN' },
        { id: 4, number: 'PEDS-02', ward: 'Pediatric Ward', status: 'OCCUPIED', type: 'KIDS' },
        { id: 5, number: 'ICU-06', ward: 'Adult Intensive Care', status: 'AVAILABLE', type: 'ADULT' }
    ]);
    
    const [crmLeads, setCrmLeads] = useState([
        { id: 'l1', name: 'Aarav Mehta', channel: 'Facebook Lead', status: 'NEW', details: 'Inquiry for Pediatric Wellness Package' },
        { id: 'l2', name: 'Priya Sharma', channel: 'Web Form', status: 'CONTACTED', details: 'Cardiology Specialist Appointment Booking' }
    ]);

    const [generalLedger, setGeneralLedger] = useState([
        { code: '1010-CASH', name: 'Main Vault Account', type: 'ASSET', balance: 450000.00 },
        { code: '4010-OPD-REV', name: 'Outpatient Revenue Line', type: 'REVENUE', balance: 320000.00 },
        { code: '5010-SALARY-EXPENSE', name: 'Clinical Payroll Pools', type: 'EXPENSE', balance: 130000.00 }
    ]);

    // 2. DYNAMIC THEME ENGINE INJECTION
    const getThemeStyles = () => {
        switch(selectedDepartment) {
            case 'KIDS':
                return {
                    bg: 'bg-gradient-to-br from-pink-50 via-white to-blue-50',
                    header: 'bg-gradient-to-r from-pink-400 to-blue-400 text-white shadow-md',
                    accent: 'bg-pink-500 hover:bg-pink-600 text-white',
                    card: 'bg-white border-2 border-blue-100 shadow-sm rounded-2xl hover:border-pink-300 transition-all',
                    text: 'text-slate-700'
                };
            case 'ADULT':
                return {
                    bg: 'bg-slate-50',
                    header: 'bg-slate-900 text-white border-b-4 border-blue-600 shadow-lg',
                    accent: 'bg-blue-700 hover:bg-blue-800 text-white',
                    card: 'bg-white border border-slate-200 shadow-md rounded-xl hover:shadow-xl transition-all',
                    text: 'text-slate-900'
                };
            case 'ORGAN':
                return {
                    bg: 'bg-gradient-to-br from-stone-50 to-emerald-50',
                    header: 'bg-stone-800 text-stone-100 border-b border-emerald-500 shadow-sm',
                    accent: 'bg-emerald-600 hover:bg-emerald-700 text-white',
                    card: 'bg-stone-50 border border-emerald-100 shadow-sm rounded-lg hover:bg-white transition-all',
                    text: 'text-stone-800'
                };
            default: // MAIN BRANDING: White, Blue, Red, Yellow Accenting
                return {
                    bg: 'bg-slate-100',
                    header: 'bg-white border-b-4 border-blue-600 text-slate-900 shadow-sm',
                    accent: 'bg-rose-600 hover:bg-rose-700 text-white border-b-4 border-yellow-500',
                    card: 'bg-white border-l-4 border-blue-500 shadow-md rounded-none',
                    text: 'text-slate-900'
                };
        }
    };

    const currentTheme = getThemeStyles();

    // 3. SECURITY PRIVILEGE TUNNEL EVALUATION
    const mockAuthenticate = (e) => {
        e.preventDefault();
        setLoginError('');

        // Static profiles defining individual structural privilege matrices
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUserSession({
                name: 'Chief Systems Administrator',
                role: 'SUPER_ADMINISTRATOR',
                tenant: 'Corporate HQ Branch',
                allowedModules: ['DASHBOARD', 'BED_MANAGEMENT', 'FINANCE', 'CRM']
            });
        } else if (email === 'doctor@wecure.hospital' && password === 'WecureDoc2026!') {
            setUserSession({
                name: 'Dr. Anand Sharma (Pediatrics)',
                role: 'ATTENDING_PHYSICIAN',
                tenant: 'Corporate HQ Branch',
                allowedModules: ['DASHBOARD', 'BED_MANAGEMENT'] // Finance and CRM hidden automatically
            });
        } else if (email === 'marketing@wecure.hospital' && password === 'WecureCrm2026!') {
            setUserSession({
                name: 'Karan Singh (Patient Relations)',
                role: 'MARKETING_OFFICER',
                tenant: 'Corporate HQ Branch',
                allowedModules: ['DASHBOARD', 'CRM']
            });
        } else {
            setLoginError('Invalid matrix authentication profile tokens matched.');
        }
    };

    // 4. ACTION CONTROLLERS
    const toggleBedState = (id) => {
        setLiveBeds(prev => prev.map(bed => {
            if (bed.id === id) {
                const nextStatus = bed.status === 'AVAILABLE' ? 'OCCUPIED' : bed.status === 'OCCUPIED' ? 'DIRTY' : 'AVAILABLE';
                return { ...bed, status: nextStatus };
            }
            return bed;
        }));
    };

    // LOGIN MASK VIEW LAYOUT
    if (!userSession) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-900 via-blue-950 to-slate-900 px-4">
                <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl border-t-8 border-blue-600">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-600 flex items-center justify-center rounded-2xl shadow-lg border-b-4 border-yellow-400">
                            <span className="text-white text-2xl font-black">W</span>
                        </div>
                    </div>
                    <h2 className="text-center text-3xl font-black text-slate-900">Wecure Core</h2>
                    <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Multi-Specialty ERP Gate</p>
                    
                    {loginError && <div className="mb-4 bg-rose-50 text-rose-600 p-3 rounded-xl text-xs font-bold border border-rose-200 text-center">{loginError}</div>}
                    
                    <form onSubmit={mockAuthenticate} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Session Profile Identity</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border rounded-xl shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="admin@wecure.hospital" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Secret Security Password</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full px-4 py-2.5 border rounded-xl shadow-sm border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="••••••••" />
                        </div>
                        <button type="submit" className="w-full py-3 px-4 border border-transparent font-bold text-sm tracking-wide rounded-xl text-white bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-xl transition-all">Authenticate Secure Identity</button>
                    </form>
                    <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enterprise Role Architecture Active</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${currentTheme.bg} transition-all duration-300 flex flex-col`}>
            {/* COMPLIANT SYSTEM HEADER */}
            <header className={`px-6 py-4 flex items-center justify-between ${currentTheme.header} transition-all duration-300`}>
                <div className="flex items-center gap-4">
                    <div className="bg-white p-2 rounded-xl text-slate-900 font-black text-sm tracking-tighter">WECURE</div>
                    <div>
                        <h1 className="text-xl font-black tracking-tight">Multi-Specialty Workspace</h1>
                        <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest">{userSession.name} ({userSession.role})</p>
                    </div>
                </div>
                
                {/* Department Selection Palette Controls */}
                <div className="flex bg-black bg-opacity-20 p-1.5 rounded-xl gap-1">
                    <button onClick={() => setSelectedDepartment('MAIN')} className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${selectedDepartment === 'MAIN' ? 'bg-white text-slate-900 shadow' : 'text-white opacity-70 hover:opacity-100'}`}>Main Portal</button>
