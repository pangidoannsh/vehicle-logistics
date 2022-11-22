import React, { useState } from 'react';
import './App.css';
import { Routers } from './config';
import { BranchContext, ContractContext } from './Store'

function App() {
  const [branch, setBranch] = useState([]);
  const [contract, setContract] = useState([])

  return (
    <ContractContext.Provider value={[contract, setContract]}>
      <BranchContext.Provider value={[branch, setBranch]}>
        <Routers />
      </BranchContext.Provider>
    </ContractContext.Provider>

  );
}

export default App;
