import React, { useState, useEffect } from "react";
import api from './services/api';
import Input from './components/Input';

import "./styles.css";

function App() {

  const [ repository, setRepository ] = useState([]);
  const [ txt, setText ] = useState('');

  useEffect(()=>{
    api.get('repositories').then(project => {
      setRepository(project.data);
    });
    console.log(repository.length);
    
  }, []);


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: txt,
      owner: 'Renan Lopes'
    });

    setRepository([...repository, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repositoryToDelete = repository.findIndex(repo => repo.id === id);
    repository.splice(repositoryToDelete, 1);
    const newRepository = repository;

    setRepository([...repository, newRepository]);

    if(repository.length === 0) {
      setRepository([]);
    }
  }

  function handleInput(txt) {

    if(txt.length > 0) {
      setText(txt);
    }
  }

  return (
    <div className="container">

      <div className="header-input">
        <Input title='Adicione um repositório' 
          onChangeText={handleInput}
          value={txt}
        />
        <button onClick={handleAddRepository}>Adicionar</button>
      </div>

      <ul data-testid="repository-list">

        {repository.map(repository => (
          
          <div key={repository.id} className="repo-container">
            <li>
            
              <div className="leftside">
                {repository.title != '' && repository.title}
              </div>

              <div className="rightside">
                {repository.id != null && 
                  <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                  </button>
                }
              </div>
            </li>
          </div>
        ))}

      </ul>

    </div>
  );
}

export default App;
