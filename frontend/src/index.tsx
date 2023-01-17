import { ColorModeScript } from '@chakra-ui/react';
import { Amplify } from 'aws-amplify';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import { App } from './App';
import config from './config';
import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';
import { createStandaloneToast } from '@chakra-ui/toast';

Amplify.configure({
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
  },
  API: {
    endpoints: [
      {
        name: "items",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
      {
        name: "vendors",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const { ToastContainer } = createStandaloneToast();

root.render(
  <React.StrictMode>
    <ColorModeScript />
    <Router>
      <App />
      <ToastContainer />
    </Router>
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

