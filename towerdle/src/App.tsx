import React from 'react';
import './App.css';
import { useState, useEffect } from 'react';
import { Keyboard } from './component/keyboard/Keyboard';

function App() {
  const [data, setData] = useState<string>('');
  const [value, setValue] = useState<string>('');
  const dataChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }

  const getData = async () => {

  }

  return (
    <div className="App">
      <input value={data} onChange={dataChangeHandler}/>
      <button onClick={getData}>submit</button>
      <Keyboard/>
    </div>
  );
}

export default App;
