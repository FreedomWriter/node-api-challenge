import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/projects/`)
      .then(res => setProjects(res.data.projects))
      .catch(err => console.log(err));
  }, []);
  console.log(projects);
  return (
    <div className="App">
      
      {projects.map(project => {
        return (
          <div key={project.id} className="app">
            <h2>Project: </h2>
            <p>{project.name}</p>
            <h2>Project Description: </h2>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
