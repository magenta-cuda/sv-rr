import React from 'react';
import { useSelector } from 'react-redux';
import { Choosers } from './features/chooser/Choosers';
import { Selectors } from './features/chooser/Selectors';
import { Orderer } from './features/orderer/Orderer'
import { selectData, selectProductName, selectProductId } from './features/chooser/choosersSlice';
import './App.css';

function App() {
    const data        = useSelector(selectData)
    const productName = useSelector(selectProductName)
    const productId   = useSelector(selectProductId)
    return (
        <div className="SV-Redux-App">
            {typeof data === "string"
                ? <div className="SV-Redux-App-productName">{data}</div>
                : !data.length
                    ? <>
                        <div className="SV-Redux-App-productName">Simple Variations</div>
                        <div className="SV-Redux-App-message">
                            <span>SV Product {productId} not found.</span>
                        </div>
                    </>
                    : <>
                        <div className="SV-Redux-App-productName">{productName}</div>
                        <header className="SV-Redux-App-header">
                            <Choosers cells={data} />
                            <Selectors attributes={data} />
                        </header>
                        <Orderer />
                    </>
            }
        </div>
    );
}

export default App;
