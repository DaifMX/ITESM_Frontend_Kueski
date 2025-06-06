import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';

export default function LoadingComponent() {

  return (
    <Box
      sx={{
        width: '100vw',
        height: '80vh',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

      }}
    >
      <Typography variant="h1" component="h2">
        Cargando...
      </Typography>
      <CircularProgress size="50px" color="white" />

    </Box>
  )
}