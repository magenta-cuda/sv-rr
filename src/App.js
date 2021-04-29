import React from 'react';
import { useSelector } from 'react-redux';
import { Choosers } from './features/chooser/Choosers';
import { Selectors } from './features/chooser/Selectors';
import { selectData } from './features/chooser/choosersSlice';
import './App.css';

function App() {
  const data = useSelector(selectData);
  return (
    <div className="App">
      <header className="App-header">
        <Choosers cells={data} />
        <Selectors attributes={data} />
      </header>
    </div>
  );
}

export default App;
