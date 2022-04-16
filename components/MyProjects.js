import { Box, Typography, useTheme } from "@mui/material"

function MyProjects(props) {
    const theme = useTheme()
    // const projects = [
    //     {
    //         name: 'Pro1'
    //     },
    //     {
    //         name: 'Pro2'
    //     }
    // ]
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
                    <Typography 
                        variant="h5" 
                        component="h3"
                        margin={0}
                        color={theme.palette.primary.main}
                    >
                        {project.name}
                    </Typography>
                </Box>
            ))}
        </Box>
    )
}

export default MyProjects