import React from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import authToken from './Utils/authToken'
import { store, persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react'
if (localStorage.token) {
  authToken(localStorage.token)
}
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
