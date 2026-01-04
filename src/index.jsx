import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import '@mui/material/styles'; // For MUI components styles
import '@mui/x-date-pickers/DatePicker';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
