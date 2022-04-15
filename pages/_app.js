import { ThemeProvider } from '@mui/material'
import Layout from '../Layout'
import '../styles/globals.css'
import theme from '../theme'
import {SessionProvider} from 'next-auth/react'

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider theme={theme}>
            <SessionProvider session={pageProps.session}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </SessionProvider>
        </ThemeProvider>
    )
}

export default MyApp
