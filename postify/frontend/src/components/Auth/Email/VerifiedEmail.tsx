import { Alert, Button, Grid, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import MyContainer from '../../MyContainer'

const VerifiedEmail = () => {
    const navigate = useNavigate()

    return (
        <MyContainer withDefaultPaper={true}>
            <Typography textAlign={'center'} variant="h6">
                Verificação de Email
            </Typography>
            <Grid container justifyContent={'center'}>
                <Grid item xs={12}>
                    <Alert severity="success">Email verificado com sucesso!</Alert>
                </Grid>
                <Grid item xs={3} marginTop={'12px'}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{
                            paddingTop: '10px',
                            paddingBottom: '10px',
                            borderRadius: '38px',
                        }}
                        onClick={() => {
                            return navigate('/')
                        }}
                    >
                        Ok
                    </Button>
                </Grid>
            </Grid>
        </MyContainer>
    )
}

export default VerifiedEmail
