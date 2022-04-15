import { colors } from '@mui/material'

const white = "#FFFFFF";
const black = "#000000";

const palette = {
	black,
	white,
	primary: {
		contrastText: white,
		main: '#02111B',
		light: '#5D737E'
	},
	secondary: {
		contrastText: white,
		main: '#3F4045',
		dark: '30292F',
		light: '#FCFCFC'
	},
	social: {
		facebook: '#3B5998',
		instagram: '#833AB4',
		linkedIn: '#0007B5',
		whatsapp: '#25D366',
		github: '#211F1F',
		docker: '#0DB7ED',
		behance: '#053EFF',
		dribble: '#EA4C89',
		google: '#DB4A39',
		website: '#0084C8'
	},
	coding:{
		html: '#E34C29',
		css: '#264DE4',
		sass: '#C36291',
		javascript: '#F7DF1E',
		reactjs: '61DBFB',
		materialui: '#0A1828',
		bootstrap: '#563D7C',
		nextjs: '#000000',
		nodejs: '#68A063',
		expressjs: '#333333',
		flask: '#000000',
		fastapi: '#008E81',
		mongodb: '#3FA037',
		mysql: '#E68A10',
		postgresql: '#2F6189',
		c: '#3949A9',
		'c++':'#00589C',
		java: '#F2F2F2',
		python: '#EEF2F1'
	},
	success: {
		contrastText: white,
		dark: colors.green[900],
		main: colors.green[600],
		light: colors.green[400]
	},
	info: {
		contrastText: white,
		dark: colors.blue[900],
		main: colors.blue[600],
		light: colors.blue[400]
	},
	warning: {
		contrastText: white,
		dark: colors.orange[900],
		main: colors.orange[600],
		light: colors.orange[400]
	},
	error: {
		contrastText: white,
		dark: colors.red[900],
		main: colors.red[600],
		light: colors.red[400]
	},
	text: {
		primary: colors.blueGrey[900],
		secondary: colors.blueGrey[600],
		link: colors.blue[600]
	},
	background: {
		dark: colors.grey[800],
		darker: colors.grey[900],
		default: "#F4F6F8",
		paper: white
	},
	icon: colors.blueGrey[600],
	divider: colors.grey[200],
	transparent: "#00000000"
}

export default palette
