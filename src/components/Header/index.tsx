import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
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

const Header = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position='fixed' className={classes.appBar}>
				<Toolbar>
					<Typography variant='h6' className={classes.title} noWrap>
						Cloroxory
					</Typography>
					<Button color='inherit'>Login</Button>
					{/* Accessible if logged-in */}
					{/* <Button color='inherit'>Profile</Button> */}
				</Toolbar>
			</AppBar>
			<Sidebar />
		</div>
	);
};

export default Header;
