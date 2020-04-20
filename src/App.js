import React, {useState, useEffect} from "react";
import axios from "./services/api";

import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get("repositories").then(response => {
      setProjects(response.data);
    });
  },[])
  

  async function handleAddRepository() {
    // TODO
  
    const response = await axios.post("repositories", {
        "title": "Desafio GoStack",
        "url": "google.com",
        "techs": ["React", "Node"],
        "likes": 17
    });

    const project = response.data;

    setProjects([...projects, project]);
    
  }

  async function handleRemoveRepository(id) {
    // TODO

    await axios.delete(`repositories/${id}`)

    setProjects(projects.filter(project => project.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => <li key={project.id}>{project.title} 
        <button onClick={() => handleRemoveRepository(project.id)}>
          Remover
        </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
