import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Post from '../../@types/post';
import { api } from '../../utils/api/api';
import PostComponent from './Post';


const Feed: React.FC = () => {
  const [configInicial, setConfigInicial] = useState(true);
  const [posts, setPosts] = useState<Post[]>()

  const handleFeeds = async () => {
    await api.get(`/api/v1/posts`)
      .then((response) => {
        setPosts(response.data)
        console.log(response.data)
      })
  }

  useEffect(() => {
    if (configInicial) {
      handleFeeds();
      setConfigInicial(false);
    }
  })

  return (
    <Container maxWidth={'sm'} sx={{ marginTop: '120px' }}>
      {posts !== undefined && posts.map((post) => (
        <PostComponent key={post.id} id={post.id} />
      ))}
    </Container>
  );
}

export default Feed;