import React from 'react'

const CommentList = ({comments}) => {
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