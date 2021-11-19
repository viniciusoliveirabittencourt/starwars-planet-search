import React, { useEffect, useState, useContext } from 'react';
import contextApi from '../contextApi/contextApi';
import TableBodyMiddle from './TableBodyMiddle';

function Table() {
  const { filters:{ order } } = useContext(contextApi);
  const [planets, setPlanets] = useState([]);
  const [carregando, setCarregando] = useState(true);
  console.log(planets);

  useEffect(() => {
    fetch('https://swapi-trybe.herokuapp.com/api/planets/')
      .then((r) => r.json())
      .then(({ results }) => {
        results.forEach((element) => {
          delete element.residents;
        });
        setPlanets(results);
      })
      .then(() => {
        setCarregando(false);
      })
      .catch((error) => console.error(error));
  }, []);

  const organzArray = () => {
    switch(order.column) {
      case 'name':
        if (order.sort === 'ASC') {
          planets.sort((element, elementTwo) => {
            return element.name < elementTwo.name ? -1 :
              element.name > elementTwo.name ? 1 : 0;
          });
        } else {
          planets.sort((element, elementTwo) => {
            return element.name < elementTwo.name ? 1 :
              element.name > elementTwo.name ? -1 : 0;
          });
        };
        break;
      case 'population':
        if (order.sort === 'ASC') {
          planets.sort((element, elementTwo) => {
            return parseInt(element.population) < parseInt(elementTwo.population) ? -1 :
              parseInt(element.population) > parseInt(elementTwo.population) ? 1 : 0;
          });
        } else {
          planets.sort((element, elementTwo) => {
            return parseInt(element.population) < parseInt(elementTwo.population) ? 1 :
              parseInt(element.population) > parseInt(elementTwo.population) ? -1 : 0;
          });
        };
        break;
        case 'orbital_period':
          if (order.sort === 'ASC') {
            planets.sort((element, elementTwo) => {
              return parseInt(element.orbital_period) < parseInt(elementTwo.orbital_period) ? -1 :
                parseInt(element.orbital_period) > parseInt(elementTwo.orbital_period) ? 1 : 0;
            });
          } else {
            planets.sort((element, elementTwo) => {
              return parseInt(element.orbital_period) < parseInt(elementTwo.orbital_period) ? 1 :
                parseInt(element.orbital_period) > parseInt(elementTwo.orbital_period) ? -1 : 0;
            });
          };
          break;
        case 'diameter':
        if (order.sort === 'ASC') {
          planets.sort((element, elementTwo) => {
            return parseInt(element.diameter) < parseInt(elementTwo.diameter) ? -1 :
              parseInt(element.diameter) > parseInt(elementTwo.diameter) ? 1 : 0;
          });
        } else {
          planets.sort((element, elementTwo) => {
            return parseInt(element.diameter) < parseInt(elementTwo.diameter) ? 1 :
              parseInt(element.diameter) > parseInt(elementTwo.diameter) ? -1 : 0;
          });
        }
        break;
        case 'rotation_period':
          if (order.sort === 'ASC') {
            planets.sort((element, elementTwo) => {
              return parseInt(element.rotation_period) < parseInt(elementTwo.rotation_period) ? -1 :
                parseInt(element.rotation_period) > parseInt(elementTwo.rotation_period) ? 1 : 0;
            });
          } else {
            planets.sort((element, elementTwo) => {
              return parseInt(element.rotation_period) < parseInt(elementTwo.rotation_period) ? 1 :
                parseInt(element.rotation_period) > parseInt(elementTwo.rotation_period) ? -1 : 0;
            });
          }
          break;
        case 'surface_water':
          if (order.sort === 'ASC') {
            planets.sort((element, elementTwo) => {
              return parseInt(element.surface_water) < parseInt(elementTwo.surface_water) ? -1 :
                parseInt(element.surface_water) > parseInt(elementTwo.surface_water) ? 1 : 0;
            });
          } else {
            planets.sort((element, elementTwo) => {
              return parseInt(element.surface_water) < parseInt(elementTwo.surface_water) ? 1 :
                parseInt(element.surface_water) > parseInt(elementTwo.surface_water) ? -1 : 0;
            });
          }
          break;
    }
  }

  organzArray();

  const THeadInfor = () => {
    const arrayObject = Object.keys(planets[0]);
    return arrayObject;
  };

  const bodyTable = () => (
    <table>
      <thead>
        <tr>
          { THeadInfor().map((value) => <th key={ value }>{ value }</th>) }
        </tr>
      </thead>
      <tbody>
        <TableBodyMiddle arrayPlanets={ planets } />
      </tbody>
    </table>
  );

  return (
    carregando ? <h1>Carregando....</h1> : bodyTable()
  );
}

export default Table;
