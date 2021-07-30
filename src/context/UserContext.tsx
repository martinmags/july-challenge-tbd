import React, { createContext, useContext, useState } from 'react';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

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
	skills: string[];
}
interface UserState {
	signIn: () => void;
	signOut: () => void;
	user: User;
}

// TODO: Specify and separate to another file; contains initialState in {}
const initialState = {
	firstName: '',
	lastName: '',
	email: '',
	loggedIn: false,
	title: '',
	department: '',
	skills: [],
};

export const UserContext = createContext<UserState>({
	signIn: () => {},
	signOut: () => {},
	user: initialState,
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
			firstName: givenName,
			lastName: familyName,
			email,
			title: '',
			loggedIn: true,
			department: '',
			skills: [],
		});
	};
	const handleLoginFailure = (res: any) => {
		console.log('[Login Failure] currentUser:', res);
	};
	const { signIn } = useGoogleLogin({
		onSuccess: handleLoginSuccess,
		onFailure: handleLoginFailure,
		clientId,
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
		setUser({
			firstName: '',
			lastName: '',
			email: '',
			title: '',
			loggedIn: false,
			department: '',
			skills: [],
		});
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

	const authContextValue = {
		signIn,
		signOut,
		user,
	};
	return <UserContext.Provider value={authContextValue}>{children}</UserContext.Provider>;
};

const useUserAuth = () => useContext(UserContext);
export { UserProvider, useUserAuth };
