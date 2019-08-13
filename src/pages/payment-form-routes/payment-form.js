import React from 'react'
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './styles.scss';

import { formatMoney } from './helpers';
import Detail from './detail';
import Form from './form';

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
      id: cc[cc.length - 1].id + 1,
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
    this.props.history.push('/payment-form-routes/detail')
  }

  handleClickPrevStep = () => {
    this.setState({
      showDetail: false
    })
  }

  componentDidMount() {
    this.props.history.push(`${this.props.match.url}/payment`)
  }


  render() {

    const amount = this.state.paymentMetod === 'rpa' ? '$1,200.00'
      : this.state.paymentAmount === 'poa' ? '$120,000.00'
        : `$${formatMoney(this.state.customAmount)}`;
    const creditCard = this.state.creditCards.find(cc => cc.id === this.state.paymentMetod)

    return (
      <>
        <Route path={`${this.props.match.url}/payment`} render={(routeProps) => {
          return <Form
            creditCards={this.state.creditCards}
            onChangeCustomAmount={this.handleChangeCustomAmount}
            onChangePaymentMethod={this.handleChangePaymentMethod}
            onChangePaymentAmount={this.handleChangePaymentAmount}
            onClickAddCC={this.handleClickAddCC}
            onClickNextStep={this.handleClickNextStep}
            onSubmit={this.handleSubmit}
            paymentAmount={this.state.paymentAmount}
            paymentMetod={this.state.paymentMetod}
            showCCForm={this.state.showCCForm}
            customAmount={this.state.customAmount}
          />
        }} />
        <Route path={`${this.props.match.url}/detail`} exact render={(routeProps) => {
          if (!this.state.showDetail) {
            routeProps.history.replace(`${this.props.match.url}/payment`);
          }
          return <Detail
            amount={amount}
            creditCardNumber={creditCard && creditCard.number}
            onClickPrevStep={this.handleClickPrevStep}
          />
        }} />
      </>
          );
      
    // if(this.state.showDetail) {
            //   const amount = this.state.paymentMetod === 'rpa' ? '$1,200.00'
            //     : this.state.paymentAmount === 'poa' ? '$120,000.00'
            //     : `$${formatMoney(this.state.customAmount)}`;
            //   const creditCard = this.state.creditCards.find(cc => cc.id === this.state.paymentMetod)
            //   return (
            //     <Detail
            //       amount={amount}
            //       creditCardNumber={creditCard.number}
            //       onClickPrevStep={this.handleClickPrevStep}
            //     />
            //   )
            // }
            // return (
            //   <Form
            //   creditCards={this.state.creditCards}
            //   onChangeCustomAmount={this.handleChangeCustomAmount}
            //   onChangePaymentMethod={this.handleChangePaymentMethod}
            //   onChangePaymentAmount={this.handleChangePaymentAmount}
            //   onClickAddCC={this.handleClickAddCC}
            //   onClickNextStep={this.handleClickNextStep}
            //   onSubmit={this.handleSubmit}
            //   paymentAmount={this.state.paymentAmount}
            //   paymentMetod={this.state.paymentMetod}
            //   showCCForm={this.state.showCCForm}
            //   customAmount={this.state.customAmount}
            //   />
            // )
          }
          }
          
PaymentForm.propTypes = {

          }

          export default PaymentForm
          
