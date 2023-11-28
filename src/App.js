import React from "react";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import './Components/Style.css';
import AddStudent from "./Components/AddStudent";
import StudentList from "./Components/StudentList";
import Home from "./Components/Home";

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/addstudent" element={<AddStudent/>} />
          <Route path="/studentlist" element={<StudentList/>} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
