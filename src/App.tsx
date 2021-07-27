import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
// Static Components
import Header from './components/Header';

// Pages
import { HomePage, ProfilePage, LoginPage } from './pages';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<Router>
				<Header />
				<Switch>
					<Route exact path='/' component={HomePage} />
					<Route exact path='/profile' component={ProfilePage} />
					<Route exact path='/login' component={LoginPage} />
				</Switch>
			</Router>
			<CssBaseline />
		</ThemeProvider>
	);
}

export default App;
