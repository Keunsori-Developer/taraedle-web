import React, { lazy } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ProblemPage = lazy(() => import('./page/ProblemPage'));
// import { ProblemPage } from './page/ProblemPage';
import { MainPage } from './page/MainPage';
import { LoginPage } from './page/LoginPage';
import { CallbackPage } from './page/CallbackPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/problem" element={<ProblemPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/callback" element={<CallbackPage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
