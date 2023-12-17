import React, { useEffect, useState } from 'react'
import axios from 'axios';
import CreateComment from './CreateComment';
import CommentList from './CommentList';
const PostList = () => {
  const [posts,setPosts] = useState([]);
  const fetchPosts = async() => {
    const response = await axios.get('http://localhost:4000/posts');
    setPosts(response.data)
  }
  useEffect(() => {
    fetchPosts();
  },[])
  return (
    <div className='mt-4 d-flex flex-row flex-wrap gap-3'>
      {
        Object.values(posts).map(post => (
          <div className='card' style={{ width:'30rem' }} key={post.id}>
            <div className='card-body'>
              <h3 className='card-title'>{post.title}</h3>
              <CommentList postId={post.id} />
            <CreateComment postId={post.id} />
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default PostList