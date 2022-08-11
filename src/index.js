import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import  { storeme, persistor } from './redux/storeme';
import { PersistGate } from 'redux-persist/integration/react'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeme}>
    <PersistGate loading={null} persistor={persistor} >
     <App />
    </PersistGate>
    </Provider>,
  </React.StrictMode>,
  document.getElementById('root')
);