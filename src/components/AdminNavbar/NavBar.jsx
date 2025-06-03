import { Outlet, NavLink } from "react-router-dom";
import {
    Box,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";

const drawerWidth = '240px';
const ACCENT = "#1de9b6";

export default function NavBar() {
    return (
        <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0e0e0e" }}>
            {/* ─────────────── DRAWER ─────────────── */}
            <Drawer
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
            >
                <Box sx={{ p: 2, borderBottom: "1px solid #333" }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Panel Administrativo
                    </Typography>
                </Box>

                <List>
                    {[
                        { to: "/admin/users", label: "Usuarios", icon: <PeopleIcon /> },
                        { to: "/admin/products", label: "Productos", icon: <InventoryIcon /> },
                        { to: "/admin/orders", label: "Órdenes", icon: <ShoppingCartIcon /> },
                    ].map(({ to, label, icon }) => (
                        <ListItemButton
                            key={to}
                            component={NavLink}
                            to={to}
                            sx={{
                                color: "#EEE",
                                "&:hover": {
                                    color: 'white',
                                    bgcolor: "rgba(30, 233, 182, 0.15)",
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
            </Drawer>
        </Box>
    );
};