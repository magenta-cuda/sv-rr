import React from 'react';
import { useSelector } from 'react-redux';
import { Choosers } from './features/chooser/Choosers';
import { Selectors } from './features/chooser/Selectors';
import { selectData, selectProductName } from './features/chooser/choosersSlice';
import './App.css';

function App() {
  const data = useSelector(selectData)
  const productName = useSelector(selectProductName)
  return (
    <div className="SV-Redux-App">
      <div className="SV-Redux-App-productName">{productName}</div>
      <header className="SV-Redux-App-header">
        <Choosers cells={data} />
        <Selectors attributes={data} />
      </header>
    </div>
  );
}

export default App;
