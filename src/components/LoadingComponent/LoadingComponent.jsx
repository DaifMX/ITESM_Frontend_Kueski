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
        <Box
          component="img"
          sx={{
            height: 152,
            width: 119,
            textAlign: "center",
            margin: "30px"
          }}
          alt="Autopartes"
        //   src="https://globalaceros.mx/wp-content/uploads/2020/02/globalaceros.png"
        />

      </Typography>
      <CircularProgress size="50px" color="inherit" />

    </Box>
  )
}