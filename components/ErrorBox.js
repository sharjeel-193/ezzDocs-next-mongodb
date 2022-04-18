import { Box, Typography } from "@mui/material"

function ErrorBox(props) {
    const {code, msg} = props
    return (
        <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            paddingY={5}
            flexDirection={'column'}
        >
            <Typography
                variant={'h2'}
                color={'error'}
            >
                Error {code}
            </Typography>
            <Typography
                variant={'h4'}
                color={'error'}
            >
               {msg}
            </Typography>
        </Box>
    )
}

export default ErrorBox