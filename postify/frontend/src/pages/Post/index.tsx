import { useState } from "react";
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
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import useUserStore from "../../utils/stores/userStore";
import { api } from "../../utils/api/api"; // Ajuste para sua importação de API

const baseURL = "http://localhost:8000";

const Post = () => {
  const { username, profileImage: profileImage, id: idUser } = useUserStore();
  const [selectedFile, setSelectedFile] = useState(null);
  const [postDescription, setPostDescription] = useState("");
  const [imageURL, setImageURL] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const fileURL = URL.createObjectURL(file);
      setImageURL(fileURL);
    }
  };

  const handleDescriptionChange = (event) => {
    setPostDescription(event.target.value);
  };

  const handleSubmit = async () => {
    if (!selectedFile || !postDescription) {
      alert("Por favor, selecione uma imagem e preencha a descrição.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("caption", postDescription);

    try {
      const response = await api.post(
        `api/v1/users/${idUser}/posts/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.info("Response: ", response);
      setPostDescription("");
      setSelectedFile(null);
      setImageURL("");
    } catch (error) {
      console.error("Erro ao enviar post:", error);
    }
  };

  return (
    <>
      <div id="post">
        <Container sx={{ flexGrow: 1, marginY: 4 }}>
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
                    <PhotoCamera
                      sx={{
                        fontSize: 60,
                        position: "absolute",
                        color: "rgba(0, 0, 0, 0.54)",
                      }}
                    />
                  )}
                </Box>

                <CardContent>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Descrição do Post"
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
