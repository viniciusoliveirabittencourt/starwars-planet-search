import React, { useState } from 'react';
import './App.css';
import Table from './pages/Table';
import MyContext from './contextApi/contextApi';

function App() {
  const [inputNamePlanet, setInputNamePlanet] = useState('');

  const handleInputNamePlanet = ({ target }) => {
    const { value } = target;
    setInputNamePlanet(value);
  };

  const objContext = {
    filters: {
      filterByName: {
        name: inputNamePlanet,
      },
    },
  };

  return (
    <MyContext.Provider value={ objContext }>
      <h1>Star Wars Project</h1>
      <input
        onChange={ handleInputNamePlanet }
        type="text"
        data-testid="name-filter"
        value={ inputNamePlanet }
      />
      <Table />
    </MyContext.Provider>
  );
}

export default App;
