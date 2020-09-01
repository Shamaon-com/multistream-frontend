import React, {useState, useEffect} from 'react';
import './App.css';
import Routes from './Routes.js';
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";


export default function App() {

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  
  useEffect(() => {
    onLoad();
  }, []);
  
  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }
  
    setIsAuthenticating(false);
  }

  
  return (
    <div className="App container">
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
        <Routes />
      </AppContext.Provider>

    </div>
  );
}
