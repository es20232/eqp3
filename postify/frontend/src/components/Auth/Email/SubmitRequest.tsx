import { Grid } from "@mui/material";
import React from "react";
import MyContainer from '../../MyContainer';


interface submitRequestParams {
  type: ('PASSWORDRECOVERY' /*| 'mais coisas'*/);
}

const submitRequest: React.FC<submitRequestParams> = ({ type }) => {
  return (
    <MyContainer>
      <Grid>
        {type}
      </Grid>
    </MyContainer>
  );
}

export default submitRequest;