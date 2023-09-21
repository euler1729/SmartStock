import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import { color } from '../../color'
import Cookies from 'universal-cookie';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import InsightsIcon from '@mui/icons-material/Insights';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const cookies = new Cookies();
    const [refresh_token, setRefreshToken] = React.useState(null);
    const [settings, setSettings] = React.useState(['Account', 'Edit Profile', 'Logout']);


    const routes = ['Home', 'Market', 'Watchlist', 'Portfolio', 'Analytics'];
    const route_link = ['/', '/market', '/watchlist', '/portfolio', '/analytics'];
    const settings_link = ['/account', '/edit-profile', '/'];

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    React.useEffect(() => {
        setRefreshToken(cookies.get('refresh_token'));
        if (refresh_token) {
            const decode = jwtDecode(refresh_token);
            const d = new Date();
            if (decode.exp < d.getMilliseconds()) {
                cookies.remove('refresh_token');
                setRefreshToken(null);
                window.location.reload();
            }else{
                // console.log(decode);
                setSettings([decode.name, 'Edit Profile', 'Logout']);
            }
        }

    }, [refresh_token]);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (e) => {
        console.log(e);
        if (e === 2) {
            handleLogout();
        }
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        setRefreshToken(null);
        cookies.remove('refresh_token');
        window.location.reload();
    }

    return (
        <AppBar position="static" style={{
            backgroundColor: color.violet,
            opacity: 0.9,
            borderRadius: '10px',
            boxShadow: '0px 0px 30px 0px rgba(0,0,0,0.75)',
            margin: '4px',
            width: 'calc(100% - 10px)'
        }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1.5rem'
                        }}
                    >
                        |SMART{<AutoGraphIcon />}STOCK|
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
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {routes.map((page, i) => (
                                <MenuItem
                                    sx={{

                                    }}
                                    component="a"
                                    href={route_link[i]}
                                    key={i}
                                    onClick={handleCloseNavMenu}>
                                    {(i == 0) && <HomeIcon sx={{ mr: 1, color: color.violet }} />}
                                    {i == 1 && <QueryStatsIcon sx={{ mr: 1, color: color.violet }} />}
                                    {i == 2 && <SavedSearchIcon sx={{ mr: 1, color: color.violet }} />}
                                    {i == 3 && <InsightsIcon sx={{ mr: 1, color: color.violet }} />}
                                    {i == 4 && <AnalyticsIcon sx={{ mr: 1, color: color.violet }} />}
                                    <Typography href={route_link[i]} textAlign="center" fontWeight={700}>{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1em'
                        }}
                    >
                        |SMART🗠STOCK|
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                        {routes.map((page, i) => (
                            <MenuItem
                                component="a"
                                href={route_link[i]}
                                key={i}
                                onClick={handleCloseNavMenu}>
                                {(i == 0) && <HomeIcon sx={{ mr: 1, color: color.white }} />}
                                {i == 1 && <QueryStatsIcon sx={{ mr: 1, color: color.white }} />}
                                {i == 2 && <SavedSearchIcon sx={{ mr: 1, color: color.white }} />}
                                {i == 3 && <InsightsIcon sx={{ mr: 1, color: color.white }} />}
                                {i == 4 && <AnalyticsIcon sx={{ mr: 1, color: color.white }} />}
                                <Typography href={route_link[i]} textAlign="center" fontWeight={700}>{page}</Typography>
                            </MenuItem>
                        ))}
                    </Box>
                    {
                        refresh_token ?
                            <Box sx={{
                                flexGrow: 0,
                            }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} >
                                        <AccountCircleIcon sx={{ color: 'white' }} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{
                                        mt: '45px',
                                    }}
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
                                    <div style={{
                                        backgroundColor: 'linear-Gradient(to right, #16224A, #FFFFFF)',
                                    }}>


                                        {settings.map((setting, i) => (
                                            <MenuItem
                                                component="a"
                                                href={settings_link[i]}
                                                key={setting}
                                                onClick={() => handleCloseUserMenu(i)}>
                                                {i == 0 && <AccountBoxIcon sx={{ mr: 1, color: color.violet }} />}
                                                {i == 1 && <ManageAccountsIcon sx={{ mr: 1, color: color.violet }} />}
                                                {i == 2 && <LogoutIcon sx={{ mr: 1, color: color.violet }} />}
                                                <Typography textAlign="center" fontWeight={700}>{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </div>
                                </Menu>
                            </Box>
                            :
                            <Box sx={{ flexGrow: 0 }}>
                                <MenuItem component="a" href="/auth" key="Login" fontWeight={700} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center" fontWeight={700}>Login</Typography>
                                    <LoginIcon sx={{ ml: 1 }} />
                                </MenuItem>
                            </Box>
                    }
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Navbar;
