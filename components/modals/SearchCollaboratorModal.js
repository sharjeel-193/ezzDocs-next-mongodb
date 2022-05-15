import {Modal, Fade, Box, Button, Typography, TextField, Autocomplete, Backdrop, Chip} from '@mui/material'
import Image from 'next/image'
import { useEffect, useState } from 'react'
function SearchCollaboratorModal(props) {
    const {searchModal, closeSearchModal, setSearchUser, searchOptions, onSearchChange, user, currentColabs} = props
    const [selectedColabs, setSelectedColabs] = useState([])
    useEffect(() => {
        console.log({'Props in Search Volab: ': user})
    }, [user])
    
    return (
        <Modal
            open={searchModal}
            onClose={closeSearchModal}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={searchModal}>
                <Box
                    sx={{
                        width: '80%',
                        maxWidth: '500px',
                        backgroundColor:'white',
                        padding: 3,
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        borderRadius: 3
                    }}
                >
                    <Typography variant="h5" component="h2" marginBottom={3}>Search For Collaborators</Typography>
                    <Autocomplete
                        
                        multiple
                        fullWidth
                        filterOptions={(x) => x}
                        getOptionLabel={(option)=>(option.name)}
                        // onChange={(e) => setSearchUser(e.target.innerText)}
                        // value={selectedColabs}
                        onChange={(e, newValue) => {
                            setSelectedColabs([
                                newValue
                            ])
                            console.log(newValue)
                        }}
                        

                        options={searchOptions.filter((opt) => ((opt._id!==user)))}
                        renderInput={(params) => (
                            <TextField {...params} label={'Search'} onChange={(e) => onSearchChange(e)} />
                        )}
                        filterSelectedOptions
                        
                        renderOption={(props, option) => (
                            <Box
                                key={option._id} 
                                width={'100%'} 
                                display={'flex'} 
                                alignItems={'center'} 
                                marginY={1}
                                paddingY={1}
                                {...props}
                                sx={{
                                    '&:hover':{
                                        backgroundColor:'#F8F8F8',
                                        cursor: 'pointer'
                                    }
                                }}
                            >
                                <Box position={'relative'} borderRadius={1} width={'24px'} height={'24px'} marginLeft={1}>
                                    <Image src={option.image} alt='' layout={'fill'} />
                                </Box>
                                <Typography marginLeft={1}>{option.name}</Typography>
                            </Box>
                        )}
                        

                    >

                    </Autocomplete>
                    {/* <Box
                        sx={{
                            width: '100%',
                            textAlign:'right',
                        }}
                        marginTop={3}
                    >
                        {selectedColabs.map((item, index) => {
                            <Chip
                                label={item.name}
                                key={index}
                            />
                        })}
                    </Box> */}
                    <Box
                        sx={{
                            width: '100%',
                            textAlign:'right',
                        }}
                        marginTop={3}
                    >
                        <Button variant='contained' sx={{textTransform: 'capitalize'}} >Add Collaborators</Button>
                    </Box>
                </Box>
            </Fade>

        </Modal>
    )
}

export default SearchCollaboratorModal