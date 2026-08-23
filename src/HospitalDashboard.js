import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('admin@wecure.hospital');
    const [password, setPassword] = useState('WecureAdmin2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [activeCoE, setActiveCoE] = useState('ALL');

    // Modals
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [payerType, setPayerType] = useState('CASHLESS_TPA');

    // Emergency Form
    const [emPatient, setEmPatient] = useState('');
    const [emCode, setEmCode] = useState('CODE_RED');
    const [emBP, setEmBP] = useState('85/55 mmHg');
    const [emSpo2, setEmSpo2] = useState('88%');

    // CoE Definitions
    const coeList = [
        { id: 'CARDIAC', name: 'Heart & Vascular Institute', icon: '❤️', color: 'from-rose-600 to-red-800', desc: 'Cath Labs, TAVI, Minimally Invasive Bypass & Pediatric Cardiology', doctors: 8, beds: 32 },
        { id: 'ONCOLOGY', name: 'Comprehensive Cancer Centre', icon: '🎗️', color: 'from-purple-600 to-indigo-900', desc: 'Robotic Surgical Oncology, TrueBeam Linac Radiotherapy & Bone Marrow Unit', doctors: 12, beds: 45 },
        { id: 'NEURO', name: 'Institute of Neurosciences', icon: '🧠', color: 'from-blue-600 to-sky-900', desc: 'Comprehensive Stroke Centre, Deep Brain Stimulation & Neuro-Critical Care', doctors: 6, beds: 24 },
        { id: 'TRANSPLANT', name: 'Organ Transplant Institute', icon: '🫁', color: 'from-emerald-600 to-teal-900', desc: 'Living Donor Liver, Renal & Heart Transplants in Sterile Positive-Pressure Suites', doctors: 9, beds: 18 },
        { id: 'ORTHO', name: 'Robotic Joint & Orthopaedics', icon: '🦴', color: 'from-amber-600 to-stone-800', desc: 'Mako Robotic Knee/Hip Arthroplasty, Arthroscopy & Polytrauma Care', doctors: 7, beds: 28 },
        { id: 'KIDS', name: 'Mother & Child Care Centre', icon: '👶', color: 'from-pink-500 to-rose-700', desc: 'Level 3 NICU, Pediatric Emergency & Fetal Medicine Unit', doctors: 5, beds: 20 }
    ];

    // Doctor Roster
    const [doctors] = useState([
        { id: 'd1', name: 'Dr. Ashish Patel', dept: 'CARDIAC', coe: 'Heart & Vascular', title: 'Principal Director - Interventional Cardiology', exp: '22 Yrs Exp', opd: '09:00 AM - 01:00 PM', fee: '₹2,000', rating: '4.98' },
        { id: 'd2', name: 'Dr. Meera Nambiar', dept: 'ONCOLOGY', coe: 'Cancer Centre', title: 'Director - Surgical Oncology & Robotic Surgery', exp: '19 Yrs Exp', opd: '11:00 AM - 04:00 PM', fee: '₹2,200', rating: '4.95' },
        { id: 'd3', name: 'Dr. K. Srinivas', dept: 'NEURO', coe: 'Neurosciences', title: 'Senior Consultant - Brain & Spine Surgery', exp: '16 Yrs Exp', opd: '10:00 AM - 02:00 PM', fee: '₹1,800', rating: '4.92' },
        { id: 'd4', name: 'Dr. Vikramaditya Roy', dept: 'TRANSPLANT', coe: 'Organ Transplant', title: 'Chief Transplant Surgeon - Liver & HPB', exp: '24 Yrs Exp', opd: '02:00 PM - 06:00 PM', fee: '₹2,500', rating: '4.99' },
        { id: 'd5', name: 'Dr. Sunita Bansal', dept: 'ORTHO', coe: 'Robotic Joint', title: 'Director - Robotic Joint Replacement', exp: '18 Yrs Exp', opd: '09:30 AM - 03:30 PM', fee: '₹1,700', rating: '4.90' },
        { id: 'd6', name: 'Dr. Rohit Agnihotri', dept: 'KIDS', coe: 'Mother & Child', title: 'Head - Pediatric Critical Care & Neonatology', exp: '15 Yrs Exp', opd: '08:30 AM - 12:30 PM', fee: '₹1,500', rating: '4.94' }
    ]);

    // Emergency Cases
    const [emergencyList, setEmergencyList] = useState([
        { id: 'ER-901', patient: 'Kishore Varma (62y)', code: 'CODE_RED', reason: 'Acute Anteroseptal STEMI (Cardiac Arrest Resuscitation)', bp: '82/50', spo2: '86%', bay: 'Resus Bay 1', doctor: 'Dr. Ashish Patel', status: 'CRITICAL_STABILIZATION' },
        { id: 'ER-902', patient: 'Deepa Sen (44y)', code: 'CODE_STROKE', reason: 'Right Middle Cerebral Artery Occlusion (Window 2.5h)', bp: '160/100', spo2: '97%', bay: 'Neuro Trauma 2', doctor: 'Dr. K. Srinivas', status: 'IV_THROMBOLYSIS' }
    ]);

    // Beds Telemetry
    const [beds, setBeds] = useState([
        { id: 1, code: 'CCU-01', ward: 'Cardiac Intensive Care', dept: 'CARDIAC', status: 'OCCUPIED', patient: 'Kishore Varma' },
        { id: 2, code: 'CCU-02', ward: 'Cardiac Intensive Care', dept: 'CARDIAC', status: 'AVAILABLE', patient: null },
        { id: 3, code: 'ONCO-04', ward: 'Bone Marrow Sterile Unit', dept: 'ONCOLOGY', status: 'OCCUPIED', patient: 'Sunil Gavaskar' },
        { id: 4, code: 'TX-BAY-1', ward: 'Liver Transplant Recovery', dept: 'TRANSPLANT', status: 'OCCUPIED', patient: 'Ramesh Sen' },
        { id: 5, code: 'NICU-03', ward: 'Neonatal Critical Care', dept: 'KIDS', status: 'AVAILABLE', patient: null },
        { id: 6, code: 'DLX-401', ward: 'Presidential Super Deluxe', dept: 'CARDIAC', status: 'AVAILABLE', patient: null }
    ]);

    // Financial Ledgers
    const [ledgers, setLedgers] = useState([
        { code: '1010-CASH', name: 'OPD & Cash Counter Registry', dr: '₹6,85,000.00', cr: '₹0.00' },
        { code: '1020-BANK', name: 'Escrow Operating Account', dr: '₹48,20,000.00', cr: '₹0.00' },
        { code: '1030-TPA-RECV', name: 'Insurance & Cashless TPA Receivables (Star / HDFC Ergo)', dr: '₹34,50,000.00', cr: '₹0.00' },
        { code: '2010-ADVANCE', name: 'Inpatient Surgeries Pre-Auth Escrow', dr: '₹0.00', cr: '₹22,00,000.00' },
        { code: '4010-SURG-REV', name: 'Robotic & Cath Lab Procedure Revenues', dr: '₹0.00', cr: '₹67,55,000.00' }
    ]);

    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUser({ name: 'Dr. Sarah Jenkins', role: 'CHIEF_MEDICAL_OFFICER', mods: ['DASHBOARD', 'CENTRES_OF_EXCELLENCE', 'DOCTORS_ROSTER', 'EMERGENCY_24X7', 'BED_TELEMETRY', 'FINANCE_TPA'] });
        } else {
            setErr('Invalid healthcare credentials. Use admin@wecure.hospital / WecureAdmin2026!');
        }
    };

    const bookAppointment = (e) => {
        e.preventDefault();
        alert(`Confirmed OPD Token for ${patientName} with ${selectedDoc.name}! Payer: ${payerType}. Total Fee: ${selectedDoc.fee}`);
        setShowBookingModal(false);
        setPatientName('');
    };

    const triggerEmergency = (e) => {
        e.preventDefault();
        const newCase = {
            id: `ER-${Math.floor(100 + Math.random() * 900)}`,
            patient: emPatient || 'Unidentified Emergency Patient',
            code: emCode,
            reason: emCode === 'CODE_RED' ? 'Cardiac Arrest / Major Polytrauma' : 'Acute Neuro Vascular Event',
            bp: emBP,
            spo2: emSpo2,
            bay: 'Resus Bay Alpha',
            doctor: 'On-Duty Chief Trauma Resuscitator',
            status: 'TRIAGE_ACTIVATED'
        };
        setEmergencyList([newCase, ...emergencyList]);
        setShowEmergencyModal(false);
        setEmPatient('');
    };

    const toggleBed = (id) => {
        const cycle = ['AVAILABLE', 'OCCUPIED', 'CLEANING', 'DIRTY'];
        setBeds(beds.map(b => b.id === id ? { ...b, status: cycle[(cycle.indexOf(b.status) + 1) % cycle.length] } : b));
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#031B4E] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-500/20 via-[#031B4E] to-[#010D27]"></div>
                
                <div className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 text-white font-black text-2xl mb-3 shadow-xl shadow-teal-500/30">
                            W
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Wecure Super Speciality</h2>
                        <p className="text-xs text-teal-700 font-bold uppercase tracking-widest mt-1">Quaternary Care Clinical ERP</p>
                    </div>

                    {err && <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl text-center">{err}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1">Workstation Credential</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1">Encrypted Passphrase</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-teal-500 focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-teal-600/30 transition transform active:scale-98">
                            Authenticate Clinical Session
                        </button>
                    </form>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                        <span>NABH & JCI Accredited</span>
                        <span>ABDM Compliant</span>
                    </div>
                </div>
            </div>
        );
    }

    const filteredDocs = activeCoE === 'ALL' ? doctors : doctors.filter(d => d.dept === activeCoE);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            {/* 1. TOP UTILITY STRIP (NANAVATI STYLE) */}
            <div className="bg-[#031B4E] text-white px-8 py-2 text-xs flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-6 text-[11px]">
                    <span className="flex items-center font-bold text-rose-400">
                        <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping mr-2"></span>
                        24x7 Emergency Trauma Helpline: 1800-200-WECURE
                    </span>
                    <span className="hidden md:inline text-slate-300">NABH & JCI Accredited Quaternary Care Hub</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={() => setShowEmergencyModal(true)} className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-lg text-[10px] uppercase tracking-wider shadow">
                        🚨 Trigger Code Red / Stroke
                    </button>
                    <span className="text-slate-300">|</span>
                    <span className="font-bold text-teal-400">{user.name} ({user.role.replace(/_/g, ' ')})</span>
                </div>
            </div>

            {/* 2. MAIN BRAND HEADER & ACTION BAR */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-600 text-white font-black text-xl flex items-center justify-center shadow-md shadow-teal-500/30">
                        W
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-[#031B4E] tracking-tight leading-tight">WECURE SUPER SPECIALITY</h1>
                        <p className="text-[10px] text-teal-700 font-bold uppercase tracking-wider">Institutes of Quaternary Medicine & Research</p>
                    </div>
                </div>

                {/* QUICK JUMP MODES */}
                <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl space-x-1 border border-slate-200">
                    {[
                        { id: 'DASHBOARD', label: 'Command Centre', icon: '⚡' },
                        { id: 'CENTRES_OF_EXCELLENCE', label: 'Centres of Excellence', icon: '🏛️' },
                        { id: 'DOCTORS_ROSTER', label: 'Doctor Directory & OPD', icon: '👨‍⚕️' },
                        { id: 'EMERGENCY_24X7', label: 'Emergency 24x7', icon: '🚨' },
                        { id: 'BED_TELEMETRY', label: 'Live Bed Map', icon: '🛏️' },
                        { id: 'FINANCE_TPA', label: 'TPA & Billing', icon: '💳' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 ${activeTab === tab.id ? 'bg-[#031B4E] text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <button onClick={() => setUser(null)} className="px-3 py-1.5 border border-rose-200 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition">
                    Sign Out
                </button>
            </header>

            {/* 3. HERO ANNOUNCEMENT BANNER */}
            <div className="bg-gradient-to-r from-[#031B4E] via-[#052C7D] to-teal-900 text-white px-8 py-6 shadow-inner relative overflow-hidden">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                    <div>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-teal-500/20 text-teal-300 uppercase tracking-widest border border-teal-400/30">
                            Centre of Clinical Excellence
                        </span>
                        <h2 className="text-xl md:text-2xl font-black mt-2 tracking-tight">World-Class Quaternary Care, Robotic Surgeries & Transplants</h2>
                        <p className="text-xs text-slate-200 mt-1 max-w-2xl">
                            Integrated with Mako Robotic Knee Surgery, TrueBeam Linac Radiation, 3T Digital MRI, and Multi-Organ Living Donor Transplant Suites.
                        </p>
                    </div>
                    <div className="mt-4 md:mt-0 flex space-x-3">
                        <button onClick={() => { setActiveTab('DOCTORS_ROSTER'); setSelectedDoc(doctors[0]); setShowBookingModal(true); }} className="px-4 py-2.5 bg-teal-500 hover:bg-teal-400 text-[#031B4E] font-black text-xs rounded-xl shadow-lg transition">
                            📅 Instant OPD Token
                        </button>
                        <button onClick={() => setActiveTab('EMERGENCY_24X7')} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-lg transition">
                            🚨 Emergency Status
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. WORKSPACE CONTENT AREA */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">

                {/* VIEW: DASHBOARD OVERVIEW */}
                {activeTab === 'DASHBOARD' && (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Super Speciality CoEs</p>
                                <h3 className="text-2xl font-black text-[#031B4E] mt-1">{coeList.length} Institutes</h3>
                                <p className="text-[11px] text-teal-600 font-bold mt-2">All Cath Labs & OTs Active</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Inpatient Occupancy</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">
                                    {Math.round((beds.filter(b => b.status === 'OCCUPIED').length / beds.length) * 100)}%
                                </h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">{beds.filter(b => b.status === 'AVAILABLE').length} ICU/Deluxe Beds Open</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Active Emergency Cases</p>
                                <h3 className="text-2xl font-black text-rose-600 mt-1">{emergencyList.length} Code Red / Stroke</h3>
                                <p className="text-[11px] text-rose-500 font-bold mt-2">Trauma Resuscitation Bays Open</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">TPA & Surgery Billing</p>
                                <h3 className="text-2xl font-black text-emerald-600 mt-1">₹67.55 Lakhs</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-2">Cashless Approvals Real-Time</p>
                            </div>
                        </div>

                        {/* CENTRES OF EXCELLENCE PREVIEW */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-black text-[#031B4E]">Centres of Excellence (CoEs)</h3>
                                <button onClick={() => setActiveTab('CENTRES_OF_EXCELLENCE')} className="text-xs font-bold text-teal-700 hover:underline">View All Institutes →</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                                {coeList.slice(0, 3).map(coe => (
                                    <div key={coe.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
                                        <div className="text-3xl mb-2">{coe.icon}</div>
                                        <h4 className="font-black text-[#031B4E] text-base">{coe.name}</h4>
                                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">{coe.desc}</p>
                                        <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-600">
                                            <span>{coe.doctors} Specialists</span>
                                            <span className="text-teal-600">{coe.beds} Dedicated Beds</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: CENTRES OF EXCELLENCE */}
                {activeTab === 'CENTRES_OF_EXCELLENCE' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-[#031B4E]">Super Speciality Institutes & CoEs</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Specialized surgical departments equipped with robotic and organ transplant infrastructures.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coeList.map(coe => (
                                <div key={coe.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                    <div className={`p-6 bg-gradient-to-r ${coe.color} text-white`}>
                                        <div className="text-3xl">{coe.icon}</div>
                                        <h3 className="text-lg font-black mt-2">{coe.name}</h3>
                                        <p className="text-xs text-white/80 mt-1 leading-relaxed">{coe.desc}</p>
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between text-xs font-bold text-slate-600">
                                            <span>Senior Faculty:</span>
                                            <span className="text-[#031B4E]">{coe.doctors} Surgeons / Physicians</span>
                                        </div>
                                        <div className="flex justify-between text-xs font-bold text-slate-600">
                                            <span>Dedicated Infrastructure:</span>
                                            <span className="text-teal-600">{coe.beds} Speciality Beds / CCU</span>
                                        </div>
                                        <button
                                            onClick={() => { setActiveCoE(coe.id); setActiveTab('DOCTORS_ROSTER'); }}
                                            className="w-full py-2.5 bg-slate-100 hover:bg-[#031B4E] hover:text-white text-[#031B4E] text-xs font-bold rounded-xl transition"
                                        >
                                            Consult Institute Physicians →
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: DOCTOR DIRECTORY & OPD TOKENS */}
                {activeTab === 'DOCTORS_ROSTER' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-[#031B4E]">Doctor Directory & OPD Consultation Scheduling</h2>
                                <p className="text-xs text-slate-500">Book OPD consultation tokens and verify clinician schedules.</p>
                            </div>

                            {/* FILTER PILLS */}
                            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
                                <button onClick={() => setActiveCoE('ALL')} className={`px-3 py-1 text-xs font-bold rounded-xl ${activeCoE === 'ALL' ? 'bg-[#031B4E] text-white' : 'text-slate-600'}`}>All Institutes</button>
                                {coeList.map(c => (
                                    <button key={c.id} onClick={() => setActiveCoE(c.id)} className={`px-3 py-1 text-xs font-bold rounded-xl ${activeCoE === c.id ? 'bg-[#031B4E] text-white' : 'text-slate-600'}`}>
                                        {c.name.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDocs.map(doc => (
                                <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <span className="px-2.5 py-1 bg-teal-50 text-teal-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{doc.coe}</span>
                                            <span className="text-xs font-black text-amber-500">⭐ {doc.rating}</span>
                                        </div>
                                        <h3 className="text-base font-black text-[#031B4E] mt-3">{doc.name}</h3>
                                        <p className="text-xs text-slate-600 font-medium mt-0.5">{doc.title}</p>
                                        <div className="mt-4 space-y-1.5 text-xs text-slate-500">
                                            <p><strong>Experience:</strong> {doc.exp}</p>
                                            <p><strong>OPD Timings:</strong> {doc.opd}</p>
                                            <p><strong>Consultation Fee:</strong> <span className="font-bold text-slate-900">{doc.fee}</span></p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => { setSelectedDoc(doc); setShowBookingModal(true); }}
                                        className="mt-6 w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs rounded-xl shadow-md transition"
                                    >
                                        Book Consultation Token
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: EMERGENCY & CODE RED */}
                {activeTab === 'EMERGENCY_24X7' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-rose-600 flex items-center">
                                    <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping mr-2"></span>
                                    24x7 Emergency Trauma & Resuscitation Fast-Track
                                </h2>
                                <p className="text-xs text-slate-500">Immediate Code Red & Code Stroke triage with real-time vitals streams.</p>
                            </div>
                            <button onClick={() => setShowEmergencyModal(true)} className="px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-lg">
                                + Log Inbound Code Red
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {emergencyList.map(em => (
                                <div key={em.id} className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-lg">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="px-2.5 py-1 bg-rose-600 text-white text-[10px] font-black rounded-lg uppercase tracking-wider">{em.code}</span>
                                            <h3 className="text-base font-black text-[#031B4E] mt-2">{em.patient}</h3>
                                            <p className="text-xs text-rose-600 font-bold mt-0.5">{em.reason}</p>
                                        </div>
                                        <span className="text-xs font-black text-slate-400">{em.bay}</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-center">
                                        <div><p className="text-[10px] text-slate-400 uppercase font-black">Blood Pressure</p><p className="font-black text-slate-900 text-sm mt-0.5">{em.bp}</p></div>
                                        <div><p className="text-[10px] text-slate-400 uppercase font-black">SpO2 Oxygen</p><p className="font-black text-rose-600 text-sm mt-0.5">{em.spo2}</p></div>
                                        <div><p className="text-[10px] text-slate-400 uppercase font-black">Triage State</p><p className="font-bold text-amber-600 text-[11px] mt-0.5">{em.status}</p></div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs font-bold text-slate-600">
                                        <span>Attending Surgeon: {em.doctor}</span>
                                        <span className="text-teal-600 font-bold">Cath Lab Ready</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: LIVE BED TELEMETRY */}
                {activeTab === 'BED_TELEMETRY' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-[#031B4E]">Quaternary Bed Telemetry Infrastructure</h2>
                                <p className="text-xs text-slate-500">Live status for Critical Care, Transplant, and Presidential Suites.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {beds.map(b => (
                                <div key={b.id} onClick={() => toggleBed(b.id)} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between h-36">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-black text-base text-[#031B4E]">{b.code}</span>
                                            <p className="text-xs text-slate-500 font-medium">{b.ward}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg border uppercase tracking-wider ${b.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-rose-50 text-rose-700 border-rose-300'}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="text-xs font-semibold flex justify-between items-center text-slate-600">
                                        <span>{b.patient || 'Bed Vacant (Cleaned)'}</span>
                                        <span className="text-teal-600 font-bold text-[11px]">Cycle →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: TPA & FINANCE */}
                {activeTab === 'FINANCE_TPA' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-[#031B4E]">Multi-Payer Split Billing & Double-Entry Ledgers</h2>
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                            <div className="p-4 bg-slate-50 flex justify-between text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span>General Account Code</span>
                                <div className="space-x-12"><span>Debit (DR)</span><span>Credit (CR)</span></div>
                            </div>
                            {ledgers.map(l => (
                                <div key={l.code} className="p-4 flex justify-between text-xs font-bold">
                                    <span className="text-slate-800">{l.code} - {l.name}</span>
                                    <div className="space-x-12">
                                        <span className="text-emerald-600 font-black">{l.dr}</span>
                                        <span className="text-blue-600 font-black">{l.cr}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL: OPD TOKEN BOOKING */}
            {showBookingModal && selectedDoc && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={bookAppointment} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-[#031B4E]">Book OPD Token</h3>
                                <p className="text-xs text-teal-600 font-bold">{selectedDoc.name} • {selectedDoc.coe}</p>
                            </div>
                            <button type="button" onClick={() => setShowBookingModal(false)} className="text-slate-400 font-bold text-sm">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name</label>
                            <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="e.g. Ramesh Kumar" className="w-full p-2.5 border rounded-xl text-xs font-bold focus:ring-2 focus:ring-teal-500" />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Billing / Payer Mode</label>
                            <select value={payerType} onChange={e => setPayerType(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CASHLESS_TPA">Cashless TPA (Star / HDFC Ergo / Max Bupa)</option>
                                <option value="SELF_PAY">Direct Cash / UPI Consultation</option>
                                <option value="CORPORATE">Corporate Tie-up (TCS / Infosys)</option>
                            </select>
                        </div>

                        <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between font-bold">
                            <span>Consultation Tariff:</span>
                            <span className="text-[#031B4E]">{selectedDoc.fee}</span>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowBookingModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow">Generate Token</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL: CODE RED TRIGGER */}
            {showEmergencyModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={triggerEmergency} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border-2 border-rose-500">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-rose-600">🚨 Trigger Emergency Resuscitation</h3>
                                <p className="text-xs text-slate-500">Dispatches Cath Lab / Neuro Trauma Teams immediately.</p>
                            </div>
                            <button type="button" onClick={() => setShowEmergencyModal(false)} className="text-slate-400 font-bold text-sm">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Triage Protocol</label>
                            <select value={emCode} onChange={e => setEmCode(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CODE_RED">Code Red - Cardiac Arrest / Critical Polytrauma</option>
                                <option value="CODE_STROKE">Code Stroke - Acute Stroke Resuscitation (&lt; 4.5 hrs)</option>
                                <option value="CODE_STEMI">Code STEMI - Immediate Primary Angioplasty</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name (or Unidentified Code)</label>
                            <input type="text" value={emPatient} onChange={e => setEmPatient(e.target.value)} placeholder="e.g. Unknown Male (Approx 50y)" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">BP (mmHg)</label>
                                <input type="text" value={emBP} onChange={e => setEmBP(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">SpO2 Oxygen</label>
                                <input type="text" value={emSpo2} onChange={e => setEmSpo2(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowEmergencyModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-lg">Activate Resuscitation</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
