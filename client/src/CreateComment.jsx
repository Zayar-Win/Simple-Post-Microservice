import React, { useState } from 'react'
import axios from 'axios';
const CreateComment = ({postId}) => {
  const [comment,setComment] = useState('');
  const handleSubmit = async(e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${postId}/comments`,{body:comment});
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className='form-group'>
        <label className='form-label' htmlFor="">Comment</label>
        <input value={comment} onChange={e => setComment(e.target.value)} type="text" className='form-control' />
        <button type="submit" className='btn btn-primary mt-2'>Comment</button>
      </form>
    </div>
  )
}

export default CreateComment