import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('admin@wecure.hospital');
    const [password, setPassword] = useState('WecureAdmin2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [selectedCoE, setSelectedCoE] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    // Modals
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);

    // Form States
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [payerType, setPayerType] = useState('CASHLESS_TPA');
    const [emPatient, setEmPatient] = useState('');
    const [emCode, setEmCode] = useState('CODE_RED');
    const [emBP, setEmBP] = useState('80/50 mmHg');
    const [emSpo2, setEmSpo2] = useState('84%');

    // 1. Centres of Excellence Data (Medicover Model)
    const coeList = [
        {
            id: 'CARDIOLOGY',
            name: 'Centre of Excellence in Cardiac Sciences',
            tagline: 'Comprehensive Heart Institute & Robotic Cath Labs',
            icon: '❤️',
            img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
            desc: 'Advanced TAVI, Angioplasty, Minimally Invasive Bypass & Electrophysiology.',
            doctorsCount: 14,
            bedsCount: 42,
            lead: 'Dr. Ashish Patel (Chief Interventional Cardiologist)'
        },
        {
            id: 'ONCOLOGY',
            name: 'Comprehensive Cancer Care Institute',
            tagline: 'Robotic Surgical, Medical & TrueBeam Radiation Oncology',
            icon: '🎗️',
            img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
            desc: 'Precision targeted therapies, Bone Marrow Transplants, and Immunotherapy.',
            doctorsCount: 18,
            bedsCount: 56,
            lead: 'Dr. Meera Nambiar (Director Surgical Oncology)'
        },
        {
            id: 'NEUROSCIENCES',
            name: 'Institute of Neurosciences & Spine Care',
            tagline: 'Comprehensive Stroke Fast-Track & Micro-Neurosurgery',
            icon: '🧠',
            img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
            desc: 'Deep Brain Stimulation (DBS), Neuro-Intervention, and Endoscopic Spine Surgery.',
            doctorsCount: 10,
            bedsCount: 30,
            lead: 'Dr. K. Srinivas (Senior Neurosurgeon)'
        },
        {
            id: 'TRANSPLANT',
            name: 'Centre for Organ Transplants & HPB Surgery',
            tagline: 'Living Donor Liver, Renal & Multi-Organ Transplants',
            icon: '🫁',
            img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
            desc: 'Dedicated positive-pressure sterile transplant ICUs with 98.4% success record.',
            doctorsCount: 12,
            bedsCount: 22,
            lead: 'Dr. Vikramaditya Roy (Chief Transplant Surgeon)'
        },
        {
            id: 'ORTHOPAEDICS',
            name: 'Robotic Joint Replacement & Orthopaedics',
            tagline: 'Mako Robotic Knee & Hip Arthroplasty Centre',
            icon: '🦴',
            img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
            desc: 'Sub-millimeter robotic precision, Sports Arthroscopy & Polytrauma Care.',
            doctorsCount: 11,
            bedsCount: 35,
            lead: 'Dr. Sunita Bansal (Director Orthopaedics)'
        },
        {
            id: 'WOMAN_CHILD',
            name: 'Woman & Child Speciality Institute',
            tagline: 'Level-3 Advanced NICU, Fetal Medicine & High-Risk Birthing',
            icon: '👶',
            img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
            desc: '24x7 Neonatal Resuscitation teams and advanced painless birthing suites.',
            doctorsCount: 9,
            bedsCount: 28,
            lead: 'Dr. Rohit Agnihotri (Chief Pediatric Intensivist)'
        }
    ];

    // 2. Doctor Directory
    const [doctors] = useState([
        {
            id: 'doc-1',
            name: 'Dr. Ashish Patel',
            coe: 'CARDIOLOGY',
            coeName: 'Cardiac Sciences',
            role: 'Principal Director - Interventional Cardiology',
            exp: '22+ Years Experience',
            qual: 'MD, DM (Cardiology), FACC (USA), FSCAI',
            fee: '₹1,800',
            rating: '4.98',
            reviews: '850+ Reviews',
            opd: 'Mon - Sat: 09:00 AM - 02:00 PM',
            avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-2',
            name: 'Dr. Meera Nambiar',
            coe: 'ONCOLOGY',
            coeName: 'Cancer Care Institute',
            role: 'Senior Director - Surgical & Robotic Oncology',
            exp: '19+ Years Experience',
            qual: 'MS, MCh (Surgical Oncology), Robotic Fellow (UK)',
            fee: '₹2,000',
            rating: '4.96',
            reviews: '620+ Reviews',
            opd: 'Mon - Fri: 11:00 AM - 04:00 PM',
            avatar: 'https://images.unsplash.com/photo-1594824813627-7756f7ef0585?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-3',
            name: 'Dr. K. Srinivas',
            coe: 'NEUROSCIENCES',
            coeName: 'Neurosciences',
            role: 'Chief Consultant - Brain & Spine Neurosurgery',
            exp: '17+ Years Experience',
            qual: 'MBBS, MS, MCh (Neurosurgery), FINR (Zurich)',
            fee: '₹1,600',
            rating: '4.93',
            reviews: '490+ Reviews',
            opd: 'Mon - Sat: 10:00 AM - 03:00 PM',
            avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-4',
            name: 'Dr. Vikramaditya Roy',
            coe: 'TRANSPLANT',
            coeName: 'Organ Transplants',
            role: 'Chief Surgeon - Hepato-Pancreato-Biliary & Liver Transplant',
            exp: '24+ Years Experience',
            qual: 'MS, FRCS (Edin), ASTS Transplant Fellow (USA)',
            fee: '₹2,500',
            rating: '4.99',
            reviews: '910+ Reviews',
            opd: 'Tue, Thu, Sat: 02:00 PM - 06:00 PM',
            avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-5',
            name: 'Dr. Sunita Bansal',
            coe: 'ORTHOPAEDICS',
            coeName: 'Robotic Orthopaedics',
            role: 'Director - Robotic Joint Replacement & Sports Injury',
            exp: '18+ Years Experience',
            qual: 'MS (Ortho), DNB, Mako Robotic Certified Surgeon',
            fee: '₹1,500',
            rating: '4.91',
            reviews: '530+ Reviews',
            opd: 'Mon - Fri: 09:30 AM - 03:30 PM',
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-6',
            name: 'Dr. Rohit Agnihotri',
            coe: 'WOMAN_CHILD',
            coeName: 'Woman & Child Care',
            role: 'Head - Neonatology & Pediatric Critical Care',
            exp: '15+ Years Experience',
            qual: 'MD (Pediatrics), Fellowship in Neonatology (Sydney)',
            fee: '₹1,400',
            rating: '4.95',
            reviews: '740+ Reviews',
            opd: 'Mon - Sat: 08:30 AM - 01:00 PM',
            avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=300&q=80'
        }
    ]);

    // 3. Emergency Fast-Track Cases
    const [emergencyCases, setEmergencyCases] = useState([
        { id: 'EM-801', patient: 'Kishore Varma (62y/M)', code: 'CODE_RED', condition: 'Acute STEMI - Door-to-Balloon in 38 mins', bp: '82/54', spo2: '86%', bay: 'Cath Lab Resus 1', doctor: 'Dr. Ashish Patel', status: 'ANGIOPLASTY_READY' },
        { id: 'EM-802', patient: 'Sujata Devi (48y/F)', code: 'CODE_STROKE', condition: 'Left MCA Ischemic Stroke (Window: 2.1h)', bp: '175/105', spo2: '96%', bay: 'Neuro Trauma Bay 3', doctor: 'Dr. K. Srinivas', status: 'THROMBOLYSIS_ACTIVE' }
    ]);

    // 4. Executive Health Packages
    const [packages] = useState([
        { id: 'PKG-1', name: 'Medicover Comprehensive Executive Health', price: '₹4,999', original: '₹12,500', tests: '78 Essential Biomarkers', includes: ['Complete Hemogram & ESR', 'Lipid Profile & Liver Functions', 'HbA1c & Fasting Insulin', '3D Echo & Treadmill Stress Test (TMT)', 'Ultrasound Abdomen & Pelvis', 'Doctor Clinical Consultation'] },
        { id: 'PKG-2', name: 'Master Heart & Stroke Screening', price: '₹7,499', original: '₹18,000', tests: '92 Advanced Parameters', includes: ['CT Coronary Angiogram / Calcium Score', 'Carotid Doppler for Stroke Screening', 'Cardiac Biomarkers (hs-CRP, Troponin)', 'Lipoprotein (a) & Homocysteine', 'Senior Cardiologist Review'] },
        { id: 'PKG-3', name: 'Senior Citizen Complete Wellness Panel', price: '₹3,499', original: '₹8,900', tests: '65 Geriatric Markers', includes: ['Bone Mineral Density (DEXA Scan)', 'Renal & Electrolyte Profile', 'Thyroid Profile (T3, T4, TSH)', 'Urine Microalbuminuria', 'Physician & Dietician Consultation'] }
    ]);

    // 5. Inpatient Accommodations & Bed Telemetry
    const [beds, setBeds] = useState([
        { id: 1, code: 'CCU-BAY-01', type: 'Critical Care Unit', coe: 'CARDIOLOGY', status: 'OCCUPIED', patient: 'Kishore Varma', tariff: '₹12,000/day' },
        { id: 2, code: 'CCU-BAY-02', type: 'Critical Care Unit', coe: 'CARDIOLOGY', status: 'AVAILABLE', patient: null, tariff: '₹12,000/day' },
        { id: 3, code: 'BMT-STERILE-1', type: 'Bone Marrow Unit', coe: 'ONCOLOGY', status: 'OCCUPIED', patient: 'Sunil Rao', tariff: '₹18,000/day' },
        { id: 4, code: 'TX-BAY-ALPHA', type: 'Transplant Sterile Suite', coe: 'TRANSPLANT', status: 'OCCUPIED', patient: 'Ramesh Sen', tariff: '₹22,000/day' },
        { id: 5, code: 'NICU-ISO-04', type: 'Neonatal ICU Level 3', coe: 'WOMAN_CHILD', status: 'AVAILABLE', patient: null, tariff: '₹9,500/day' },
        { id: 6, code: 'DLX-SUITE-501', type: 'Presidential Deluxe Suite', coe: 'CARDIOLOGY', status: 'AVAILABLE', patient: null, tariff: '₹15,000/day' }
    ]);

    // 6. Cashless TPA & Accounting Ledger
    const [ledgers] = useState([
        { code: '1010-CASH', desc: 'OPD Cash & UPI Billing Registry', dr: '₹8,45,000.00', cr: '₹0.00' },
        { code: '1020-BANK', desc: 'Operating Escrow Account', dr: '₹64,20,000.00', cr: '₹0.00' },
        { code: '1030-TPA-RECV', desc: 'Insurance / Cashless TPA Claims (Star, HDFC Ergo, ICICI)', dr: '₹52,80,000.00', cr: '₹0.00' },
        { code: '2010-IP-ESCROW', desc: 'Inpatient Surgeries Advance Deposits', dr: '₹0.00', cr: '₹34,50,000.00' },
        { code: '4010-CLINICAL-REV', desc: 'Robotic Surgery & Cath Lab Procedural Revenue', dr: '₹0.00', cr: '₹90,95,000.00' }
    ]);

    // Authentication
    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        const credMap = {
            'admin@wecure.hospital': { pass: 'WecureAdmin2026!', name: 'Dr. Sarah Jenkins', role: 'CHIEF_MEDICAL_OFFICER', mods: ['DASHBOARD', 'CENTRES_OF_EXCELLENCE', 'DOCTORS_ROSTER', 'HEALTH_PACKAGES', 'EMERGENCY_24X7', 'BED_TELEMETRY', 'TPA_FINANCE'] },
            'cardio@wecure.hospital': { pass: 'WecureCardio2026!', name: 'Dr. Ashish Patel', role: 'DIRECTOR_CARDIOLOGY', mods: ['DASHBOARD', 'CENTRES_OF_EXCELLENCE', 'DOCTORS_ROSTER', 'EMERGENCY_24X7', 'BED_TELEMETRY'] },
            'emergency@wecure.hospital': { pass: 'WecureEmergency2026!', name: 'Dr. K. Srinivas', role: 'CHIEF_TRAUMA_HEAD', mods: ['DASHBOARD', 'EMERGENCY_24X7', 'BED_TELEMETRY'] },
            'finance@wecure.hospital': { pass: 'WecureFinance2026!', name: 'Naveen Aggarwal', role: 'CFO_TPA_HEAD', mods: ['DASHBOARD', 'TPA_FINANCE'] }
        };

        const found = credMap[email.trim().toLowerCase()];
        if (found && found.pass === password) {
            setUser(found);
            setActiveTab(found.mods[0]);
        } else {
            setErr('Invalid workstation credential. Please use default hospital staff login.');
        }
    };

    const toggleBedStatus = (id) => {
        const cycle = ['AVAILABLE', 'OCCUPIED', 'CLEANING', 'DIRTY'];
        setBeds(beds.map(b => b.id === id ? { ...b, status: cycle[(cycle.indexOf(b.status) + 1) % cycle.length] } : b));
    };

    const handleBooking = (e) => {
        e.preventDefault();
        alert(`OPD Consultation Token generated successfully for ${patientName} with ${selectedDoc.name}. Mode: ${payerType}.`);
        setShowBookingModal(false);
        setPatientName('');
        setPatientPhone('');
    };

    const handleEmergency = (e) => {
        e.preventDefault();
        const newCase = {
            id: `EM-${Math.floor(800 + Math.random() * 100)}`,
            patient: emPatient || 'Unidentified Emergency Patient',
            code: emCode,
            condition: emCode === 'CODE_RED' ? 'Acute Cardiac / Polytrauma Triage' : 'Acute Neurovascular Event',
            bp: emBP,
            spo2: emSpo2,
            bay: 'Trauma Resuscitation Alpha',
            doctor: 'On-Duty Chief Trauma Fellow',
            status: 'RESUSCITATION_ACTIVE'
        };
        setEmergencyCases([newCase, ...emergencyCases]);
        setShowEmergencyModal(false);
        setEmPatient('');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-brand-cyan/20 via-brand-dark to-[#000E19]"></div>
                
                <div className="relative w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-cyan text-white font-black text-2xl mb-3 shadow-lg shadow-brand-cyan/30">
                            W
                        </div>
                        <h2 className="text-2xl font-black text-brand-navy tracking-tight">Wecure Super Speciality</h2>
                        <p className="text-xs text-brand-cyan font-bold uppercase tracking-widest mt-1">European Standard Clinical Care</p>
                    </div>

                    {err && <div className="mb-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold p-3 rounded-xl text-center">{err}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1">Workstation User ID</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-cyan focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-slate-600 uppercase tracking-wider mb-1">Passphrase</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-cyan focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-brand-cyan hover:bg-brand-cyanHover text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-cyan/30 transition">
                            Authenticate Healthcare Session
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between text-[11px] text-slate-400 font-medium">
                        <span>NABH • JCI Accredited</span>
                        <span>24x7 Emergency Ready</span>
                    </div>
                </div>
            </div>
        );
    }

    const filteredDocs = doctors.filter(d => {
        const matchCoE = selectedCoE === 'ALL' || d.coe === selectedCoE;
        const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCoE && matchSearch;
    });

    return (
        <div className="min-h-screen bg-[#F4F7F9] text-brand-dark flex flex-col font-sans">
            
            {/* 1. MEDICOVER STYLE TOP EMERGENCY STRIP */}
            <div className="bg-brand-navy text-white px-8 py-2 text-xs flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-6 text-[11px]">
                    <span className="flex items-center font-black text-brand-rose">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-rose animate-ping mr-2"></span>
                        24x7 Emergency & Trauma Helpline: 040 6833 4455
                    </span>
                    <span className="hidden md:inline text-slate-300">26+ Multi-Speciality Hospitals • 1000+ Super Specialists</span>
                </div>
                <div className="flex items-center space-x-4 text-[11px]">
                    <button onClick={() => setShowEmergencyModal(true)} className="px-3 py-1 bg-brand-rose hover:bg-rose-700 text-white font-black rounded-lg uppercase tracking-wider shadow">
                        🚨 Trigger Code Red
                    </button>
                    <span className="text-slate-400">|</span>
                    <span className="font-bold text-brand-cyan">{user.name} ({user.role.replace(/_/g, ' ')})</span>
                </div>
            </div>

            {/* 2. MAIN BRAND NAVIGATION BAR */}
            <header className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan text-white font-black text-xl flex items-center justify-center shadow-md shadow-brand-cyan/20">
                        W
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-brand-navy tracking-tight leading-tight">WECURE HOSPITALS</h1>
                        <p className="text-[10px] text-brand-cyan font-bold uppercase tracking-wider">Advanced European Clinical Care</p>
                    </div>
                </div>

                {/* MODULE TABS */}
                <div className="hidden lg:flex items-center bg-slate-100 p-1.5 rounded-2xl space-x-1 border border-slate-200">
                    {[
                        { id: 'DASHBOARD', label: 'Overview', icon: '⚡' },
                        { id: 'CENTRES_OF_EXCELLENCE', label: 'Centres of Excellence', icon: '🏛️' },
                        { id: 'DOCTORS_ROSTER', label: 'Find a Doctor', icon: '👨‍⚕️' },
                        { id: 'HEALTH_PACKAGES', label: 'Health Packages', icon: '🩺' },
                        { id: 'EMERGENCY_24X7', label: '24x7 Emergency', icon: '🚨' },
                        { id: 'BED_TELEMETRY', label: 'Bed Map', icon: '🛏️' },
                        { id: 'TPA_FINANCE', label: 'TPA & Billing', icon: '💳' }
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-3 py-1.5 text-xs font-bold rounded-xl transition flex items-center space-x-1.5 ${activeTab === tab.id ? 'bg-brand-navy text-white shadow-md' : 'text-slate-600 hover:text-slate-900'}`}
                        >
                            <span>{tab.icon}</span>
                            <span>{tab.label}</span>
                        </button>
                    ))}
                </div>

                <button onClick={() => setUser(null)} className="px-3.5 py-1.5 border border-rose-200 text-rose-600 font-bold text-xs rounded-xl hover:bg-rose-50 transition">
                    Sign Out
                </button>
            </header>

            {/* 3. HERO SHOWCASE STRIP (MEDICOVER HEALTHCARE STANDARD) */}
            <div className="bg-gradient-to-r from-brand-navy via-[#003B64] to-brand-cyan text-white px-8 py-7 shadow-inner relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center relative z-10 gap-4">
                    <div>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-white/20 text-cyan-200 uppercase tracking-widest border border-white/20">
                            Leading Super Speciality Group
                        </span>
                        <h2 className="text-xl md:text-2xl font-black mt-2 tracking-tight">World-Class Healthcare with Clinical & Surgical Excellence</h2>
                        <p className="text-xs text-slate-100 mt-1 max-w-2xl leading-relaxed">
                            Equipped with 4th Gen Da Vinci Robotic Surgery, Cath Labs, TrueBeam Radiotherapy, and 24x7 Critical Care Units.
                        </p>
                    </div>
                    <div className="flex space-x-3">
                        <button onClick={() => { setActiveTab('DOCTORS_ROSTER'); setSelectedDoc(doctors[0]); setShowBookingModal(true); }} className="px-4 py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white font-black text-xs rounded-xl shadow-lg transition">
                            📅 Book OPD Appointment
                        </button>
                        <button onClick={() => setActiveTab('HEALTH_PACKAGES')} className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-black text-xs rounded-xl border border-white/30 backdrop-blur-md transition">
                            🩺 Health Checkups
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. MAIN WORKSPACE */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">

                {/* TAB: DASHBOARD OVERVIEW */}
                {activeTab === 'DASHBOARD' && (
                    <div className="space-y-8">
                        {/* STATS TILES */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Institutes of Excellence</p>
                                <h3 className="text-2xl font-black text-brand-navy mt-1">6 Centres</h3>
                                <p className="text-[11px] text-brand-cyan font-bold mt-2">All Cath Labs & OTs Functional</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Critical Care Occupancy</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">
                                    {Math.round((beds.filter(b => b.status === 'OCCUPIED').length / beds.length) * 100)}%
                                </h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">{beds.filter(b => b.status === 'AVAILABLE').length} ICU / CCU Suites Ready</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Emergency Fast-Track</p>
                                <h3 className="text-2xl font-black text-brand-rose mt-1">{emergencyCases.length} Code Cases</h3>
                                <p className="text-[11px] text-rose-500 font-bold mt-2">Trauma Resuscitation Active</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Cashless TPA Billing</p>
                                <h3 className="text-2xl font-black text-emerald-600 mt-1">₹90.95 Lakhs</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-2">Real-time Claims Clearance</p>
                            </div>
                        </div>

                        {/* HIGHLIGHTED CENTRES OF EXCELLENCE */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-black text-brand-navy">Centres of Excellence (CoEs)</h3>
                                <button onClick={() => setActiveTab('CENTRES_OF_EXCELLENCE')} className="text-xs font-bold text-brand-cyan hover:underline">View All 6 Institutes →</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {coeList.slice(0, 3).map(coe => (
                                    <div key={coe.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col">
                                        <img src={coe.img} alt={coe.name} className="h-44 w-full object-cover" />
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-xs font-bold text-brand-cyan uppercase tracking-wider">{coe.tagline}</span>
                                                <h4 className="font-black text-brand-navy text-base mt-1">{coe.name}</h4>
                                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{coe.desc}</p>
                                            </div>
                                            <button onClick={() => { setSelectedCoE(coe.id); setActiveTab('DOCTORS_ROSTER'); }} className="mt-4 w-full py-2 bg-slate-100 hover:bg-brand-navy hover:text-white text-brand-navy text-xs font-bold rounded-xl transition">
                                                Consult Institute Specialists →
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB: CENTRES OF EXCELLENCE */}
                {activeTab === 'CENTRES_OF_EXCELLENCE' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-brand-navy">Centres of Clinical Excellence</h2>
                            <p className="text-xs text-slate-500 mt-0.5">Specialized surgical & diagnostic institutes built with high-end quaternary technology.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {coeList.map(coe => (
                                <div key={coe.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                                    <img src={coe.img} alt={coe.name} className="h-48 w-full object-cover" />
                                    <div className="p-6 space-y-4">
                                        <div>
                                            <span className="text-[10px] font-black text-brand-cyan uppercase tracking-widest">{coe.tagline}</span>
                                            <h3 className="text-base font-black text-brand-navy mt-1">{coe.name}</h3>
                                            <p className="text-xs text-slate-500 mt-2 leading-relaxed">{coe.desc}</p>
                                        </div>
                                        <div className="pt-3 border-t border-slate-100 space-y-1 text-xs text-slate-600">
                                            <p><strong>Faculty:</strong> {coe.doctorsCount} Super Specialists</p>
                                            <p><strong>Dedicated Infrastructure:</strong> {coe.bedsCount} Speciality Beds</p>
                                        </div>
                                        <button onClick={() => { setSelectedCoE(coe.id); setActiveTab('DOCTORS_ROSTER'); }} className="w-full py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white text-xs font-bold rounded-xl transition shadow">
                                            Find {coe.name.split(' ')[0]} Doctors
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: FIND DOCTORS & OPD BOOKING */}
                {activeTab === 'DOCTORS_ROSTER' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-brand-navy">Doctor Directory & Consultation Booking</h2>
                                <p className="text-xs text-slate-500">Find doctors by speciality, verify qualifications, and issue real-time OPD tokens.</p>
                            </div>
                            <input
                                type="text"
                                placeholder="🔍 Search doctor by name or specialty..."
                                value={searchQuery}
                                onChange={e => setSearchQuery(e.target.value)}
                                className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-brand-cyan w-full md:w-72"
                            />
                        </div>

                        {/* COE FILTER PILLS */}
                        <div className="flex flex-wrap gap-2">
                            <button onClick={() => setSelectedCoE('ALL')} className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${selectedCoE === 'ALL' ? 'bg-brand-navy text-white shadow' : 'bg-white border border-slate-200 text-slate-600'}`}>All Specialities</button>
                            {coeList.map(c => (
                                <button key={c.id} onClick={() => setSelectedCoE(c.id)} className={`px-4 py-1.5 text-xs font-bold rounded-xl transition ${selectedCoE === c.id ? 'bg-brand-navy text-white shadow' : 'bg-white border border-slate-200 text-slate-600'}`}>
                                    {c.name.replace('Centre of Excellence in ', '').replace('Institute of ', '').split('&')[0]}
                                </button>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredDocs.map(doc => (
                                <div key={doc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                    <div>
                                        <div className="flex space-x-4 items-start">
                                            <img src={doc.avatar} alt={doc.name} className="w-20 h-20 rounded-2xl object-cover border-2 border-brand-cyan/20 shadow-sm" />
                                            <div>
                                                <span className="px-2 py-0.5 bg-cyan-50 text-brand-cyan text-[10px] font-black rounded uppercase">{doc.coeName}</span>
                                                <h3 className="text-base font-black text-brand-navy mt-1">{doc.name}</h3>
                                                <p className="text-xs text-slate-500 font-semibold">{doc.exp}</p>
                                                <p className="text-[11px] text-amber-500 font-bold mt-1">⭐ {doc.rating} ({doc.reviews})</p>
                                            </div>
                                        </div>
                                        <div className="mt-4 p-3 bg-slate-50 rounded-xl space-y-1 text-xs text-slate-600 font-medium">
                                            <p className="font-bold text-slate-800">{doc.role}</p>
                                            <p className="text-[11px] text-slate-500">{doc.qual}</p>
                                            <p className="text-[11px] text-brand-cyan font-bold pt-1">📅 {doc.opd}</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase">Consultation Fee</p>
                                            <p className="text-base font-black text-brand-navy">{doc.fee}</p>
                                        </div>
                                        <button
                                            onClick={() => { setSelectedDoc(doc); setShowBookingModal(true); }}
                                            className="px-4 py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white font-black text-xs rounded-xl shadow transition"
                                        >
                                            Book Appointment
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: HEALTH PACKAGES (MEDICOVER SIGNATURE) */}
                {activeTab === 'HEALTH_PACKAGES' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-brand-navy">Preventive Master Health Checkup Packages</h2>
                            <p className="text-xs text-slate-500">Early detection and complete metabolic, cardiac & cancer screenings.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                                    <div>
                                        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{pkg.tests}</span>
                                        <h3 className="text-lg font-black text-brand-navy mt-3">{pkg.name}</h3>
                                        <div className="mt-2 flex items-baseline space-x-2">
                                            <span className="text-2xl font-black text-brand-cyan">{pkg.price}</span>
                                            <span className="text-xs text-slate-400 line-through font-bold">{pkg.original}</span>
                                        </div>
                                        <ul className="mt-5 space-y-2 text-xs text-slate-600 font-medium">
                                            {pkg.includes.map((inc, i) => (
                                                <li key={i} className="flex items-center space-x-2">
                                                    <span className="text-emerald-500 font-bold">✓</span>
                                                    <span>{inc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <button onClick={() => { setSelectedPackage(pkg); setShowPackageModal(true); }} className="mt-6 w-full py-3 bg-brand-navy hover:bg-[#003B64] text-white text-xs font-bold rounded-xl shadow transition">
                                        Book Health Checkup
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: 24X7 EMERGENCY */}
                {activeTab === 'EMERGENCY_24X7' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-brand-rose flex items-center">
                                    <span className="w-3 h-3 rounded-full bg-brand-rose animate-ping mr-2"></span>
                                    24x7 Emergency & Critical Trauma Resuscitation
                                </h2>
                                <p className="text-xs text-slate-500">Direct fast-track pathways for STEMI Angioplasty and Stroke Thrombolysis.</p>
                            </div>
                            <button onClick={() => setShowEmergencyModal(true)} className="px-4 py-2.5 bg-brand-rose hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-lg">
                                + Log Inbound Code Red
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {emergencyCases.map(em => (
                                <div key={em.id} className="bg-white p-6 rounded-3xl border-2 border-rose-200 shadow-md">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="px-2.5 py-1 bg-brand-rose text-white text-[10px] font-black rounded-lg uppercase">{em.code}</span>
                                            <h3 className="text-base font-black text-brand-navy mt-2">{em.patient}</h3>
                                            <p className="text-xs text-brand-rose font-bold mt-0.5">{em.condition}</p>
                                        </div>
                                        <span className="text-xs font-black text-slate-400">{em.bay}</span>
                                    </div>
                                    <div className="grid grid-cols-3 gap-2 mt-4 p-3 bg-slate-50 rounded-xl text-center">
                                        <div><p className="text-[10px] text-slate-400 font-black uppercase">BP</p><p className="font-black text-slate-900 text-sm">{em.bp}</p></div>
                                        <div><p className="text-[10px] text-slate-400 font-black uppercase">SpO2</p><p className="font-black text-rose-600 text-sm">{em.spo2}</p></div>
                                        <div><p className="text-[10px] text-slate-400 font-black uppercase">State</p><p className="font-bold text-amber-600 text-[11px]">{em.status}</p></div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between text-xs font-bold text-slate-600">
                                        <span>Surgeon: {em.doctor}</span>
                                        <span className="text-brand-cyan">Resus Bay Active</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: BED MAP */}
                {activeTab === 'BED_TELEMETRY' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-brand-navy">Quaternary Bed Map & Occupancy</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                            {beds.map(b => (
                                <div key={b.id} onClick={() => toggleBedStatus(b.id)} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md cursor-pointer transition flex flex-col justify-between h-40">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="font-black text-base text-brand-navy">{b.code}</span>
                                            <p className="text-xs text-slate-500 font-medium">{b.type}</p>
                                            <p className="text-[11px] text-brand-cyan font-bold mt-0.5">{b.tariff}</p>
                                        </div>
                                        <span className={`px-2 py-0.5 text-[10px] font-black rounded-lg border uppercase ${b.status === 'AVAILABLE' ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-rose-50 text-rose-700 border-rose-300'}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div className="text-xs font-semibold flex justify-between text-slate-600">
                                        <span>{b.patient || 'Vacant / Sanitized'}</span>
                                        <span className="text-brand-cyan font-bold text-[11px]">Cycle →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: TPA & FINANCE */}
                {activeTab === 'TPA_FINANCE' && (
                    <div className="space-y-6">
                        <h2 className="text-xl font-black text-brand-navy">Insurance TPA Split Billing & Ledgers</h2>
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm divide-y divide-slate-100 overflow-hidden">
                            <div className="p-4 bg-slate-50 flex justify-between text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span>General Ledger Account</span>
                                <div className="space-x-12"><span>Debit (DR)</span><span>Credit (CR)</span></div>
                            </div>
                            {ledgers.map(l => (
                                <div key={l.code} className="p-4 flex justify-between text-xs font-bold">
                                    <span className="text-slate-800">{l.code} - {l.desc}</span>
                                    <div className="space-x-12">
                                        <span className="text-emerald-600 font-black">{l.dr}</span>
                                        <span className="text-brand-cyan font-black">{l.cr}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL: OPD BOOKING */}
            {showBookingModal && selectedDoc && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleBooking} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-navy">Book Consultation Appointment</h3>
                                <p className="text-xs text-brand-cyan font-bold">{selectedDoc.name} • {selectedDoc.coeName}</p>
                            </div>
                            <button type="button" onClick={() => setShowBookingModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name</label>
                            <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="e.g. Ramesh Kumar" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                            <input type="tel" required value={patientPhone} onChange={e => setPatientPhone(e.target.value)} placeholder="+91 98490 00000" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Payer Mode</label>
                            <select value={payerType} onChange={e => setPayerType(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CASHLESS_TPA">Cashless TPA (Star / HDFC Ergo / ICICI)</option>
                                <option value="SELF_PAY">Direct Cash / UPI Consultation</option>
                                <option value="CORPORATE">Corporate Tie-Up</option>
                            </select>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl text-xs flex justify-between font-bold">
                            <span>Consultation Fee:</span>
                            <span className="text-brand-navy">{selectedDoc.fee}</span>
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowBookingModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-brand-cyan text-white rounded-xl text-xs font-bold shadow">Confirm Appointment</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL: CODE RED */}
            {showEmergencyModal && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleEmergency} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl border-2 border-brand-rose">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-rose">🚨 Emergency Code Red Fast-Track</h3>
                                <p className="text-xs text-slate-500">Notifies Cath Lab, Stroke, and Trauma Resuscitation teams.</p>
                            </div>
                            <button type="button" onClick={() => setShowEmergencyModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Protocol</label>
                            <select value={emCode} onChange={e => setEmCode(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CODE_RED">Code Red - Cardiac Arrest / Severe Polytrauma</option>
                                <option value="CODE_STROKE">Code Stroke - Acute Stroke Resuscitation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
                            <input type="text" value={emPatient} onChange={e => setEmPatient(e.target.value)} placeholder="e.g. Unidentified Male (Approx 50y)" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div><label className="block text-xs font-bold text-slate-700 mb-1">BP (mmHg)</label><input type="text" value={emBP} onChange={e => setEmBP(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" /></div>
                            <div><label className="block text-xs font-bold text-slate-700 mb-1">SpO2</label><input type="text" value={emSpo2} onChange={e => setEmSpo2(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" /></div>
                        </div>
                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowEmergencyModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-brand-rose text-white rounded-xl text-xs font-bold shadow">Activate Resuscitation</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL: HEALTH PACKAGE */}
            {showPackageModal && selectedPackage && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-navy">{selectedPackage.name}</h3>
                                <p className="text-xs text-emerald-600 font-bold">{selectedPackage.tests} • {selectedPackage.price}</p>
                            </div>
                            <button onClick={() => setShowPackageModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <p className="text-xs text-slate-600">Enter your details to reserve your morning fasting appointment slot at our central diagnostics hub.</p>
                        <input type="text" placeholder="Your Name" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <input type="tel" placeholder="Mobile Number" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <button onClick={() => { alert('Health Package booked! Our central intake coordinator will call you for fasting instructions.'); setShowPackageModal(false); }} className="w-full py-3 bg-brand-cyan text-white text-xs font-bold rounded-xl shadow">
                            Confirm Package Booking
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
