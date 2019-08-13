import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Input from './Input';
import { formatMoney } from './helpers';
import CCForm from '../creditcard-form/cc-form';

function PaymentForm({
  paymentAmount,
  onChangePaymentAmount,
  onChangeCustomAmount,
  onChangePaymentMethod,
  onSubmit,
  onClickAddCC,
  onClickNextStep,
  customAmount,
  creditCards,
  paymentMetod,
  showCCForm,
}) {
  const rpaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'rpa', active: paymentAmount === 'rpa' });
  const poaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'poa', active: paymentAmount === 'poa' });
  const cpaClassNames = classnames('payment-amount', { disabled: paymentAmount !== 'cpa', active: paymentAmount === 'cpa' });
  return (
    <div className="payment-form">
      <div className="form--payment-amounts">

        <div className={rpaClassNames}>
          <input type="radio" value="rpa" name="paymentAmount" id="paymentAmount-rpa" onChange={onChangePaymentAmount}
            checked={paymentAmount === 'rpa'} />
          <label htmlFor="paymentAmount-rpa">
            <div>
              <p>Pago mensual</p>
              <p><b>$1,200.00<small>MXN</small></b></p>
            </div>
          </label>
        </div>

        <div className={poaClassNames}>
          <input type="radio" value="poa" name="paymentAmount" id="paymentAmount-poa" onChange={onChangePaymentAmount} checked={paymentAmount === 'poa'} />
          <label htmlFor="paymentAmount-poa">
            <div>
              <p>Pago total</p>
              <p><b>$120,000.00<small>MXN</small></b></p>
            </div>
          </label>
        </div>

        <div className={cpaClassNames}>
          <input type="radio" value="cpa" name="paymentAmount" id="paymentAmount-cpa" onChange={onChangePaymentAmount} checked={paymentAmount === 'cpa'} />
          <label htmlFor="paymentAmount-cpa">
            <div>
              <p>Su pago</p>
              <Input type="text" name="customAmount" value={formatMoney(customAmount)} onChange={onChangeCustomAmount} disabled={paymentAmount !== 'cpa'} />
            </div>
          </label>
        </div>

      </div>
      <div className="form--payment-methods">
        <div className="payment-methods--container">
          {
            creditCards.map((cc) => (
              <div className={classnames('cc', { active: cc.id === paymentMetod })}>
                <input type="radio" name="paymentMethod" id={`paymentMethod-${cc.id}`} value={cc.id} onChange={onChangePaymentMethod} />
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
          showCCForm
            ? <CCForm onSubmit={onSubmit} />
            : null
        }
        <button onClick={onClickAddCC}>Agregar otra</button>
      </div>
      <button onClick={onClickNextStep}>Siguiente</button>
    </div>
  )
}

PaymentForm.propTypes = {
  paymentAmount: PropTypes.string,
  onChangePaymentAmount: PropTypes.func,
  onChangeCustomAmount: PropTypes.func,
  onChangePaymentMethod: PropTypes.func,
  onSubmit: PropTypes.func,
  onClickAddCC: PropTypes.func,
  onClickNextStep: PropTypes.func,
  customAmount: PropTypes.string,
  creditCards: PropTypes.string,
  paymentMetod: PropTypes.string,
  showCCForm: PropTypes.string,
}

export default PaymentForm

