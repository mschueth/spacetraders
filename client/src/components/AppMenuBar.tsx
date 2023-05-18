import * as React from 'react';
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Badge,
    Chip,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
}from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { GameData } from '../types/gameType';


const NavItems:{
    text:string,
    link:string,
    icon?:React.JSX.Element,
}[]=[
    {text:'Home',link:'/home'},
    {text:'Login',link:'/login'},
    {text:'Credits',link:'/credits'},
]

export default function AppMenuBar(props:{gameData:GameData}) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  let navigate = useNavigate(); 
  
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };


  const notifications = props.gameData.notifications || []

  return (
    <AppBar position="sticky">
        <Toolbar variant="dense">
            <Box sx={{ flexGrow: 0 }}>
                <Chip
                    key={`appbar-nav-chip`}
                    label="SpaceTraders UI" 
                    avatar={<img src="img/logo.png" alt="Logo" />}
                    variant="filled" 
                    size="medium"
                    sx={{
                        fontSize:"large",
                        fontWeight:"heavy",
                    }}
                    onClick={handleOpenNavMenu}
                    // onClick={()=>{navigate("/home");}}
                    />
                <Menu
                    sx={{ 
                        marginTop: '25px', 
                        minWidth:150 ,
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    >
                    {NavItems.map((nav) => (
                        <MenuItem 
                            key={nav.text}
                            sx={{  minWidth:150 }} 
                            onClick={()=>{handleCloseNavMenu();navigate(nav.link);}}
                            >
                            {nav.icon?(
                                <ListItemIcon>
                                    {nav.icon}
                                </ListItemIcon>
                            ):(<div/>)}
                            <ListItemText primary={nav.text} />
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
                
            <Box sx={{ flexGrow: 1 }} />
            <Box >
            <IconButton
                size="large"
                color="inherit"
            >
                <Badge badgeContent={notifications.length} color="error">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <IconButton
                size="large"
                edge="end"
                onClick={()=>{navigate("/login");}}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            </Box>
        </Toolbar>
    </AppBar>
  );
}