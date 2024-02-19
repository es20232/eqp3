import { Container } from "@mui/material";
import { ReactNode } from "react";
import MyPaper from "./MyPaper";

interface containerParams {
  children?: ReactNode;
  withDefaultPaper?: boolean;
  marginTopo?: string | number;
}

const container: React.FC<containerParams> = ({ children, withDefaultPaper, marginTopo }) => {
  if (marginTopo === undefined)
    marginTopo = '20px';
  if (withDefaultPaper === undefined || withDefaultPaper === false)
    return (
      <Container maxWidth={'sm'} sx={{ marginTop: marginTopo }}>
        <MyPaper>
          {children}
        </MyPaper>
      </Container>
    );

  return (
    <Container maxWidth={'sm'}>
      {children}
    </Container>
  )

}

export default container;