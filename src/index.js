import React from 'react';
import { createRoot } from 'react-dom/client';
import HospitalDashboard from './HospitalDashboard';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<HospitalDashboard />);
