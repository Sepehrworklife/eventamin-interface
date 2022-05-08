import { createTheme } from "@mui/material"

const font = "'Open Sans','Shabnam' ,'Yekan', sans-serif"

export const DarkTheme = createTheme({
	typography: {
		fontFamily: font,
	},
	palette: {
		mode: 'dark',
		background: {
			default: "#121212",
		}
	}
})
export const LightTheme = createTheme({
	typography: {
		fontFamily: font,
	},
	palette: {
		mode: 'light',
		background: {
			default: '#f5f5f5',
		}
	}
})

export const RtlDarkTheme = createTheme({
	typography: {
		fontFamily: font,
	},
	palette: {
		mode: 'dark',
		background: {
			default: "#121212",
		}
	},
	direction: 'rtl'
})
export const RtlLightTheme = createTheme({
	typography: {
		fontFamily: font,
	},
	palette: {
		mode: 'light',
		background: {
			default: '#f5f5f5',
		}
	},
	direction: 'rtl'
})
