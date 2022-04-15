import { createTheme, responsiveFontSizes  } from '@mui/material';

import palette from './palette';
import overrides from './overrides';
import typography from "./typography"

const theme = responsiveFontSizes(createTheme({
	palette,
	typography,
	overrides,
	zIndex: {
		appBar: 1200,
		drawer: 1100
	},
}));

export default theme;
