import React, { useEffect } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import Sidebar from '../Sidebar';
// import { useUserAuth } from '../../context/UserContext';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexGrow: 1,
		},
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		title: {
			flexGrow: 1,
		},
	})
);

const Header = ({ user, signOut, signIn }: any) => {
	const classes = useStyles();

	useEffect(() => {
		console.log(user);
	}, [user]);

	const renderLoginLogout = user.loggedIn ? (
		<Button component='button' onClick={signOut} color='inherit'>
			Logout
		</Button>
	) : (
		<Button component='button' onClick={signIn} color='inherit'>
			Login
		</Button>
	);

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title} noWrap>
						Cloroxory
					</Typography>
					{renderLoginLogout}
					<Button color='inherit'>Profile</Button>
				</Toolbar>
			</AppBar>
			<Sidebar />
		</div>
	);
};

export default Header;
