import { zodResolver } from '@hookform/resolvers/zod'
import SettingsIcon from '@mui/icons-material/Settings'
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Fade,
  Grid,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  styled,
} from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { api } from '../../utils/api/api'
import {
  alterarSenhaFormData,
  alterarSenhaSchema,
} from '../../utils/schemas/alterarSenhaSchema'
import {
  updateUsuarioFormData,
  updateUsuarioSchema,
} from '../../utils/schemas/updateUsuarioSchema'
import useUserStore from '../../utils/stores/userStore'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const URL = 'http://localhost:8000'

const Profile = () => {
  const { name, username, profileImage } = useUserStore()

  const posts = [
    {
      id: 1,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 2,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 3,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 4,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 5,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 6,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 7,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
    {
      id: 8,
      imageUrl: 'https://source.unsplash.com/random?wallpapers',
      description: 'Bela foto',
    },
  ]

  const postsCount = posts.length
  const navigate = useNavigate()

  return (
    <>
      <div id="profile">
        <Container
          sx={{ flexGrow: 1, margin: 2, width: '100%', paddingBottom: '20px' }}
        >
          <Grid container spacing={0} sx={{ padding: '50px' }}>
            <Grid item xs={12} md={3}>
              <Tooltip title="Foto de perfil">
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  src={profileImage !== '' ? URL + profileImage : profileImage}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontSize={'30px'}>
                {name}
              </Typography>
              <Typography variant="subtitle1">@{username}</Typography>
              <Box sx={{ display: 'flex', gap: 10, marginTop: 4 }}>
                <Typography variant="body1">
                  <strong>Posts:</strong> {postsCount}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: 'flex', justifyContent: 'right' }}
            >
              <Button
                sx={{ height: '50px' }}
                color="primary"
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => navigate('/profile/edit')}
              >
                Configurações
              </Button>
            </Grid>
          </Grid>

          <Container sx={{ paddingBottom: '20px' }}>
            <Grid container spacing={2}>
              {posts.length === 0 ? (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100%',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, textAlign: 'center' }}
                  >
                    Não há posts para exibir.
                  </Typography>
                </Box>
              ) : (
                posts.map((post) => (
                  <Grid
                    item
                    key={post.id}
                    xs={12}
                    sm={6}
                    md={4}
                    sx={{ height: '100%' }}
                  >
                    <Card
                      elevation={5}
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: '56.25%',
                          height: '100%',
                        }}
                        image={post.imageUrl}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))
              )}
            </Grid>
          </Container>
        </Container>
      </div>
    </>
  )
}

