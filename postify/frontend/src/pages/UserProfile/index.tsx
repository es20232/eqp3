import { zodResolver } from "@hookform/resolvers/zod";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Modal,
  Snackbar,
  TextField,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form, useParams } from "react-router-dom";
import { api } from "../../utils/api/api";
import {
  alterarSenhaFormData,
  alterarSenhaSchema,
} from "../../utils/schemas/alterarSenhaSchema";
import {
  updateUsuarioFormData,
  updateUsuarioSchema,
} from "../../utils/schemas/updateUsuarioSchema";
import useUserStore from "../../utils/stores/userStore";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%", // Largura do modal como 80% da largura da janela
  height: "auto", // Altura se ajusta automaticamente ao conteúdo
  maxWidth: "80%",
  maxHeight: "100%", // Limita a altura máxima para evitar sobreposição com a borda da janela
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflowY: "auto", // Permite rolagem vertical se o conteúdo exceder a altura do modal
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

interface UserProfile {
  name: string;
  username: string;
  profileImage: string | null;
  id: number | null;
}

interface Post {
  id: number | null;
  caption: string;
  image: string;
  likes: number;
  deslikes: number;
  comment: string;
}

const URL = "http://localhost:8000";

const Profile = () => {
  const { username: paramsUsername } = useParams();
  const { name, username, profileImage, id } = useUserStore();
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openM, setOpen] = useState(null);
  const [selectedPost, setSelectedPost] = useState<Post>(null);
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handleModalOpen = (post) => {
    setSelectedPost(post); // Armazena o post selecionado
    setOpen(true); // Abre o modal
  };
  const handleModalClose = () => {
    setOpen(false); // Fecha o modal
    setAnchorEl(null); // Garante que o estado do menu seja limpo
  };

  const handleClick = (event) => {
    event?.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const [commentValue, setCommentValue] = useState("");
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
    SubmitComment(postId, commentValue);
  };
  
  const handleClose = (event) => {
    event?.stopPropagation(); // Interrompe a propagação do evento
    setAnchorEl(null); // Fecha o menu
  };

  const handleDelete = (event) => {
    handleClose(event);
  };

  useEffect(() => {
    setLoading(true);
    if (paramsUsername) {
      api
        .get(`/api/v1/users?username=${encodeURIComponent(paramsUsername)}`)
        .then((response) => {
          const userData =
            response.data.length > 0
              ? {
                  ...response.data[0],
                  profileImage: response.data[0].profile_image,
                  id: response.data[0].id,
                }
              : null;
          setUser(userData);
        })
        .catch((error) => {
          console.error("Erro ao buscar usuário:", error);
        });
    } else {
      setUser({ name, username, profileImage, id });
    }
  }, [paramsUsername, name, username, profileImage, id]);
  
  const SubmitComment = async (postId, comment) => {
    try {
      await api.post(`/api/v1/posts/${postId}/comments/create`, { comment: comment });
      setRefreshPosts((prev) => !prev);
    } catch (error) {
     
    }
  };

  useEffect(() => {
    if (user?.id) {
      api
        .get(`/api/v1/users/${user.id}/posts`)
        .then((response) => {
          console.log(response.data);
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar posts:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [user?.id, refreshPosts]);

  const handleLike = async (event, id) => {
    event?.stopPropagation()
    try {
      // Faz a requisição para curtir o post
      await api.post(`/api/v1/posts/${id}/like/`);
      // Atualiza a lista de posts com a nova contagem de likes para o post especificado
      const updatedPosts = posts.map((post) =>
        post.id === id ? { ...post, likes: [...post.likes, { id: id }] } : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  const handleDislike = async (event, id) => {
    event?.stopPropagation()
    try {
      // Faz a requisição para curtir o post
      await api.post(`/api/v1/posts/${id}/deslike/`);
      // Atualiza a lista de posts com a nova contagem de likes para o post especificado
      const updatedPosts = posts.map((post) =>
        post.id === id
          ? { ...post, deslikes: [...post.deslikes, { id: id }] }
          : post
      );
      setPosts(updatedPosts);
    } catch (error) {
      console.error("Erro ao curtir o post:", error);
    }
  };

  const postsCount = posts.length;

  return (
    <>
      <div id="profile">
        <Container sx={{ flexGrow: 1, width: "100%", paddingBottom: "20px" }}>
          {loading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                marginY: "35%",
                gap: "10px",
              }}
            >
              <CircularProgress />
              <Typography>Carregando perfil</Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={0} sx={{ padding: "50px" }}>
                <Grid item xs={12} md={3}>
                  <Tooltip title="Foto de perfil">
                    <Avatar
                      sx={{ width: 150, height: 150 }}
                      src={
                        user && user.profileImage
                          ? URL + user.profileImage
                          : undefined
                      }
                      alt={user ? user.name : "Foto de perfil"}
                    />
                  </Tooltip>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h3" fontSize={"30px"}>
                    {user ? user.name : "Nome do Usuário"}
                  </Typography>
                  <Typography variant="subtitle1">
                    @{user ? user.username : "username"}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <Typography variant="body1">
                      <strong>Posts:</strong> {postsCount}
                    </Typography>
                  </Box>
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
                        <Modal
                          open={openM}
                          onClose={handleModalClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}>
                            {selectedPost && (
                              <>
                                <Grid
                                  container
                                  justifyContent="space-between"
                                  style={{ display: "flex" }}
                                >
                                  <Grid item xs={12} md={6}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        justifyContent: "flex-start", // Alinha o conteúdo à esquerda
                                        alignItems: "center",
                                        overflow: "hidden",
                                        width: "40vw", // Define a largura do quadrado
                                        height: "40vw", // Define a altura do quadrado, mantendo a proporção quadrada
                                      }}
                                    >
                                      <img
                                        src={URL + selectedPost.image}
                                        alt="Post"
                                        style={{
                                          width: "100%", // A imagem ocupará 100% da largura do Box
                                          height: "100%", // A imagem ocupará 100% da altura do Box
                                          objectFit: "cover", // A imagem cobrirá o espaço disponível, cortando as partes excedentes
                                        }}
                                      />
                                    </Box>
                                  </Grid>
                                  <Grid item xs={12} md={6}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "flex-start",
                                        alignItems: "flex-start",
                                        paddingTop: "20px",
                                        paddingLeft: "30px",
                                        paddingRight: "30px",
                                        overflowY: "auto",
                                        maxHeight: "40vw", // Ajuste para igualar à altura da imagem
                                        width: "100%",
                                      }}
                                    >
                                      {/* Avatar, Username, e Descrição */}
                                      <Box
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          width: "100%",
                                          marginBottom: 2,
                                        }}
                                      >
                                        <Avatar
                                          src={URL + user?.profileImage}
                                          alt={user?.name}
                                          sx={{ marginRight: 1 }}
                                        />
                                        <Typography variant="h6">
                                          {user?.username}
                                        </Typography>
                                      </Box>
                                      <Typography variant="h6" component="p">
                                        Descrição
                                      </Typography>
                                      <Box
                                        sx={{
                                          width: "100%", // Largura fixa
                                          height: "10vw", // Altura fixa
                                          overflowY: "auto", // Permite a rolagem vertical se o conteúdo exceder a altura
                                          border: "1px solid grey", // Define a borda
                                          borderRadius: "4px", // Arredonda os cantos da borda
                                          padding: 1, // Adiciona um pouco de espaço interno
                                          bgcolor: "background.paper", // Usa a cor de fundo do tema para o papel
                                        }}
                                      >
                                        <Typography
                                          variant="body1"
                                          component="p"
                                        >
                                          {selectedPost.caption}
                                        </Typography>
                                      </Box>
                                      <Box display={"flex"} marginTop={"10px"}>
                                        <Box
                                          display={"flex"}
                                          alignItems={"center"}
                                        >
                                          <IconButton
                                            aria-label="like"
                                            onClick={() =>
                                              handleLike(selectedPost.id)
                                            }
                                          >
                                            <ThumbUpIcon color={"primary"} />
                                          </IconButton>
                                          <Typography variant="body2">
                                            {selectedPost.likes.length}
                                          </Typography>
                                        </Box>
                                        <Box
                                          display={"flex"}
                                          alignItems={"center"}
                                        >
                                          <IconButton
                                            aria-label="dislike"
                                            onClick={() =>
                                              handleDislike(selectedPost.id)
                                            }
                                          >
                                            <ThumbDownIcon color={"error"} />
                                          </IconButton>
                                          <Typography variant="body2">
                                            {selectedPost.deslikes.length}
                                          </Typography>
                                        </Box>
                                      </Box>
                                      <Box
                                        sx={{
                                          mt: 1,
                                          p: 2,
                                          bgcolor: "background.paper",
                                          border: "1px solid grey",
                                          borderRadius: "4px",
                                          overflowY: "auto",
                                          height: "50vh", // Ajuste para acompanhar a proporção da descrição
                                          width: "100%",
                                          marginBottom: "25px",
                                        }}
                                      >
                                        <Typography variant={"h6"}>
                                          Comentarios:{" "}
                                          {selectedPost.comments.length}
                                        </Typography>
                                        <Box
                                          sx={{
                                            mt: 1,
                                            p: 2,
                                            bgcolor: "background.paper",
                                            borderRadius: "4px",
                                            overflowY: "auto",
                                            maxHeight: "14vh", // Ajuste conforme necessário
                                            width: "100%", // Usar 100% para ocupar toda a largura disponível
                                          }}
                                        >
                                          {selectedPost.comments.length > 0 ? (
                                            selectedPost.comments.map(
                                              (comment, index) => (
                                                <Box key={index} sx={{ mb: 2 }}>
                                                  <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: "bold" }}
                                                  >
                                                    {comment.user.name}:
                                                  </Typography>
                                                  <Typography variant="body2">
                                                    {comment.comment}
                                                  </Typography>
                                                </Box>
                                              )
                                            )
                                          ) : (
                                            <Typography variant="body2">
                                              Nenhum comentário ainda.
                                            </Typography>
                                          )}
                                        </Box>
                                        <form
                                          onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)}
                                        >
                                          <TextField
                                            fullWidth
                                            variant="outlined"
                                            label="Adicione um comentário"
                                            multiline
                                            rows={2}
                                            margin="normal"
                                            onChange={(e) => setCommentValue(e.target.value)}
                                          />

                                          <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            sx={{ mt: 2 }}
                                          >
                                            Enviar
                                          </Button>
                                        </form>
                                      </Box>
                                    </Box>
                                  </Grid>
                                </Grid>
                              </>
                            )}
                          </Box>
                        </Modal>
                        <Card
                          elevation={5}
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                          onClick={() => handleModalOpen(post)}
                        >
                          <CardMedia
                            component="div"
                            sx={{
                              // 16:9
                              pt: "56.25%",
                              height: "100%",
                            }}
                            image={URL + post.image}
                          />
                          <CardContent sx={{ flexGrow: 1 }}>
                            <Grid container spacing={1}>
                              <Grid item>
                                <Box display={"flex"} alignItems={"center"}>
                                  <IconButton
                                    aria-label="like"
                                    onClick={(event) => handleLike(event, post.id)}
                                  >
                                    <ThumbUpIcon color={"primary"} />
                                  </IconButton>
                                  <Typography variant="body2">
                                    {post.likes.length}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item>
                                <Box display={"flex"} alignItems={"center"}>
                                  <IconButton
                                    aria-label="dislike"
                                    onClick={(event) => handleDislike(event, post.id)}
                                  >
                                    <ThumbDownIcon color={"error"} />
                                  </IconButton>
                                  <Typography variant="body2">
                                    {post.deslikes.length}
                                  </Typography>
                                </Box>
                              </Grid>
                              <Grid item sx={{ marginLeft: "50%" }}>
                                <IconButton
                                  aria-label="settings"
                                  onClick={(event) => handleClick(event)}
                                >
                                  <MoreVertIcon />
                                </IconButton>
                                <Menu
                                  id="post-menu"
                                  anchorEl={anchorEl}
                                  open={open}
                                  onClose={handleClose}
                                >
                                  <MenuItem onClick={(event) => handleDelete(event)}>
                                    <ListItemIcon>
                                      <DeleteIcon />
                                    </ListItemIcon>
                                    <ListItemText>Excluir Post</ListItemText>
                                  </MenuItem>
                                </Menu>
                              </Grid>
                            </Grid>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))
                  )}
                </Grid>
              </Container>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

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
  } = useUserStore();

  const {
    register: registerSenhas,
    handleSubmit: submitSenhas,
    reset: resetSenhas,
    formState: { errors: errorsSenha },
  } = useForm<alterarSenhaFormData>({
    resolver: zodResolver(alterarSenhaSchema),
  });

  const {
    register: registerUsuario,
    handleSubmit: submitUsuario,
    formState: { errors: errorsUsuario },
  } = useForm<updateUsuarioFormData>({
    resolver: zodResolver(updateUsuarioSchema),
  });

  const [openSuccessSenha, setOpenSuccessSenha] = useState(false);
  const [openErrorSenha, setOpenErrorSenha] = useState(false);

  const [openSuccessDados, setOpenSuccessDados] = useState(false);
  const [openErrorDados, setOpenErrorDados] = useState(false);

  const [open, setOpen] = useState(false);
  const imageRef = useRef(null);

  const handleAvatarClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === imageRef.current) {
      return;
    }
    setOpen(false);
  };

  const handleOpenSuccessSenha = () => {
    setOpenSuccessSenha(true);
  };

  const handleCloseSuccessSenha = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessSenha(false);
  };

  const handleOpenErrorSenha = () => {
    setOpenErrorSenha(true);
  };

  const handleCloseErrorSenha = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorSenha(false);
  };

  const handleOpenSuccessDados = () => {
    setOpenSuccessDados(true);
  };

  const handleCloseSuccessDados = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessDados(false);
  };

  const handleOpenErrorDados = () => {
    setOpenErrorDados(true);
  };

  const handleCloseErrorDados = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    event?.preventDefault();
    if (reason === "clickaway") {
      return;
    }

    setOpenErrorDados(false);
  };

  const handleProfileImageChange = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files === null) {
      return;
    }

    const formData = new FormData();
    formData.append("profile_image", files[0]);

    try {
      const response = await api.put(`/api/v1/users/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setProfileImage(response.data.profile_image);
    } catch (error) {
      console.error(error);
    }
  };

  const handleProfileSubmit: SubmitHandler<updateUsuarioFormData> = async (
    data
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
          handleOpenSuccessDados();
          setUserProps(
            id,
            data.name,
            data.username,
            data.email,
            data.phoneNumber
          );
        }
      })
      .catch(() => handleOpenErrorDados());
  };

  const handlePasswordSubmit: SubmitHandler<alterarSenhaFormData> = async (
    data
  ) => {
    await api
      .post("/api/v1/users/change-password/", {
        old_password: data.senha_antiga,
        new_password: data.senha_nova,
      })
      .then((response) => {
        if (response.status === 200) {
          handleOpenSuccessSenha();
          resetSenhas();
        }
      })
      .catch(() => handleOpenErrorSenha());
  };

  return (
    <div id="profile">
      <Container
        sx={{ flexGrow: 1, margin: 2, width: "100%", paddingBottom: "20px" }}
      >
        <Typography variant="h3">Configurações da conta</Typography>
        <Grid container spacing={0} sx={{ padding: "50px" }}>
          <Grid item xs={12} md={3} textAlign="center">
            <Avatar
              sx={{
                width: 150,
                height: 150,
                margin: "auto",
                marginTop: "15px",
              }}
              src={profileImage !== "" ? URL + profileImage : profileImage}
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
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100vh",
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <img
                    ref={imageRef}
                    src={
                      profileImage !== "" ? URL + profileImage : profileImage
                    }
                    alt="Profile Image"
                    style={{
                      maxWidth: "90%",
                      maxHeight: "90%",
                      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
                      borderRadius: "8px",
                    }}
                  />
                </div>
              </Fade>
            </Modal>
            <Button
              component="label"
              variant="contained"
              sx={{ margin: "10px" }}
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
                {...registerUsuario("name")}
                error={!!errorsUsuario.name}
                helperText={errorsUsuario.name?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Usuário"
                defaultValue={username}
                {...registerUsuario("username")}
                error={!!errorsUsuario.username}
                helperText={errorsUsuario.username?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="E-mail"
                type="email"
                defaultValue={email}
                {...registerUsuario("email")}
                error={!!errorsUsuario.email}
                helperText={errorsUsuario.email?.message}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Telefone"
                defaultValue={phoneNumber}
                {...registerUsuario("phoneNumber")}
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
              <Typography variant="h6" sx={{ marginTop: "20px" }}>
                Alteração de Senha
              </Typography>
              <TextField
                type="password"
                label="Senha Atual"
                fullWidth
                margin="normal"
                {...registerSenhas("senha_antiga")}
                error={!!errorsSenha.senha_antiga}
                helperText={errorsSenha.senha_antiga?.message}
              />
              <TextField
                type="password"
                label="Nova Senha"
                fullWidth
                margin="normal"
                {...registerSenhas("senha_nova")}
                error={!!errorsSenha.senha_nova}
                helperText={errorsSenha.senha_nova?.message}
              />
              <TextField
                type="password"
                label="Confirme a Nova Senha"
                fullWidth
                margin="normal"
                {...registerSenhas("senha_nova_confirmar")}
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
                  sx={{ width: "100%" }}
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
                  sx={{ width: "100%" }}
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
                  sx={{ width: "100%" }}
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
                  sx={{ width: "100%" }}
                >
                  Algo deu errado ao atualizar os dados!
                </Alert>
              </Snackbar>
            </form>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export { EditProfile, Profile };
