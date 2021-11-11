import React, { useEffect, useState, useContext } from 'react';
import TableBody from './TableBody';
import contextApi from '../contextApi/contextApi';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const { filters: { filterByName: { name } } } = useContext(contextApi);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((r) => r.json())
      .then(({ results }) => {
        results.forEach((element) => {
          delete element.residents;
        });
        setPlanets(results);
      })
      .then(() => setCarregando(false))
      .catch((error) => console.error(error));
  }, []);

  const THeadInfor = () => {
    const array = Object.keys(planets[0]);
    return array;
  };

  const bodyTable = () => (
    <table>
      <thead>
        <tr>
          { THeadInfor().map((value) => <th key={ value }>{ value }</th>) }
        </tr>
      </thead>
      <tbody>
        { planets.map((element) => (<TableBody
          key={ element.name }
          arrayPlanets={ element }
        />))
          .filter((planet) => planet.key.includes(name))}
      </tbody>
    </table>
  );

  return (
    carregando ? <h1>Carregando....</h1> : bodyTable()
  );
}

export default Table;
