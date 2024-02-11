import CommentIcon from '@mui/icons-material/Comment'
import ThumbDownIcon from '@mui/icons-material/ThumbDown'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Modal,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import Post from '../../@types/post'
import { api } from '../../utils/api/api'

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

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const handleLike = async (idPost: number) => {
    await api.post(`/api/v1/posts/${idPost}/like/`).then((response) => {
      console.log(response)
    })
  }

  const handlePost = async () => {
    await api.get(`/api/v1/posts/`).then((response) => {
      setPosts(response.data)
      console.log(response.data)
    })
  }

  useEffect(() => {
    if (!posts.length) {
      handlePost()
    }
  }, [posts])

  const handleDislike = async (idPost: number) => {
    await api.post(`/api/v1/posts/${idPost}/deslike/`).then((response) => {
      console.log(response)
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
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Comentários
                </Typography>
                {post.comments.map((comment) => {
                  return (
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      {comment.comment}
                    </Typography>
                  )
                })}
              </Box>
            </Modal>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default Feed
