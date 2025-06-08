import { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from '@mui/material';

function DeleteConfirmationDialog({ open, entryToDelete, onConfirm, onCancel }) {
  useEffect(() => {
    console.log('entryToDelete', entryToDelete);
  }, [entryToDelete]);

  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Eliminar</DialogTitle>
      <DialogContent>
        <Typography>
          ¿Estás seguro que quieres eliminar a {entryToDelete}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color="primary">
          Cancelar
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained">
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteConfirmationDialog;
