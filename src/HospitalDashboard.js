import React, { useState } from 'react';

export default function HospitalDashboard() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('admin@wecure.hospital');
    const [password, setPassword] = useState('WecureAdmin2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');
    const [selectedLocation, setSelectedLocation] = useState('HYDERABAD_HITECH');
    const [selectedCoE, setSelectedCoE] = useState('ALL');
    const [searchQuery, setSearchQuery] = useState('');
    const [showAiDrawer, setShowAiDrawer] = useState(false);

    // Modals
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);
    const [showPackageModal, setShowPackageModal] = useState(false);
    const [showCostModal, setShowCostModal] = useState(false);
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [selectedProcedure, setSelectedProcedure] = useState(null);

    // Form inputs
    const [patientName, setPatientName] = useState('');
    const [patientPhone, setPatientPhone] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('2026-08-25');
    const [payerType, setPayerType] = useState('CASHLESS_TPA');
    const [channelPref, setChannelPref] = useState('WHATSAPP');
    const [emPatient, setEmPatient] = useState('');
    const [emCode, setEmCode] = useState('CODE_RED');
    const [emBP, setEmBP] = useState('80/50 mmHg');
    const [emSpo2, setEmSpo2] = useState('84%');

    // AI & Comms Feeds
    const [aiLogs, setAiLogs] = useState([
        { id: 1, agent: 'Clinical Decision Support (CDS)', text: 'Analyzed all inpatient telemetry streams. Arterial pO2 parameters normal. Zero emergent sepsis alerts.', time: '2 mins ago', type: 'NORMAL' },
        { id: 2, agent: 'Bed Allocation Optimizer', text: 'Recommendation: Discharge CCU-02 patient to Deluxe Room 401 to free up critical care bay for inbound STEMI.', time: '12 mins ago', type: 'ACTION' }
    ]);
    const [commsFeed, setCommsFeed] = useState([
        { id: 1, channel: 'WHATSAPP', to: '+91 98490 12345', text: 'OPD Token #42 confirmed for Dr. Ashish Patel (Cardiology)', time: 'Just now' },
        { id: 2, channel: 'SMS', to: '+91 98490 67890', text: '🚨 Code Red activated for Trauma Bay 1. On-call surgeon notified.', time: '15 mins ago' }
    ]);

    // Hospital Locations
    const locations = [
        { id: 'HYDERABAD_HITECH', name: 'Hyderabad (Hitech City)', beds: 450, emergency: '040 6833 4455' },
        { id: 'HYDERABAD_FINANCIAL', name: 'Hyderabad (Financial District)', beds: 350, emergency: '040 6833 4466' },
        { id: 'VIZAG_MVP', name: 'Visakhapatnam (MVP Colony)', beds: 300, emergency: '0891 6833 4455' },
        { id: 'KAKINADA', name: 'Kakinada Main Hospital', beds: 250, emergency: '0884 6833 4455' },
        { id: 'BENGALURU_WHITEFIELD', name: 'Bengaluru (Whitefield)', beds: 400, emergency: '080 6833 4455' },
        { id: 'NAVI_MUMBAI', name: 'Navi Mumbai Super Speciality', beds: 350, emergency: '022 6833 4455' }
    ];

    // Centres of Excellence (8 CoEs)
    const coeList = [
        {
            id: 'CARDIOLOGY',
            name: 'Cardiology & Cardiothoracic Surgery',
            tagline: 'Cath Labs, TAVI, Minimal Invasive Bypass & Robotic Heart Surgery',
            icon: '❤️',
            img: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=800&q=80',
            desc: '5-second rapid cardiac CT scanning, 24x7 Primary Angioplasty (Door-to-Balloon <40 mins), and Electrophysiology.',
            doctorsCount: 16,
            bedsCount: 48,
            lead: 'Dr. Ashish Patel (Chief Interventional Cardiologist)'
        },
        {
            id: 'ONCOLOGY',
            name: 'Medicover Cancer Institute (MCI)',
            tagline: 'Surgical, Medical, Hemato-Oncology & TrueBeam Radiotherapy',
            icon: '🎗️',
            img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
            desc: 'Multi-disciplinary Tumor Board, Da Vinci Xi robotic resections, Bone Marrow Transplants, and Immunotherapy.',
            doctorsCount: 22,
            bedsCount: 65,
            lead: 'Dr. Meera Nambiar (Director Surgical Oncology)'
        },
        {
            id: 'ORTHOPAEDICS',
            name: 'Orthopaedics & Robotic Joint Surgery',
            tagline: 'Mako Robotic Knee & Hip Arthroplasty Centre',
            icon: '🦴',
            img: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
            desc: 'Sub-millimeter 3D robotic precision joint replacements, Complex Spine Trauma, and Sports Arthroscopy.',
            doctorsCount: 14,
            bedsCount: 40,
            lead: 'Dr. Sunita Bansal (Director Orthopaedics)'
        },
        {
            id: 'NEUROSCIENCES',
            name: 'Neurology & Neurosurgery',
            tagline: 'Comprehensive Stroke Fast-Track & Endoscopic Brain Surgery',
            icon: '🧠',
            img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80',
            desc: 'Deep Brain Stimulation (DBS) for Parkinson\'s, Micro-neurosurgery for Aneurysms, and 24x7 Neuro-ICU.',
            doctorsCount: 12,
            bedsCount: 32,
            lead: 'Dr. K. Srinivas (Senior Neurosurgeon)'
        },
        {
            id: 'GASTRO',
            name: 'Medical & Surgical Gastroenterology',
            tagline: 'Advanced Endoscopy, ERCP & GI Oncology',
            icon: '🔬',
            img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
            desc: 'SpyGlass Cholangioscopy, Endoscopic Ultrasound (EUS), Bariatric Weight Loss, and Colorectal Surgery.',
            doctorsCount: 10,
            bedsCount: 28,
            lead: 'Dr. Ramesh Chandra (Chief Gastroenterologist)'
        },
        {
            id: 'TRANSPLANT',
            name: 'Nephrology, Urology & Organ Transplants',
            tagline: 'Living Donor Liver, Renal & Pancreas Transplants',
            icon: '🫁',
            img: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=800&q=80',
            desc: 'Dedicated positive-pressure sterile transplant suites with 98.6% long-term graft survival record.',
            doctorsCount: 15,
            bedsCount: 26,
            lead: 'Dr. Vikramaditya Roy (Chief Transplant Surgeon)'
        },
        {
            id: 'WOMAN_CHILD',
            name: 'Woman & Child Speciality Hospital',
            tagline: 'Level-3 Advanced NICU, Fetal Medicine & Painless Birthing',
            icon: '👶',
            img: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80',
            desc: '24x7 In-house Neonatal Resuscitation teams, Pediatric Cardiology, IVF & High-Risk Obstetrics.',
            doctorsCount: 18,
            bedsCount: 50,
            lead: 'Dr. Rohit Agnihotri (Chief Pediatric Intensivist)'
        },
        {
            id: 'PULMONOLOGY',
            name: 'Pulmonology, Sleep & Critical Care',
            tagline: 'Advanced Bronchoscopy, EBUS & ECMO Support Unit',
            icon: '🫁',
            img: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=800&q=80',
            desc: 'Specialized ILD Clinic, Cryobiopsy, Sleep Apnea Diagnostics, and Advanced ARDS ECMO Care.',
            doctorsCount: 9,
            bedsCount: 24,
            lead: 'Dr. Ananya Ray (Head Pulmonology)'
        }
    ];

    // Doctor Directory
    const [doctors] = useState([
        {
            id: 'doc-1',
            name: 'Dr. Ashish Patel',
            coe: 'CARDIOLOGY',
            coeName: 'Cardiology & CTVS',
            role: 'Principal Director - Interventional Cardiology',
            exp: '22+ Years Experience',
            qual: 'MBBS, MD, DM (Cardiology), FACC (USA), FSCAI',
            fee: '₹1,800',
            rating: '4.98',
            reviews: '920+ Reviews',
            opd: 'Mon - Sat: 09:00 AM - 02:00 PM',
            avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-2',
            name: 'Dr. Meera Nambiar',
            coe: 'ONCOLOGY',
            coeName: 'Cancer Care Institute',
            role: 'Director - Surgical Oncology & Da Vinci Robotic Surgery',
            exp: '19+ Years Experience',
            qual: 'MS, MCh (Surgical Oncology), Robotic Fellow (UK)',
            fee: '₹2,000',
            rating: '4.96',
            reviews: '740+ Reviews',
            opd: 'Mon - Fri: 11:00 AM - 04:00 PM',
            avatar: 'https://images.unsplash.com/photo-1594824813627-7756f7ef0585?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-3',
            name: 'Dr. Sunita Bansal',
            coe: 'ORTHOPAEDICS',
            coeName: 'Robotic Orthopaedics',
            role: 'Chief Director - Mako Robotic Joint Replacement & Sports Injury',
            exp: '18+ Years Experience',
            qual: 'MS (Ortho), DNB, Fellowship in Joint Arthroplasty (Germany)',
            fee: '₹1,500',
            rating: '4.92',
            reviews: '610+ Reviews',
            opd: 'Mon - Fri: 09:30 AM - 03:30 PM',
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-4',
            name: 'Dr. K. Srinivas',
            coe: 'NEUROSCIENCES',
            coeName: 'Neurology & Neurosurgery',
            role: 'Senior Consultant - Brain, Spine & Micro-Neurosurgery',
            exp: '17+ Years Experience',
            qual: 'MBBS, MS, MCh (Neurosurgery), FINR (Zurich)',
            fee: '₹1,600',
            rating: '4.94',
            reviews: '530+ Reviews',
            opd: 'Mon - Sat: 10:00 AM - 03:00 PM',
            avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-5',
            name: 'Dr. Vikramaditya Roy',
            coe: 'TRANSPLANT',
            coeName: 'Organ Transplants',
            role: 'Chief Transplant Surgeon - Hepato-Pancreato-Biliary',
            exp: '24+ Years Experience',
            qual: 'MS, FRCS (Edin), ASTS Multi-Organ Transplant Fellow (USA)',
            fee: '₹2,500',
            rating: '4.99',
            reviews: '1,100+ Reviews',
            opd: 'Tue, Thu, Sat: 02:00 PM - 06:00 PM',
            avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=300&q=80'
        },
        {
            id: 'doc-6',
            name: 'Dr. Rohit Agnihotri',
            coe: 'WOMAN_CHILD',
            coeName: 'Woman & Child Care',
            role: 'Head - Neonatology & Level-3 Pediatric Critical Care',
            exp: '15+ Years Experience',
            qual: 'MD (Pediatrics), Fellowship in Neonatal Intensive Care (Sydney)',
            fee: '₹1,400',
            rating: '4.95',
            reviews: '810+ Reviews',
            opd: 'Mon - Sat: 08:30 AM - 01:00 PM',
            avatar: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&w=300&q=80'
        }
    ]);

    // Preventive Health Packages
    const [packages] = useState([
        {
            id: 'PKG-1',
            name: 'Master Health Checkup (Male / Female)',
            target: 'All Adults (25+ Years)',
            price: '₹3,999',
            original: '₹10,500',
            testsCount: '68 Parameters',
            includes: ['Complete Hemogram with ESR', 'Lipid Profile (Cholesterol, HDL, LDL, Triglycerides)', 'Liver Function Tests (SGOT, SGPT, Bilirubin)', 'Renal Function (Urea, Creatinine, Uric Acid)', 'Fasting Blood Sugar & HbA1c', 'ECG (12-Lead Cardiac Trace)', 'Chest X-Ray & Ultrasound Abdomen Pelvis', 'Senior Physician Consultation']
        },
        {
            id: 'PKG-2',
            name: 'Executive Heart & Stroke Screening Package',
            target: 'Corporate Executives & High Risk',
            price: '₹7,499',
            original: '₹18,500',
            testsCount: '84 Parameters',
            includes: ['5-Second CT Coronary Calcium Score', '2D Echocardiography & Color Doppler', 'Treadmill Stress Test (TMT)', 'Carotid Doppler for Stroke Screening', 'High-Sensitivity Troponin & hs-CRP', 'Lipoprotein (a) & Homocysteine Level', 'Thyroid Profile (T3, T4, TSH)', 'Consultation with Senior Interventional Cardiologist']
        },
        {
            id: 'PKG-3',
            name: 'Comprehensive Cancer Screening (Women)',
            target: 'Women (30+ Years)',
            price: '₹4,999',
            original: '₹14,000',
            testsCount: '52 Parameters',
            includes: ['Digital Mammography (Bilateral Breast Scan)', 'Liquid-Based Pap Smear (Cervical Screening)', 'CA-125 Ovarian Tumor Marker', 'Ultrasound Pelvis', 'Stool for Occult Blood', 'Complete Blood Count & Liver Profile', 'Clinical Exam by Senior Gynecologist']
        },
        {
            id: 'PKG-4',
            name: 'Senior Citizen Complete Wellness Package',
            target: 'Geriatric Wellness (60+ Years)',
            price: '₹4,499',
            original: '₹12,000',
            testsCount: '72 Parameters',
            includes: ['DEXA Bone Mineral Density Scan', 'Serum Calcium & Vitamin D3 Total', 'Serum Vitamin B12 & Electrolytes', 'Prostate Specific Antigen (PSA - Men)', 'Kidney Function & Microalbuminuria', 'Diabetic Retinopathy Eye Screening', 'Geriatric Physician Consultation']
        }
    ]);

    // Surgical Procedures Cost Guide
    const [procedures] = useState([
        { id: 'PROC-1', name: 'Mako Robotic Total Knee Replacement', coe: 'Robotic Orthopaedics', stay: '3 Days Inpatient', estCost: '₹1,95,000 - ₹2,40,000', tpa: '100% Covered under Cashless Insurance', includes: 'Implants, Robotic Console, OT Charges, Surgeon Fee & Physiotherapy' },
        { id: 'PROC-2', name: 'Coronary Angioplasty with DES Stent', coe: 'Cardiac Sciences', stay: '2 Days Inpatient', estCost: '₹1,45,000 - ₹1,85,000', tpa: 'Covered under CGHS, ECHS & All TPAs', includes: 'FDA-Approved DES Stents, Cath Lab Consumables, ICU Stay' },
        { id: 'PROC-3', name: 'Da Vinci Robotic Laparoscopic Hysterectomy', coe: 'Woman & Child Care', stay: '2 Days Inpatient', estCost: '₹1,60,000 - ₹2,10,000', tpa: 'Instant Pre-Auth Cashless Approval', includes: '4th Gen Da Vinci Consumables, Single Deluxe Room, Post-Op Care' },
        { id: 'PROC-4', name: 'Living Donor Renal (Kidney) Transplant', coe: 'Organ Transplants', stay: '7-10 Days Inpatient', estCost: '₹6,50,000 - ₹8,50,000', tpa: 'Multi-Payer / Government Scheme Eligible', includes: 'Donor & Recipient Surgery, Sterile ICU Suite, Immuno-Suppression' }
    ]);

    // Emergency Cases
    const [emergencyCases, setEmergencyCases] = useState([
        { id: 'EM-901', patient: 'Kishore Varma (62y/M)', code: 'CODE_RED', condition: 'Acute Anterior STEMI - Door-to-Balloon (38 mins)', bp: '82/54', spo2: '86%', bay: 'Cath Lab Resus 1', doctor: 'Dr. Ashish Patel', status: 'ANGIOPLASTY_READY' },
        { id: 'EM-902', patient: 'Sujata Devi (48y/F)', code: 'CODE_STROKE', condition: 'Right MCA Ischemic Stroke (Window: 2.1 hrs)', bp: '175/105', spo2: '96%', bay: 'Neuro Trauma Bay 3', doctor: 'Dr. K. Srinivas', status: 'IV_THROMBOLYSIS' }
    ]);

    // Beds Telemetry
    const [beds, setBeds] = useState([
        { id: 1, code: 'CCU-BAY-01', type: 'Critical Care Unit', coe: 'CARDIOLOGY', status: 'OCCUPIED', patient: 'Kishore Varma', tariff: '₹12,000/day' },
        { id: 2, code: 'CCU-BAY-02', type: 'Critical Care Unit', coe: 'CARDIOLOGY', status: 'AVAILABLE', patient: null, tariff: '₹12,000/day' },
        { id: 3, code: 'BMT-STERILE-1', type: 'Bone Marrow Unit', coe: 'ONCOLOGY', status: 'OCCUPIED', patient: 'Sunil Rao', tariff: '₹18,000/day' },
        { id: 4, code: 'TX-BAY-ALPHA', type: 'Transplant Sterile Suite', coe: 'TRANSPLANT', status: 'OCCUPIED', patient: 'Ramesh Sen', tariff: '₹22,000/day' },
        { id: 5, code: 'NICU-ISO-04', type: 'Neonatal ICU Level 3', coe: 'WOMAN_CHILD', status: 'AVAILABLE', patient: null, tariff: '₹9,500/day' },
        { id: 6, code: 'DLX-SUITE-501', type: 'Presidential Deluxe Suite', coe: 'CARDIOLOGY', status: 'AVAILABLE', patient: null, tariff: '₹15,000/day' }
    ]);

    // Financial Ledgers
    const [ledgers] = useState([
        { code: '1010-CASH', desc: 'OPD Cash & UPI Billing Registry', dr: '₹8,45,000.00', cr: '₹0.00' },
        { code: '1020-BANK', desc: 'Operating Escrow Account', dr: '₹64,20,000.00', cr: '₹0.00' },
        { code: '1030-TPA-RECV', desc: 'Insurance / Cashless TPA Claims (Star, HDFC Ergo, ICICI, Medi Assist)', dr: '₹52,80,000.00', cr: '₹0.00' },
        { code: '2010-IP-ESCROW', desc: 'Inpatient Surgeries Advance Deposits', dr: '₹0.00', cr: '₹34,50,000.00' },
        { code: '4010-CLINICAL-REV', desc: 'Robotic Surgery & Cath Lab Procedural Revenue', dr: '₹0.00', cr: '₹90,95,000.00' }
    ]);

    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        const credMap = {
            'admin@wecure.hospital': { pass: 'WecureAdmin2026!', name: 'Dr. Sarah Jenkins', role: 'CHIEF_MEDICAL_OFFICER', mods: ['DASHBOARD', 'CENTRES_OF_EXCELLENCE', 'DOCTORS_ROSTER', 'HEALTH_PACKAGES', 'SURGERY_COSTS', 'EMERGENCY_24X7', 'BED_TELEMETRY', 'TPA_FINANCE'] },
            'cardio@wecure.hospital': { pass: 'WecureCardio2026!', name: 'Dr. Ashish Patel', role: 'DIRECTOR_CARDIOLOGY', mods: ['DASHBOARD', 'CENTRES_OF_EXCELLENCE', 'DOCTORS_ROSTER', 'EMERGENCY_24X7', 'BED_TELEMETRY'] },
            'emergency@wecure.hospital': { pass: 'WecureEmergency2026!', name: 'Dr. K. Srinivas', role: 'CHIEF_TRAUMA_HEAD', mods: ['DASHBOARD', 'EMERGENCY_24X7', 'BED_TELEMETRY'] },
            'finance@wecure.hospital': { pass: 'WecureFinance2026!', name: 'Naveen Aggarwal', role: 'CFO_TPA_HEAD', mods: ['DASHBOARD', 'SURGERY_COSTS', 'TPA_FINANCE'] }
        };

        const found = credMap[email.trim().toLowerCase()];
        if (found && found.pass === password) {
            setUser(found);
            setActiveTab(found.mods[0]);
        } else {
            setErr('Invalid workstation credential.');
        }
    };

    const toggleBedStatus = (id) => {
        const cycle = ['AVAILABLE', 'OCCUPIED', 'CLEANING', 'DIRTY'];
        setBeds(beds.map(b => b.id === id ? { ...b, status: cycle[(cycle.indexOf(b.status) + 1) % cycle.length] } : b));
    };

    const handleBooking = (e) => {
        e.preventDefault();
        const tokenNum = Math.floor(10 + Math.random() * 90);
        const newMsg = {
            id: Date.now(),
            channel: channelPref,
            to: patientPhone || '+91 98490 12345',
            text: `Confirmed Token #${tokenNum} for ${patientName} with ${selectedDoc.name} on ${appointmentDate}. Payer: ${payerType}.`,
            time: 'Just now'
        };
        setCommsFeed([newMsg, ...commsFeed]);
        alert(`OPD Consultation Token #${tokenNum} issued for ${patientName} with ${selectedDoc.name}! Instant confirmation dispatched via ${channelPref}.`);
        setShowBookingModal(false);
        setPatientName('');
        setPatientPhone('');
    };

    const handleEmergency = (e) => {
        e.preventDefault();
        const newCase = {
            id: `EM-${Math.floor(900 + Math.random() * 100)}`,
            patient: emPatient || 'Unidentified Emergency Patient',
            code: emCode,
            condition: emCode === 'CODE_RED' ? 'Acute Cardiac Arrest / Severe Polytrauma' : 'Acute Neurovascular Stroke Event',
            bp: emBP,
            spo2: emSpo2,
            bay: 'Trauma Resus Bay Alpha',
            doctor: 'On-Duty Chief Trauma Resuscitator',
            status: 'RESUSCITATION_ACTIVE'
        };
        setEmergencyCases([newCase, ...emergencyCases]);

        // Add AI Log & Comms
        setAiLogs([
            { id: Date.now(), agent: 'Autonomous Triage Agent (AETA)', text: `🚨 ${emCode} Analysis: SpO2 ${emSpo2} indicates critical hypoxemia. CCU-01 reserved with Mechanical Ventilator. WhatsApp trauma alert sent to on-duty surgeon.`, time: 'Just now', type: 'CRITICAL' },
            ...aiLogs
        ]);
        setCommsFeed([
            { id: Date.now() + 1, channel: 'WHATSAPP', to: '+91 98490 12345 (Trauma Registry)', text: `🚨 ${emCode} Alert: ${newCase.patient}. BP ${emBP} | SpO2 ${emSpo2}. Bay: Alpha.`, time: 'Just now' },
            ...commsFeed
        ]);

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

    const currentLoc = locations.find(l => l.id === selectedLocation) || locations[0];
    const filteredDocs = doctors.filter(d => {
        const matchCoE = selectedCoE === 'ALL' || d.coe === selectedCoE;
        const matchSearch = d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.role.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCoE && matchSearch;
    });

    return (
        <div className="min-h-screen bg-[#F4F7F9] text-brand-dark flex flex-col font-sans">
            
            {/* 1. TOP UTILITY STRIP */}
            <div className="bg-brand-navy text-white px-8 py-2 text-xs flex flex-col md:flex-row justify-between items-center border-b border-white/10 gap-2">
                <div className="flex items-center space-x-4 text-[11px] flex-wrap">
                    <span className="flex items-center font-black text-brand-rose">
                        <span className="w-2.5 h-2.5 rounded-full bg-brand-rose animate-ping mr-2"></span>
                        24x7 Emergency Hotline: {currentLoc.emergency}
                    </span>
                    <span className="hidden lg:inline text-slate-400">|</span>
                    <span className="hidden lg:inline text-slate-300">European Clinical Standard • 26+ Multi-Speciality Network</span>
                </div>

                <div className="flex items-center space-x-3 text-[11px]">
                    {/* HUB SELECTOR */}
                    <div className="flex items-center space-x-1.5 bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                        <span className="text-slate-300">📍 Hub:</span>
                        <select
                            value={selectedLocation}
                            onChange={e => setSelectedLocation(e.target.value)}
                            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
                        >
                            {locations.map(loc => (
                                <option key={loc.id} value={loc.id} className="text-brand-dark">
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button onClick={() => setShowEmergencyModal(true)} className="px-3 py-1 bg-brand-rose hover:bg-rose-700 text-white font-black rounded-lg uppercase tracking-wider shadow">
                        🚨 Code Red
                    </button>
                    <button onClick={() => setShowAiDrawer(!showAiDrawer)} className="px-3 py-1 bg-brand-cyan hover:bg-brand-cyanHover text-white font-bold rounded-lg text-[10px]">
                        🤖 AI & Comms Feed ({aiLogs.length + commsFeed.length})
                    </button>
                    <span className="font-bold text-brand-cyan hidden sm:inline">{user.name}</span>
                </div>
            </div>

            {/* 2. MAIN BRAND NAVIGATION BAR */}
            <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-brand-cyan text-white font-black text-xl flex items-center justify-center shadow-md shadow-brand-cyan/20">
                        W
                    </div>
                    <div>
                        <h1 className="text-lg font-black text-brand-navy tracking-tight leading-tight">WECURE HOSPITALS</h1>
                        <p className="text-[10px] text-brand-cyan font-bold uppercase tracking-wider">{currentLoc.name} ({currentLoc.beds} Beds)</p>
                    </div>
                </div>

                {/* NAVIGATION TABS */}
                <div className="hidden xl:flex items-center bg-slate-100 p-1.5 rounded-2xl space-x-1 border border-slate-200">
                    {[
                        { id: 'DASHBOARD', label: 'Overview', icon: '⚡' },
                        { id: 'CENTRES_OF_EXCELLENCE', label: 'Centres of Excellence', icon: '🏛️' },
                        { id: 'DOCTORS_ROSTER', label: 'Find a Doctor', icon: '👨‍⚕️' },
                        { id: 'HEALTH_PACKAGES', label: 'Health Packages', icon: '🩺' },
                        { id: 'SURGERY_COSTS', label: 'Surgery Cost Guide', icon: '💰' },
                        { id: 'EMERGENCY_24X7', label: '24x7 Emergency', icon: '🚨' },
                        { id: 'BED_TELEMETRY', label: 'Bed Telemetry', icon: '🛏️' },
                        { id: 'TPA_FINANCE', label: 'Cashless TPA', icon: '💳' }
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

            {/* 3. HERO SHOWCASE WITH 4-ACTION QUICK HUB */}
            <div className="bg-gradient-to-r from-brand-navy via-[#003B64] to-brand-cyan text-white px-8 py-8 shadow-inner relative overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start lg:items-center relative z-10 gap-6">
                    <div>
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-black bg-white/20 text-cyan-200 uppercase tracking-widest border border-white/20">
                            Multi-Speciality Quaternary Network
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black mt-2 tracking-tight">Advanced European Clinical Care & Robotic Surgery</h2>
                        <p className="text-xs text-slate-100 mt-1 max-w-2xl leading-relaxed">
                            Equipped with 4th Gen Da Vinci Robotic Surgery, 5-Second Rapid Cardiac CT Scanners, TrueBeam Radiotherapy, and 24x7 Cath Labs.
                        </p>
                    </div>

                    {/* 4-ACTION QUICK TILES */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto">
                        <button onClick={() => { setActiveTab('DOCTORS_ROSTER'); setSelectedDoc(doctors[0]); setShowBookingModal(true); }} className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl border border-white/20 backdrop-blur-md text-left transition flex flex-col justify-between">
                            <span className="text-xl">📅</span>
                            <span className="text-[11px] font-black mt-2">Book OPD Appointment</span>
                        </button>
                        <button onClick={() => setActiveTab('DOCTORS_ROSTER')} className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl border border-white/20 backdrop-blur-md text-left transition flex flex-col justify-between">
                            <span className="text-xl">👨‍⚕️</span>
                            <span className="text-[11px] font-black mt-2">Find a Doctor</span>
                        </button>
                        <button onClick={() => setActiveTab('HEALTH_PACKAGES')} className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl border border-white/20 backdrop-blur-md text-left transition flex flex-col justify-between">
                            <span className="text-xl">🩺</span>
                            <span className="text-[11px] font-black mt-2">Health Packages</span>
                        </button>
                        <button onClick={() => setActiveTab('SURGERY_COSTS')} className="bg-white/10 hover:bg-white/20 p-3 rounded-2xl border border-white/20 backdrop-blur-md text-left transition flex flex-col justify-between">
                            <span className="text-xl">💰</span>
                            <span className="text-[11px] font-black mt-2">Surgery Cost Estimator</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* 4. MAIN WORKSPACE */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">

                {/* TAB: DASHBOARD OVERVIEW */}
                {activeTab === 'DASHBOARD' && (
                    <div className="space-y-8">
                        {/* KPI STAT TILES */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Centres of Excellence</p>
                                <h3 className="text-2xl font-black text-brand-navy mt-1">8 Specialized Institutes</h3>
                                <p className="text-[11px] text-brand-cyan font-bold mt-2">Robotic OTs & Cath Labs Active</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">ICU / Bed Occupancy</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">
                                    {Math.round((beds.filter(b => b.status === 'OCCUPIED').length / beds.length) * 100)}%
                                </h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">{beds.filter(b => b.status === 'AVAILABLE').length} Critical Care Beds Open</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Trauma Resuscitation</p>
                                <h3 className="text-2xl font-black text-brand-rose mt-1">{emergencyCases.length} Active Codes</h3>
                                <p className="text-[11px] text-rose-500 font-bold mt-2">Door-to-Balloon &lt; 40 mins</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[11px] font-black uppercase text-slate-400 tracking-wider">Cashless TPA Billing</p>
                                <h3 className="text-2xl font-black text-emerald-600 mt-1">₹90.95 Lakhs</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-2">35+ Insurance Tie-ups Cleared</p>
                            </div>
                        </div>

                        {/* COES SHOWCASE GRID */}
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-black text-brand-navy">Centres of Excellence (CoEs)</h3>
                                <button onClick={() => setActiveTab('CENTRES_OF_EXCELLENCE')} className="text-xs font-bold text-brand-cyan hover:underline">Explore All 8 Institutes →</button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {coeList.slice(0, 3).map(coe => (
                                    <div key={coe.id} className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                        <img src={coe.img} alt={coe.name} className="h-44 w-full object-cover" />
                                        <div className="p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <span className="text-[10px] font-black text-brand-cyan uppercase tracking-wider">{coe.tagline}</span>
                                                <h4 className="font-black text-brand-navy text-base mt-1">{coe.name}</h4>
                                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">{coe.desc}</p>
                                            </div>
                                            <button onClick={() => { setSelectedCoE(coe.id); setActiveTab('DOCTORS_ROSTER'); }} className="mt-4 w-full py-2 bg-slate-100 hover:bg-brand-navy hover:text-white text-brand-navy text-xs font-bold rounded-xl transition">
                                                Consult Specialists →
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
                                            <p><strong>Senior Faculty:</strong> {coe.doctorsCount} Super Specialists</p>
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

                {/* TAB: DOCTOR DIRECTORY */}
                {activeTab === 'DOCTORS_ROSTER' && (
                    <div className="space-y-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-brand-navy">Doctor Directory & OPD Consultation Scheduling</h2>
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
                                    {c.name.split(' ')[0]}
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

                {/* TAB: PREVENTIVE HEALTH PACKAGES */}
                {activeTab === 'HEALTH_PACKAGES' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-brand-navy">Preventive Master Health Checkup Packages</h2>
                            <p className="text-xs text-slate-500">Comprehensive full-body, cardiac, diabetic & cancer screenings.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {packages.map(pkg => (
                                <div key={pkg.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-lg transition flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-lg uppercase tracking-wider">{pkg.testsCount}</span>
                                            <span className="text-xs font-bold text-slate-400">{pkg.target}</span>
                                        </div>
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
                                        Book Health Checkup Slot
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB: SURGERY COST ESTIMATOR */}
                {activeTab === 'SURGERY_COSTS' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-brand-navy">Surgical Procedures & Transparent Cost Guide</h2>
                            <p className="text-xs text-slate-500">Estimated tariffs with itemized break-ups for cashless insurance & TPAs.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {procedures.map(proc => (
                                <div key={proc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                                    <div>
                                        <span className="px-2.5 py-1 bg-cyan-50 text-brand-cyan text-[10px] font-black rounded uppercase">{proc.coe}</span>
                                        <h3 className="text-base font-black text-brand-navy mt-2">{proc.name}</h3>
                                        <p className="text-xs text-emerald-600 font-bold mt-1">✓ {proc.tpa}</p>
                                        <div className="mt-4 p-4 bg-slate-50 rounded-2xl space-y-2 text-xs text-slate-600 font-medium">
                                            <div className="flex justify-between"><span className="text-slate-400">Hospital Stay:</span><span className="font-bold text-slate-800">{proc.stay}</span></div>
                                            <div className="flex justify-between"><span className="text-slate-400">Cost Range:</span><span className="font-black text-brand-navy text-sm">{proc.estCost}</span></div>
                                            <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-200"><strong>Inclusions:</strong> {proc.includes}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => { setSelectedProcedure(proc); setShowCostModal(true); }} className="mt-5 w-full py-2.5 bg-brand-cyan hover:bg-brand-cyanHover text-white text-xs font-bold rounded-xl shadow transition">
                                        Request Custom Cost Estimate
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
                                    24x7 Emergency Trauma & Critical Resuscitation
                                </h2>
                                <p className="text-xs text-slate-500">Fast-track pathways for STEMI Angioplasty, Stroke Thrombolysis, and Polytrauma.</p>
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
                        <h2 className="text-xl font-black text-brand-navy">Quaternary Bed Map & Telemetry</h2>
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

            {/* SIDE DRAWER: AI CDS & WHATSAPP/SMS COMMS FEED */}
            {showAiDrawer && (
                <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col p-6 overflow-y-auto">
                    <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                        <div>
                            <h3 className="text-base font-black text-brand-navy">🤖 AI Agents & Comms Core</h3>
                            <p className="text-[11px] text-brand-cyan font-bold">Autonomous Clinical Decision Support & Omnichannel Feed</p>
                        </div>
                        <button onClick={() => setShowAiDrawer(false)} className="text-slate-400 font-bold text-lg">✕</button>
                    </div>

                    <div className="mt-6 space-y-6">
                        {/* AI Log Entries */}
                        <div>
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Autonomous Reasoning Logs</h4>
                            <div className="space-y-3">
                                {aiLogs.map(log => (
                                    <div key={log.id} className={`p-3.5 rounded-2xl border text-xs ${log.type === 'CRITICAL' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-slate-50 border-slate-200 text-slate-800'}`}>
                                        <div className="flex justify-between font-black">
                                            <span>{log.agent}</span>
                                            <span className="text-[10px] opacity-75">{log.time}</span>
                                        </div>
                                        <p className="mt-1 leading-relaxed font-medium">{log.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Dispatch Entries */}
                        <div>
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Live Dispatches (WhatsApp / SMS)</h4>
                            <div className="space-y-3">
                                {commsFeed.map(c => (
                                    <div key={c.id} className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1">
                                        <div className="flex justify-between items-center">
                                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${c.channel === 'WHATSAPP' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'}`}>{c.channel}</span>
                                            <span className="text-[10px] text-slate-400 font-bold">{c.time}</span>
                                        </div>
                                        <p className="font-bold text-slate-700">To: {c.to}</p>
                                        <p className="text-slate-600 bg-white p-2 rounded-xl border border-slate-100 font-mono text-[11px]">{c.text}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL: OPD BOOKING WITH WHATSAPP/SMS OPTION */}
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
                            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone (For WhatsApp / SMS)</label>
                            <input type="tel" required value={patientPhone} onChange={e => setPatientPhone(e.target.value)} placeholder="+91 98490 00000" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Confirmation Channel</label>
                            <select value={channelPref} onChange={e => setChannelPref(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="WHATSAPP">WhatsApp Official Notification</option>
                                <option value="SMS">Standard SMS Gateway</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Appointment Date</label>
                            <input type="date" required value={appointmentDate} onChange={e => setAppointmentDate(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Payer Mode</label>
                            <select value={payerType} onChange={e => setPayerType(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="CASHLESS_TPA">Cashless Insurance (Star / HDFC Ergo / ICICI)</option>
                                <option value="SELF_PAY">Direct Cash / UPI Consultation</option>
                                <option value="CORPORATE">Corporate Health Tie-Up</option>
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
                                <option value="CODE_STROKE">Code Stroke - Acute Stroke Resuscitation (&lt; 4.5 hrs)</option>
                                <option value="CODE_STEMI">Code STEMI - Emergency Angioplasty (&lt; 40 mins)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Identifier</label>
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
                                <p className="text-xs text-emerald-600 font-bold">{selectedPackage.testsCount} • {selectedPackage.price}</p>
                            </div>
                            <button onClick={() => setShowPackageModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <p className="text-xs text-slate-600">Reserve your fasting morning slot at {currentLoc.name}. Includes all diagnostic markers and physician review.</p>
                        <input type="text" placeholder="Patient Full Name" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <input type="tel" placeholder="Mobile Number" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <button onClick={() => { alert('Health Checkup slot reserved! An intake coordinator will contact you with fasting instructions.'); setShowPackageModal(false); }} className="w-full py-3 bg-brand-cyan text-white text-xs font-bold rounded-xl shadow">
                            Confirm Checkup Reservation
                        </button>
                    </div>
                </div>
            )}

            {/* MODAL: SURGERY ESTIMATE */}
            {showCostModal && selectedProcedure && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-brand-navy">{selectedProcedure.name}</h3>
                                <p className="text-xs text-brand-cyan font-bold">{selectedProcedure.coe}</p>
                            </div>
                            <button onClick={() => setShowCostModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>
                        <div className="p-3 bg-slate-50 rounded-xl text-xs space-y-1">
                            <p><strong>Estimated Tariff:</strong> {selectedProcedure.estCost}</p>
                            <p><strong>Hospitalization:</strong> {selectedProcedure.stay}</p>
                            <p className="text-emerald-600 font-bold">✓ {selectedProcedure.tpa}</p>
                        </div>
                        <input type="text" placeholder="Patient Name" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <input type="tel" placeholder="Phone for Financial Counseling Call" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        <button onClick={() => { alert('Financial counseling request submitted! A billing executive will share the itemized estimate.'); setShowCostModal(false); }} className="w-full py-3 bg-brand-navy text-white text-xs font-bold rounded-xl shadow">
                            Request Detailed Breakdown
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
