import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const posts = [
    { id: 1, imageUrl: "https://source.unsplash.com/random?wallpapers" },
    { id: 2, imageUrl: "https://source.unsplash.com/random?wallpapers" },
    { id: 3, imageUrl: "https://source.unsplash.com/random?wallpapers" },
    { id: 4, imageUrl: "https://source.unsplash.com/random?wallpapers" },
    { id: 5, imageUrl: "https://source.unsplash.com/random?wallpapers" },
    { id: 6, imageUrl: "https://source.unsplash.com/random?wallpapers" },
  ];
  const navigate = useNavigate();
  const followersCount = 1;
  const postsCount = posts.length;
  const followingCount = 36;

  return (
    <>
      <div id="profile">
        <Container sx={{ margin: 2, width: "100%" }}>
          <Grid container spacing={0} sx={{ padding: "50px" }}>
            <Grid item xs={12} md={3}>
              <Avatar
                sx={{ width: 150, height: 150 }}
                src="https://source.unsplash.com/random?wallpapers"
              />
            </Grid>
            <Grid item xs={12} md={6} sx={{}}>
              <Typography variant="h3" fontSize={"30px"}>
                Neemias Calebe Pereira Freire
              </Typography>
              <Typography variant="subtitle1">@username</Typography>
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
                onClick={() => navigate("/")}
              >
                Configurações
              </Button>
            </Grid>
          </Grid>

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
                <Grid item key={post.id} xs={12} sm={6} md={4}>
                  <Card
                    elevation={5}
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image={post.imageUrl}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Descrição da postagem ou outros detalhes...
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Profile;
