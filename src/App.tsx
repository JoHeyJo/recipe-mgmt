import { useState } from 'react';
import RoutesList from "./nav-routes/RoutesList";
import './styles/App.css'
import { User } from './utils/types';

function App() {
  const [currentUser, setCurrentUser] = useState<User>();

  return (
    <div className="App">
      <RoutesList />
    </div>
  );
}

export default App;
