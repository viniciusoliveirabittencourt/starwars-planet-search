import React from 'react';
import PropTypes from 'prop-types';

function TableBody({ arrayPlanets }) {
  return (
    <tr>
      { Object.values(arrayPlanets)
        .map((infoPlanet, index) => <td key={ index }>{ infoPlanet }</td>) }
    </tr>
  );
}

TableBody.propTypes = {
  arrayPlanets: PropTypes.arrayOf().isRequired,
};

export default TableBody;
