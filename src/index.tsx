import 'core-js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import './index.css';

ReactDOM.render(
    <App />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
