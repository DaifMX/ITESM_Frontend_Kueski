import { useResponsive } from '../../hooks/useResponsive';

import { HEADER, NAV } from "./config-layout";

import { Box } from '@mui/material';

export default function AdminMain({ children }) {
  const SPACING = 8;
  const lgUp = useResponsive('up', 'lg');

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          py: `${HEADER.H_MOBILE + SPACING}px`,
          ...(lgUp && {
            px: 2,
            py: `${HEADER.H_DESKTOP + SPACING}px`,
            width: `calc(100% - ${NAV.WIDTH}px)`,
          }),
        }}
      >
        {children}
      </Box>
    </>
  )
}