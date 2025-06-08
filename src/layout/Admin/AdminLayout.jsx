import NavBar from '../../components/AdminNavbar/NavBar';
import { Outlet } from 'react-router';
import {Box} from '@mui/material'

import AdminMain from './AdminMain'

export default function AdminLayout({ children }) {
    return (
        <>
            <Box
                sx={{
                    minHeight: 1,
                    display: 'flex',
                    flexDirection: { xs: 'column', lg: 'row' },
                }}
            >
                <NavBar />
                <AdminMain><Outlet/></AdminMain>
            </Box>
        </>
    );
}