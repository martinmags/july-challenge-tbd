import React, { createContext, useContext, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';
import {titles, departments, skills} from '../tempData';

interface ChildrenType {
	children: React.ReactNode;
}

interface User {
	firstName: string;
	lastName: string;
	email: string;
	loggedIn: boolean;
	title: string;
	department: string;
	skills: String[];
}
interface UserState {
	signIn: () => void;
	signOut: () => void;
	user: User;
	updateUser: (payload: string) => User | unknown;
}

// TODO: Specify and separate to another file; contains initialState in {}
const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	loggedIn: false,
	title: '',
	department: '',
	skills: [''],
};

export const UserContext = createContext<UserState>({
	signIn: () => {},
	signOut: () => {},
	user: initialState,
	updateUser: () => {},
});

const clientId: string = process.env.REACT_APP_OAUTH_CLIENT_ID || '';

const UserProvider = ({ children }: ChildrenType) => {
	const [user, setUser] = useState(initialState);

	/*********
	 * LOGIN *
	 * *******/
	const handleLoginSuccess = (res: any) => {
		// Extract data from Successful Google Login
		const { email, givenName, familyName } = res.profileObj;
		console.log('[Login Success] currentUser:', res.profileObj);

		// Redirect to Profile Page to enter {title, department, skills}
		setUser({
			...user,
			firstName: givenName,
			lastName: familyName,
			email,
			loggedIn: true,
		});
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
		setUser(initialState);
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
		if (titles.includes(payload)){
			setUser({
				...user,
				title: payload
			})
		} else if (departments.includes(payload)) {
			setUser({
				...user,
				department: payload
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
