import { Container, Paper, Typography } from "@mui/material";

const ErroPage = () => {
  return (
    <Container maxWidth={'sm'}>
      <Typography variant="h3" textAlign={'center'} marginBottom={'20px'} color={'white'}>
        Postify
      </Typography>
      <Paper elevation={4} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" style={{ borderBottom: '1px solid gray' }}>
          Error 404: Not Found!
        </Typography>
      </Paper>
    </Container>
  );
};

export default ErroPage;