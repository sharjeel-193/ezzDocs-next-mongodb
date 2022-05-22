import { Box, Typography, useTheme } from "@mui/material"
import Link from "next/link"

function SharedProjects(props) {
    const theme = useTheme()
    
    const {projects} = props
    return (
        <Box
            width='100%'
            // backgroundColor='yellow'
        >
            {projects.map((project,index) => (
                <Box 
                    key={`my-project-${index}`}
                    marginY={1}
                    padding={2}
                    borderRadius={2}
                    backgroundColor={theme.palette.primary.light}
                    sx={{
                        transition: 'all 0.3s linear'
                    }}
                >
                    <Link href={`/project/${project._id}`} passHref>
                        <Typography 
                            variant="h5" 
                            component="h3"
                            margin={0}
                            color={theme.palette.primary.main}
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            {project.name}
                        </Typography>
                    </Link>
                </Box>
            ))}
        </Box>
    )
}

export default SharedProjects