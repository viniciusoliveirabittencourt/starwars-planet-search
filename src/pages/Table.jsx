import React, { useEffect, useState, useContext } from 'react';
import TableBody from './TableBody';
import contextApi from '../contextApi/contextApi';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [array, setArray] = useState([]);
  const { filters: { filterByName: { name }, filterByNumericValues } } = useContext(contextApi);
  console.log(filterByNumericValues);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((r) => r.json())
      .then(({ results }) => {
        results.forEach((element) => {
          delete element.residents;
        });
        setPlanets(results);
        setArray(results);
      })
      .then(() => setCarregando(false))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    const arrayVar = array.filter((elementTwo) => {
      switch (filterByNumericValues[filterByNumericValues.length - 1].comparison) {
        case 'maior que': 
          return parseInt(elementTwo[filterByNumericValues[filterByNumericValues.length - 1].column]) > parseInt(filterByNumericValues[filterByNumericValues.length - 1].value);
        case 'menor que':
          return parseInt(elementTwo[filterByNumericValues[filterByNumericValues.length - 1].column]) < parseInt(filterByNumericValues[filterByNumericValues.length - 1].value);
        case 'igual a':
          return parseInt(elementTwo[filterByNumericValues[filterByNumericValues.length - 1].column]) === parseInt(filterByNumericValues[filterByNumericValues.length - 1].value);
        default:
          console.error('WHTF MAN DNV ?');
          break;
      }
    });
    setArray(arrayVar);
    console.log(array);
  }, [filterByNumericValues])

  const THeadInfor = () => {
    const array = Object.keys(planets[0]);
    return array;
  };

  const bodyTablePlanets = () => {
    if (filterByNumericValues.length === 0) {
      return (
        planets
          .map((element) => (<TableBody
            key={ element.name }
            arrayPlanets={ element }
          />))
          .filter((planet) => planet.key.includes(name))
      );
    } else {
      return (
        array.map((element) => (<TableBody
          key={ element.name }
          arrayPlanets={ element }
        />))
        .filter((planet) => planet.key.includes(name))
      );
    }
  }

  const bodyTable = () => (
    <table>
      <thead>
        <tr>
          { THeadInfor().map((value) => <th key={ value }>{ value }</th>) }
        </tr>
      </thead>
      <tbody>
        { bodyTablePlanets() }
      </tbody>
    </table>
  );

  return (
    carregando ? <h1>Carregando....</h1> : bodyTable()
  );
}

export default Table;
