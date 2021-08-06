import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';

// Static Components
import Header from './components/Header';

// Pages
import { HomePage, ProfilePage, LoginPage } from './pages';
import { useUserAuth } from './context/UserContext';

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
	},
}));

function App() {
	const classes = useStyles();
	const { user } = useUserAuth();

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
						{ 
							user ? 
							<Route exact path='/profile' component={ProfilePage} /> : <Redirect to='/' />
						}
					</Switch>
				</Router>
				<CssBaseline />
			</ThemeProvider>
		</div>
	);
}

export default App;
