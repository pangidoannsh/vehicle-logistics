import './App.css';
import { Routers } from './config';
import Store from './Store'

function App() {
  return (
    <Store>
      <Routers />
    </Store>
  );
}

export default App;
