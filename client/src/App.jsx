import React from 'react'
import CreatePost from './CreatePost'
import PostList from './PostList'

const App = () => {
  return (
    <div>
      <h1>Blog App</h1>
      <CreatePost />
      <PostList />
    </div>
  )
}

export default App