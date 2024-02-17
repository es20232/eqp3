import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import React, { useState } from 'react';

interface AlertParams {
  message: string;
  severityMessage: AlertColor;//severity type
}

const AlertSnackBar = ({ message, severityMessage }: AlertParams) => {

  const [open, setOpen] = useState(true);


  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Box padding={'20px'}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
      >
        <Alert severity={severityMessage} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default AlertSnackBar;