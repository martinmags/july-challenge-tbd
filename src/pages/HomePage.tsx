import { Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

interface Props {}
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
	})
);

const HomePage = (props: Props) => {
	const classes = useStyles();
	return (
		<main className={classes.content}>
			<Toolbar />
			<Typography variant='h3'>Welcome to Cloroxory</Typography>
			<Typography>
				Don't know who to contact? Try filtering your search with the sidebar.
			</Typography>
		</main>
	);
};

export default HomePage;
