import React, { useState } from 'react'
import axios from 'axios';
const CreatePost = () => {
  const [title,setTitle] = useState('');
  const handleSubmit = async(e)  => {
    e.preventDefault();
    await axios.post('http://localhost:4000/posts',{title})
  }
  return (
    <div  className='w-75'>
      <h1 className='text-center'>Post Create Form</h1>
      <form onSubmit={handleSubmit} className='form-group'>
        <label className='mb-2 form-label' htmlFor="">Title</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} className='form-control mb-3' />
        <button type='submit' className='btn btn-primary'>Submit</button>
      </form>
    </div>
  )
}

export default CreatePost