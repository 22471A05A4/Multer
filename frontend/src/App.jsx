import React, { useState } from 'react';
import  { Userlist } from './components/Userlist';
import RegistrationForm from "./components/Register"
import "./App.css"

const App = () => {
  
  const [showUsers, setShowUsers] = useState(false);   // controls visibility
  const [hasData, setHasData] = useState(false);       // tracks submission

  // handle form submit: receive trigger from form
  const handleFormSubmit = () => {
    setHasData(true);
    setShowUsers(false); // hide users until button is clicked
  };

  return (
    <>
    <div>
      <RegistrationForm onSubmitSuccess={handleFormSubmit} />

      <button
        onClick={() => setShowUsers(true)}
        disabled={!hasData}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: hasData ? 'pointer' : 'not-allowed',
          backgroundColor: hasData ? '#007bff' : '#ccc',
          color: '#fff',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        Submitted Data
      </button>

      {showUsers && <Userlist/>}
    </div>
    </>
  );
};


export default App;
