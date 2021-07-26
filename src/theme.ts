import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

// TODO: Specify styling and confirm/add responsiveness
let theme = createTheme({
	palette: {
		primary: {
			main: blue[700],
		},
		secondary: {
			light: '#f2f2f2',
			main: '#000',
			dark: '#515151',
		},
		// error: {},
		// warning: {},
		// info: {},
		// success: {},
	},
	typography: {},
	spacing: 8,
	breakpoints: {},
	zIndex: {},
});
theme = responsiveFontSizes(theme);

export default theme;
