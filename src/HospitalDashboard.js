import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('admin@wecure.hospital');
    const [password, setPassword] = useState('WecureAdmin2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [selectedLocation, setSelectedLocation] = useState('HYDERABAD_HITECH');
    const [selectedCoE, setSelectedCoE] = useState('ALL');

    // AI & Communication States
    const [activeAiTab, setActiveAiTab] = useState(false);
    const [aiLog, setAiLog] = useState([
        { id: 1, agent: 'Clinical Decision Support (CDS)', text: 'Analyzed 12 active inpatient vitals. All arterial oxygen parameters optimal. No emergent sepsis markers detected.', time: '2 mins ago', level: 'NORMAL' },
        { id: 2, agent: 'Bed Allocation Optimizer', text: 'Recommendation: Discharge CCU-02 patient to Deluxe Room 401 to free up critical care bay for inbound STEMI.', time: '14 mins ago', level: 'ACTION' }
    ]);
    const [commsFeed, setCommsFeed] = useState([
        { id: 1, channel: 'WHATSAPP', to: '+91 98490 12345', template: 'OPD_TOKEN', text: 'Confirmed Token #42 with Dr. Ashish Patel (Cardiac Sciences)', status: 'DELIVERED', time: 'Just now' },
        { id: 2, channel: 'SMS', to: '+91 98490 67890', template: 'CODE_RED', text: 'EMERGENCY: Code Red in Resus Bay Alpha. On-Call Trauma Team alerted.', status: 'SENT', time: '10 mins ago' }
    ]);

    // Modals
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);

    // Form inputs
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('+91 98490 12345');
    const [channelPref, setChannelPref] = useState('WHATSAPP');
    const [emPatient, setEmPatient] = useState('');
    const [emCode, setEmCode] = useState('CODE_RED');
    const [emBP, setEmBP] = useState('80/50 mmHg');
    const [emSpo2, setEmSpo2] = useState('84%');

    // Hospital Data
    const coeList = [
        { id: 'CARDIOLOGY', name: 'Cardiology & CTVS', icon: '❤️', doctorsCount: 16, bedsCount: 48, desc: 'Advanced TAVI, Robotic Cath Labs, and 24x7 STEMI fast-track.' },
        { id: 'ONCOLOGY', name: 'Cancer Institute (MCI)', icon: '🎗️', doctorsCount: 22, bedsCount: 65, desc: 'TrueBeam Radiotherapy, Bone Marrow Units & Robotic Resections.' },
        { id: 'ORTHOPAEDICS', name: 'Robotic Orthopaedics', icon: '🦴', doctorsCount: 14, bedsCount: 40, desc: 'Mako 3D Robotic Knee/Hip Replacements & Complex Trauma.' },
        { id: 'NEUROSCIENCES', name: 'Neurology & Spine', icon: '🧠', doctorsCount: 12, bedsCount: 32, desc: 'Endoscopic Neurosurgery, Stroke Thrombolysis & DBS.' }
    ];

    const [doctors] = useState([
        { id: 'd1', name: 'Dr. Ashish Patel', coe: 'CARDIOLOGY', coeName: 'Cardiology & CTVS', role: 'Chief Interventional Cardiologist', exp: '22+ Yrs', fee: '₹1,800', rating: '4.98', avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80' },
        { id: 'd2', name: 'Dr. Meera Nambiar', coe: 'ONCOLOGY', coeName: 'Cancer Institute', role: 'Director - Surgical Oncology', exp: '19+ Yrs', fee: '₹2,000', rating: '4.96', avatar: 'https://images.unsplash.com/photo-1594824813627-7756f7ef0585?auto=format&fit=crop&w=300&q=80' }
    ]);

    const [emergencyCases, setEmergencyCases] = useState([
        { id: 'EM-901', patient: 'Kishore Varma (62y)', code: 'CODE_RED', condition: 'Acute STEMI - Door to Balloon 38 mins', bp: '82/54', spo2: '86%', bay: 'Cath Lab Resus 1', doctor: 'Dr. Ashish Patel' }
    ]);

    const [beds, setBeds] = useState([
        { id: 1, code: 'CCU-01', type: 'Critical Care Unit', status: 'OCCUPIED', patient: 'Kishore Varma' },
        { id: 2, code: 'CCU-02', type: 'Critical Care Unit', status: 'AVAILABLE', patient: null },
        { id: 3, code: 'DLX-401', type: 'Presidential Deluxe', status: 'AVAILABLE', patient: null }
    ]);

    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        if (email === 'admin@wecure.hospital' && password === 'WecureAdmin2026!') {
            setUser({ name: 'Dr. Sarah Jenkins', role: 'CHIEF_MEDICAL_OFFICER' });
        } else {
            setErr('Invalid credentials. Use admin@wecure.hospital / WecureAdmin2026!');
        }
    };

    const handleBooking = (e) => {
        e.preventDefault();
        const tokenNum = Math.floor(10 + Math.random() * 90);
        const newDispatch = {
            id: Date.now(),
            channel: channelPref,
            to: patientPhone,
            template: 'OPD_TOKEN',
            text: `Confirmed Token #${tokenNum} for ${patientName} with ${selectedDoc.name}. Fee: ${selectedDoc.fee}`,
            status: 'DELIVERED',
            time: 'Just now'
        };
        setCommsFeed([newDispatch, ...commsFeed]);
        setShowBookingModal(false);
        alert(`Token #${tokenNum} generated! Instant ${channelPref} confirmation dispatched to ${patientPhone}.`);
        setPatientName('');
    };

    const handleEmergency = (e) => {
        e.preventDefault();
        const newCase = {
            id: `EM-${Math.floor(900 + Math.random() * 100)}`,
            patient: emPatient || 'Unidentified Patient',
            code: emCode,
            condition: emCode === 'CODE_RED' ? 'Acute Cardiac Arrest / Major Trauma' : 'Acute Stroke',
            bp: emBP,
            spo2: emSpo2,
            bay: 'Trauma Resus Bay Alpha',
            doctor: 'On-Duty Chief Trauma Resuscitator'
        };
        setEmergencyCases([newCase, ...emergencyCases]);

        // Add AI Agent Reasoning Entry
        const newAiEntry = {
            id: Date.now(),
            agent: 'Autonomous Triage Agent (AETA)',
            text: `URGENT AI CDS: SpO2 ${emSpo2} indicates severe respiratory depression. Mechanical Ventilator reserved in CCU-01. WhatsApp trauma alert sent to on-call surgeon.`,
            time: 'Just now',
            level: 'CRITICAL'
        };
        setAiLog([newAiEntry, ...aiLog]);

        // Add Comms entry
        const newDispatch = {
            id: Date.now() + 1,
            channel: 'WHATSAPP',
            to: '+91 98490 12345 (Trauma Registry)',
            template: 'CODE_RED',
            text: `🚨 ${emCode} Alert for ${newCase.patient}. BP: ${emBP} | SpO2: ${emSpo2}. Bay: Alpha.`,
            status: 'BROADCAST_SENT',
            time: 'Just now'
        };
        setCommsFeed([newDispatch, ...commsFeed]);
        setShowEmergencyModal(false);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-brand-cyan text-white font-black text-xl mx-auto flex items-center justify-center mb-2">W</div>
                        <h2 className="text-2xl font-black text-brand-navy">Wecure Enterprise</h2>
                        <p className="text-xs text-brand-cyan font-bold uppercase tracking-wider">AI Clinical Agents & Omnichannel Core</p>
                    </div>
                    {err && <div className="p-3 mb-4 bg-rose-50 text-rose-600 text-xs rounded-xl font-bold">{err}</div>}
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-xl text-xs font-bold" />
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-xl text-xs font-bold" />
                        <button type="submit" className="w-full py-3 bg-brand-cyan text-white font-bold text-xs rounded-xl shadow">Authenticate Session</button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F7F9] text-brand-dark flex flex-col font-sans">
            
            {/* TOP BAR WITH LIVE AI AGENT STATUS */}
            <div className="bg-brand-navy text-white px-8 py-2 text-xs flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-4 text-[11px]">
                    <span className="flex items-center text-emerald-400 font-bold">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-2"></span>
                        Autonomous Clinical AI Engine: ACTIVE (3 Agents Online)
                    </span>
                    <span className="text-slate-400">|</span>
                    <span className="flex items-center text-brand-cyan font-bold">
                        💬 WhatsApp & SMS Gateway: CONNECTED
                    </span>
                </div>
                <div className="flex items-center space-x-3">
                    <button onClick={() => setShowEmergencyModal(true)} className="px-3 py-1 bg-brand-rose hover:bg-rose-700 text-white font-black rounded-lg text-[10px] uppercase">
                        🚨 Trigger Code Red
                    </button>
                    <button onClick={() => setActiveAiTab(!activeAiTab)} className="px-3 py-1 bg-brand-cyan hover:bg-brand-cyanHover text-white font-bold rounded-lg text-[10px]">
                        🤖 AI & Comms Console ({aiLog.length + commsFeed.length})
                    </button>
                </div>
            </div>

            {/* HEADER */}
            <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center sticky top-0 z-40">
                <div className="flex items-center space-x-3">
                    <div className="w-9 h-9 rounded-xl bg-brand-cyan text-white font-black text-lg flex items-center justify-center">W</div>
                    <div>
                        <h1 className="text-base font-black text-brand-navy">WECURE SUPER SPECIALITY</h1>
                        <p className="text-[10px] text-brand-cyan font-bold">AI Clinical Decision Core</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl text-xs font-bold">
                    {['DASHBOARD', 'DOCTORS_ROSTER', 'EMERGENCY_24X7', 'BED_TELEMETRY', 'COMMS_AI_GATEWAY'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-3 py-1.5 rounded-lg transition ${activeTab === tab ? 'bg-brand-navy text-white' : 'text-slate-600'}`}
                        >
                            {tab.replace(/_/g, ' ')}
                        </button>
                    ))}
                </div>

                <button onClick={() => setUser(null)} className="text-xs font-bold text-rose-600 hover:underline">Logout</button>
            </header>

            {/* WORKSPACE */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-6 flex-1">
                
                {/* TAB: DASHBOARD */}
                {activeTab === 'DASHBOARD' && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">AI Agents Active</p>
                                <h3 className="text-2xl font-black text-brand-navy mt-1">3 Running</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-2">Triage, CDS & Bed Logic</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">WhatsApp / SMS Dispatches</p>
                                <h3 className="text-2xl font-black text-brand-cyan mt-1">{commsFeed.length} Sent</h3>
                                <p className="text-[11px] text-slate-500 font-bold mt-2">100% Delivery Rate</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Inpatients</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">{beds.filter(b => b.status === 'OCCUPIED').length} Active</h3>
                                <p className="text-[11px] text-slate-500 font-bold mt-2">CCU Occupancy 50%</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Active Code Alerts</p>
                                <h3 className="text-2xl font-black text-brand-rose mt-1">{emergencyCases.length} STEMI/Stroke</h3>
                                <p className="text-[11px] text-rose-500 font-bold mt-2">Bays Resuscitation Armed</p>
                            </div>
                        </div>

                        {/* LIVE DOCTORS & QUICK WHATSAPP BOOKING */}
                        <div>
                            <h3 className="text-base font-black text-brand-navy mb-4">Fast OPD Token Booking with Instant WhatsApp Notification</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {doctors.map(doc => (
                                    <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-200 flex justify-between items-center shadow-sm">
                                        <div className="flex space-x-4 items-center">
                                            <img src={doc.avatar} alt={doc.name} className="w-16 h-16 rounded-2xl object-cover" />
                                            <div>
                                                <span className="px-2 py-0.5 bg-cyan-50 text-brand-cyan text-[10px] font-black rounded">{doc.coeName}</span>
                                                <h4 className="font-black text-brand-navy text-sm mt-1">{doc.name}</h4>
                                                <p className="text-xs text-slate-500 font-medium">{doc.role} • {doc.fee}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedDoc(doc); setShowBookingModal(true); }}
                                            className="px-4 py-2.5 bg-brand-cyan text-white text-xs font-black rounded-xl shadow hover:bg-brand-cyanHover"
                                        >
                                            Book via WhatsApp
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: COMMS & AI GATEWAY */}
                {activeTab === 'COMMS_AI_GATEWAY' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* AI AGENT LOGS */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-base font-black text-brand-navy flex items-center">
                                🤖 Autonomous Clinical AI Agent Reasoning Log
                            </h3>
                            <div className="space-y-3">
                                {aiLog.map(item => (
                                    <div key={item.id} className={`p-4 rounded-2xl border text-xs ${item.level === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                                        <div className="flex justify-between font-black">
                                            <span>{item.agent}</span>
                                            <span className="text-[10px] opacity-75">{item.time}</span>
                                        </div>
                                        <p className="mt-1 leading-relaxed font-medium">{item.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* DISPATCH FEED */}
                        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                            <h3 className="text-base font-black text-brand-navy flex items-center">
                                💬 Live WhatsApp & SMS Gateway Dispatches
                            </h3>
                            <div className="space-y-3">
                                {commsFeed.map(feed => (
                                    <div key={feed.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${feed.channel === 'WHATSAPP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>{feed.channel}</span>
                                            <span className="text-[10px] text-slate-400 font-bold">{feed.time}</span>
                                        </div>
                                        <p className="font-bold text-slate-700">To: {feed.to}</p>
                                        <p className="text-slate-600 bg-white p-2.5 rounded-xl border border-slate-100 font-mono text-[11px]">{feed.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL: APPOINTMENT WITH WHATSAPP DISPATCH */}
            {showBookingModal && selectedDoc && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleBooking} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-navy">OPD Token + Instant Mobile Alert</h3>
                                <p className="text-xs text-brand-cyan font-bold">{selectedDoc.name}</p>
                            </div>
                            <button type="button" onClick={() => setShowBookingModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Patient Name</label>
                            <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="e.g. Ramesh Kumar" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Mobile Number for WhatsApp Confirmation</label>
                            <input type="tel" required value={patientPhone} onChange={e => setPatientPhone(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Confirmation Channel</label>
                            <select value={channelPref} onChange={e => setChannelPref(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="WHATSAPP">WhatsApp Official Notification</option>
                                <option value="SMS">Standard SMS Gateway</option>
                            </select>
                        </div>
                        <button type="submit" className="w-full py-3 bg-brand-cyan text-white text-xs font-black rounded-xl shadow hover:bg-brand-cyanHover">
                            Confirm Appointment & Send {channelPref}
                        </button>
                    </form>
                </div>
            )}

            {/* MODAL: CODE RED WITH AI & SURGEON ALERT */}
            {showEmergencyModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleEmergency} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border-2 border-brand-rose">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-rose">🚨 Trigger Code Red & AI Triage</h3>
                                <p className="text-xs text-slate-500">Auto-triggers AI decision support and WhatsApp trauma broadcast.</p>
                            </div>
                            <button type="button" onClick={() => setShowEmergencyModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">Triage Protocol</label>
                            <select value={emCode} onChange={e => setEmCode(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CODE_RED">Code Red - Cardiac Arrest / Severe Polytrauma</option>
                                <option value="CODE_STROKE">Code Stroke - Acute Stroke Fast-Track</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div><label className="block text-xs font-bold text-slate-600 mb-1">BP (mmHg)</label><input type="text" value={emBP} onChange={e => setEmBP(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" /></div>
                            <div><label className="block text-xs font-bold text-slate-600 mb-1">SpO2</label><input type="text" value={emSpo2} onChange={e => setEmSpo2(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" /></div>
                        </div>
                        <button type="submit" className="w-full py-3 bg-brand-rose text-white text-xs font-black rounded-xl shadow-lg">
                            Dispatch AI Triage & Alert Trauma Team
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}
