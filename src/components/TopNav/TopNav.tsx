import React from 'react';
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { useHistory } from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import StorefrontIcon from '@material-ui/icons/Storefront';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStyles } from "./TopNav.styles";
import { clearAuth, setAuth } from "../../redux/authSlice";
import { getAuthData } from "../../redux/selectors/auth.selector";
import {
    Auth,
    getLocalAuth,
    removeLocalAuth
} from "../../utils/utils";


function TopNav() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);

    const history = useHistory();
    const dispatch = useAppDispatch();
    const [loggedIn, setLoggedIn] = useState(false);
    const authData = useAppSelector(getAuthData);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleLoginButton = () => history.push('/login');

    const handleLogoutButton = () => {
        dispatch(clearAuth());
        removeLocalAuth();
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogoutButton}>Logout</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton aria-label="show added articles" color="inherit">
                    <Badge color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={loggedIn ? handleProfileMenuOpen : handleLoginButton}
                className={loggedIn ? '' : classes.loginMobile}
            >
                {!loggedIn && 'Login'}
                {loggedIn &&
                    <>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            className={classes.barInfo}
                        >
                            <AccountCircle />
                            {authData.user &&
                                <Typography variant="button" display="block" className="username" >
                                    {authData.user.displayName}
                                </Typography>
                            }
                        </IconButton>
                    </>
                }
            </MenuItem>
        </Menu>
    );


    useEffect(() => {
        let logged = false;

        if (!authData.user && !authData.token) {
            let auth: Auth | null = getLocalAuth();

            if (auth && auth.token && auth.user) {
                dispatch(setAuth(auth));
                logged = true;
            } else {
                logged = false;
                handleLogoutButton();
            }
        } else {
            logged = true;
        }

        setLoggedIn(logged);
        // eslint-disable-next-line 
    }, [authData, dispatch])


    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <StorefrontIcon
                        className={classes.menuButton}
                    />
                    <Typography className={classes.title} variant="h6" noWrap>
                        ReactEShop
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show added articles" color="inherit">
                            <Badge color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>
                        {!loggedIn &&
                            <Button color="inherit" onClick={handleLoginButton}>
                                Login
                            </Button>
                        }
                        {loggedIn &&
                            <>
                                <IconButton
                                    edge="end"
                                    aria-label="account of current user"
                                    aria-controls={menuId}
                                    aria-haspopup="true"
                                    onClick={handleProfileMenuOpen}
                                    color="inherit"
                                    className={classes.barInfo}
                                >
                                    <AccountCircle />
                                    {authData.user &&
                                        <Typography variant="button" display="block" className="username" >
                                            {authData.user.displayName}
                                        </Typography>
                                    }
                                </IconButton>
                            </>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

export default TopNav;