import React from 'react'
import PropTypes from 'prop-types';
import classnames from 'classnames';

import CCForm from '../creditcard-form/cc-form';
import Input from './Input';
import { formatMoney } from './helpers';
import './styles.scss';

const inputRef = React.createRef();

class PaymentForm extends React.Component {

  state = {
    showCCForm: false,
    showDetail: false,
    paymentAmount: 'rpa',
    customAmount: 1200.30,
    paymentMetod: '',
    creditCards: [
      {
        id: 1,
        number: '*****1234',
        type: 'VISA',
      },
      {
        id: 2,
        number: '*****2534',
        type: 'MASTERCARD',
      }
    ]
  }

  handleChangePaymentAmount = (event) => {
    const value = event.target.value;
    this.setState({
      paymentAmount: value
    })
  }

  handleChangeCustomAmount = (event) => {
    const value = event.target.value.replace(',', '');
    this.setState({
      customAmount: value
    })
  }

  handleChangePaymentMethod = (event) => {
    const value = event.target.value;
    this.setState({
      paymentMetod: Number(value),
    })
  }

  handleClickAddCC = () => {
    this.setState(oldState => ({
      showCCForm: !oldState.showCCForm
    }))
  }

  handleSubmit = (values) => {
    const cc = this.state.creditCards;
    cc.push({
      id: cc[cc.length-1].id + 1,
      number: values.ccNumber,
      type: 'AMEX'
    })
    this.setState({
      creditCards: cc,
      showCCForm: false
    })
  }

  handleClickNextStep = () => {
    this.setState({
      showDetail: true
    })
  }

  handleClickPrevStep = () => {
    this.setState({
      showDetail: false
    })
  }

  render() {
    const { paymentAmount } = this.state;
    const rpaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'rpa', active: paymentAmount === 'rpa' });
    const poaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'poa', active: paymentAmount === 'poa' });
    const cpaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'cpa', active: paymentAmount === 'cpa' });

    if(this.state.showDetail) {
      const amount = this.state.paymentMetod === 'rpa' ? '$1,200.00'
        : this.state.paymentAmount === 'poa' ? '$120,000.00'
        : `$${formatMoney(this.state.customAmount)}`;
      const creditCard = this.state.creditCards.find(cc => cc.id === this.state.paymentMetod)
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
              <td>{creditCard.number}</td>
            </tr>
          </table>
          <button onClick={this.handleClickPrevStep}>Regresar</button>
        </div>
      )
    }
    return (
      <div className="payment-form">
        <div className="form--payment-amounts">

          <div className={rpaClassNames}>
            <input type="radio" value="rpa" name="paymentAmount" id="paymentAmount-rpa" onChange={this.handleChangePaymentAmount}
              checked={paymentAmount === 'rpa'} />
            <label htmlFor="paymentAmount-rpa">
              <div>
                <p>Pago mensual</p>
                <p><b>$1,200.00<small>MXN</small></b></p>
              </div>
            </label>
          </div>

          <div className={poaClassNames}>
            <input type="radio" value="poa" name="paymentAmount" id="paymentAmount-poa" onChange={this.handleChangePaymentAmount} checked={paymentAmount === 'poa'} />
            <label htmlFor="paymentAmount-poa">
              <div>
                <p>Pago total</p>
                <p><b>$120,000.00<small>MXN</small></b></p>
              </div>
            </label>
          </div>

          <div className={cpaClassNames}>
            <input type="radio" value="cpa" name="paymentAmount" id="paymentAmount-cpa" onChange={this.handleChangePaymentAmount} checked={paymentAmount === 'cpa'} />
            <label htmlFor="paymentAmount-cpa">
              <div>
                <p>Su pago</p>
                <Input type="text" name="customAmount" value={formatMoney(this.state.customAmount)} onChange={this.handleChangeCustomAmount} ref={inputRef} disabled={paymentAmount !== 'cpa'} />
              </div>
            </label>
          </div>

        </div>
        <div className="form--payment-methods">
          <div className="payment-methods--container">
            {
              this.state.creditCards.map((cc) => (
                <div className={classnames('cc', { active: cc.id === this.state.paymentMetod })}>
                  <input type="radio" name="paymentMethod" id={`paymentMethod-${cc.id}`} value={cc.id} onChange={this.handleChangePaymentMethod} />
                  <label htmlFor={`paymentMethod-${cc.id}`}>
                    <div className="cc-container">
                      <span>{cc.number}</span>
                      <span>{cc.type}</span>
                    </div>
                  </label>
                </div>
              ))
            }
          </div>
          {
            this.state.showCCForm 
            ? <CCForm onSubmit={this.handleSubmit} />
            : null
          }
          <button onClick={this.handleClickAddCC}>Agregar otra</button>
        </div>
        <button onClick={this.handleClickNextStep}>Siguiente</button>
      </div>
    )
  }
}

PaymentForm.propTypes = {

}

export default PaymentForm

