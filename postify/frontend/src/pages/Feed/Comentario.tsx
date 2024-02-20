import DeleteIcon from '@mui/icons-material/Delete'
import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { api } from '../../utils/api/api'
import formatDate from '../../utils/date/format'

const API = 'http://localhost:8000' // Substitua 'http://example.com' pelo URL correto da sua API

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
  created_at: Date
  updated_at: Date
}

interface ComentarioParam {
  idPost: number
}

const Comentario: React.FC<ComentarioParam> = ({ idPost }) => {
  const [carregamentoInicial, setCarregamentoInicial] = useState(true)
  const [comentarios, setComentarios] = useState<Comment[]>()

  const handleGetComentarios = async () => {
    await api
      .get(`api/v1/posts/${idPost}/comments`)
      .then((response) => {
        setComentarios(response.data)
      })
      .catch((error) => {
        console.error('Erro ao obter comentários:', error)
      })
  }

  useEffect(() => {
    if (carregamentoInicial) {
      handleGetComentarios()
      setCarregamentoInicial(false)
    } else {
      const intervalId = setInterval(handleGetComentarios, 10000)

      return () => clearInterval(intervalId)
    }
  }, [carregamentoInicial]) // Corrigido para adicionar carregamentoInicial como dependência do useEffect

  const handleDeleteComment = async (idComment: number) => {
    try {
      await api.delete(`api/v1/comments/${idComment}`)
      handleGetComentarios()
    } catch (error) {
      console.error('Erro ao excluir comentário:', error)
    }
  }

  return (
    <React.Fragment>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Comentários
      </Typography>
      <List
        sx={{ maxHeight: '200px', overflow: 'auto', border: `1px solid black` }}
      >
        {comentarios !== undefined &&
          comentarios.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ display: 'flex', width: '100%' }}>
                <ListItemAvatar sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    alt={comment.user.name}
                    src={API + comment.user.profile_image}
                  />
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {comment.user.username}
                  </Typography>
                  <Typography variant="body2">
                    {formatDate(comment.created_at)}
                  </Typography>
                </ListItemText>
              </Box>
              <ListItemText
                sx={{
                  height: '100%',
                  width: '100%',
                  borderBottom: '0.3px solid gray',
                }}
              >
                <Typography textAlign={'justify'}>{comment.comment}</Typography>
              </ListItemText>
              <IconButton
                onClick={() => handleDeleteComment(comment.id)}
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
      </List>
    </React.Fragment>
  )
}

export default Comentario
