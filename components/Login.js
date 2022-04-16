import { Box, Button, Typography, useTheme } from "@mui/material"
import Image from 'next/image'
import SecondaryLogo from '../public/images/secondary-logo.png'
import {FaGoogle, FaFacebookF, FaApple} from 'react-icons/fa'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/router"

function Login() {
    const theme = useTheme()
    const router = useRouter()
    const logIn = async (provider) => {
        try {
            await signIn(provider)
            console.log('Successful Login')
        } catch (error) {
            console.log('Error')
        }
    }
    return (
        <div className='h-full w-full'>
            <Box
                sx={{
                    backgroundColor: theme.palette.primary.light,
                    width: '100%',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Box
                    sx={{
                        // backgroundColor: 'yellow',
                        width: '300px',
                        maxWidth: '80%',
                        height: '150px'
                    }}
                >
                    <Image src={SecondaryLogo} alt="Logo" layout="responsive"  />
                </Box>
                <Button
                    variant="outlined"
                    sx={{
                        textTransform: 'capitalize',
                        width: '200px',
                        marginTop: '8px',
                        '&:hover':{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.light
                        }
                    }}
                    startIcon={<FaGoogle />}
                    onClick={() => logIn("google")}
                >
                    Sign in with Google
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        textTransform: 'capitalize',
                        width: '200px',
                        marginTop: '8px',
                        '&:hover':{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.light
                        }
                    }}
                    startIcon={<FaFacebookF />}
                    onClick={() => logIn("facebook")}
                >
                    Sign in with Facebook
                </Button>
                <Button
                    variant="outlined"
                    sx={{
                        textTransform: 'capitalize',
                        width: '200px',
                        marginTop: '8px',
                        '&:hover':{
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.secondary.light
                        }
                    }}
                    startIcon={<FaApple />}
                >
                    Sign in with Apple
                </Button>
            </Box>
        </div>
    )
}

export default Login