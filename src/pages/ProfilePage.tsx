import { createStyles, makeStyles, Theme, Toolbar, Typography } from '@material-ui/core';
import React from 'react';

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

interface Props {}
const ProfilePage = (props: Props) => {
	const classes = useStyles();
	return (
		<main className={classes.content}>
			<Toolbar />
			<Typography variant='h3'>Profile</Typography>
			<Typography></Typography>
		</main>
	);
};

export default ProfilePage;
