import { ThemeProvider } from '@mui/material'
import Layout from '../Layout'
import '../styles/globals.css'
import theme from '../theme'
import {SessionProvider} from 'next-auth/react'
import 'sweetalert2/src/sweetalert2.scss'
import 'quill/dist/quill.snow.css';

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
