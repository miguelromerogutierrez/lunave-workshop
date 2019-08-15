import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import PaymentForm from './payment-form';

describe('Payment form testing', () => {
  it('User selects custom payment', () => {
    const wrapper = render(<PaymentForm />);
    expect(wrapper.queryByTestId('detail')).toBeNull();
    const radio = wrapper.queryByTestId('paymentamount-cpa');

    fireEvent.click(radio);
    fireEvent.change(wrapper.queryByTestId('custominput'), {
      target: { value: '1300' }
    });
    const paymentMethod = wrapper.queryByTestId('paymentmethod-1');
    fireEvent.click(paymentMethod);

    fireEvent.click(wrapper.queryByTestId('next'));
    wrapper.debug();
    expect(wrapper.queryByTestId('detail')).not.toBeNull();
    expect(wrapper.queryByText('$1,300.00')).not.toBeNull();
    expect(wrapper.queryByText('*****1234')).not.toBeNull();
  })
})
