import React from 'react';

function TableBody({ arrayPlanets }) {
    const array = Object.keys(arrayPlanets);
    const index = array.indexOf('residents');
    array.splice(index, 1);
  return (
    <tr>
      { Object.values(arrayPlanets).map((infoPlanet) => <td>{ infoPlanet }</td>) }
    </tr>
  );
}

export default TableBody;
