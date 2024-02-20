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
import { Post } from '../../@types/post'
import { api } from '../../utils/api/api'
import formatDate from '../../utils/date/format'
import useUserStore from '../../utils/stores/userStore'

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
  created_at: Date
  updated_at: Date
}

interface ComentarioParam {
  idPost: number
  post: Post
}

const Comentario: React.FC<ComentarioParam> = ({ idPost, post }) => {
  const { id } = useUserStore()
  console.log(post)
  const [carregamentoInicial, setCarregamentoInicial] = useState(true)
  const [comentarios, setComentarios] = useState<Comment[]>()

  const handleGetComentarios = async () => {
    try {
      const response = await api.get(`api/v1/posts/${idPost}/comments`)
      setComentarios(response.data)
    } catch (error) {
      console.error('Erro ao obter comentários:', error)
    }
  }

  useEffect(() => {
    if (carregamentoInicial) {
      handleGetComentarios()
      setCarregamentoInicial(false)
    } else {
      const intervalId = setInterval(handleGetComentarios, 10000)

      return () => clearInterval(intervalId)
    }
  }, [carregamentoInicial])

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
        sx={{
          maxHeight: '200px',
          marginRight: 3,
          overflow: 'auto',
          border: `1px solid black`,
        }}
      >
        {comentarios !== undefined &&
          comentarios.map((comment) => (
            <ListItem key={comment.id}>
              <Box sx={{ marginRight: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    alt={comment.user.name}
                    src={API + comment.user.profile_image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={comment.user.username}
                  secondary={formatDate(comment.created_at)}
                />
              </Box>
              <ListItemText secondary={comment.comment} />
              {id === post.user.id ? (
                <IconButton
                  sx={{
                    position: 'absolute',
                    top: '8px',
                    right: '8px',
                    marginLeft: 2,
                  }}
                  onClick={() => handleDeleteComment(comment.id)}
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              ) : null}
            </ListItem>
          ))}
      </List>
    </React.Fragment>
  )
}

export default Comentario
