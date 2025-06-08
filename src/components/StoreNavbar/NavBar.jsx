import { useState, useEffect } from 'react';

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import CartWidget from './CartWidget'

import { useNavigate } from 'react-router';
import useAuth from '../../context/AuthContext';
import useLogout from '../../api/hooks/useLogout';

const pages = [
  ['rines', 'Rines'],
  ['cargadores', 'Turbos & Supercargadores'],
  ['suspension', 'Suspensión'],
  ['escapes', 'Escapes'],
  ['filtros', 'Filtros'],
  ['frenos', 'Frenos'],
  ['interiores', 'Interiores'],
  ['exteriores', 'Exteriores'],
];

function ResponsiveAppBar() {
  const { user } = useAuth();
  const { logout } = useLogout();

  const [isLogged, setIsLogged] = useState(Boolean(user.role));
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  useEffect(() => {
    setIsLogged(Boolean(user.role));
  }, [user.role]);

  // ==== User Account Icon Settings ==== //
  const userSettings = [
    {
      label: 'Cerrar sesión',
      onClick: async () => {
        handleCloseUserMenu();
        await logout();
      },
    }
  ];

  const adminSettings = [
    {
      label: 'Dashboard',
      onClick: () => {
        handleCloseUserMenu();
        navigate('/admin/home');
      },
    },
    {
      label: 'Cerrar sesión',
      onClick: async () => {
        handleCloseUserMenu();
        await logout();
      },
    }
  ];

  const visitorSettings = [
    {
      label: 'Iniciar sesión',
      onClick: () => {
        handleCloseUserMenu();
        navigate('/login')
      },
    }
  ];


  const settings =
    isLogged ?
      user.role === 'ADMIN' ?
        adminSettings :
        userSettings
      :
      visitorSettings;

  return (
    <AppBar position="static" sx={{ backgroundColor: "var(--main-bg-color)" }}>
      <Container maxWidth="x2">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              width: "20%",
              cursor: "pointer"
            }}
            onClick={() => navigate('/')}
          >
            AUTOPARTES
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page, index) => (
                <MenuItem key={page} onClick={() => navigate(`/category/${page[0]}`)}>
                  <Typography sx={{ textAlign: 'center' }}>{page[1]}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            AUTOPARTES
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center", fontWeight: "700" }}>
            {pages.map((page, index) => (
              <Button
                key={page[0]}
                onClick={() => navigate(`/category/${page[0]}`)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page[1]}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0, width: "20%", display: "flex", justifyContent: "right" }}>
            <CartWidget handleCart={handleCart} />
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ width: 35, height: 35, color: isLogged ? 'white' : 'black' }} />
              </IconButton>
            </Tooltip>

            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.onClick}>
                  <Typography sx={{ textAlign: 'center' }}>{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ResponsiveAppBar;