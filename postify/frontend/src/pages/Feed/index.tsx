import React, { useState } from 'react';
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
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'John Doe',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?nature',
      likes: 10,
      dislikes: 3,
      comments: 5,
      caption: 'Beautiful nature view',
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?city',
      likes: 15,
      dislikes: 2,
      comments: 7,
      caption: 'Stunning city skyline',
    },
    {
      id: 3,
      author: 'chico',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?animal',
      likes: 12,
      dislikes: 4,
      comments: 6,
      caption: 'My animal',
    },
    {
      id: 4,
      author: 'bryan',
      avatar: 'https://source.unsplash.com/random',
      image: 'https://source.unsplash.com/random?car',
      likes: 44,
      dislikes: 7,
      comments: 7,
      caption: 'My car',
    },
  ]);

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (!post.liked) {
          return { ...post, likes: post.likes + 1, liked: true };
        } else {
          return { ...post, likes: post.likes - 1, liked: false };
        }
      }
      return post;
    }));
  };

  const handleDislike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        if (!post.disliked) {
          return { ...post, dislikes: post.dislikes + 1, disliked: true };
        } else {
          return { ...post, dislikes: post.dislikes - 1, disliked: false };
        }
      }
      return post;
    }));
  };

  return (
    <Container style={{ maxWidth: '800px', marginTop: '120px', padding: ' 30px' }}>
      <Grid container spacing={2}>
        {posts.map(post => (
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
                  <IconButton aria-label="like" onClick={() => handleLike(post.id)}>
                    <ThumbUpIcon color={post.liked ? 'primary' : 'inherit'} />
                  </IconButton>
                  <Typography variant="body2">{post.likes}</Typography>
                  <IconButton aria-label="dislike" onClick={() => handleDislike(post.id)}>
                    <ThumbDownIcon color={post.disliked ? 'error' : 'inherit'} />
                  </IconButton>
                  <Typography variant="body2">{post.dislikes}</Typography>
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
