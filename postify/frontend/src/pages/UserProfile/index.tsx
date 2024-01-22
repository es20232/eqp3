import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const username = "@ncpf3011";
const name = "Neemias Calebe Pereira Freire";

const Profile = () => {
  const posts = [
    {
      id: 1,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 2,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 3,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 4,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 5,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 6,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 7,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
    {
      id: 8,
      imageUrl: "https://source.unsplash.com/random?wallpapers",
      description: "Bela foto",
    },
  ];

  const followersCount = 1;
  const postsCount = posts.length;
  const followingCount = 36;
  const navigate = useNavigate();

  return (
    <>
      <div id="profile">
        <Container
          sx={{ flexGrow: 1, margin: 2, width: "100%", paddingBottom: "20px" }}
        >
          <Grid container spacing={0} sx={{ padding: "50px" }}>
            <Grid item xs={12} md={3}>
              <Tooltip title="Alterar foto de perfil">
                <Avatar
                  sx={{ width: 150, height: 150 }}
                  src="https://source.unsplash.com/random?wallpapers"
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h3" fontSize={"30px"}>
                {name}
              </Typography>
              <Typography variant="subtitle1">{username}</Typography>
              <Box sx={{ display: "flex", gap: 10, marginTop: 4 }}>
                <Typography variant="body1">
                  <strong>Seguidores:</strong> {followersCount}
                </Typography>
                <Typography variant="body1">
                  <strong>Posts:</strong> {postsCount}
                </Typography>
                <Typography variant="body1">
                  <strong>Seguindo:</strong> {followingCount}
                </Typography>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              sx={{ display: "flex", justifyContent: "right" }}
            >
              <Button
                sx={{ height: "50px" }}
                color="primary"
                variant="contained"
                startIcon={<SettingsIcon />}
                onClick={() => navigate("/profile/edit")}
              >
                Configurações
              </Button>
            </Grid>
          </Grid>

          <Container sx={{ paddingBottom: "20px" }}>
            <Grid container spacing={2}>
              {posts.length === 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ marginTop: 2, textAlign: "center" }}
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
                    sx={{ height: "100%" }}
                  >
                    <Card
                      elevation={5}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="div"
                        sx={{
                          // 16:9
                          pt: "56.25%",
                          height: "100%",
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
  );
};

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: 'Nome Atual',
    username: 'UsuarioAtual',
    password: '',
    confirmPassword: '',
    email: 'usuario@email.com',
    phone: '123-456-7890',
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleProfileSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Dados do formulário de perfil enviados:', formData);
    navigate('/profile');
  };

  const handlePasswordSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    alert('Senha alterada');
  };

  return (
    <div id="profile">
      <Container sx={{ flexGrow: 1, margin: 2, width: '100%', paddingBottom: '20px' }}>
        <Typography variant="h3">Configurações da conta</Typography>
        <Grid container spacing={0} sx={{ padding: '50px' }}>
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar sx={{ width: 150, height: 150, margin: 'auto', marginTop: '15px' }} src="https://source.unsplash.com/random?wallpapers" />
            <Button variant="contained" sx={{ margin: '10px' }}>
              Alterar foto de perfil
            </Button>
          </Grid>
          <Grid item xs={12} md={8}>
            <form onSubmit={handleProfileSubmit}>
            <Typography variant="h6">
                Alteração de dados pessoais
              </Typography>
              <TextField label="Nome" name="name" value={formData.name} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Usuário" name="username" value={formData.username} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="E-mail" name="email" type="email" value={formData.email} onChange={handleChange} fullWidth margin="normal" />
              <TextField label="Telefone" name="phone" value={formData.phone} onChange={handleChange} fullWidth margin="normal" />
              <Button type="submit" variant="contained" color="primary">
                Salvar Alterações
              </Button>
            </form>

            {/* Nova seção para a alteração de senha */}
            <form onSubmit={handlePasswordSubmit}>
              <Typography variant="h6" sx={{ marginTop: '20px' }}>
                Alteração de Senha
              </Typography>
              <TextField type="password" label="Nova Senha" name="password" value={formData.password} onChange={handleChange} fullWidth margin="normal" />
              <TextField
                type="password"
                label="Confirme a Nova Senha"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary">
                Alterar Senha
              </Button>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export { Profile, EditProfile };
