import React, { useEffect, useState } from 'react'
import axios from 'axios';
const CommentList = ({postId}) => {
  const [comments,setComments] = useState([]);

  const fetchComments = async () => {
    const response = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(response.data); 
  }

  useEffect(() => {
    fetchComments();
  },[])

  return (
    <div>
      <p>{comments?.length} comments</p>
      <ul className='mt-3' style={{ listStyleType:'none' }}>
        {
          comments?.map(comment => (
            <li key={comment.id}>{comment.body}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default CommentList