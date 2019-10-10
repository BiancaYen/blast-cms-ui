import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'emotion-theming';
import { Router, Route } from 'react-router-dom';

// Store
import store from './redux';

// Theme variables
import theme from './themes';

// Components
import App from './app/App';

// Routes
import Routes from './routes/Routes';

// Utils
import browserHistory from './utils/browserHistory';

render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route
                    path="/"
                    render={() => {
                        return (
                            <App>
                                <Routes />
                            </App>
                        );
                    }}
                />
            </Router>
        </Provider>
    </ThemeProvider>,
    document.getElementById('root')
);
