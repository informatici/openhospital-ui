import React from 'react';
import { type Container, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import { enableMocking } from './mocks';
import { createModuleFederationInstance, PluginsProvider } from './plugins';
import * as serviceWorker from './serviceWorker';
import { store } from './state/store';

const container = document.getElementById('root');
const root = createRoot(container as Container);
await enableMocking();
createModuleFederationInstance().then(({ mf, remotes }) => {
	root.render(
		<React.StrictMode>
			<PluginsProvider remotes={remotes} mf={mf}>
				<Provider store={store}>
					<App />
				</Provider>
			</PluginsProvider>
		</React.StrictMode>,
	);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
