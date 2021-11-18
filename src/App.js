import React, { useState } from 'react';
import './App.css';
import Table from './pages/Table';
import MyContext from './contextApi/contextApi';

function App() {
  const [arrayFiltros, setArrayFiltros] = useState(['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [inputNamePlanet, setInputNamePlanet] = useState('');
  const [inputTypeSelectorNumber, setInputTypeSelectorNumber] = useState('population');
  const [inputMaiorMenorIgual, setInputMaiorMenorIgual] = useState('maior que');
  const [inputNumber, setInputNumber] = useState('0');
  const [filterByNumbers, setFilterByNumbers] = useState([]);
  console.log(inputTypeSelectorNumber);

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
  };

  const veryfyInptuTextOnlyNumbers = () => {
    const regex = /^[0-9]+$/;
    if (inputNumber.match(regex)) {
      return true;
    }
    return false;
  };

  const selectFilter = () => (
    <select
      data-testid="column-filter"
      onChange={ handleInputs }
      id="TypeSelectorNumber"
      value={ inputTypeSelectorNumber }
    >
      { arrayFiltros.map((element) => (
        <option
          key={ element }
          value={ element }
        >
          { element }
        </option>)) }
    </select>
  );

  const onClick = () => {
    if (veryfyInptuTextOnlyNumbers()) {
      setFilterByNumbers([...filterByNumbers,
        {
          column: inputTypeSelectorNumber,
          comparison: inputMaiorMenorIgual,
          value: inputNumber,
        },
      ]);
      const index = arrayFiltros.indexOf(inputTypeSelectorNumber);
      arrayFiltros.splice(index, 1);
      setArrayFiltros(arrayFiltros);
      setInputTypeSelectorNumber(arrayFiltros[0]);
    } else {
      const TIME_TO_CHANGE_STYLE = 3000;
      const span = document.getElementById('ValidaNumber');
      span.style.display = 'inline';
      setTimeout(() => { span.style.display = 'none'; }, TIME_TO_CHANGE_STYLE);
    }
  };

  const bodySelectNumber = () => (
    <form>
      { selectFilter() }
      <select
        data-testid="comparison-filter"
        onChange={ handleInputs }
        id="MaiorMenorIgual"
        value={ inputMaiorMenorIgual }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        onChange={ handleInputs }
        id="ValueNumber"
        value={ inputNumber }
        type="text"
      />
      <span
        id="ValidaNumber"
        style={ { display: 'none' } }
      >
        Pf coloque apenas numeros
      </span>
      <button
        onClick={ onClick }
        data-testid="button-filter"
        type="button"
      >
        Filtrar!
      </button>
    </form>
  );

  const oldSelects = () => (
    filterByNumbers.map((element) => (
      <form key={ element.column }>
        <select>
          <option>{ element.column }</option>
        </select>
        <select>
          <option>{ element.comparison }</option>
        </select>
        <input id="ValueNumber" defaultValue={ element.value } type="text" />
        <span
          id="ValidaNumber"
          style={ { display: 'none' } }
        >
          Pf coloque apenas numeros
        </span>
        <button
          disabled
          onClick={ onClick }
          data-testid="button-filter"
          type="button"
        >
          Filtrar!
        </button>
      </form>
    )));

  const objContext = {
    filters: {
      filterByName: {
        name: inputNamePlanet,
      },
      filterByNumericValues: filterByNumbers,
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
      { filterByNumbers.length === 0 ? '' : oldSelects() }
      { bodySelectNumber() }
      <Table />
    </MyContext.Provider>
  );
}

export default App;
