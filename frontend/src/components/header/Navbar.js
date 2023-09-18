import React from 'react';
import './Navbar.css'; // Import the CSS file for styling
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

function Navbar() {
    return (
        <AppBar position="static" className="navbar">
            <Toolbar>
                <div className='nav-left'>
                    <Typography variant="h6" className="logo">
                        <IconButton>
                            <ShowChartIcon />
                        </IconButton>
                    </Typography>
                </div>
                <div className='nav-center'>
                    <div className="nav-links">
                        <a href="/market" className="nav-link">
                            Market
                        </a>
                        <a href="/about" className="nav-link">
                            About
                        </a>
                        <a href="/portfolio" className="nav-link">
                            Portfolio
                        </a>
                        <a href="/contact" className="nav-link">
                            Contact
                        </a>
                    </div>
                </div>
                <div className='nav-right'>
                    <div className="profile">
                        <IconButton color="inherit">
                            <AccountCircleIcon />
                        </IconButton>
                    </div>
                </div>

            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
