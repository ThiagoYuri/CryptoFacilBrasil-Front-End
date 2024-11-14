import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./components/NavBar/NavBar";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Terms from "./pages/Terms/Terms";
//import Contact from "./pagesContato";
function App() {
  return (
    <Router>
    <div className="App">
      <NavBar />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/terms" element={<Terms />} />
          {/*<Route path="/contact" element={<Contact />} />*/}
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
