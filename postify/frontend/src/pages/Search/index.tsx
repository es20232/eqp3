import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardActionArea,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../utils/api/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_image: string | null;
}

const URL = "http://localhost:8000";

const Search = () => {
  const location = useLocation();
  const username = location.state?.query;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (username) {
      api
        .get(`/api/v1/users?username=${encodeURIComponent(username)}`)
        .then((response) => {
          setUsers(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuários:", error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [username]);

  const getInitials = (name: string) => {
    return name[0];
  };

  return (
    <div id="search">
      <Container sx={{ flexGrow: 1 }}>
        <Grid container spacing={4} sx={{ paddingBottom: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h2">Pesquisa por usuários</Typography>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h5" gutterBottom>
                Resultados para: "{username}"
              </Typography>
            </Box>
            <Typography>Quantidade de resultados: {users.length}</Typography>
          </Grid>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <CircularProgress />
            </Box>
          ) : users.length > 0 ? (
            users.map((usuario) => (
              <Grid item xs={12} sm={6} md={4} key={usuario.id}>
                <Card elevation={5} >
                  <CardActionArea onClick={() => navigate(`/profile/${usuario.username}`)}>
                    <CardContent sx={{ display: "flex" }}>
                      <Avatar
                        src={URL + usuario.profile_image || undefined}
                        alt={usuario.name}
                        sx={{ width: 56, height: 56 }}
                      >
                        {!usuario.profile_image && getInitials(usuario.name)}
                      </Avatar>
                      <Box sx={{ marginLeft: "15px" }}>
                        <Typography gutterBottom variant="h5" component="div">
                          {usuario.name.split(" ").slice(0, 2).join(" ")}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          @{usuario.username}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Box sx={{marginTop:"150px"}}>
                <Typography variant="h6" textAlign="center">
                  Nenhum usuário encontrado.
                </Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Search;
