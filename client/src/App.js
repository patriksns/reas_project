import React from 'react'
import './App.css';
import Signup from "./components/Signup";
import {BrowserRouter, Routes, Route} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/chci-nabidku" element={<Signup />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App