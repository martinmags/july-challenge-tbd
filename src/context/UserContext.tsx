import React, { createContext, useContext, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import {titles, departments, skills} from '../tempData';
import axios from 'axios';

interface ChildrenType {
	children: React.ReactNode;
}

/*
{
	first_name: '',
	last_name: '',
	loggedIn: false,
	dept: '',
	skills: [''],
	title: '',
	googleId: ''
}

*/
interface User {
	first_name: string;
	last_name: string;
	loggedIn: boolean;
	title: string;
	dept: string;
	skills: String[];
	googleId: string;
}
interface UserState {
	signIn: () => void;
	signOut: () => void;
	user: User | null;
	updateUser: (payload: string) => User | unknown;
}

export const UserContext = createContext<UserState>({
	signIn: () => {},
	signOut: () => {},
	user: null,
	updateUser: () => {},
});

const clientId: string = process.env.REACT_APP_OAUTH_CLIENT_ID || '';

const UserProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState<User | null>({
		first_name: '',
		last_name: '',
		loggedIn: false,
		dept: '',
		skills: [''],
		title: '',
		googleId: ''
	});

	/*********
	 * LOGIN *
	 * *******/
	const handleLoginSuccess = async (res: any) => {
		// Extract data from Successful Google Login
		const { givenName, familyName, googleId } = res.profileObj;
		const newUser = {
			first_name: givenName,
			last_name: familyName,
			loggedIn: true,
			title: '',
			dept: '',
			skills: [''], 
			googleId
		}
		setUser(newUser);


		// Read from mongodb existing user
		const {data} = await axios.get('http://localhost:5000/user')
		const userExists = data.find((entry: any) => entry.googleId === googleId)
		console.log('test:', userExists)
		if (userExists){
				console.log('[Login Success] currentUser:', res.profileObj);
		}
		// if no user, create one
		else { 
			console.log('User didnt exist; created a new user', newUser, res.profileObj)
			await axios.post('http://localhost:5000/user', newUser)
		}
		return newUser
	};
	const handleLoginFailure = (res: any) => {
		console.log('[Login Failure] currentUser:', res);
	};
	const { signIn } = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onFailure: handleLoginFailure,
		clientId,
		uxMode: 'redirect',
		isSignedIn: true,
		accessType: 'offline',
		cookiePolicy: 'single_host_origin',
		redirectUri: 'http://localhost:3000/profile',
	});

	/**********
	 * LOGOUT *
	 * ********/
	const handleLogoutSuccess = () => {
		console.log('[Logout Success]');
		// Redirect to Profile Page to enter {title, department, skills}
		setUser(null);
	};
	const handleLogoutFailure = () => {
		console.log('[Logout Failure]');
	};
	const { signOut } = useGoogleLogout({
		onLogoutSuccess: handleLogoutSuccess,
		onFailure: handleLogoutFailure,
		clientId,
		accessType: 'offline',
		cookiePolicy: 'single_host_origin',
	});

	/*
	 * Update User 
	 * Temporary, but need to change to type Promise<User> when making updates to User 
	 */
	const updateUser = (payload: string) => {
		// const results = await put('/user');		
		// Determine payload contents; maybe refactor to use switch statement
		if (user){
			if (titles.includes(payload)){
				setUser({
					...user,
					title: payload
				})
			} else if (departments.includes(payload)) {
				setUser({
					...user,
					dept: payload
				})
			} else if (skills.includes(payload)) {
				// Create a new user with updated skills
				let newSkills = [...user.skills, payload]
				if (user.skills.includes(payload)){
					newSkills = newSkills.filter(skill => skill !== payload);
				}
				// Update user with new skills
				setUser({
					...user,
					skills: newSkills
				})
			}
		}
		
		return user
	};

	const authContextValue = {
		signIn,
		signOut,
		user,
		updateUser,
	};
	return <UserContext.Provider value={authContextValue}>{children}</UserContext.Provider>;
};

const useUserAuth = () => useContext(UserContext);
export { UserProvider, useUserAuth };
