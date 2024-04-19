import React, {useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import BrowserRouter and Routes
import Login from "./Login";
import Register from "./Register";
import {HomePage} from "./HomePage";
import { Docs } from "./Docs.jsx";
import  NewDoc  from "./NewDoc.jsx";



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
      <Routes> {/* Define your routes inside Routes */}
        <Route path="/" element={ /* Render your components based on the route path */
          <div>
            {isRegistered ? (
              <div className="App">
                <Login onChecked={notRegistered} />
              </div>
            ) : (
              <div className="App">
                <Register onChecked={registered} />
              </div>
            )}
          </div>
        } />
        <Route path="/home" element={<HomePage />} />
        <Route path="/docs/id?" element={<Docs />} />
        <Route path="/newdocs" element={<div className="App"><NewDoc/> </div>} />
      </Routes>
    </Router>
  );
}

export default App;
