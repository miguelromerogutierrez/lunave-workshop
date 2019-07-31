import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import HNPage from './hn-page';

import storiesIds from './reducers/storiesids';
import stories from './reducers/stories';

const reducers = combineReducers({
  storiesIds,
  stories
});

let store = createStore(reducers);

export default function HNRedux() {
  return (
    <Provider store={store}>
      <HNPage />
    </Provider>
  )
}
