import React, { useEffect, useState, useContext } from 'react';
import TableBody from './TableBody';
import contextApi from '../contextApi/contextApi';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [array, setArray] = useState([]);
  const { filters: { filterByName: { name },
    filterByNumericValues,
  } } = useContext(contextApi);

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
    setArray(planets);
    filterByNumericValues.forEach((element) => {
      const arrayVar = array.filter((elementTwo) => {
        switch (element.comparison) {
        case 'maior que':
          return parseInt(elementTwo[element.column], 10) > parseInt(element.value, 10);
        case 'menor que':
          return parseInt(elementTwo[element.column], 10) < parseInt(element.value, 10);
        case 'igual a':
          return parseInt(elementTwo[element.column], 10) === parseInt(element.value, 10);
        default:
          return console.error('Man para com isso');
        }
      });
      setArray(arrayVar);
    });
  }, [array, filterByNumericValues, planets]);

  const THeadInfor = () => {
    const arrayObject = Object.keys(planets[0]);
    return arrayObject;
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
    }
    return (
      array.map((infoTable) => (<TableBody
        key={ infoTable.name }
        arrayPlanets={ infoTable }
      />))
        .filter((planet) => planet.key.includes(name))
    );
  };

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
