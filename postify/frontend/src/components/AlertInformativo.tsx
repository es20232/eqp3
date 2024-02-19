import { Alert, AlertColor, Box, Snackbar } from "@mui/material";
import React, { useState } from 'react';

interface AlertParams {
  message: string;
  severityMessage: AlertColor;
  alignVertical?: "bottom" | "top";
  alignHorizontal?: "left" | "center" | "right";
}

/**
 * 
 * @param message informação a ser passada ao usuário
 * @param severityMessage tipo de mensagem que será passada. ex: erro, sucess
 * @param alignVertical localização da janela informativa na vertical
 * @param alignHorizontal localização da janela informativa na Horizontal
 * @returns
 */
const AlertSnackBar: React.FC<AlertParams> = ({ message, severityMessage, alignVertical, alignHorizontal }) => {
  if (alignVertical === undefined)
    alignVertical = 'top';
  if (alignHorizontal === undefined)
    alignHorizontal = 'center';

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
          vertical: alignVertical,
          horizontal: alignHorizontal,
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