import './App.css';
import React, { lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const ProblemPage = lazy(() => import('./page/ProblemPage'));
import { MainPage } from './page/MainPage';
import { LoginPage } from './page/LoginPage';
import { CallbackPage } from './page/CallbackPage';

const resetLocalStorage = () => {
  const now = new Date();

  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  if (hours === 0 && minutes === 0 && seconds === 0) {
    localStorage.clear();
    window.location.reload();
  }
}

function App() {
  useEffect(() => {
    const invervalId = setInterval(() => {
      resetLocalStorage();
    }, 1000);

    return () => clearInterval(invervalId);
  }, [])

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
