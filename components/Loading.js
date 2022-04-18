import { Box } from "@mui/material"
import Image from "next/image"
import LoadinIcon from '../public/images/loading-icon.svg'

function Loading() {
    return (
        <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'center'}
            paddingY={5}
        >   
            <Image src={LoadinIcon} width={500} height={500} alt={'Loading...'} />
        </Box>
    )
}

export default Loading