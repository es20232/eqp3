import { Paper } from "@mui/material";
import React, { ReactNode } from "react";

interface MyPaperParams {
  children?: ReactNode;
  marginTopo?: string | number;
  marginBaixo?: string | number;
  padding?: string | number;
  elevation?: number;
}

const MyPaper: React.FC<MyPaperParams> = ({ children, marginBaixo, marginTopo, elevation, padding }) => {
  if (marginTopo === undefined)
    marginTopo = '20px'
  if (marginBaixo === undefined)
    marginBaixo = '20px'
  if (elevation === undefined)
    elevation = 2;
  if (padding === undefined)
    padding = '20px';

  return (
    <Paper elevation={elevation} style={{
      padding: padding,
      marginTop: marginTopo,
      marginBottom: marginBaixo,
      width: '100%'
    }}
    >
      {children}
    </Paper>
  );
}

export default MyPaper