import {
	Avatar,
	Card,
	CardContent,
	CardHeader,
	createStyles,
	FormControl,
	makeStyles,
	Theme,
	Toolbar,
	Typography,
} from '@material-ui/core';
import React from 'react';
import { useUserAuth } from '../context/UserContext';
import { red } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		content: {
			flexGrow: 1,
			padding: theme.spacing(3),
		},
		cardRoot: {
			maxWidth: 345,
		},
		avatar: {
			backgroundColor: red[500],
		},
		formControl: {
			margin: theme.spacing(1),
		},
		selectEmpty: {
			margintop: theme.spacing(2),
		},
	})
);

interface Props {}
const ProfilePage = () => {
	const classes = useStyles();
	const { user /*, updateUser */ } = useUserAuth();

	
	console.log(user);
	return (
		<main className={classes.content}>
			<Toolbar />
			<Typography variant='h3'>Profile</Typography>
			<Card className={classes.cardRoot}>
				<CardHeader
					avatar={
						<Avatar aria-label='name' className={classes.avatar}>
							{user.firstName[0]}
						</Avatar>
					}
					title={`${user.firstName} ${user.lastName}`}
					subheader={user.title}
				/>
				{/* TODO: Continue creating a controller form here to take
						user input on Department, skills, and role
				*/}
				<CardContent>
					<FormControl className={classes.formControl}>
						<InputLabel id='demo-simple-select-label'>Department</InputLabel>
d
					<Typography variant='body2' color='textSecondary' component='p'>
						Department: {user.department}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						Email: {user.email}
					</Typography>
					<Typography variant='body2' color='textSecondary' component='p'>
						Skills: {user.skills}
					</Typography>
				</CardContent>
			</Card>
		</main>
	);
};

export default ProfilePage;
