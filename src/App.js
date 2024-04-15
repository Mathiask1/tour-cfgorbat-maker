import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <div className='app'>
      <Router>
        <Routes>
        <Route path="/tour-cfgorbat-maker" element={<Home />} />
        <Route path="/" element={<Home />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
