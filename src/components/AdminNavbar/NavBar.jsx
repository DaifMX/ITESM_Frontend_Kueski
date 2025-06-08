
import { useState } from "react";
import { NavLink } from "react-router";

import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import { People, Receipt, Menu, Inventory, ShoppingCart, Home } from '@mui/icons-material';
import { Divider, CssBaseline, AppBar, Toolbar, IconButton } from "@mui/material";

const drawerWidth = '240px';
const ACCENT = "#cebd22";

export default function NavBar() {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        setIsClosing(false);
    };

    const handleDrawerToggle = () => {
        if (!isClosing) setMobileOpen(!mobileOpen);
    };


    const drawerContent = (
        <Drawer variant="permanent">
            <Divider />
            <Box sx={{ p: 2, borderBottom: "1px solid #333", display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Dashboard
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: '100%' }}>
                <Box>
                    <List>
                        {[
                            { to: "/admin/home", label: 'Inicio', icon: <Home /> },
                            { to: "/admin/users", label: "Usuarios", icon: <People /> },
                            { to: "/admin/products", label: "Productos", icon: <Inventory /> },
                            { to: "/admin/orders", label: "Órdenes", icon: <Receipt /> },
                        ].map(({ to, label, icon }) => (
                            <ListItemButton
                                key={to}
                                draggable={false}
                                component={NavLink}
                                to={to}
                                end={to === '/admin/'}
                                sx={{
                                    color: "#EEE",
                                    "&:hover": {
                                        color: 'white',
                                    },
                                    "&.active": {
                                        bgcolor: ACCENT,
                                        color: "#0e0e0e",
                                        "& .MuiListItemIcon-root": {
                                            color: "#0e0e0e",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: ACCENT }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
                <Box>
                    <List>
                        {[
                            { to: "/", label: "Volver a tienda", icon: <ShoppingCart /> },
                        ].map(({ to, label, icon }) => (
                            <ListItemButton
                                key={to}
                                draggable={false}
                                component={NavLink}
                                to={to}
                                sx={{
                                    color: "#EEE",
                                    "&:hover": {
                                        color: 'white',
                                    },
                                    "&.active": {
                                        bgcolor: ACCENT,
                                        color: "#0e0e0e",
                                        "& .MuiListItemIcon-root": {
                                            color: "#0e0e0e",
                                        },
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: ACCENT }}>
                                    {icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={label}
                                />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Box>
        </Drawer>
    )

    return (
        <Box sx={{ display: "flex", bgcolor: "#0e0e0e" }}>
            {/* ─────────────── DRAWER ─────────────── */}
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >

                <Toolbar sx={{ display: { lg: 'none' } }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Panel Administrativo
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onTransitionEnd={handleDrawerTransitionEnd}
                    onClose={handleDrawerClose}
                    sx={{
                        display: { xs: 'block', lg: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    keepMounted
                >
                    {drawerContent}
                </Drawer>

                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawerContent}
                </Drawer>
            </Box>
        </Box>
    );
};

{/* <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    zIndex: 100,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        bgcolor: "#121212",
                        color: "#EEEEEE",
                        borderRight: "1px solid #333",
                    },
                }}
                 */}