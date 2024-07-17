// import './App.css'
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import EditAdmin from "./components/EditAdmin"
import Approve from "./components/Approve"
import Editnoti from "./components/Editnoti"
import Residents from "./components/Residents"
import Service from "./components/Service"

// import Old from "./components/Old"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Removed import of useState as it's not being used
// import { useState } from 'react';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/EditAdmin" element={<EditAdmin/>}/>
          <Route path="/Approve" element={<Approve/>}/>
          <Route path="/Editnoti" element={<Editnoti/>}/>
          <Route path="/Residents" element={<Residents/>}/>
          <Route path="/Service" element={<Service/>}/>
          {/* <Route path="/Old" element={<Old/>}/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
