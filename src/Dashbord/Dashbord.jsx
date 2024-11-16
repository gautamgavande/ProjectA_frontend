import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import MailIcon from '@mui/icons-material/Mail';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { GiTeacher } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { Outlet, useNavigate } from 'react-router-dom';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';




const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  '&.MuiDrawer-paper': {
    backgroundColor: '#4E4C4B', // Change this to the desired color
  },
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  '&.MuiDrawer-paper': {
    backgroundColor: '#4E4C4B', // Change this to the desired color
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),



    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate()

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ bgcolor: '#4E4C4B' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="white" variant="h6" noWrap component="div">
            This is for the admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>

        <DrawerHeader style={{ color: "#F2F0EE", overflow: "hidden", position: 'relative' }}>
          <span style={{ fontWeight: "bold" }}>Elearning  Plateform</span>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem

            disablePadding onClick={() => navigate('/')}
            sx={{
              color: "#E1DFDD",
              '&:hover': {
                backgroundColor: '#F07F86',
              },
            }}
          >
            <ListItemButton >
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <DashboardIcon></DashboardIcon>
              </ListItemIcon>
              <ListItemText primary={<Typography >Dashbord</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{
            color: "#E1DFDD",
            '&:hover': {
              backgroundColor: '#F07F86',
            },
          }}
            disablePadding onClick={() => navigate('/employe')}>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <AccountCircleIcon></AccountCircleIcon>
              </ListItemIcon>
              <ListItemText primary={<Typography >Employe</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{
          color: "#E1DFDD",
          '&:hover': {
            backgroundColor: '#F07F86',
          },
        }}
        disablePadding onClick={() => navigate('/role')}>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <GroupAddIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography >Role</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{
          color: "#E1DFDD",
          '&:hover': {
            backgroundColor: '#F07F86',
          },
        }}
         disablePadding onClick={() => navigate('/course')}>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <AutoStoriesIcon />
              </ListItemIcon>
              <ListItemText primary={<Typography >Corses</Typography>} />
            </ListItemButton>
          </ListItem>
          <ListItem sx={{
          color: "#E1DFDD",
          '&:hover': {
            backgroundColor: '#F07F86',
          },
        }}
         disablePadding onClick={() => navigate('/teacher')}>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <GiTeacher style={{ fontSize: "24px" }} />
              </ListItemIcon>
              <ListItemText primary={<Typography >Teacher</Typography>} />
            </ListItemButton>

          </ListItem>
          <ListItem sx={{
          color: "#E1DFDD",
          '&:hover': {
            backgroundColor: '#F07F86',
          },
        }}
         disablePadding onClick={() => navigate('/student')}>
            <ListItemButton>
              <ListItemIcon style={{ color: "#FEFEFC" }}>
                <PiStudentBold style={{ fontSize: "24px" }} />
              </ListItemIcon>
              <ListItemText primary={<Typography >Student</Typography>} />
            </ListItemButton>

          </ListItem>
        </List>
        <Divider />

      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Outlet></Outlet>
        {/* <Cardes></Cardes>            
           <BarCharti></BarCharti>  */}

      </Box>
    </Box>
  );
}