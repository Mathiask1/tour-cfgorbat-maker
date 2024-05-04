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
          <Route path="/tour-cfgorbat-maker/" element={<Home />} />
          <Route path="/tour-cfgorbat-maker/404" element={<NotFoundPage />} />
          <Route path="/tour-cfgorbat-maker/*" element={<Navigate to="/tour-cfgorbat-maker/404" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
