import React, { useEffect, useState } from 'react';
import TableBody from './TableBody';

function Table() {
  const [planets, setPlanets] = useState([]);
  const [carregando, setCarregando] = useState(true);

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

  return (
    carregando ? <h1>Carregando....</h1> :
    <table>
      <thead>
        <tr>
          { THeadInfor().map((value) => <th key={ value }>{ value }</th>) }
        </tr>
      </thead>
      <tbody>
        { planets.map((element) => <TableBody key={ element.name } arrayPlanets={ element } />) }
      </tbody>
    </table>
  );
};

export default Table;
