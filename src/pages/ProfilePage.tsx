import {
	createStyles,
	FormControl,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	Theme,
	Toolbar,
	Card,
	CardHeader,
	Avatar,
	CardContent,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,

} from '@material-ui/core';
import React from 'react';
import { useUserAuth } from '../context/UserContext';
import { red } from '@material-ui/core/colors';
import {titles, departments, skills} from '../tempData';

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
			maxWidth: 450,
		},
		avatar: {
			backgroundColor: red[500],
		},
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			margintop: theme.spacing(2),
		},
		paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
	})
);

const ProfilePage = () => {
	const classes = useStyles();
	const { user, updateUser } = useUserAuth();

	const handleChange = (event: any) => {
    updateUser(event.target.value);
  };


	return (
		<main className={classes.content}>
			<Toolbar />

			<Card className={classes.cardRoot}>
				<CardHeader
					avatar={
						<Avatar aria-label='name' className={classes.avatar}>
							{ user ? user.first_name[0] : null }
						</Avatar>
					}
					title={user ? `${user.first_name} ${user.last_name}` : null }
				/>

				{/* TODO: updateUser to connect to update user data in mongodb */}
				<CardContent>
					{/* Title */}
					<FormControl fullWidth className={classes.formControl}>
						<InputLabel id="user-title-label">Title</InputLabel>
						<Select
							labelId="user-title-label"
							id="user-title"
							value={ user ? user.title : null }
							onChange={handleChange}
							defaultValue=""
						>
							<MenuItem value="">None</MenuItem>
							{titles.map((title) => (
								<MenuItem key={title} value={title}>{title}</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Department */}
					<FormControl fullWidth className={classes.formControl}>
						<InputLabel id="user-department-label">Department</InputLabel>
						<Select
							labelId="user-department-label"
							id="user-department"
							value={ user ? user.dept : null }
							onChange={handleChange}
							defaultValue=""
						>
							<MenuItem value="">None</MenuItem>
							{departments.map((department) => (
								<MenuItem key={department} value={department}>{department}</MenuItem>
							))}
						</Select>
					</FormControl>

					{/* Skills */}
					<FormControl component="fieldset" className={classes.formControl}>
						<FormLabel component="legend">Skills</FormLabel>
						<FormGroup>
						{skills.map((skill) => (
							<FormControlLabel 
								key={skill}
								control={<Checkbox checked={user ? user.skills.includes(skill) : false } onChange={handleChange} value={skill} />}
								label={skill}
							/>
						))}
						</FormGroup>
					</FormControl>
				</CardContent>
			</Card>


		</main>
	);
};

export default ProfilePage;
