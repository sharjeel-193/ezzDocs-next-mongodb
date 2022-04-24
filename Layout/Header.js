import { useTheme, Box, Hidden, Menu, MenuItem, Grow, Paper, Popper, ClickAwayListener, MenuList, ListItemIcon, Button } from "@mui/material"
import HoverMenu from 'material-ui-popup-state/HoverMenu'
import {
    usePopupState,
    bindHover,
    bindMenu,
    bindPopover,
  } from 'material-ui-popup-state/hooks'
import TextLogo from '../public/images/text-logo.PNG'
import IconLogo from '../public/images/icon-logo.PNG'
import ProfileDummy from '../public/images/profile-dummy.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from "next-auth/react"
import {useState, useRef} from 'react'
import {MdSettings, MdLogout} from 'react-icons/md'


function Header() {
    const theme = useTheme()
    const {data: session} = useSession()
    const [profileMenu, setProfileMenu] = useState(false)
    const anchorRef = useRef(null);
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'demoPopover',
    })
    const toggleProfileMenu = () => {
        setProfileMenu(!profileMenu)
    }
    return (
        <Box
            sx={{
                backgroundColor: theme.palette.primary.main,
                padding: '10px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: 3,
                zIndex: 99,
                transition: 'all 0.2s linear',
                [theme.breakpoints.down('md')]:{
                    padding: '8px 0'
                }
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    marginLeft: '20px',
                    width: '150px',
                    height: '80px',
                    transition: 'all 0.2s linear',
                    textAlign: 'left',
                    cursor: 'pointer',
                    [theme.breakpoints.down('md')]:{
                        width: '50px',
                        height: '50px'
                    }
                }}
            >
                <Hidden only={['xs', 'sm']}>
                    <Link href={'/'} passHref>
                        <a>
                            <Image src={TextLogo} alt="Header Logo" layout="fill" objectFit="contain" className="m-0" />
                        </a>    
                    </Link>
                </Hidden>
                <Hidden only={['md', 'lg', 'xl']}>
                    <Link href={'/'} passHref>
                        <a>
                            <Image src={IconLogo} alt="Header Logo" layout="fill" objectFit="contain" className="m-0" />
                        </a>
                    </Link>
                </Hidden>
            </Box>
            {session?(
                <Box>
                    <Box
                        sx={{
                            position: 'relative',
                            width: '60px',
                            height: '60px',
                            borderRadius: '50px',
                            overflow: 'hidden',
                            transition: 'all 0.2s linear',
                            marginRight: '20px',
                            cursor: 'pointer',
                            [theme.breakpoints.down('md')]:{
                                width: '40px',
                                height: '40px'
                            }
                        }}
                        {...bindHover(popupState)}
                    >
                        <Image src={session?.user?.image || ProfileDummy} alt="Profile Photo" layout="fill" />
                    </Box>
                    <HoverMenu
                        {...bindMenu(popupState)}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                        <MenuItem>
                            <ListItemIcon>
                                <MdSettings />
                            </ListItemIcon>
                            Settings
                        </MenuItem>
                        <MenuItem onClick={signOut}>
                            <ListItemIcon>
                                <MdLogout />
                            </ListItemIcon>
                            Log out
                        </MenuItem>
                    </HoverMenu>
                </Box>
            ):(
                <Link href={'/login'} passHref>
                    <Button
                        variant="outlined"
                        
                        sx={{
                            marginRight: '20px',
                            color: theme.palette.primary.light,
                            borderColor: theme.palette.primary.light,
                            '&:hover':{
                                backgroundColor: 'black',
                                borderColor: theme.palette.primary.light,
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Link>
            )}
        </Box>
    )
}

export default Header