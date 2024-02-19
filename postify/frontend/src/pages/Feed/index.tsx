import { zodResolver } from '@hookform/resolvers/zod'
import CommentIcon from '@mui/icons-material/Comment'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  TextField,
  Typography
} from '@mui/material'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import Post from '../../@types/post'
import { api } from '../../utils/api/api'
import { sendCommentFormData, sendCommentSchema } from '../../utils/schemas/sendComment'

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const API = 'http://localhost:8000'

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [idPost, setIdPost] = useState(-1)
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const {
    register: registerComment,
    handleSubmit: handleSubmitComment,
    formState: { errors: errorsComment },
    setValue: setComment
  } = useForm<sendCommentFormData>({
    resolver: zodResolver(sendCommentSchema),
  })

  const handleLike = async (idPost: number) => {
    await api.post(`/api/v1/posts/${idPost}/like/`).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const handlePost = async () => {
    await api.get(`/api/v1/posts/`).then((response) => {
      setPosts(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get(`/api/v1/posts/`)
        setPosts(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Erro ao buscar posts:', error)
      }
    }

    if (posts.length === 0) {
      // Verifica se já existem posts carregados
      setTimeout(() => {
        fetchPosts() // Se não houver posts, busca os posts
      }, 1000)
    }

    // Não há necessidade de atualizar os posts depois que eles são carregados
  }, [posts]) // Dependência vazia significa que esse efeito só é executado uma vez, quando o componente é montado

  const handleDislike = async (idPost: number) => {
    await api.post(`/api/v1/posts/${idPost}/deslike/`).then((response) => {
      console.log(response)
      window.location.reload()
    })
  }

  const onSubmit: SubmitHandler<sendCommentFormData> = async (data) => {
    if (idPost !== -1)
      await api.
        post(`api/v1/posts/${idPost}/comments/create`, data)
        .then(() => {
          setComment("comment", "");
          testSubmit()
        });
  }

  const testSubmit = async () => {
    await api.get(API + "/api/v1/posts/1/").then((response) => {
      console.log(response.data)
    })
  }

  return (
    <Container
      style={{ maxWidth: '800px', marginTop: '120px', padding: '30px' }}
    >
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid
            item
            xs={12}
            key={post.id}
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <Card style={{ width: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar
                    src={
                      post.user.profile_image
                        ? `http://127.0.0.1:8000/${post.user.profile_image}`
                        : ''
                    }
                  />
                }
                title={post.user.username}
              />
              <img
                src={`http://127.0.0.1:8000/${post.image}`}
                alt={post.caption}
                style={{
                  width: '100%',
                  maxHeight: '600px',
                  objectFit: 'cover',
                }}
              />

              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <IconButton
                    aria-label="like"
                    onClick={() => handleLike(post.id)}
                  >
                    <ThumbUpIcon color={'primary'} />
                  </IconButton>
                  <Typography variant="body2">{post.likes.length}</Typography>
                  <IconButton
                    aria-label="dislike"
                    onClick={() => handleDislike(post.id)}
                  >
                    <ThumbDownIcon color={'error'} />
                  </IconButton>
                  <Typography variant="body2">
                    {post.deslikes.length}
                  </Typography>
                  <IconButton
                    aria-label="comment"
                    sx={{ ml: 'auto' }}
                    onClick={() => handleOpen()}
                  >
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="body2">
                    {post.comments.length}
                  </Typography>
                </Box>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
            </Card>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <form
                  style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
                  onSubmit={handleSubmitComment(onSubmit)}
                >
                  <TextField
                    rows={3}
                    fullWidth
                    {...registerComment('comment')}
                    error={!!errorsComment.comment}
                    helperText={errorsComment.comment?.message}
                  />
                  <Button
                    type='submit'
                    variant='contained'
                    style={{ marginTop: '10px' }}
                    onClick={() => setIdPost(post.id)}
                  >
                    Comentar
                  </Button>
                </form>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Comentários
                </Typography>
                <List
                  sx={{ maxHeight: '200px', overflow: 'auto', border: `1px solid black` }}
                >
                  {post.comments.map((comment) => (
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
              </Box>
            </Modal>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Feed
