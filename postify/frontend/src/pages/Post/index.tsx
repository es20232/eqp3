import { SetStateAction, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useUserStore from "../../utils/stores/userStore";
import { api } from "../../utils/api/api"; // Ajuste para sua importação de API
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const baseURL = "http://localhost:8000";

const postSchema = z.object({
  postDescription: z.string().min(1, "Por favor, preencha a descrição."),
  selectedFile: z.any().refine((file) => file instanceof File, {
    message: "Por favor, selecione uma imagem.",
  }),
});

const Post = () => {
  const { username, profileImage: profileImage, id: idUser } = useUserStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  const handleOpenSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity); // Define a severidade do Snackbar
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    // Verifica se o Snackbar fechado era de sucesso, então redireciona
    if (snackbarSeverity === "success") {
      navigate("/profile");
    }
  };

  const handleSnackbarClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setImageURL(fileURL);
    }
  };

  const handleDescriptionChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setPostDescription(event.target.value);
  };

  const handleSubmit = async () => {
    const validationResult = postSchema.safeParse({
      postDescription,
      selectedFile,
    });

    if (!validationResult.success) {
      handleOpenSnackbar(
        validationResult.error.errors.map((error) => error.message).join(" "),
        "error"
      );
      return;
    }

    const formData = new FormData();
    if (selectedFile != null) {
      formData.append("image", selectedFile);
    }
    formData.append("caption", postDescription);

    try {
      const response = await api
        .post(`api/v1/users/${idUser}/posts/create`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .finally(() => {
          handleOpenSnackbar("Post enviado com sucesso!", "success");
          setTimeout(() => {
            navigate("/profile");
            setPostDescription("");
            setSelectedFile(null);
            setImageURL("");
          }, 3000);
        });
    } catch (error) {
      handleOpenSnackbar("Falha ao enviar o post. Tente novamente.", "error");
    }
  };

  return (
    <>
      <div id="post">
        <Container sx={{ flexGrow: 1, marginY: 0 }}>
          <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Alert
              onClose={handleCloseSnackbar}
              severity={snackbarSeverity}
              sx={{ width: "100%", marginTop: "90px" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
          <Typography variant="h2">Criar Post</Typography>
          <Grid container sx={{ marginTop: "25px" }}>
            <Grid
              item
              xs={12}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Card style={{ width: "65%", marginBottom: "20px" }}>
                <CardHeader
                  avatar={<Avatar src={baseURL + profileImage} />}
                  title={username}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "600px",
                    width: "100%",
                    objectFit: "cover",
                    backgroundColor: "#f0f0f0",
                    position: "relative",
                    cursor: "pointer",
                    "&:hover": {
                      opacity: 0.7,
                    },
                  }}
                  onClick={() => {
                    const inputFile = document.getElementById("fileInput");
                    if (inputFile) {
                      inputFile.click();
                    }
                  }}
                >
                  {imageURL && (
                    <img
                      src={imageURL}
                      alt="Uploaded"
                      style={{
                        width: "100%",
                        maxHeight: "600px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    id="fileInput" // Identificador único para o input
                    onChange={handleFileChange}
                  />
                  {!imageURL && (
                    <>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "600px",
                          width: "100%",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        <PhotoCamera
                          sx={{
                            fontSize: 60,
                            color: "rgba(0, 0, 0, 0.54)",
                          }}
                        />
                        <Typography variant="subtitle1">
                          Selecione uma imagem.
                        </Typography>
                      </Box>
                    </>
                  )}
                </Box>

                <CardContent>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Diga algo sobre a imagem..."
                    value={postDescription}
                    onChange={handleDescriptionChange}
                    multiline
                    rows={4}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    sx={{ mt: 2 }}
                  >
                    Enviar Post
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Post;
