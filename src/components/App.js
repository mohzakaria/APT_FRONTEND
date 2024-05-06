import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes
import Login from "./Login";
import Register from "./Register";
import { HomePage } from "./HomePage";
import { Docs } from "./Docs.jsx";
import NewDoc from "./NewDoc.jsx";
import NewPermission from "./NewPermission.jsx";

function App() {
  const [isRegistered, setIsRegistered] = useState(true);

  function notRegistered() {
    setIsRegistered(false);
  }

  function registered() {
    setIsRegistered(true);
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="App">
            {isRegistered ? (
              <div>
                <Login onChecked={notRegistered} />
              </div>
            ) : (
              <div>
                <Register onChecked={registered} />
              </div>
            )}
          </div>
        } />
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/docs/:id" element={<Docs />} />
        <Route path="/newPermission/:id" element={<div className="App"><NewPermission /></div>} />
        {/* Use component prop, not componenet */}
        <Route path="/newdocs" element={<div className="App"><NewDoc /></div>} />
      </Routes>
    </Router>
  );
}

export default App;
