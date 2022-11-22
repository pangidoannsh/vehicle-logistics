import React, { useState } from 'react';
import './App.css';
import { Routers } from './config';
import { BranchContext } from './Store'

function App() {
  const [branch, setBranch] = useState([]);
  const [contract, setContract] = useState([])

  return (
    <BranchContext.Provider value={{
      branch: [branch, setBranch],
      contract: [contract, setContract]
    }}>
      <Routers />
    </BranchContext.Provider>

  );
}

export default App;
