import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/react/cleanup-after-each';

import { store } from '../../store';
import { LoginRedux } from './login-page';

jest.mock('axios', () => {
  const mockGetAxios = () => {
    return new Promise(resolve => {
      resolve({
        data: {
          username: 'Mike',
          id: 1
        }
      })
    })
  };
  return {
    get: mockGetAxios
  }
})

const history = {
  push: jest.fn()
}

describe('Testing Login page', () => {
  
  test('On render should display form', () => {
    const wrapper = render(
      <Provider store={store}>
        <LoginRedux history={history} />
      </Provider>
    );
    expect(wrapper.queryByTestId('form')).toBeDefined();
  });

  test('On user equals null, should not execute push method', () => {
    const wrapper = render(
      <Provider store={store}>
        <LoginRedux history={history} />
      </Provider>
    );
    expect(history.push.mock.calls.length).toBe(0);
  });

  test('On submit form', (done) => {
    const wrapper = render(
      <Provider store={store}>
        <LoginRedux history={history} />
      </Provider>
    );
    fireEvent.change(wrapper.queryByTestId('username'), {
      target: {
        value: 'Mike'
      }
    });
    fireEvent.change(wrapper.queryByTestId('password'), {
      target: {
        value: '1234562343'
      }
    });
    fireEvent.click(wrapper.queryByTestId('submit'));
    wait(() => {
      expect(history.push.mock.calls.length).toBe(1);
      done();
    })
  });

});
