import React from 'react'
import App from 'app'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from 'app/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from '@mui/material'
import { muiTheme } from 'contexts/theme/ThemeContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <ToastContainer className='toast-container' limit={5} newestOnTop />
          <ThemeProvider theme={muiTheme}>
            <App />
          </ThemeProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
