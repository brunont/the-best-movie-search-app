import React from 'react';
import ReactDOM from 'react-dom';
import './css/App.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<App />,
	document.getElementById('root') // eslint-disable-line no-undef
);
registerServiceWorker();
