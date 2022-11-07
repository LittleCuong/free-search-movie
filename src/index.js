import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import reportWebVitals from '~/reportWebVitals';

import GlobalStyle from '~/components/GlobalStyle/GlobalStyle';
import AuthProvider from './Context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <AuthProvider>
    <GlobalStyle>
        <App/>
    </GlobalStyle>
  </AuthProvider>
  // </React.StrictMode>
);

reportWebVitals();
