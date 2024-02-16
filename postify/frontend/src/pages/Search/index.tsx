import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { api } from "../../utils/api/api";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone_number: string;
  profile_image: string | null;
}

const URL = "http://localhost:8000"; // Substitua pela URL base de produção quando necessário

const Search = () => {
  const location = useLocation();
  const username = location.state?.query;

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (username) {
      api
        .get(`/api/v1/users?username=${encodeURIComponent(username)}`)
        .then((response) => {
          setUsers(response.data); // Assumindo que a resposta da API é o array de usuários
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
      <Container sx={{ flexGrow: 1, marginY: 4 }}>
        <Grid container spacing={4} sx={{ paddingBottom: "20px" }}>
          <Grid item xs={12}>
            <Box sx={{ display: "flex" }}>
              <Typography variant="h4" gutterBottom>
                Resultados para: "{username}"
              </Typography>
            </Box>
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
                <Card>
                  <CardActionArea>
                    <CardContent>
                      <Avatar
                        src={URL + usuario.profile_image || undefined}
                        alt={usuario.name}
                        sx={{ width: 56, height: 56 }}
                      >
                        {!usuario.profile_image && getInitials(usuario.name)}
                      </Avatar>
                      <Typography gutterBottom variant="h5" component="div">
                        {usuario.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        @{usuario.username}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center">
                Nenhum usuário encontrado.
              </Typography>
            </Grid>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Search;
