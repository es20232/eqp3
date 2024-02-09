import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const Feed = () => {
  // Array de posts (substitua com seus próprios dados)
  const posts = [
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?nature',
      likes: 10,
      comments: 5,
      caption: 'Beautiful nature view',
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?city',
      likes: 15,
      comments: 7,
      caption: 'Stunning city skyline',
    },
    // Adicione mais posts conforme necessário
  ];

  return (
    <Container style={{ maxWidth: '800px', marginTop: '20px', padding: '0 20px' }}>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} key={post.id} style={{ display: 'flex', justifyContent: 'center' }}>
            <Card style={{ width: '100%' }}>
              <CardHeader
                avatar={<Avatar src={post.avatar} />}
                title={post.author}
              />
              <img
                src={post.image}
                alt={post.caption}
                style={{ width: '100%', maxHeight: '600px', objectFit: 'cover' }}
              />
              <CardContent>
                <Box display="flex" alignItems="center" mb={1}>
                  <IconButton aria-label="like">
                    <FavoriteIcon />
                  </IconButton>
                  <Typography variant="body2">{post.likes}</Typography>
                  <IconButton aria-label="comment" sx={{ ml: 'auto' }}>
                    <CommentIcon />
                  </IconButton>
                  <Typography variant="body2">{post.comments}</Typography>
                </Box>
                <Typography variant="body1">{post.caption}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Feed;
