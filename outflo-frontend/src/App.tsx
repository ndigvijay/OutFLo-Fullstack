import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import MessageGeneratorPage from './pages/MessageGeneratorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/message-generator" element={<MessageGeneratorPage />} />
          </Routes>
        </MainLayout>
      </div>
    </Router>
  );
}

export default App;
