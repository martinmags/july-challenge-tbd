import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import {
	Toolbar, // used as a spacer in Drawer
	Drawer,
	Divider,
	FormControl,
	FormLabel,
	FormGroup,
	FormControlLabel,
	Checkbox,
	Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 250;

const useStyles = makeStyles((theme) => ({
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	drawerContainer: {
		overflow: 'auto',
	},
	formControl: {
		margin: theme.spacing(3),
	},
}));

// TODO: Extract to its own file
interface FilterTypes {
	// Pods
	olympus: boolean;
	growth: boolean;
	omnichannel: boolean;
	// Roles
	ui_developer: boolean;
	fullstack_developer: boolean;
	frontend_developer: boolean;
	backend_developer: boolean;
	project_manager: boolean;
	quality_assurance_engineer: boolean;
	ux_designer: boolean;
	// Skills
	react: boolean;
	webpack: boolean;
	typescript: boolean;
	jest: boolean;
	rabbitmq: boolean;
}

const Sidebar = () => {
	const classes = useStyles();
	const { handleSubmit, control } = useForm<FilterTypes>();
	const onSubmit: SubmitHandler<FilterTypes> = (data) => {
		console.log(data);
	};

	return (
		<Drawer
			className={classes.drawer}
			variant='permanent'
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<Toolbar />

			<div className={classes.drawerContainer}>
				<form onSubmit={handleSubmit(onSubmit)}>
					{/* Pods Filter */}
					<FormControl component='fieldset' className={classes.formControl}>
						<FormLabel component='legend'>Pods</FormLabel>
						<FormGroup>
							<Controller
								name='olympus'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Olympus' />
								)}
							/>
							<Controller
								name='growth'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Growth' />
								)}
							/>
							<Controller
								name='omnichannel'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Omnichannel' />
								)}
							/>
						</FormGroup>
					</FormControl>
					<Divider />

					{/* Roles Filter */}
					<FormControl component='fieldset' className={classes.formControl}>
						<FormLabel component='legend'>Roles</FormLabel>
						<FormGroup>
							<Controller
								name='ui_developer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='UI Developer' />
								)}
							/>
							<Controller
								name='frontend_developer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Frontend Developer' />
								)}
							/>
							<Controller
								name='backend_developer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Backend Developer' />
								)}
							/>
							<Controller
								name='fullstack_developer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Fullstack Developer' />
								)}
							/>
							<Controller
								name='project_manager'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Project Manager' />
								)}
							/>
							<Controller
								name='quality_assurance_engineer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel
										control={<Checkbox {...field} />}
										label='Quality Assurance Engineer'
									/>
								)}
							/>
							<Controller
								name='ux_designer'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='UX Designer' />
								)}
							/>
						</FormGroup>
					</FormControl>
					<Divider />

					{/* Skills Filter: TODO: Refactor to include search bar AND popular filters */}
					<FormControl component='fieldset' className={classes.formControl}>
						<FormLabel component='legend'>Skills</FormLabel>
						<FormGroup>
							<Controller
								name='react'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='React' />
								)}
							/>
							<Controller
								name='webpack'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Webpack' />
								)}
							/>
							<Controller
								name='typescript'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='TypeScript' />
								)}
							/>
							<Controller
								name='jest'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='Jest' />
								)}
							/>
							<Controller
								name='rabbitmq'
								control={control}
								defaultValue={false}
								rules={{ required: false }}
								render={({ field }) => (
									<FormControlLabel control={<Checkbox {...field} />} label='RabbitMQ' />
								)}
							/>
						</FormGroup>
					</FormControl>
					<Divider />
					<Button className={classes.formControl} type='submit' variant='contained'>
						Submit
					</Button>
				</form>
			</div>
		</Drawer>
	);
};

export default Sidebar;
