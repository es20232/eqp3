import { Container, Paper } from "@mui/material";
import { ReactNode } from "react";

interface containerParams {
  children: ReactNode;
}

const container: React.FC<containerParams> = ({ children }) => {
  return (
    <Container maxWidth={'sm'}>
      <Paper style={{ padding: '20px', marginTop: '20px', width: '100%' }}>
        {children}
      </Paper>
    </Container>
  );
}

export default container;