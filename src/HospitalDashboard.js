import React, { useState } from 'react';

export default function HospitalDashboard() {
    // Current Active User Session
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('founder@wecure.hospital');
    const [password, setPassword] = useState('WecureFounder2026!');
    const [err, setErr] = useState('');
    const [activeTab, setActiveTab] = useState('DASHBOARD');

    // Modals
    const [showBedAdmissionModal, setShowBedAdmissionModal] = useState(false);
    const [showPatientRecordModal, setShowPatientRecordModal] = useState(false);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [selectedBed, setSelectedBed] = useState(null);
    const [selectedInvoice, setSelectedInvoice] = useState(null);

    // AI Assistant State
    const [showAiModal, setShowAiModal] = useState(false);
    const [aiQuery, setAiQuery] = useState('');
    const [aiChatLog, setAiChatLog] = useState([
        { sender: 'AI', text: 'Hello! I am Wecure Clinical & Navigation Assistant. Ask me to route you anywhere or inquire about beds, patients, CRM, or billing.' }
    ]);

    // 1. DOCTOR ROSTER & CALENDAR BOOKING MATRIX
    const [selectedDate, setSelectedDate] = useState('2026-08-25');
    const [selectedDoctorId, setSelectedDoctorId] = useState('d1');
    const [bookingPatientName, setBookingPatientName] = useState('');
    const [bookingPhone, setBookingPhone] = useState('');
    const [bookingPayer, setBookingPayer] = useState('CASHLESS_TPA');

    const [doctorsList, setDoctorsList] = useState([
        {
            id: 'd1',
            name: 'Dr. Ashish Patel',
            dept: 'Cardiology & CTVS',
            fee: 1800,
            slots: [
                { id: 's1', date: '2026-08-25', time: '09:00 AM - 09:30 AM', patient: 'Kishore Varma', status: 'BOOKED' },
                { id: 's2', date: '2026-08-25', time: '09:30 AM - 10:00 AM', patient: 'Lalitha Devi', status: 'BOOKED' },
                { id: 's3', date: '2026-08-25', time: '10:00 AM - 10:30 AM', patient: null, status: 'AVAILABLE' },
                { id: 's4', date: '2026-08-25', time: '10:30 AM - 11:00 AM', patient: null, status: 'AVAILABLE' },
                { id: 's5', date: '2026-08-25', time: '02:00 PM - 02:30 PM', patient: null, status: 'AVAILABLE' },
                { id: 's6', date: '2026-08-25', time: '02:30 PM - 03:00 PM', patient: null, status: 'AVAILABLE' }
            ]
        },
        {
            id: 'd2',
            name: 'Dr. Meera Nambiar',
            dept: 'Surgical Oncology',
            fee: 2000,
            slots: [
                { id: 's7', date: '2026-08-25', time: '11:00 AM - 11:30 AM', patient: 'Sunil Rao', status: 'BOOKED' },
                { id: 's8', date: '2026-08-25', time: '11:30 AM - 12:00 PM', patient: null, status: 'AVAILABLE' },
                { id: 's9', date: '2026-08-25', time: '03:00 PM - 03:30 PM', patient: null, status: 'AVAILABLE' }
            ]
        },
        {
            id: 'd3',
            name: 'Dr. Sunita Bansal',
            dept: 'Robotic Orthopaedics',
            fee: 1500,
            slots: [
                { id: 's10', date: '2026-08-25', time: '09:30 AM - 10:00 AM', patient: 'Rajesh Varma', status: 'BOOKED' },
                { id: 's11', date: '2026-08-25', time: '10:00 AM - 10:30 AM', patient: null, status: 'AVAILABLE' }
            ]
        }
    ]);

    // 2. CAPACITY (200 BEDS MATRIX)
    const [beds, setBeds] = useState(() => {
        const generatedBeds = [];
        // 12 NICU
        for (let i = 1; i <= 12; i++) {
            generatedBeds.push({
                id: `NICU-${i}`,
                type: 'NICU',
                floor: 2,
                status: i <= 3 ? 'OCCUPIED' : 'AVAILABLE',
                patient: i <= 3 ? {
                    uhid: `WEC-NICU-00${i}`,
                    name: `Baby of Ananya (${i * 2}d)`,
                    age: '2 Days',
                    gender: i % 2 === 0 ? 'Female' : 'Male',
                    admittedDate: '2026-08-22',
                    doctor: 'Dr. Rohit Agnihotri',
                    diagnosis: 'Preterm Neonatal Jaundice / Respiratory Distress',
                    vitals: 'SpO2: 97% | HR: 142 bpm | Temp: 36.8 C',
                    medications: 'Phototherapy continuous, IV Ampicillin 50mg/kg',
                    billSoFar: 28500
                } : null,
                tariff: 9500
            });
        }
        // 8 ICU
        for (let i = 1; i <= 8; i++) {
            generatedBeds.push({
                id: `ICU-BAY-${i}`,
                type: 'ICU',
                floor: 1,
                status: i <= 3 ? 'OCCUPIED' : 'AVAILABLE',
                patient: i <= 3 ? {
                    uhid: `WEC-ICU-00${i}`,
                    name: i === 1 ? 'Kishore Varma' : i === 2 ? 'Ramesh Sen' : 'Govind Rao',
                    age: 62 - i * 4,
                    gender: 'Male',
                    admittedDate: '2026-08-23',
                    doctor: 'Dr. Ashish Patel',
                    diagnosis: 'Post-PTCA Angioplasty / Acute Anterior STEMI',
                    vitals: 'BP: 120/80 mmHg | SpO2: 98% | Pulse: 72 bpm',
                    medications: 'Heparin infusion 1000 IU/hr, Aspirin 75mg, Ticagrelor 90mg',
                    billSoFar: 74200
                } : null,
                tariff: 14000
            });
        }
        // 30 Single Deluxe
        for (let i = 1; i <= 30; i++) {
            generatedBeds.push({
                id: `DLX-${300 + i}`,
                type: 'DELUXE',
                floor: 3,
                status: i <= 5 ? 'OCCUPIED' : 'AVAILABLE',
                patient: i <= 5 ? {
                    uhid: `WEC-DLX-00${i}`,
                    name: `VIP Inpatient #${300 + i}`,
                    age: 45,
                    gender: 'Female',
                    admittedDate: '2026-08-24',
                    doctor: 'Dr. Meera Nambiar',
                    diagnosis: 'Post-Operative Robotic Thyroidectomy Recovery',
                    vitals: 'BP: 118/75 mmHg | SpO2: 99%',
                    medications: 'IV Ceftriaxone 1g, Paracetamol 1g IV TDS',
                    billSoFar: 45000
                } : null,
                tariff: 8000
            });
        }
        // 50 Twin Sharing
        for (let i = 1; i <= 50; i++) {
            generatedBeds.push({ id: `TWIN-${400 + i}`, type: 'TWIN_SHARING', floor: 4, status: 'AVAILABLE', patient: null, tariff: 4500 });
        }
        // 100 General Ward
        for (let i = 1; i <= 100; i++) {
            generatedBeds.push({ id: `GEN-${500 + i}`, type: 'GENERAL', floor: 5, status: 'AVAILABLE', patient: null, tariff: 2000 });
        }
        return generatedBeds;
    });

    // 3. DISCHARGED DOCUMENTS & MEDICAL ARCHIVES
    const [dischargedRecords, setDischargedRecords] = useState([
        {
            id: 'DOC-901',
            uhid: 'WEC-ICU-009',
            patientName: 'Venkatesh Murthy (58y/M)',
            bedCode: 'ICU-BAY-04',
            admissionDate: '2026-08-18',
            dischargeDate: '2026-08-24',
            doctor: 'Dr. Ashish Patel',
            summary: 'Successfully underwent Off-Pump Coronary Artery Bypass (CABG x 3). Hemodynamically stable upon discharge. Advised cardiac rehab.',
            totalBill: '₹2,45,000.00',
            payer: 'Star Health Cashless Settled'
        },
        {
            id: 'DOC-902',
            uhid: 'WEC-DLX-007',
            patientName: 'Padmavathi Rao (52y/F)',
            bedCode: 'DLX-308',
            admissionDate: '2026-08-20',
            dischargeDate: '2026-08-24',
            doctor: 'Dr. Sunita Bansal',
            summary: 'Left Mako Robotic Total Knee Arthroplasty performed without complications. Full weight-bearing mobilization achieved with walker.',
            totalBill: '₹2,10,000.00',
            payer: 'HDFC ERGO Cashless Settled'
        }
    ]);

    // 4. BILLING & INVOICE MANAGEMENT
    const [invoices, setInvoices] = useState([
        {
            id: 'INV-2026-801',
            uhid: 'WEC-ICU-009',
            patientName: 'Venkatesh Murthy',
            billType: 'INPATIENT (CABG SURGERY)',
            roomCharges: 70000,
            procedureCharges: 145000,
            pharmacyCharges: 25000,
            tax: 5000,
            total: 245000,
            payer: 'Star Health (Cashless TPA)',
            status: 'PAID',
            date: '2026-08-24'
        },
        {
            id: 'INV-2026-802',
            uhid: 'WEC-OP-551',
            patientName: 'Kishore Varma',
            billType: 'OUTPATIENT CONSULTATION',
            roomCharges: 0,
            procedureCharges: 1800,
            pharmacyCharges: 1250,
            tax: 0,
            total: 3050,
            payer: 'Self Pay (UPI)',
            status: 'PAID',
            date: '2026-08-24'
        }
    ]);

    // 5. CRM DATA
    const [crmLeads, setCrmLeads] = useState([
        { id: 'CRM-101', name: 'Venkat Subba Rao', phone: '+91 98490 88771', spec: 'Robotic Knee Replacement', deal: '₹2,20,000', stage: 'INSURANCE_PREAUTH', rep: 'Anjali Roy', notes: 'Star Health pre-auth under verification.' },
        { id: 'CRM-102', name: 'Harika Dev', phone: '+91 98490 88772', spec: 'Cardiac TAVI Procedure', deal: '₹4,50,000', stage: 'CLINICAL_EVAL', rep: 'Karthik Sen', notes: 'Reviewing 3T MRI & CT Angio.' }
    ]);

    // User Roles & Profiles
    const usersList = [
        { email: 'founder@wecure.hospital', pass: 'WecureFounder2026!', name: 'Dr. Sarma Vishnubhotla', role: 'FOUNDER_CEO', canBilling: true, canExecutive: true, canDocAdmin: true, canCrm: true },
        { email: 'admin@wecure.hospital', pass: 'WecureAdmin2026!', name: 'Pravin Kumar (Admin)', role: 'HOSPITAL_ADMIN', canBilling: true, canExecutive: true, canDocAdmin: true, canCrm: true },
        { email: 'billing@wecure.hospital', pass: 'WecureBill2026!', name: 'Naveen Aggarwal (CFO)', role: 'BILLING_MANAGER', canBilling: true, canExecutive: false, canDocAdmin: false, canCrm: false },
        { email: 'pro@wecure.hospital', pass: 'WecurePro2026!', name: 'Anjali Roy', role: 'PRO_MARKETING_TEAM', canBilling: false, canExecutive: false, canDocAdmin: false, canCrm: true },
        { email: 'cardio@wecure.hospital', pass: 'WecureCardio2026!', name: 'Dr. Ashish Patel', role: 'DOCTOR_CONSULTANT', canBilling: false, canExecutive: false, canDocAdmin: false, canCrm: false }
    ];

    // Admission Form State
    const [admName, setAdmName] = useState('');
    const [admAge, setAdmAge] = useState('50');
    const [admGender, setAdmGender] = useState('Male');
    const [admDoc, setAdmDoc] = useState('Dr. Ashish Patel');
    const [admDiagnosis, setAdmDiagnosis] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        setErr('');
        const found = usersList.find(u => u.email.toLowerCase() === email.trim().toLowerCase() && u.pass === password);
        if (found) {
            setUser(found);
            setActiveTab('DASHBOARD');
        } else {
            setErr('Invalid credentials. Check user email & passphrase.');
        }
    };

    // AI NAVIGATION & ACTION HANDLER
    const handleAiSubmit = (e) => {
        e.preventDefault();
        if (!aiQuery.trim()) return;

        const userMsg = aiQuery.trim();
        const lower = userMsg.toLowerCase();
        let aiReply = '';
        let targetTab = null;

        if (lower.includes('crm') || lower.includes('lead') || lower.includes('deal')) {
            aiReply = 'Routing you to the CRM Lead Management pipeline.';
            targetTab = 'CRM';
        } else if (lower.includes('bed') || lower.includes('icu') || lower.includes('nicu') || lower.includes('capacity')) {
            aiReply = 'Opening the 200-Bed Telemetry and Inpatient Capacity Grid.';
            targetTab = 'BEDS_AND_CAPACITY';
        } else if (lower.includes('book') || lower.includes('slot') || lower.includes('doctor') || lower.includes('appointment')) {
            aiReply = 'Navigating to Doctor Roster & Calendar Hand-Picker Booking Console.';
            targetTab = 'DOCTOR_BOOKING_CONSOLE';
        } else if (lower.includes('bill') || lower.includes('invoice') || lower.includes('finance') || lower.includes('pdf')) {
            if (user.canBilling) {
                aiReply = 'Accessing Billing Management, Invoices & PDF generation engine.';
                targetTab = 'BILLING_MANAGEMENT';
            } else {
                aiReply = 'Access Denied: Your security profile does not have billing/accounting permissions.';
            }
        } else if (lower.includes('document') || lower.includes('discharge') || lower.includes('history') || lower.includes('archive')) {
            aiReply = 'Opening Patient Medical Documents and Discharged Record Vault.';
            targetTab = 'DOCUMENTS_ARCHIVES';
        } else {
            aiReply = `I analyzed your clinical query: "${userMsg}". All emergency trauma bays are armed. You can ask me to navigate to CRM, Bookings, 200 Beds, Documents, or Billing.`;
        }

        setAiChatLog([...aiChatLog, { sender: 'User', text: userMsg }, { sender: 'AI', text: aiReply }]);
        setAiQuery('');

        if (targetTab) {
            setActiveTab(targetTab);
        }
    };

    // BED ADMISSION ACTION
    const handleAdmitPatient = (e) => {
        e.preventDefault();
        const newPatient = {
            uhid: `WEC-${selectedBed.type}-${Math.floor(100 + Math.random() * 900)}`,
            name: admName,
            age: admAge,
            gender: admGender,
            admittedDate: new Date().toISOString().split('T')[0],
            doctor: admDoc,
            diagnosis: admDiagnosis || 'Acute Clinical Evaluation',
            vitals: 'BP: 120/80 mmHg | SpO2: 98% | Pulse: 76 bpm',
            medications: 'IV Fluids, Standard Inpatient Profile',
            billSoFar: selectedBed.tariff
        };

        setBeds(beds.map(b => b.id === selectedBed.id ? { ...b, status: 'OCCUPIED', patient: newPatient } : b));
        setShowBedAdmissionModal(false);
        setAdmName('');
        setAdmDiagnosis('');
        alert(`Inpatient ${newPatient.name} admitted successfully to Bed ${selectedBed.id}.`);
    };

    // BED DISCHARGE -> ARCHIVE IN DOCUMENTS
    const handleDischargePatient = (bed) => {
        if (!window.confirm(`Discharge patient ${bed.patient.name} from ${bed.id}? Records will move to Documents tab.`)) return;

        const dischargedDoc = {
            id: `DOC-${Math.floor(800 + Math.random() * 100)}`,
            uhid: bed.patient.uhid,
            patientName: bed.patient.name,
            bedCode: bed.id,
            admissionDate: bed.patient.admittedDate,
            dischargeDate: new Date().toISOString().split('T')[0],
            doctor: bed.patient.doctor,
            summary: `Discharged in stable clinical status. Primary Diagnosis: ${bed.patient.diagnosis}. Final Vitals: ${bed.patient.vitals}. Prescriptions shared.`,
            totalBill: `₹${bed.patient.billSoFar.toLocaleString('en-IN')}.00`,
            payer: 'Hospital Desk Settled'
        };

        // Create Invoice entry automatically
        const newInv = {
            id: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
            uhid: bed.patient.uhid,
            patientName: bed.patient.name,
            billType: `INPATIENT DISCHARGE (${bed.id})`,
            roomCharges: bed.patient.billSoFar * 0.4,
            procedureCharges: bed.patient.billSoFar * 0.45,
            pharmacyCharges: bed.patient.billSoFar * 0.15,
            tax: 0,
            total: bed.patient.billSoFar,
            payer: 'Direct Settlement / TPA',
            status: 'PAID',
            date: new Date().toISOString().split('T')[0]
        };

        setDischargedRecords([dischargedDoc, ...dischargedRecords]);
        setInvoices([newInv, ...invoices]);
        setBeds(beds.map(b => b.id === bed.id ? { ...b, status: 'AVAILABLE', patient: null } : b));
        setShowPatientRecordModal(false);
        alert(`Patient ${bed.patient.name} discharged! Bed ${bed.id} is now available. Medical summary moved to Documents.`);
    };

    // DOCTOR SLOT BOOKING
    const handleBookDoctorSlot = (docId, slotId) => {
        if (!bookingPatientName) {
            alert('Please enter Patient Full Name before selecting a slot.');
            return;
        }

        setDoctorsList(doctorsList.map(doc => {
            if (doc.id === docId) {
                return {
                    ...doc,
                    slots: doc.slots.map(s => s.id === slotId ? { ...s, patient: bookingPatientName, status: 'BOOKED' } : s)
                };
            }
            return doc;
        }));

        setBookingPatientName('');
        setBookingPhone('');
        alert(`Consultation booked successfully with Doctor!`);
    };

    // PDF PRINT / DOWNLOAD INVOICE
    const handlePrintInvoice = (inv) => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Tax Invoice - ${inv.id}</title>
                    <style>
                        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; padding: 40px; color: #002B49; }
                        .header { display: flex; justify-content: space-between; border-bottom: 2px solid #00A3E0; padding-bottom: 20px; }
                        .hospital-name { font-size: 24px; font-weight: bold; color: #002B49; }
                        .inv-title { font-size: 18px; font-weight: bold; color: #00A3E0; text-align: right; }
                        .details { margin-top: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 13px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 30px; font-size: 13px; }
                        th, td { border: 1px solid #E2E8F0; padding: 10px; text-align: left; }
                        th { background-color: #F8FAFC; color: #002B49; }
                        .total-row { font-size: 16px; font-weight: bold; background-color: #F0FDF4; }
                        .footer { margin-top: 40px; font-size: 11px; text-align: center; color: #64748B; border-top: 1px solid #E2E8F0; padding-top: 15px; }
                    </style>
                </head>
                <body>
                    <div class="header">
                        <div>
                            <div class="hospital-name">WECURE SUPER SPECIALITY HOSPITAL</div>
                            <div style="font-size: 12px; color: #64748B;">Hitech City Hospital Main Hub • NABH & JCI Accredited</div>
                            <div style="font-size: 12px; color: #64748B;">GSTIN: 36AAAAW1234F1Z5 • 24x7 Helpline: 040-6833-4455</div>
                        </div>
                        <div>
                            <div class="inv-title">TAX INVOICE / RECEIPT</div>
                            <div style="font-size: 13px; font-weight: bold;">Invoice #: ${inv.id}</div>
                            <div style="font-size: 12px;">Date: ${inv.date}</div>
                        </div>
                    </div>

                    <div class="details">
                        <div><strong>Patient Name:</strong> ${inv.patientName}</div>
                        <div><strong>UHID:</strong> ${inv.uhid}</div>
                        <div><strong>Bill Category:</strong> ${inv.billType}</div>
                        <div><strong>Payment / Payer Mode:</strong> ${inv.payer}</div>
                    </div>

                    <table>
                        <thead>
                            <tr>
                                <th>Billing Component</th>
                                <th style="text-align: right;">Amount (INR)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Room & Accommodation Charges</td>
                                <td style="text-align: right;">₹${inv.roomCharges.toLocaleString('en-IN')}.00</td>
                            </tr>
                            <tr>
                                <td>Clinical Procedures, Surgeries & Doctor Fees</td>
                                <td style="text-align: right;">₹${inv.procedureCharges.toLocaleString('en-IN')}.00</td>
                            </tr>
                            <tr>
                                <td>Pharmacy & Diagnostic Consumables</td>
                                <td style="text-align: right;">₹${inv.pharmacyCharges.toLocaleString('en-IN')}.00</td>
                            </tr>
                            <tr>
                                <td>Taxes / GST</td>
                                <td style="text-align: right;">₹${inv.tax.toLocaleString('en-IN')}.00</td>
                            </tr>
                            <tr class="total-row">
                                <td>NET PAYABLE / SETTLED AMOUNT</td>
                                <td style="text-align: right; color: #16A34A;">₹${inv.total.toLocaleString('en-IN')}.00</td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="footer">
                        This is an authentic computer-generated healthcare invoice from Wecure ERP. No physical signature required.
                    </div>
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => printWindow.print(), 250);
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#001A2C] flex flex-col items-center justify-center p-4 font-sans">
                <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-slate-100">
                    <div className="text-center mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#00A3E0] text-white font-black text-xl mx-auto flex items-center justify-center mb-2 shadow-lg">W</div>
                        <h2 className="text-2xl font-black text-[#002B49] tracking-tight">Wecure Enterprise ERP</h2>
                        <p className="text-xs text-[#00A3E0] font-bold uppercase tracking-wider mt-1">Autonomous Multi-Speciality Core</p>
                    </div>

                    {err && <div className="p-3 mb-4 bg-rose-50 text-rose-600 text-xs rounded-xl font-bold text-center border border-rose-200">{err}</div>}

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase mb-1">Staff Workstation ID</label>
                            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border rounded-xl text-xs font-bold" />
                        </div>
                        <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase mb-1">Passphrase</label>
                            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border rounded-xl text-xs font-bold" />
                        </div>
                        <button type="submit" className="w-full py-3.5 bg-[#00A3E0] hover:bg-[#008AC0] text-white font-black text-xs rounded-xl shadow-lg transition">
                            Authenticate Healthcare Session
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-slate-100 space-y-1 text-[11px] text-slate-500">
                        <p className="font-bold text-slate-700">Quick Profile Credentials:</p>
                        <p>👑 <strong>Founder/Admin:</strong> <code>founder@wecure.hospital</code> (Pass: <code>WecureFounder2026!</code>)</p>
                        <p>💳 <strong>Billing/Accounting:</strong> <code>billing@wecure.hospital</code> (Pass: <code>WecureBill2026!</code>)</p>
                        <p>💼 <strong>PRO & Marketing (CRM):</strong> <code>pro@wecure.hospital</code> (Pass: <code>WecurePro2026!</code>)</p>
                    </div>
                </div>
            </div>
        );
    }

    // IP & OP Active Aggregations
    const activeInpatients = beds.filter(b => b.status === 'OCCUPIED' && b.patient).map(b => ({
        bedCode: b.id,
        ward: b.type,
        uhid: b.patient.uhid,
        name: b.patient.name,
        doctor: b.patient.doctor,
        diagnosis: b.patient.diagnosis,
        admittedDate: b.patient.admittedDate
    }));

    const activeOutpatients = doctorsList.flatMap(doc => 
        doc.slots.filter(s => s.status === 'BOOKED' && s.patient).map(s => ({
            doctorName: doc.name,
            dept: doc.dept,
            time: s.time,
            patientName: s.patient,
            token: `OPD-${Math.floor(10 + Math.random() * 90)}`
        }))
    );

    return (
        <div className="min-h-screen bg-[#F4F7F9] text-[#001A2C] flex flex-col font-sans">

            {/* 1. TOP UTILITY STRIP */}
            <div className="bg-[#002B49] text-white px-8 py-2 text-xs flex justify-between items-center border-b border-white/10">
                <div className="flex items-center space-x-4 text-[11px]">
                    <span className="font-black text-[#00A3E0]">WECURE HOSPITAL ERP</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-200">200 Beds (12 NICU / 8 ICU) • Active Inpatients: <strong>{activeInpatients.length}</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-[11px]">
                    {/* FLOATING AI ASSISTANT TRIGGER */}
                    <button onClick={() => setShowAiModal(true)} className="px-3 py-1 bg-gradient-to-r from-[#00A3E0] to-emerald-500 hover:opacity-90 text-white font-black rounded-lg shadow flex items-center space-x-1">
                        <span>🤖</span>
                        <span>Interactive AI Agent</span>
                    </button>
                    <span className="px-2 py-0.5 rounded bg-white/10 font-bold text-cyan-300">{user.role}</span>
                    <span className="font-bold text-white">{user.name}</span>
                    <button onClick={() => setUser(null)} className="px-2 py-0.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded">Exit</button>
                </div>
            </div>

            {/* 2. MAIN NAVIGATION */}
            <header className="bg-white border-b border-slate-200 px-8 py-3.5 flex justify-between items-center sticky top-0 z-40 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-[#00A3E0] text-white font-black text-xl flex items-center justify-center shadow-md">W</div>
                    <div>
                        <h1 className="text-base font-black text-[#002B49] tracking-tight">WECURE SUPER SPECIALITY</h1>
                        <p className="text-[10px] text-[#00A3E0] font-bold uppercase tracking-wider">Clinical Governance & ERP</p>
                    </div>
                </div>

                {/* MODULE NAVIGATION */}
                <div className="flex items-center bg-slate-100 p-1.5 rounded-2xl space-x-1 border border-slate-200 overflow-x-auto text-xs font-bold">
                    <button onClick={() => setActiveTab('DASHBOARD')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'DASHBOARD' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>⚡ Dashboard (IP & OP)</button>
                    <button onClick={() => setActiveTab('DOCTOR_BOOKING_CONSOLE')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'DOCTOR_BOOKING_CONSOLE' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>📅 Doctor Slot Booking</button>
                    <button onClick={() => setActiveTab('BEDS_AND_CAPACITY')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'BEDS_AND_CAPACITY' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>🛏️ 200 Beds Telemetry</button>
                    <button onClick={() => setActiveTab('DOCUMENTS_ARCHIVES')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'DOCUMENTS_ARCHIVES' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>📁 Documents & Archives</button>
                    
                    {/* CRM: PRO, MARKETING, MANAGER, ADMIN, FOUNDER */}
                    {user.canCrm && (
                        <button onClick={() => setActiveTab('CRM')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'CRM' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>💼 CRM</button>
                    )}

                    {/* BILLING: BILLING, ACCOUNTING, MANAGER, ADMIN, FOUNDER */}
                    {user.canBilling && (
                        <button onClick={() => setActiveTab('BILLING_MANAGEMENT')} className={`px-3 py-1.5 rounded-xl transition ${activeTab === 'BILLING_MANAGEMENT' ? 'bg-[#002B49] text-white shadow' : 'text-slate-600'}`}>💳 Billing Management</button>
                    )}
                </div>
            </header>

            {/* 3. WORKSPACE CONTENT */}
            <main className="max-w-7xl w-full mx-auto p-8 space-y-8 flex-1">

                {/* TAB 1: DASHBOARD (IP & OP LISTS) */}
                {activeTab === 'DASHBOARD' && (
                    <div className="space-y-8">
                        {/* KPI CARDS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Active Inpatients (IP)</p>
                                <h3 className="text-2xl font-black text-[#002B49] mt-1">{activeInpatients.length} Admitted</h3>
                                <p className="text-[11px] text-[#00A3E0] font-bold mt-2">12 NICU & 8 ICU Monitored</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Today's Outpatients (OP)</p>
                                <h3 className="text-2xl font-black text-emerald-600 mt-1">{activeOutpatients.length} Consultations</h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">All Specialist Slots Active</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Available Bed Capacity</p>
                                <h3 className="text-2xl font-black text-amber-600 mt-1">{beds.filter(b => b.status === 'AVAILABLE').length} Open Beds</h3>
                                <p className="text-[11px] text-slate-500 font-medium mt-2">Total Facility: 200 Beds</p>
                            </div>
                            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                                <p className="text-[10px] font-black uppercase text-slate-400">Discharged Records Vault</p>
                                <h3 className="text-2xl font-black text-purple-600 mt-1">{dischargedRecords.length} Archived</h3>
                                <p className="text-[11px] text-purple-600 font-bold mt-2">Full History & Summaries</p>
                            </div>
                        </div>

                        {/* SPLIT IP & OP TABLES */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            
                            {/* ACTIVE INPATIENTS (IP) */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-black text-[#002B49] flex items-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-[#00A3E0] mr-2"></span>
                                        Active Inpatient (IP) List
                                    </h3>
                                    <span className="text-xs font-bold text-slate-500">{activeInpatients.length} Patients Admitted</span>
                                </div>

                                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                                    {activeInpatients.map((ip, idx) => (
                                        <div key={idx} className="py-3 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-black text-[#002B49]">{ip.name} <span className="font-mono text-slate-400">({ip.uhid})</span></p>
                                                <p className="text-[11px] text-slate-500">Dr: {ip.doctor} • {ip.diagnosis}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-2.5 py-1 bg-cyan-50 text-[#00A3E0] font-black rounded-lg">{ip.bedCode}</span>
                                                <p className="text-[10px] text-slate-400 mt-1">{ip.ward}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* ACTIVE OUTPATIENTS (OP) */}
                            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-base font-black text-[#002B49] flex items-center">
                                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2"></span>
                                        Today's Outpatient (OP) List
                                    </h3>
                                    <span className="text-xs font-bold text-slate-500">{activeOutpatients.length} OPD Tokens</span>
                                </div>

                                <div className="divide-y divide-slate-100 max-h-80 overflow-y-auto">
                                    {activeOutpatients.map((op, idx) => (
                                        <div key={idx} className="py-3 flex justify-between items-center text-xs">
                                            <div>
                                                <p className="font-black text-[#002B49]">{op.patientName}</p>
                                                <p className="text-[11px] text-slate-500">{op.doctorName} ({op.dept})</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 font-black rounded-lg">{op.time}</span>
                                                <p className="text-[10px] font-mono text-slate-400 mt-1">{op.token}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* TAB 2: DOCTOR SLOT BOOKING WITH CALENDAR HAND-PICKER */}
                {activeTab === 'DOCTOR_BOOKING_CONSOLE' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Doctor Roster & Calendar Hand-Picker Booking</h2>
                                <p className="text-xs text-slate-500">Pick appointment dates and book slots directly for patients.</p>
                            </div>

                            {/* CALENDAR HAND-PICKER */}
                            <div className="flex items-center space-x-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                                <span className="text-xs font-bold text-slate-500 pl-2">📅 Select Date:</span>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={e => setSelectedDate(e.target.value)}
                                    className="p-1.5 border rounded-xl text-xs font-bold text-[#002B49] focus:outline-none"
                                />
                            </div>
                        </div>

                        {/* PATIENT INTAKE BAR */}
                        <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <input
                                type="text"
                                placeholder="Patient Full Name *"
                                value={bookingPatientName}
                                onChange={e => setBookingPatientName(e.target.value)}
                                className="p-2.5 border rounded-xl text-xs font-bold"
                            />
                            <input
                                type="tel"
                                placeholder="Patient Phone Number"
                                value={bookingPhone}
                                onChange={e => setBookingPhone(e.target.value)}
                                className="p-2.5 border rounded-xl text-xs font-bold"
                            />
                            <select
                                value={bookingPayer}
                                onChange={e => setBookingPayer(e.target.value)}
                                className="p-2.5 border rounded-xl text-xs font-bold bg-white"
                            >
                                <option value="CASHLESS_TPA">Cashless TPA / Insurance</option>
                                <option value="SELF_PAY">Self-Pay (Cash / UPI)</option>
                                <option value="CORPORATE">Corporate Tie-Up</option>
                            </select>
                        </div>

                        {/* DOCTORS SLOTS MATRIX */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {doctorsList.map(doc => (
                                <div key={doc.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-base font-black text-[#002B49]">{doc.name}</h3>
                                                <p className="text-xs text-[#00A3E0] font-bold">{doc.dept}</p>
                                            </div>
                                            <span className="font-black text-xs text-slate-700">₹{doc.fee}</span>
                                        </div>

                                        <div className="mt-4 space-y-2">
                                            <p className="text-[11px] font-black text-slate-400 uppercase">Slots on {selectedDate}:</p>
                                            {doc.slots.map(s => (
                                                <div key={s.id} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between items-center text-xs">
                                                    <div>
                                                        <p className="font-bold text-slate-800">{s.time}</p>
                                                        <p className={`text-[11px] ${s.patient ? 'text-emerald-700 font-bold' : 'text-slate-400'}`}>
                                                            {s.patient ? `Booked: ${s.patient}` : 'Available'}
                                                        </p>
                                                    </div>
                                                    {s.status === 'AVAILABLE' ? (
                                                        <button
                                                            onClick={() => handleBookDoctorSlot(doc.id, s.id)}
                                                            className="px-3 py-1 bg-[#00A3E0] hover:bg-[#008AC0] text-white text-[11px] font-black rounded-lg shadow"
                                                        >
                                                            Book Slot
                                                        </button>
                                                    ) : (
                                                        <span className="px-2 py-0.5 bg-slate-200 text-slate-600 rounded text-[10px] font-black">Reserved</span>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 3: 200 BEDS CAPACITY & RECORD MODAL */}
                {activeTab === 'BEDS_AND_CAPACITY' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-[#002B49]">Quaternary Bed Matrix (200 Beds Total)</h2>
                            <p className="text-xs text-slate-500">Click any <strong>Available Bed</strong> to Admit, or click an <strong>Occupied Bed</strong> to view Clinical Records / Discharge.</p>
                        </div>

                        {/* BED TILES */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 max-h-[550px] overflow-y-auto p-1">
                            {beds.map(b => (
                                <div
                                    key={b.id}
                                    onClick={() => {
                                        setSelectedBed(b);
                                        if (b.status === 'OCCUPIED') setShowPatientRecordModal(true);
                                        else setShowBedAdmissionModal(true);
                                    }}
                                    className={`p-3.5 rounded-2xl border shadow-sm cursor-pointer transition flex flex-col justify-between h-32 hover:scale-[1.02] ${b.status === 'OCCUPIED' ? 'bg-rose-50/50 border-rose-200' : 'bg-white border-slate-200'}`}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="font-black text-xs text-[#002B49]">{b.id}</span>
                                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-black ${b.status === 'AVAILABLE' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                                            {b.status}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold">{b.type} (Fl {b.floor})</p>
                                        <p className="text-[11px] font-black text-slate-800 truncate mt-0.5">
                                            {b.patient ? b.patient.name : '+ Click to Admit'}
                                        </p>
                                        <p className="text-[10px] text-[#00A3E0] font-bold">₹{b.tariff.toLocaleString('en-IN')}/day</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 4: DOCUMENTS & MEDICAL ARCHIVES */}
                {activeTab === 'DOCUMENTS_ARCHIVES' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-xl font-black text-[#002B49]">Discharged Patient Medical Records & Document Vault</h2>
                            <p className="text-xs text-slate-500">All clinical histories, discharge summaries, and settled bills are automatically moved here upon patient discharge.</p>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            <div className="p-4 bg-slate-50 grid grid-cols-6 text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span className="col-span-2">Patient / Record</span>
                                <span>Stay Duration</span>
                                <span>Attending Doctor</span>
                                <span>Discharge Summary</span>
                                <span>Settled Bill</span>
                            </div>

                            {dischargedRecords.map(doc => (
                                <div key={doc.id} className="p-4 grid grid-cols-6 items-center text-xs font-medium hover:bg-slate-50 transition">
                                    <div className="col-span-2">
                                        <p className="font-black text-[#002B49]">{doc.patientName}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">UHID: {doc.uhid} • Bed: {doc.bedCode}</p>
                                    </div>
                                    <span className="text-slate-600">{doc.admissionDate} to {doc.dischargeDate}</span>
                                    <span className="font-bold text-slate-800">{doc.doctor}</span>
                                    <p className="text-[11px] text-slate-600 pr-4 leading-relaxed">{doc.summary}</p>
                                    <div>
                                        <span className="font-black text-emerald-600">{doc.totalBill}</span>
                                        <p className="text-[10px] text-slate-400">{doc.payer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 5: CRM */}
                {activeTab === 'CRM' && user.canCrm && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Wecure Patient CRM & Deal Pipeline</h2>
                                <p className="text-xs text-slate-500">Inbound inquiries, surgical pre-authorizations, and corporate patient intake.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            <div className="p-4 bg-slate-50 grid grid-cols-5 text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span>Patient Name & Contact</span>
                                <span>Speciality Required</span>
                                <span>Deal Valuation</span>
                                <span>Conversion Stage</span>
                                <span>Assigned Rep</span>
                            </div>

                            {crmLeads.map(lead => (
                                <div key={lead.id} className="p-4 grid grid-cols-5 items-center text-xs font-medium hover:bg-slate-50 transition">
                                    <div>
                                        <p className="font-black text-[#002B49]">{lead.name}</p>
                                        <p className="text-[11px] text-slate-400 font-mono">{lead.phone}</p>
                                    </div>
                                    <span className="font-bold text-slate-800">{lead.spec}</span>
                                    <span className="font-black text-emerald-600">{lead.deal}</span>
                                    <span className="px-2.5 py-1 rounded-lg bg-cyan-50 text-[#00A3E0] font-black text-[10px] w-max">{lead.stage}</span>
                                    <span className="text-slate-600">{lead.rep}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* TAB 6: BILLING & INVOICE PDF MANAGEMENT */}
                {activeTab === 'BILLING_MANAGEMENT' && user.canBilling && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h2 className="text-xl font-black text-[#002B49]">Hospital Billing Management & Tax Invoices</h2>
                                <p className="text-xs text-slate-500">Restricted to Billing, Accounting, Management, Admin & Founder. Generate and download printable PDF invoices.</p>
                            </div>
                        </div>

                        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden divide-y divide-slate-100">
                            <div className="p-4 bg-slate-50 grid grid-cols-6 text-xs font-black text-slate-500 uppercase tracking-wider">
                                <span>Invoice #</span>
                                <span>Patient & UHID</span>
                                <span>Billing Category</span>
                                <span>Total Amount</span>
                                <span>Payer Mode</span>
                                <span>Actions</span>
                            </div>

                            {invoices.map(inv => (
                                <div key={inv.id} className="p-4 grid grid-cols-6 items-center text-xs font-medium hover:bg-slate-50 transition">
                                    <span className="font-mono font-black text-[#002B49]">{inv.id}</span>
                                    <div>
                                        <p className="font-black text-slate-800">{inv.patientName}</p>
                                        <p className="text-[10px] text-slate-400 font-mono">{inv.uhid}</p>
                                    </div>
                                    <span className="text-slate-600 font-semibold">{inv.billType}</span>
                                    <span className="font-black text-emerald-600 text-sm">₹{inv.total.toLocaleString('en-IN')}.00</span>
                                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px] w-max">{inv.payer}</span>
                                    <button
                                        onClick={() => handlePrintInvoice(inv)}
                                        className="px-3 py-1.5 bg-[#002B49] hover:bg-[#003B64] text-white text-xs font-black rounded-xl shadow flex items-center space-x-1 w-max"
                                    >
                                        <span>📄</span>
                                        <span>Download PDF</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>

            {/* MODAL 1: BED ADMISSION (LINK PATIENT TO BED) */}
            {showBedAdmissionModal && selectedBed && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <form onSubmit={handleAdmitPatient} className="bg-white rounded-3xl p-6 max-w-md w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-base font-black text-[#002B49]">Admit Inpatient to {selectedBed.id}</h3>
                                <p className="text-xs text-[#00A3E0] font-bold">{selectedBed.type} • Floor {selectedBed.floor} (₹{selectedBed.tariff}/day)</p>
                            </div>
                            <button type="button" onClick={() => setShowBedAdmissionModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name *</label>
                            <input type="text" required value={admName} onChange={e => setAdmName(e.target.value)} placeholder="e.g. Ramesh Varma" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
                                <input type="number" value={admAge} onChange={e => setAdmAge(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
                                <select value={admGender} onChange={e => setAdmGender(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Admitting Specialist Doctor</label>
                            <select value={admDoc} onChange={e => setAdmDoc(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs font-bold">
                                <option value="Dr. Ashish Patel">Dr. Ashish Patel (Cardiology)</option>
                                <option value="Dr. Meera Nambiar">Dr. Meera Nambiar (Oncology)</option>
                                <option value="Dr. Sunita Bansal">Dr. Sunita Bansal (Orthopaedics)</option>
                                <option value="Dr. Rohit Agnihotri">Dr. Rohit Agnihotri (NICU/Peds)</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1">Primary Clinical Diagnosis</label>
                            <input type="text" required value={admDiagnosis} onChange={e => setAdmDiagnosis(e.target.value)} placeholder="e.g. Acute STEMI / Observation" className="w-full p-2.5 border rounded-xl text-xs font-bold" />
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button type="button" onClick={() => setShowBedAdmissionModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Cancel</button>
                            <button type="submit" className="flex-1 py-2.5 bg-[#00A3E0] text-white rounded-xl text-xs font-black shadow">Confirm Admission</button>
                        </div>
                    </form>
                </div>
            )}

            {/* MODAL 2: PATIENT CLINICAL RECORD & DISCHARGE */}
            {showPatientRecordModal && selectedBed && selectedBed.patient && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="px-2.5 py-0.5 rounded bg-cyan-50 text-[#00A3E0] font-black text-[10px]">{selectedBed.id} • {selectedBed.type}</span>
                                <h3 className="text-lg font-black text-[#002B49] mt-1">{selectedBed.patient.name}</h3>
                                <p className="text-xs text-slate-400 font-mono">UHID: {selectedBed.patient.uhid} • Admitted: {selectedBed.patient.admittedDate}</p>
                            </div>
                            <button onClick={() => setShowPatientRecordModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        <div className="p-4 bg-slate-50 rounded-2xl space-y-2 text-xs">
                            <p><strong>Attending Doctor:</strong> {selectedBed.patient.doctor}</p>
                            <p><strong>Primary Diagnosis:</strong> {selectedBed.patient.diagnosis}</p>
                            <p><strong>Active Vitals:</strong> <span className="font-bold text-emerald-700">{selectedBed.patient.vitals}</span></p>
                            <p><strong>Current Medications:</strong> {selectedBed.patient.medications}</p>
                            <div className="pt-2 border-t border-slate-200 flex justify-between font-black">
                                <span>Accumulated Hospital Tariff:</span>
                                <span className="text-emerald-600">₹{selectedBed.patient.billSoFar.toLocaleString('en-IN')}.00</span>
                            </div>
                        </div>

                        <div className="flex space-x-2 pt-2">
                            <button onClick={() => setShowPatientRecordModal(false)} className="flex-1 py-2.5 border rounded-xl text-xs font-bold">Close Record</button>
                            <button onClick={() => handleDischargePatient(selectedBed)} className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-black shadow">
                                Discharge & Archive Record
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* MODAL 3: INTERACTIVE NAVIGATION AI AGENT */}
            {showAiModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-3xl p-6 max-w-lg w-full space-y-4 shadow-2xl flex flex-col h-[520px]">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                            <div className="flex items-center space-x-2">
                                <span className="text-2xl">🤖</span>
                                <div>
                                    <h3 className="text-base font-black text-[#002B49]">Wecure Clinical & Navigation AI Agent</h3>
                                    <p className="text-[10px] text-emerald-600 font-bold">● Active for Profile: {user.role}</p>
                                </div>
                            </div>
                            <button onClick={() => setShowAiModal(false)} className="text-slate-400 font-bold">✕</button>
                        </div>

                        {/* CHAT LOG STREAM */}
                        <div className="flex-1 overflow-y-auto space-y-3 p-2">
                            {aiChatLog.map((chat, idx) => (
                                <div key={idx} className={`p-3 rounded-2xl text-xs max-w-[85%] ${chat.sender === 'AI' ? 'bg-cyan-50 border border-cyan-100 text-[#002B49] mr-auto' : 'bg-[#002B49] text-white ml-auto'}`}>
                                    <p className="font-bold text-[10px] opacity-75 mb-0.5">{chat.sender}</p>
                                    <p className="leading-relaxed">{chat.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* INPUT BOX */}
                        <form onSubmit={handleAiSubmit} className="flex space-x-2 pt-2 border-t border-slate-100">
                            <input
                                type="text"
                                value={aiQuery}
                                onChange={e => setAiQuery(e.target.value)}
                                placeholder="e.g. 'Take me to Billing', 'Book Dr. Patel', 'Show ICU beds'..."
                                className="flex-1 p-2.5 border rounded-xl text-xs font-bold focus:outline-none focus:ring-2 focus:ring-[#00A3E0]"
                            />
                            <button type="submit" className="px-4 py-2.5 bg-[#00A3E0] hover:bg-[#008AC0] text-white text-xs font-black rounded-xl shadow">
                                Send
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
