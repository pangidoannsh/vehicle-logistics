import './App.css';
import { Authentication, Routers } from './config';
import User from './config/User';

function App() {
  return (
    <Authentication>
      <User>
        <Routers />
      </User>
    </Authentication>
  );
}

export default App;
