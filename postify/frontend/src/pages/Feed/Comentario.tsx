import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { api } from "../../utils/api/api";

const API = 'http://localhost:8000'

interface User {
  id: number
  username: string
  name: string
  email: string
  profile_image: string | null
}

interface Comment {
  id: number
  user: User
  comment: string
  created_at: string
  updated_at: string
}

const Comentario: React.FC = () => {
  const [comentarios, setComentarios] = useState<[Comment]>();

  const handleGetComentarios = async () => {
    await api.get(`api/v1/posts/1/comments`)
      .then((response) => {
        setComentarios(response.data)
      })
  }

  useEffect(() => {
    handleGetComentarios();
  })

  return (
    <React.Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Comentários
      </Typography>
      <List
        sx={{ maxHeight: '200px', overflow: 'auto', border: `1px solid black` }}
      >
        {comentarios !== undefined && comentarios.map((comment) => (
          <ListItem key={comment.id} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', width: '100%' }}>
              <ListItemAvatar>
                <Avatar alt={comment.user.name} src={API + comment.user.profile_image} />
              </ListItemAvatar>
              <ListItemText>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 'bold' }}
                >
                  {comment.user.username}
                </Typography>{' '}
              </ListItemText>
            </Box>
            <ListItemText sx={{ height: '100%', width: '100%', borderBottom: '0.3px solid gray' }}>
              <Typography textAlign={'justify'}>{comment.comment}</Typography>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
}

export default Comentario;