import React, { useState } from 'react';
import './App.css';
import Table from './pages/Table';
import MyContext from './contextApi/contextApi';

function App() {
  const [inputNamePlanet, setInputNamePlanet] = useState('');
  const [inputTypeSelectorNumber, setInputTypeSelectorNumber] = useState('population');
  const [inputMaiorMenorIgual, setInputMaiorMenorIgual] = useState('maior que');
  const [inputNumber, setInputNumber] = useState('0');
  const [filterByNumbers, setFilterByNumbers] = useState([]);
  const arrayFiltros = ['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  const handleInputs = ({ target }) => {
    const { value, id } = target;
    switch (id) {
      case 'TypeSelectorNumber':
        setInputTypeSelectorNumber(value);
        break;
      case 'MaiorMenorIgual':
        setInputMaiorMenorIgual(value);
        break;
      case 'PesquisaPlaneta':
        setInputNamePlanet(value);
        break;
      case 'ValueNumber':
        setInputNumber(value);
        break;
      default:
        console.error('FAZ ISSO N DOIDO');
        break;
    }
  }

  const veryfyInptuTextOnlyNumbers = () => {
    const regex = /^[0-9]+$/;
    if (inputNumber.match(regex)) {
      return true
    } else {
      return false;
    }
  }

  const selectFilter = () => {
    return (
      <select data-testid='column-filter' onChange={ handleInputs } id="TypeSelectorNumber" value={ inputTypeSelectorNumber }>
          { arrayFiltros.map((element) => <option key={ element } value={ element }>{ element }</option>) }
      </select>
    );
  }

  const onClick = () => {
    if (veryfyInptuTextOnlyNumbers()) {
      setFilterByNumbers([...filterByNumbers, { column: inputTypeSelectorNumber, comparison: inputMaiorMenorIgual, value: inputNumber }]);
    } else {
      const span = document.getElementById('ValidaNumber');
      span.style.display = 'inline';
      setTimeout(() => span.style.display = 'none', 3000);
    }
  };

  const bodySelectNumber = () => {
      return (
          <form>
            { selectFilter() }
            <select data-testid='comparison-filter' onChange={ handleInputs } id="MaiorMenorIgual" value={ inputMaiorMenorIgual }>
              <option value="maior que">maior que</option>
              <option value="menor que">menor que</option>
              <option value="igual a">igual a</option>
            </select>
            <input data-testid='value-filter' onChange={ handleInputs } id="ValueNumber" value={ inputNumber } type="text"/>
            <span id="ValidaNumber" style={{ display: 'none' }}>Pf coloque apenas numeros</span>
            <button onClick={ onClick } data-testid='button-filter' type="button">Filtrar!</button>
          </form>
      );
  }

  const objContext = {
    filters: {
      filterByName: {
        name: inputNamePlanet,
      }, filterByNumericValues: filterByNumbers,
    },
  };

  return (
    <MyContext.Provider value={ objContext }>
      <h1>Star Wars Project</h1>
      <input
        id="PesquisaPlaneta"
        onChange={ handleInputs }
        type="text"
        data-testid="name-filter"
        value={ inputNamePlanet }
      />
      { bodySelectNumber() }
      <Table />
    </MyContext.Provider>
  );
}

export default App;
