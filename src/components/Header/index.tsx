import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { useGoogleLogin } from 'react-google-login';
import Sidebar from '../Sidebar';

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

const clientId: string = process.env.REACT_APP_OAUTH_CLIENT_ID || '';

const Header = () => {
	const classes = useStyles();

	const onSuccess = (res: any) => {
		console.log('[Login Success] currentUser:', res.profileObj);
	};

	const onFailure = (res: any) => {
		console.log('[Login Failure] currentUser:', res);
	};

	const { signIn } = useGoogleLogin({
		onSuccess,
		onFailure,
		clientId,
		isSignedIn: true,
		accessType: 'offline',
	});

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title} noWrap>
						Cloroxory
					</Typography>
					<Button component='button' onClick={signIn} color='inherit'>
						Login
					</Button>
					{/* Accessible if logged-in */}
					<Button color='inherit'>Profile</Button>
				</Toolbar>
			</AppBar>
			<Sidebar />
		</div>
	);
};

export default Header;
