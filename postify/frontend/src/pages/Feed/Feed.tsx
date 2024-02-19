import React, { useEffect, useState } from 'react';
import Post from '../../@types/post';
import MyContainer from '../../components/MyContainer';
import { api } from '../../utils/api/api';
import PostComponent from './Post';

const Feed: React.FC = () => {
  const [configInicial, setConfigInicial] = useState(true);
  const [posts, setPosts] = useState<Post[]>()

  const handleFeeds = async () => {
    await api.get(`/api/v1/posts`)
      .then((response) => {
        setPosts(response.data)
      })
  }

  useEffect(() => {
    if (configInicial) {
      handleFeeds();
      setConfigInicial(false);
    }
  })

  return (
    <MyContainer marginTopo={'120px'}>
      {posts !== undefined && posts.map((post) => (
        <PostComponent key={post.id} id={post.id} />
      ))}
    </MyContainer>
  );
}

export default Feed;