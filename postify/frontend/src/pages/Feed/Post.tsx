import { zodResolver } from '@hookform/resolvers/zod';
import CommentIcon from '@mui/icons-material/Comment';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { Avatar, Box, Button, Grid, IconButton, Modal, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import MyPaper from '../../components/MyPaper';
import { api } from '../../utils/api/api';
import { sendCommentFormData, sendCommentSchema } from '../../utils/schemas/sendComment';
import Comentarios from './Comentario';

const API = 'http://localhost:8000'

interface PostParams {
  id: number
}

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

const Post: React.FC<PostParams> = ({ id }) => {
  const [execucaoInicial, setExecucaoInicial] = useState(false);
  const [user, setUser] = useState<{ nome: string, image: string }>({
    nome: '', image: ''
  })
  const [post, setPost] = useState<{ image: string, caption: string }>({
    image: '', caption: ''
  })
  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)
  const [comentario, setComentario] = useState(0)

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

  useEffect(() => {
    if (execucaoInicial === false) {
      setExecucaoInicial(true)
      handleUpdate();
    }
  })

  const handleUpdate = async () => {
    await api.get(`/api/v1/posts/${id}`)
      .then((response) => {
        console.log(response.data);
        setLike(response.data?.likes.length);
        setDislike(response.data?.deslikes.length)
        setComentario(response.data?.comments.length)
        setUser({
          nome: response.data?.user.username,
          image: response.data?.user.profile_image
        })
        setPost({
          image: response.data?.image,
          caption: response.data?.caption
        })
      })
  }

  const handleLike = async () => {
    await api.post(`/api/v1/posts/${id}/like/`).then(
      () => handleUpdate()
    );
  }

  const handleDislike = async () => {
    await api.post(`/api/v1/posts/${id}/deslike/`).then(
      () => handleUpdate()
    );
  }

  const onSubmit: SubmitHandler<sendCommentFormData> = async (data) => {
    if (id !== -1)
      await api.
        post(`api/v1/posts/${id}/comments/create`, data)
        .then(() => {
          setComment("comment", "");
          handleUpdate();
        });
  }

  return (
    <MyPaper marginTopo='0px' elevation={4}>
      <Grid container spacing={2}>
        <Grid container item xs={12} sx={{ display: 'flex' }}>
          <Grid item xs={2}>
            <Avatar
              src={API + user.image}
            />
          </Grid>
          <Grid item xs={10}>
            <Typography variant="h6">{user.nome}</Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <img
            src={API + post.image}
            alt={post.caption}
            style={{
              width: '100%',
              maxHeight: '600px',
              objectFit: 'cover',
            }}
          />
        </Grid>
        <Grid container item xs={12}>
          <Grid item xs={2}>
            <Box display={'flex'} alignItems={'center'}>
              <IconButton
                aria-label="like"
                onClick={() => handleLike()}
              >
                <ThumbUpIcon color={'primary'} />
              </IconButton>
              <Typography variant="body2">{like}</Typography>
            </Box>
          </Grid>
          <Grid item xs={2}>
            <Box display={'flex'} alignItems={'center'}>
              <IconButton
                aria-label="dislike"
                onClick={() => handleDislike()}
              >
                <ThumbDownIcon color={'error'} />
              </IconButton>
              <Typography variant="body2">{dislike} </Typography>
            </Box>
          </Grid>
          <Grid item xs={8} display={'flex'} justifyContent={'right'}>
            <Box display={'flex'} alignItems={'center'}>
              <IconButton
                aria-label="comment"
                sx={{ ml: 'auto' }}
                onClick={() => {
                  handleOpen()
                }}
              >
                <CommentIcon />
              </IconButton>
              <Typography variant="body2">
                {comentario}
              </Typography>
            </Box>
          </Grid>
        </Grid>
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
              >
                Comentar
              </Button>
            </form>
            <Comentarios idPost={id} />
          </Box>
        </Modal>
      </Grid>
    </MyPaper>
  );
}

export default Post;