const EditProfile = () => {
  const {
    id,
    name,
    username,
    email,
    phoneNumber,
    profileImage,
    setProfileImage,
    setUserProps,
  } = useUserStore()

  const {
    register: registerSenhas,
    handleSubmit: submitSenhas,
    reset: resetSenhas,
    formState: { errors: errorsSenha },
  } = useForm<alterarSenhaFormData>({
    resolver: zodResolver(alterarSenhaSchema),
  })

  const {
    register: registerUsuario,
    handleSubmit: submitUsuario,
    formState: { errors: errorsUsuario },
  } = useForm<updateUsuarioFormData>({
    resolver: zodResolver(updateUsuarioSchema),
  })

  const [openSuccessSenha, setOpenSuccessSenha] = useState(false)
  const [openErrorSenha, setOpenErrorSenha] = useState(false)

  const [openSuccessDados, setOpenSuccessDados] = useState(false)
  const [openErrorDados, setOpenErrorDados] = useState(false)

  const [open, setOpen] = useState(false)
  const imageRef = useRef(null)

  const handleAvatarClick = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleBackdropClick = (event) => {
    if (event.target === imageRef.current) {
      return
    }
    setOpen(false)
  }

  const handleOpenSuccessSenha = () => {
    setOpenSuccessSenha(true)
  }

  const handleCloseSuccessSenha = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessSenha(false)
  }

  const handleOpenErrorSenha = () => {
    setOpenErrorSenha(true)
  }

  const handleCloseErrorSenha = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return
    }

    setOpenErrorSenha(false)
  }

  const handleOpenSuccessDados = () => {
    setOpenSuccessDados(true)
  }

  const handleCloseSuccessDados = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return
    }

    setOpenSuccessDados(false)
  }

  const handleOpenErrorDados = () => {
    setOpenErrorDados(true)
  }

  const handleCloseErrorDados = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    event?.preventDefault()
    if (reason === 'clickaway') {
      return
    }

    setOpenErrorDados(false)
  }

  const handleProfileImageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files === null) {
      return
    }

    const formData = new FormData()
    formData.append('profile_image', files[0])

    try {
      const response = await api.put(`/api/v1/users/${id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })

      setProfileImage(response.data.profile_image)
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfileSubmit: SubmitHandler<updateUsuarioFormData> = async (
    data,
  ) => {
    await api
      .put(`/api/v1/users/${id}/`, {
        name: data.name,
        username: data.username,
        email: data.email,
        phone_number: data.phoneNumber,
      })
      .then((response) => {
        if (response.status === 200) {
          handleOpenSuccessDados()
          setUserProps(
            id,
            data.name,
            data.username,
            data.email,
            data.phoneNumber,
          )
        }
      })
      .catch(() => handleOpenErrorDados())
  }

  const handlePasswordSubmit: SubmitHandler<alterarSenhaFormData> = async (
    data,
  ) => {
    await api
      .post('/api/v1/users/change-password/', {
        old_password: data.senha_antiga,
        new_password: data.senha_nova,
      })
      .then((response) => {
        if (response.status === 200) {
          handleOpenSuccessSenha()
          resetSenhas()
        }
      })
      .catch(() => handleOpenErrorSenha())
  }

  return (
    <div id="profile">
      <Container
        sx={{ flexGrow: 1, margin: 2, width: '100%', paddingBottom: '20px' }}
      >
        <Typography variant="h3">Configurações da conta</Typography>
        <Grid container spacing={0} sx={{ padding: '50px' }}>
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: 'auto',
                marginTop: '15px',
              }}
              src={profileImage !== '' ? URL + profileImage : profileImage}
              onClick={handleAvatarClick}
            />

            <Modal
              open={open}
              onClose={handleClose}
              closeAfterTransition
              onClick={handleBackdropClick}
            >
              <Fade in={open}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <img
                    ref={imageRef}
                    src={
                      profileImage !== '' ? URL + profileImage : profileImage
                    }
                    alt="Profile Image"
                    style={{
                      maxWidth: '90%',
                      maxHeight: '90%',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                      borderRadius: '8px',
                    }}
                  />
                </div>
              </Fade>
            </Modal>
            <Button
              component="label"
              variant="contained"
              sx={{ margin: '10px' }}
            >
              Alterar foto de perfil
              <VisuallyHiddenInput
                type="file"
                onChange={handleProfileImageChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <form onSubmit={submitUsuario(handleProfileSubmit)}>
              <Typography variant="h6">Alteração de dados pessoais</Typography>
              <TextField
                label="Nome"
                defaultValue={name}
                {...registerUsuario('name')}
                error={!!errorsUsuario.name}
                helperText={errorsUsuario.name?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Usuário"
                defaultValue={username}
                {...registerUsuario('username')}
                error={!!errorsUsuario.username}
                helperText={errorsUsuario.username?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="E-mail"
                type="email"
                defaultValue={email}
                {...registerUsuario('email')}
                error={!!errorsUsuario.email}
                helperText={errorsUsuario.email?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Telefone"
                defaultValue={phoneNumber}
                {...registerUsuario('phoneNumber')}
                error={!!errorsUsuario.phoneNumber}
                helperText={errorsUsuario.phoneNumber?.message}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Salvar Alterações
              </Button>
            </form>

            {/* Nova seção para a alteração de senha */}
            <form onSubmit={submitSenhas(handlePasswordSubmit)}>
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Alteração de Senha
              </Typography>
              <TextField
                type="password"
                label="Senha Atual"
                fullWidth
                margin="normal"
                {...registerSenhas('senha_antiga')}
                error={!!errorsSenha.senha_antiga}
                helperText={errorsSenha.senha_antiga?.message}
              />
              <TextField
                type="password"
                label="Nova Senha"
                fullWidth
                margin="normal"
                {...registerSenhas('senha_nova')}
                error={!!errorsSenha.senha_nova}
                helperText={errorsSenha.senha_nova?.message}
              />
              <TextField
                type="password"
                label="Confirme a Nova Senha"
                fullWidth
                margin="normal"
                {...registerSenhas('senha_nova_confirmar')}
                error={!!errorsSenha.senha_nova_confirmar}
                helperText={errorsSenha.senha_nova_confirmar?.message}
              />
              <Button type="submit" variant="contained" color="primary">
                Alterar Senha
              </Button>

              <Snackbar
                open={openSuccessSenha}
                autoHideDuration={6000}
                onClose={handleCloseSuccessSenha}
              >
                <Alert
                  onClose={handleCloseSuccessSenha}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Senha alterada com sucesso!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openErrorSenha}
                autoHideDuration={6000}
                onClose={handleCloseErrorSenha}
              >
                <Alert
                  onClose={handleCloseErrorSenha}
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Senha antiga incorreta!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openSuccessDados}
                autoHideDuration={6000}
                onClose={handleCloseSuccessDados}
              >
                <Alert
                  onClose={handleCloseSuccessDados}
                  severity="success"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Dados alterados com sucesso!
                </Alert>
              </Snackbar>

              <Snackbar
                open={openErrorDados}
                autoHideDuration={6000}
                onClose={handleCloseErrorDados}
              >
                <Alert
                  onClose={handleCloseErrorDados}
                  severity="error"
                  variant="filled"
                  sx={{ width: '100%' }}
                >
                  Algo deu errado ao atualizar os dados!
                </Alert>
              </Snackbar>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export { EditProfile, Profile }
