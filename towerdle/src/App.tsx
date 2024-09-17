import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProblemPage } from './page/ProblemPage';
import { MainPage } from './page/MainPage';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/problem" element={<ProblemPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
