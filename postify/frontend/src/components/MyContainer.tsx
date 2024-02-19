import { Container, Paper } from "@mui/material";
import { ReactNode } from "react";

interface containerParams {
  children?: ReactNode;
  marginTopo?: string;
  marginBaixo?: string;
  withContainer?: boolean;
}

const container: React.FC<containerParams> = ({ children, marginTopo, marginBaixo, withContainer }) => {
  if (marginTopo === undefined)
    marginTopo = '20px'
  if (marginBaixo === undefined)
    marginBaixo = '20px'
  if (withContainer === undefined || withContainer === false)
    return (
      <Paper style={{
        padding: '20px',
        marginTop: marginTopo,
        marginBottom: marginBaixo,
        width: '100%'
      }}
      >
        {children}
      </Paper>
    )

  return (
    <Container maxWidth={'sm'}>
      <Paper style={{
        padding: '20px',
        marginTop: marginTopo,
        marginBottom: marginBaixo,
        width: '100%'
      }}
      >
        {children}
      </Paper>
    </Container>
  );
}

export default container;