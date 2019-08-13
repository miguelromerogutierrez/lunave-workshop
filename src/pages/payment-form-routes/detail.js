import React from 'react'
import PropTypes from 'prop-types'

function Detail({amount, creditCardNumber, onClickPrevStep}) {
  return (
    <div>
      <table>
        <tr>
          <th>Monto</th>
          <td>{amount}</td>
        </tr>
        <tr>
          <th>Fecha</th>
          <td>21/Aug/2019</td>
        </tr>
        <tr>
          <th>Medio de pago</th>
          <td>{creditCardNumber}</td>
        </tr>
      </table>
      <button onClick={onClickPrevStep}>Regresar</button>
    </div>
  )
}

Detail.propTypes = {
  amount: PropTypes.string,
  creditCardNumber: PropTypes.string,
  onClickPrevStep: PropTypes.func,
}

export default Detail

