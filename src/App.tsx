import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';
// Static Components
import Header from './components/Header';

// Pages
import { HomePage, ProfilePage, LoginPage } from './pages';
const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	},
}));
function App() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<ThemeProvider theme={theme}>
				<Router>
					<Header />
					<Switch>
						{/* PUBLIC: Search the directory by filters */}
						<Route exact path='/' component={HomePage} />
						{/* PUBLIC: Login with your credentials */}
						<Route exact path='/login' component={LoginPage} />
						{/* PROTECTED: View and Edit your profile information */}
						<Route exact path='/profile' component={ProfilePage} />
					</Switch>
				</Router>
				<CssBaseline />
			</ThemeProvider>
		</div>
	);
}

export default App;
