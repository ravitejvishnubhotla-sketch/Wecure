import React, { useState } from 'react';

export default function HospitalDashboard() {
    // Current Active Session
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('founder@wecure.hospital');
    const [password, setPassword] = useState('WecureFounder2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');

    // Filter states
    const [bedFilter, setBedFilter] = useState('ALL');
    const [crmStageFilter, setCrmStageFilter] = useState('ALL');

    // Modals
    const [showUserModal, setShowUserModal] = useState(false);
    const [showLeadModal, setShowLeadModal] = useState(false);
    const [showSlotModal, setShowSlotModal] = useState(false);
    const [selectedDocForSlot, setSelectedDocForSlot] = useState(null);

    // 1. RBAC & USER REGISTRY
    const [usersList, setUsersList] = useState([
        { id: 'u1', name: 'Dr. Sarma Vishnubhotla', email: 'founder@wecure.hospital', pass: 'WecureFounder2026!', role: 'FOUNDER_CEO', dept: 'Executive Board', status: 'ACTIVE', permissions: { executive: true, docBookingAdmin: true, crm: true, userMgmt: true, assets: true, otAmbulance: true, triage: true } },
        { id: 'u2', name: 'Pravin Kumar (Admin)', email: 'admin@wecure.hospital', pass: 'WecureAdmin2026!', role: 'HOSPITAL_ADMIN', dept: 'Hospital Operations', status: 'ACTIVE', permissions: { executive: true, docBookingAdmin: true, crm: true, userMgmt: true, assets: true, otAmbulance: true, triage: true } },
        { id: 'u3', name: 'Naveen Aggarwal', email: 'management@wecure.hospital', pass: 'WecureExec2026!', role: 'EXECUTIVE_MANAGEMENT', dept: 'Finance & Strategy', status: 'ACTIVE', permissions: { executive: true, docBookingAdmin: true, crm: true, userMgmt: false, assets: true, otAmbulance: true, triage: false } },
        { id: 'u4', name: 'Anjali Roy', email: 'pro@wecure.hospital', pass: 'WecurePro2026!', role: 'PRO_MARKETING_TEAM', dept: 'Public Relations & Growth', status: 'ACTIVE', permissions: { executive: false, docBookingAdmin: false, crm: true, userMgmt: false, assets: false, otAmbulance: false, triage: false } },
        { id: 'u5', name: 'Dr. Ashish Patel', email: 'cardio@wecure.hospital', pass: 'WecureCardio2026!', role: 'DOCTOR_CONSULTANT', dept: 'Cardiology', status: 'ACTIVE', permissions: { executive: false, docBookingAdmin: false, crm: false, userMgmt: false, assets: false, otAmbulance: true, triage: true } },
        { id: 'u6', name: 'Sister Margaret', email: 'nurse@wecure.hospital', pass: 'WecureNurse2026!', role: 'NURSING_DUTY', dept: 'Critical Care ICU', status: 'ACTIVE', permissions: { executive: false, docBookingAdmin: false, crm: false, userMgmt: false, assets: true, otAmbulance: true, triage: true } }
    ]);

    // New User State Form
    const [newUserName, setNewUserName] = useState('');
    const [newUserEmail, setNewUserEmail] = useState('');
    const [newUserRole, setNewUserRole] = useState('PRO_MARKETING_TEAM');
    const [newUserDept, setNewUserDept] = useState('PR & Corporate Outreach');

    // 2. CAPACITY & ASSETS ENGINE (200 Beds Total, 5 OTs, 3 Ambulances)
    // 12 NICU, 8 ICU, 30 Deluxe, 50 Twin, 100 General
    const [beds, setBeds] = useState(() => {
        const generatedBeds = [];
        // 12 NICU
        for (let i = 1; i <= 12; i++) generatedBeds.push({ id: `NICU-${i}`, type: 'NICU', floor: 2, status: i <= 7 ? 'OCCUPIED' : 'AVAILABLE', patient: i <= 7 ? `Neonate #${100 + i}` : null, tariff: '₹9,500/day' });
        // 8 ICU
        for (let i = 1; i <= 8; i++) generatedBeds.push({ id: `ICU-BAY-${i}`, type: 'ICU', floor: 1, status: i <= 5 ? 'OCCUPIED' : 'AVAILABLE', patient: i <= 5 ? `Critical Patient #${200 + i}` : null, tariff: '₹14,000/day' });
        // 30 Single Deluxe
        for (let i = 1; i <= 30; i++) generatedBeds.push({ id: `DLX-${300 + i}`, type: 'DELUXE', floor: 3, status: i <= 18 ? 'OCCUPIED' : 'AVAILABLE', patient: i <= 18 ? `Deluxe Patient #${300 + i}` : null, tariff: '₹8,000/day' });
        // 50 Twin Sharing
        for (let i = 1; i <= 50; i++) generatedBeds.push({ id: `TWIN-${400 + i}`, type: 'TWIN_SHARING', floor: 4, status: i <= 35 ? 'OCCUPIED' : 'AVAILABLE', patient: i <= 35 ? `Inpatient #${400 + i}` : null, tariff: '₹4,500/day' });
        // 100 General Ward
        for (let i = 1; i <= 100; i++) generatedBeds.push({ id: `GEN-${500 + i}`, type: 'GENERAL', floor: 5, status: i <= 60 ? 'OCCUPIED' : 'AVAILABLE', patient: i <= 60 ? `General Patient #${500 + i}` : null, tariff: '₹2,000/day' });
        return generatedBeds;
    });

    const [theatres, setTheatres] = useState([
        { code: 'OT-1', name: 'Da Vinci Robotic Surgical Suite 1', spec: 'Robotic Oncology & Urology', status: 'IDLE', surgeon: 'Dr. Meera Nambiar', procedure: 'Standby for Robotic Prostatectomy' },
        { code: 'OT-2', name: 'Hybrid Cardiovascular Cath/OT 2', spec: 'Cardiac CTVS & Vascular', status: 'SURGERY_IN_PROGRESS', surgeon: 'Dr. Ashish Patel', procedure: 'Emergency Off-Pump CABG' },
        { code: 'OT-3', name: 'Mako Robotic Joint Suite 3', spec: 'Joint Replacements & Trauma', status: 'IDLE', surgeon: 'Dr. Sunita Bansal', procedure: 'Scheduled Mako Bilateral Knee' },
        { code: 'OT-4', name: 'Neuro & Micro-Spine OT 4', spec: 'Brain Neurosurgery', status: 'IDLE', surgeon: 'Dr. K. Srinivas', procedure: 'Standby for Aneurysm Clipping' },
        { code: 'OT-5', name: 'Emergency Laparoscopy OT 5', spec: 'General Trauma & Transplants', status: 'STERILIZATION', surgeon: 'On-Call Surgeon', procedure: 'Post-Op UV Sterilization' }
    ]);

    const [ambulances, setAmbulances] = useState([
        { number: 'TS 09 UA 1001', type: 'Advanced Life Support (ALS)', driver: 'Ramesh Yadav (+91 98490 55001)', status: 'STANDBY', location: 'Central Trauma Bay Base', paramedic: 'Paramedic Sunita K.' },
        { number: 'TS 09 UA 1002', type: 'Advanced Life Support (ALS)', driver: 'Mahesh Goud (+91 98490 55002)', status: 'DISPATCHED_IN_TRANSIT', location: 'Gachibowli Junction (ETA 5m)', paramedic: 'Paramedic John Paul' },
        { number: 'TS 09 UA 1003', type: 'Advanced Life Support (ALS)', driver: 'K. Srinivas (+91 98490 55003)', status: 'STANDBY', location: 'Trauma Bay Standby', paramedic: 'Paramedic Farhan A.' }
    ]);

    // 3. DOCTORS & PATIENT SLOT ALLOCATION (RESTRICTED TO ADMIN/FOUNDER/MANAGEMENT)
    const [doctors, setDoctors] = useState([
        {
            id: 'd1',
            name: 'Dr. Ashish Patel',
            dept: 'Cardiology & CTVS',
            slots: [
                { id: 's1', time: '09:00 AM - 09:30 AM', patient: 'Kishore Varma (UHID: 9812)', status: 'CONFIRMED' },
                { id: 's2', time: '09:30 AM - 10:00 AM', patient: 'Lalitha Devi (UHID: 9813)', status: 'CONFIRMED' },
                { id: 's3', time: '10:00 AM - 10:30 AM', patient: null, status: 'AVAILABLE' },
                { id: 's4', time: '10:30 AM - 11:00 AM', patient: null, status: 'AVAILABLE' }
            ]
        },
        {
            id: 'd2',
            name: 'Dr. Meera Nambiar',
            dept: 'Surgical Oncology',
            slots: [
                { id: 's5', time: '11:00 AM - 11:30 AM', patient: 'Sunil Rao (UHID: 8810)', status: 'CONFIRMED' },
                { id: 's6', time: '11:30 AM - 12:00 PM', patient: null, status: 'AVAILABLE' }
            ]
        },
        {
            id: 'd3',
            name: 'Dr. Sunita Bansal',
            dept: 'Robotic Orthopaedics',
            slots: [
                { id: 's7', time: '09:30 AM - 10:00 AM', patient: 'Rajesh Varma (UHID: 7721)', status: 'CONFIRMED' },
                { id: 's8', time: '10:00 AM - 10:30 AM', patient: null, status: 'AVAILABLE' }
            ]
        }
    ]);

    // 4. ZOHO-STYLE PATIENT CRM PIPELINE
    const [crmLeads, setCrmLeads] = useState([
        { id: 'CRM-101', name: 'Venkat Subba Rao', phone: '+91 98490 88771', source: 'Website Inquiry', spec: 'Robotic Knee Replacement', deal: '₹2,20,000', stage: 'INSURANCE_PREAUTH', rep: 'Anjali Roy (PRO)', notes: 'Star Health cashless pre-auth filed.' },
        { id: 'CRM-102', name: 'Harika Dev', phone: '+91 98490 88772', source: 'Doctor Referral', spec: 'Cardiac TAVI Procedure', deal: '₹4,50,000', stage: 'CLINICAL_EVAL', rep: 'Karthik Sen (Marketing)', notes: 'CT scan received. Scheduled evaluation.' },
        { id: 'CRM-103', name: 'Ramesh Varma', phone: '+91 98490 88773', source: 'Corporate Tie-Up (TCS)', spec: 'Executive Master Checkup', deal: '₹15,000', stage: 'CONVERTED', rep: 'Priya Menon (Corporate)', notes: 'Fasting appointment booked for Wednesday.' },
        { id: 'CRM-104', name: 'K. Srinivasa Murthy', phone: '+91 98490 88774', source: 'Health Camp Vizag', spec: 'Deep Brain Stimulation (DBS)', deal: '₹6,80,000', stage: 'PROPOSAL_SENT', rep: 'Anjali Roy (PRO)', notes: 'Financial counseling done. Awaiting family consent.' }
    ]);

    // New Lead Form State
    const [leadName, setLeadName] = useState('');
    const [leadPhone, setLeadPhone] = useState('');
    const [leadSpec, setLeadSpec] = useState('Robotic Joint Replacement');
    const [leadValue, setLeadValue] = useState('₹2,00,000');
    const [leadSource, setLeadSource] = useState('Website');

    // Slot Allocation Form State
    const [slotPatientName, setSlotPatientName] = useState('');
    const [slotTime, setSlotTime] = useState('10:00 AM - 10:30 AM');

    // Authentication
    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        const found = usersList.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.pass === password);
        if (found) {
            setUser(found);
            // Route to proper tab
            if (found.permissions.executive) setActiveTab('EXECUTIVE_ADMIN_DASHBOARD');
            else if (found.permissions.crm) setActiveTab('ZOHO_CRM');
            else setActiveTab('BEDS_AND_CAPACITY');
        } else {
            setErr('Invalid credentials. Check email & passphrase.');
        }
    };

    // User Management Action: Add User
    const handleAddUser = (e) => {
        e.preventDefault();
        const rolePermissionsMap = {
            'FOUNDER_CEO': { executive: true, docBookingAdmin: true, crm: true, userMgmt: true, assets: true, otAmbulance: true, triage: true },
            'HOSPITAL_ADMIN': { executive: true, docBookingAdmin: true, crm: true, userMgmt: true, assets: true, otAmbulance: true, triage: true },
            'EXECUTIVE_MANAGEMENT': { executive: true, docBookingAdmin: true, crm: true, userMgmt: false, assets: true, otAmbulance: true, triage: false },
            'PRO_MARKETING_TEAM': { executive: false, docBookingAdmin: false, crm: true, userMgmt: false, assets: false, otAmbulance: false, triage: false },
            'CRM_MANAGER': { executive: false, docBookingAdmin: false, crm: true, userMgmt: false, assets: false, otAmbulance: false, triage: false },
            'DOCTOR_CONSULTANT': { executive: false, docBookingAdmin: false, crm: false, userMgmt: false, assets: false, otAmbulance: true, triage: true },
            'NURSING_DUTY': { executive: false, docBookingAdmin: false, crm: false, userMgmt: false, assets: true, otAmbulance: true, triage: true }
        };

        const newUser = {
            id: `u${usersList.length + 1}`,
            name: newUserName,
            email: newUserEmail,
            pass: 'WecureStaff2026!',
            role: newUserRole,
            dept: newUserDept,
            status: 'ACTIVE',
            permissions: rolePermissionsMap[newUserRole]
        };

        setUsersList([...usersList, newUser]);
        setShowUserModal(false);
        setNewUserName('');
        setNewUserEmail('');
        alert(`Employee account created for ${newUserName} with Role: ${newUserRole}`);
    };

    // Toggle User Feature Flag dynamically
    const toggleUserPermission = (userId, permKey) => {
        if (!user.permissions.userMgmt) return;
        setUsersList(usersList.map(u => {
            if (u.id === userId) {
                return {
                    ...u,
                    permissions: {
                        ...u.permissions,
                        [permKey]: !u.permissions[permKey]
                    }
                };
            }
            return u;
        }));
    };

    // Allocate Patient to Doctor Slot
    const handleAllocateSlot = (e) => {
        e.preventDefault();
        if (!selectedDocForSlot) return;
        setDoctors(doctors.map(d => {
            if (d.id === selectedDocForSlot.id) {
                return {
                    ...d,
                    slots: d.slots.map(s => s.time === slotTime ? { ...s, patient: slotPatientName, status: 'CONFIRMED' } : s)
                };
            }
            return d;
        }));
        setShowSlotModal(false);
        setSlotPatientName('');
        alert(`Patient ${slotPatientName} allocated to ${selectedDocForSlot.name} at ${slotTime}`);
    };

    // Add Lead to CRM
    const handleAddLead = (e) => {
        e.preventDefault();
        const newLead = {
            id: `CRM-${Math.floor(100 + Math.random() * 900)}`,
            name: leadName,
            phone: leadPhone,
            source: leadSource,
            spec: leadSpec,
            deal: leadValue,
            stage: 'NEW_INQUIRY',
            rep: user.name,
            notes: 'Initial inquiry intake registered in CRM.'
        };
        setCrmLeads([newLead, ...crmLeads]);
        setShowLeadModal(false);
        setLeadName('');
        setLeadPhone('');
    };

    // Update CRM Lead Stage
    const updateLeadStage = (leadId, newStage) => {
        setCrmLeads(crmLeads.map(l => l.id === leadId ? { ...l, stage: newStage } : l));
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#001A2C] flex flex-col items-center justify-center p-4 relative font-sans">
                <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#00A3E0] text-white font-black text-xl mx-auto flex items-center justify-center mb-2 shadow-lg shadow-cyan-500/20">W</div>
                        <h2 className="text-2xl font-black text-[#002B49] tracking-tight">Wecure Enterprise ERP</h2>
                        <p className="text-xs text-[#00A3E0] font-bold uppercase tracking-wider mt-1">Multi-Role Security & Governance</p>
                    </div>

                    {err && <div className="p-3 mb-4 bg-rose-50 text-rose-600 text-xs rounded-xl font-bold text-center border border-rose-200">{err}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">Corporate / Clinical Email</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#00A3E0] focus:outline-none" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider mb-1">Secure Passphrase</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border border-slate-200 rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#00A3E0] focus:outline-none" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-[#00A3E0] hover:bg-[#008AC0] text-white font-black text-xs rounded-xl shadow-lg transition">
                            Authenticate Enterprise Session
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                        <p className="font-bold text-slate-700">Demo Role Credentials:</p>
                        <p>👑 <strong>Founder/CEO:</strong> <code>founder@wecure.hospital</code></p>
                        <p>🏥 <strong>Hospital Admin:</strong> <code>admin@wecure.hospital</code></p>
                        <p>📊 <strong>PRO / Marketing (CRM Only):</strong> <code>pro@wecure.hospital</code></p>
                        <p>👨‍⚕️ <strong>Doctor:</strong> <code>cardio@wecure.hospital</code></p>
                        <p className="text-[10px] text-slate-400 mt-2">All Passwords: <code>WecureFounder2026!</code> / <code>WecureAdmin2026!</code> / <code>WecurePro2026!</code></p>
                    </div>
                </div>
            </div>
        );
    }

    const filteredBeds = bedFilter === 'ALL' ? beds : beds.filter(b => b.type === bedFilter);
    const filteredLeads = crmStageFilter === 'ALL' ? crmLeads : crmLeads.filter(l => l.stage === crmStageFilter);

    return (
        <div className="min-h-screen bg-[#F4F7F9] text-[#001A2C] flex flex-col font-sans">
            
            {/* 1. TOP RBAC SECURITY BAR */}
            <div className="bg-[#002B49] text-white px-8 py-2.5 text-xs flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-4 text-[11px]">
                    <span className="font-black text-[#00A3E0]">WECURE HEALTHCARE SYSTEM</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-200 font-bold">200 Beds • 12 NICU • 8 ICU • 5 Modular OTs • 3 ALS Ambulances</span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-white/10 font-bold text-cyan-300 border border-white/10">{user.role.replace(/_/g, ' ')}</span>
                    <span className="font-black text-white">{user.name}</span>
                    <button onClick={() => setUser(null)} className="px-2.5 py-1 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg transition">Sign Out</button>
                </div>
            </div>

            {/* 2. MAIN NAVIGATION */}
            <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00A3E0] text-white font-black text-xl flex items-center justify-center shadow-md shadow-cyan-500/20">W</div>
                    <div>
                        <h1 className="text-base font-black text-[#002B49] tracking-tight">WECURE SUPER SPECIALITY</h1>
                        <p className="text-[10px] text-[#00A3E0] font-bold uppercase tracking-wider">{user.dept}</p>
                    </div>
                </div>

                {/* ROLE-AWARE MODULE TABS */}
                <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl space-x-1 border border-slate-200 overflow-x-auto text-xs font-bold">
                    
                    {/* ONLY FOUNDER / ADMIN / MANAGEMENT */}
                    {user.permissions.executive && (
                        <button
                            onClick={() => setActiveTab('EXECUTIVE_ADMIN_DASHBOARD')}
                            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'EXECUTIVE_ADMIN_DASHBOARD' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                        >
                            <span>👑</span>
                            <span>Executive / Founder Hub</span>
                        </button>
                    )}

                    {/* ONLY ADMIN / FOUNDER / MANAGEMENT CAN OPERATE DOCTOR ALLOCATION */}
                    {user.permissions.docBookingAdmin && (
                        <button
                            onClick={() => setActiveTab('DOCTOR_SLOT_ALLOCATION')}
                            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'DOCTOR_SLOT_ALLOCATION' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                        >
                            <span>👨‍⚕️</span>
                            <span>Doctor Slot Allocation</span>
                        </button>
                    )}

                    {/* CRM: PRO, MARKETING, MANAGER, ADMIN, FOUNDER */}
                    {user.permissions.crm && (
                        <button
                            onClick={() => setActiveTab('ZOHO_CRM')}
                            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'ZOHO_CRM' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                        >
                            <span>💼</span>
                            <span>Zoho-Style Patient CRM</span>
                        </button>
                    )}

                    {/* ASSETS & CAPACITY (BEDS, OTS, AMBULANCES) */}
                    {(user.permissions.assets || user.permissions.otAmbulance) && (
                        <button
                            onClick={() => setActiveTab('BEDS_AND_CAPACITY')}
                            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'BEDS_AND_CAPACITY' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                        >
                            <span>🛏️</span>
                            <span>200 Beds, 5 OTs & Fleet</span>
                        </button>
                    )}

                    {/* USER MANAGEMENT & RBAC (ADMIN / FOUNDER ONLY) */}
                    {user.permissions.userMgmt && (
                        <button
                            onClick={() => setActiveTab('USER_MANAGEMENT_RBAC')}
                            className={`px-3 py-1.5 rounded-xl transition flex items-center space-x-1.5 ${activeTab === 'USER_MANAGEMENT_RBAC' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                        >
                            <span>🛡️</span>
                            <span>User Management & RBAC</span>
                        </button>
                    )}
                </div>
            </header>

            {/* 3. WORKSPACE CONTENT */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">

                {/* MODULE 1: EXECUTIVE & FOUNDER DASHBOARD */}
                {activeTab === 'EXECUTIVE_ADMIN_DASHBOARD' && user.permissions.executive && (
                    <div className="space-y-6">
                        <div className="bg-gradient-to-r from-[#002B49] via-[#05375C] to-[#00A3E0] text-white p-6 rounded-3xl shadow-xl flex justify-between items-center">
                            <div>
                                <span className="px-2.5 py-1 bg-white/20 text-cyan-200 text-[10px] font-black rounded-lg uppercase tracking-wider">Restricted Executive Access</span>
                                <h2 className="text-xl font-black mt-2">Hospital Founder & Management Command Console</h2>
                                <p className="text-xs text-slate-200 mt-0.5">High-level telemetry across 200 beds, surgeries, financial escrow, and CRM conversions.</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-300 font-bold uppercase">Executive Lead</p>
                                <p className="text-base font-black text-cyan-200">{user.name}</p>
                            </div>
                        </div>

                        {/* EXECUTIVE KPI TILES */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Total Bed Occupancy</p>
                                <h3 className="text-2xl font-black text-[#002B49] mt-1">{beds.filter(b => b.status === 'OCCUPIED').length} / 200</h3>
                                <p className="text-[11px] text-[#00A3E0] font-bold mt-2">{Math.round((beds.filter(b => b.status === 'OCCUPIED').length / 200) * 100)}% Facility Utilization</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">NICU & ICU Saturation</p>
                                <h3 className="text-2xl font-black text-rose-600 mt-1">12 / 20 Critical</h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">7 NICU Beds & 5 ICU Beds Occupied</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Active Surgeries (5 OTs)</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">1 In-Progress, 1 Sterilizing</h3>
                                <p className="text-[11px] text-amber-600 font-bold mt-2">OT-2 Hybrid Cath Engaged</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">CRM Deal Pipeline</p>
                                <h3 className="text-2xl font-black text-emerald-600 mt-1">₹13.65 Lakhs</h3>
                                <p className="text-[11px] text-emerald-600 font-bold mt-2">{crmLeads.length} High-Ticket Inpatient Inquiries</p>
                            </div>
                        </div>

                        {/* OT & FLEET QUICK TELEMETRY */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-black text-[#002B49] mb-3">Modular Operation Theatre Telemetry (5 Suites)</h3>
                                <div className="space-y-3">
                                    {theatres.map(ot => (
                                        <div key={ot.code} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-black text-[#002B49]">{ot.code}: {ot.name}</p>
                                                <p className="text-slate-500 text-[11px]">{ot.surgeon} • {ot.procedure}</p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${ot.status === 'IDLE' ? 'bg-emerald-100 text-emerald-800' : ot.status === 'SURGERY_IN_PROGRESS' ? 'bg-rose-100 text-rose-800 animate-pulse' : 'bg-amber-100 text-amber-800'}`}>
                                                {ot.status.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                                <h3 className="text-sm font-black text-[#002B49] mb-3">Ambulance Fleet Status (3 ALS Units)</h3>
                                <div className="space-y-3">
                                    {ambulances.map(amb => (
                                        <div key={amb.number} className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-black text-[#002B49]">{amb.number} ({amb.type})</p>
                                                <p className="text-slate-500 text-[11px]">Driver: {amb.driver} | Location: <strong>{amb.location}</strong></p>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded font-black text-[10px] ${amb.status === 'STANDBY' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800 animate-pulse'}`}>
                                                {amb.status.replace(/_/g, ' ')}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* MODULE 2: DOCTOR SLOT ALLOCATION (ADMIN/FOUNDER/MANAGEMENT ONLY) */}
                {activeTab === 'DOCTOR_SLOT_ALLOCATION' && user.permissions.docBookingAdmin && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Doctor Consultation Slot & Patient Allocation</h2>
                                <p className="text-xs text-slate-500">Restricted to Hospital Admin, Facilitator, and Founder. Assign patient bookings directly to physician rosters.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {doctors.map(doc => (
                                <div key={doc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-black text-[#002B49]">{doc.name}</h3>
                                                <p className="text-xs text-[#00A3E0] font-bold">{doc.dept}</p>
                                            </div>
                                            <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded">{doc.slots.length} Slots</span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            {doc.slots.map(s => (
                                                <div key={s.id} className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                                                    <div>
                                                        <p className="font-bold text-slate-800">{s.time}</p>
                                                        <p className={`text-[11px] ${s.patient ? 'text-emerald-700 font-semibold' : 'text-slate-400'}`}>{s.patient || 'Slot Vacant'}</p>
                                                    </div>
                                                    <span className={`px-2 py-0.5 rounded font-black text-[10px] ${s.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'}`}>
                                                        {s.status}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => { setSelectedDocForSlot(doc); setShowSlotModal(true); }}
                                        className="w-full py-2.5 bg-[#002B49] hover:bg-[#05375C] text-white text-xs font-bold rounded-xl transition shadow"
                                    >
                                        + Allocate Patient to Slot
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODULE 3: ZOHO-STYLE PATIENT CRM */}
                {activeTab === 'ZOHO_CRM' && user.permissions.crm && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Wecure Patient CRM & Lead Funnel (Zoho-Style)</h2>
                                <p className="text-xs text-slate-500">Accessible by Marketing, PRO Operations, Management, and Founder.</p>
                            </div>
                            <div className="flex space-x-2">
                                <button onClick={() => setShowLeadModal(true)} className="px-4 py-2 bg-[#00A3E0] hover:bg-[#008AC0] text-white font-black text-xs rounded-xl shadow">
                                    + Add New Lead / Deal
                                </button>
                            </div>
                        </div>

                        {/* CRM STAGE FILTER BAR */}
                        <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
                            {['ALL', 'NEW_INQUIRY', 'CLINICAL_EVAL', 'PROPOSAL_SENT', 'INSURANCE_PREAUTH', 'CONVERTED'].map(st => (
                                <button
                                    key={st}
                                    onClick={() => setCrmStageFilter(st)}
                                    className={`px-3 py-1.5 rounded-xl transition ${crmStageFilter === st ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                                >
                                    {st.replace(/_/g, ' ')}
                                </button>
                            ))}
                        </div>

                        {/* CRM DEALS PIPELINE TABLE */}
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            <div className="p-4 bg-slate-50 grid grid-cols-6 text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span>Patient / Lead</span>
                                <span>Source</span>
                                <span>Speciality Required</span>
                                <span>Deal Tariff</span>
                                <span>Stage</span>
                                <span>Assigned Rep & Actions</span>
                            </div>

                            {filteredLeads.map(lead => (
                                <div key={lead.id} className="p-4 grid grid-cols-6 items-center text-xs font-medium hover:bg-slate-50 transition">
                                    <div>
                                        <p className="font-black text-[#002B49]">{lead.name}</p>
                                        <p className="text-[11px] text-slate-500 font-mono">{lead.phone}</p>
                                    </div>
                                    <span className="text-slate-600">{lead.source}</span>
                                    <span className="font-bold text-slate-800">{lead.spec}</span>
                                    <span className="font-black text-emerald-600">{lead.deal}</span>
                                    <div>
                                        <select
                                            value={lead.stage}
                                            onChange={e => updateLeadStage(lead.id, e.target.value)}
                                            className="p-1.5 rounded-lg border text-xs font-bold bg-white focus:outline-none"
                                        >
                                            <option value="NEW_INQUIRY">New Inquiry</option>
                                            <option value="CLINICAL_EVAL">Clinical Evaluation</option>
                                            <option value="PROPOSAL_SENT">Proposal Sent</option>
                                            <option value="INSURANCE_PREAUTH">Insurance Pre-Auth</option>
                                            <option value="CONVERTED">Converted / Admitted</option>
                                            <option value="LOST">Lost / Dropped</option>
                                        </select>
                                    </div>
                                    <div>
                                        <p className="font-bold text-slate-700">{lead.rep}</p>
                                        <p className="text-[10px] text-slate-400 truncate">{lead.notes}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODULE 4: CAPACITY (200 BEDS, 12 NICU, 8 ICU, 5 OTs, 3 AMBULANCES) */}
                {activeTab === 'BEDS_AND_CAPACITY' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Hospital Capacity Matrix: 200 Beds & Critical Suites</h2>
                                <p className="text-xs text-slate-500">12 NICU Beds • 8 ICU Beds • 30 Deluxe • 50 Twin-Sharing • 100 General Wards</p>
                            </div>

                            {/* WARD FILTER PILLS */}
                            <div className="flex flex-wrap gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 text-xs font-bold">
                                {['ALL', 'NICU', 'ICU', 'DELUXE', 'TWIN_SHARING', 'GENERAL'].map(wf => (
                                    <button
                                        key={wf}
                                        onClick={() => setBedFilter(wf)}
                                        className={`px-3 py-1.5 rounded-xl transition ${bedFilter === wf ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}
                                    >
                                        {wf.replace(/_/g, ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* BED TILES (SCROLLABLE GRID) */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[500px] overflow-y-auto p-1">
                            {filteredBeds.map(b => (
                                <div key={b.id} className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between h-28">
                                    <div className="flex justify-between items-start">
                                        <span className="font-black text-xs text-[#002B49]">{b.id}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${b.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{b.status}</span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold">{b.type} (Floor {b.floor})</p>
                                        <p className="text-[10px] font-bold text-slate-700 truncate">{b.patient || 'Vacant'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* MODULE 5: USER MANAGEMENT & RBAC FEATURE TOGGLES */}
                {activeTab === 'USER_MANAGEMENT_RBAC' && user.permissions.userMgmt && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">User & Role-Based Feature Permission Matrix</h2>
                                <p className="text-xs text-slate-500">Provision hospital staff and toggle dynamic feature flags across the ERP in real-time.</p>
                            </div>
                            <button onClick={() => setShowUserModal(true)} className="px-4 py-2 bg-[#00A3E0] hover:bg-[#008AC0] text-white font-black text-xs rounded-xl shadow">
                                + Add Employee / Staff
                            </button>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            <div className="p-4 bg-slate-50 grid grid-cols-7 text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span className="col-span-2">Staff Member / Role</span>
                                <span>Exec Hub</span>
                                <span>Doc Scheduling</span>
                                <span>Zoho CRM</span>
                                <span>Beds/OTs</span>
                                <span>User Mgmt</span>
                            </div>

                            {usersList.map(u => (
                                <div key={u.id} className="p-4 grid grid-cols-7 items-center text-xs font-medium hover:bg-slate-50 transition">
                                    <div className="col-span-2">
                                        <p className="font-black text-[#002B49]">{u.name}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">{u.email} • <strong>{u.role}</strong></p>
                                    </div>

                                    {/* TOGGLES */}
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={u.permissions.executive}
                                            onChange={() => toggleUserPermission(u.id, 'executive')}
                                            className="w-4 h-4 text-[#00A3E0] rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={u.permissions.docBookingAdmin}
                                            onChange={() => toggleUserPermission(u.id, 'docBookingAdmin')}
                                            className="w-4 h-4 text-[#00A3E0] rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={u.permissions.crm}
                                            onChange={() => toggleUserPermission(u.id, 'crm')}
                                            className="w-4 h-4 text-[#00A3E0] rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={u.permissions.assets}
                                            onChange={() => toggleUserPermission(u.id, 'assets')}
                                            className="w-4 h-4 text-[#00A3E0] rounded cursor-pointer"
                                        />
                                    </div>
                                    <div>
                                        <input
                                            type="checkbox"
                                            checked={u.permissions.userMgmt}
                                            onChange={() => toggleUserPermission(u.id, 'userMgmt')}
                                            className="w-4 h-4 text-[#00A3E0] rounded cursor-pointer"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL: ADD EMPLOYEE / USER */}
            {showUserModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleAddUser} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-[#002B49]">Provision New Employee</h3>
                                <p className="text-xs text-slate-400">Assign role and default security permissions.</p>
                            </div>
                            <button type="button" onClick={() => setShowUserModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                            <input type="text" required value={newUserName} onChange={e => setNewUserName(e.target.value)} placeholder="e.g. Dr. Rajesh Reddy" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Work Email</label>
                            <input type="email" required value={newUserEmail} onChange={e => setNewUserEmail(e.target.value)} placeholder="rajesh@wecure.hospital" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Security Role</label>
                            <select value={newUserRole} onChange={e => setNewUserRole(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="PRO_MARKETING_TEAM">PRO & Marketing Team (CRM Only)</option>
                                <option value="CRM_MANAGER">CRM Manager (Deals & Pipelines)</option>
                                <option value="DOCTOR_CONSULTANT">Doctor / Surgeon</option>
                                <option value="NURSING_DUTY">Inpatient Nursing Station</option>
                                <option value="EXECUTIVE_MANAGEMENT">Executive Management</option>
                                <option value="HOSPITAL_ADMIN">Hospital Administrator</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
                            <input type="text" value={newUserDept} onChange={e => setNewUserDept(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowUserModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-[#00A3E0] text-white rounded-xl text-xs font-bold shadow">Create Staff User</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL: ADD CRM LEAD */}
            {showLeadModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleAddLead} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-[#002B49]">Create Patient CRM Deal</h3>
                                <p className="text-xs text-slate-400">Add inbound inquiry to conversion funnel.</p>
                            </div>
                            <button type="button" onClick={() => setShowLeadModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
                            <input type="text" required value={leadName} onChange={e => setLeadName(e.target.value)} placeholder="e.g. M. Rama Krishna" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                            <input type="tel" required value={leadPhone} onChange={e => setLeadPhone(e.target.value)} placeholder="+91 98490 00000" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Speciality Needed</label>
                            <input type="text" required value={leadSpec} onChange={e => setLeadSpec(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Tariff</label>
                                <input type="text" value={leadValue} onChange={e => setLeadValue(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Source</label>
                                <select value={leadSource} onChange={e => setLeadSource(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                    <option value="Website">Website</option>
                                    <option value="Doctor Referral">Doctor Referral</option>
                                    <option value="Health Camp">Health Camp</option>
                                    <option value="Corporate Tie-Up">Corporate Tie-Up</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowLeadModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-[#00A3E0] text-white rounded-xl text-xs font-bold shadow">Save Lead to CRM</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL: ALLOCATE DOCTOR SLOT */}
            {showSlotModal && selectedDocForSlot && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleAllocateSlot} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-[#002B49]">Allocate Patient to Slot</h3>
                                <p className="text-xs text-[#00A3E0] font-bold">{selectedDocForSlot.name} • {selectedDocForSlot.dept}</p>
                            </div>
                            <button type="button" onClick={() => setShowSlotModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name & UHID</label>
                            <input type="text" required value={slotPatientName} onChange={e => setSlotPatientName(e.target.value)} placeholder="e.g. Ramesh Kumar (UHID: 9845)" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Consultation Timing Slot</label>
                            <select value={slotTime} onChange={e => setSlotTime(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                {selectedDocForSlot.slots.map(s => (
                                    <option key={s.id} value={s.time}>{s.time} {s.patient ? `(Occupied: ${s.patient})` : '(Available)'}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowSlotModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-[#002B49] text-white rounded-xl text-xs font-bold shadow">Confirm Allocation</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}
