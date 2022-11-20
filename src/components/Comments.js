import React from 'react'
import CommentForm from './CommentForm'
import Comment from './Comment'
import { useGlobalContext } from '../context'

const Comments = () => {
  const { oldComments, getReplies, addComment } = useGlobalContext()

  return (
    <div className="comments">
      <h3 className="comments-title">Comments</h3>
      <CommentForm submitLabel="POST" handleSubmit={addComment} />
      {/* Comments Container */}
      <div className="comments-container">
        {oldComments.map((oldComment) => (
          <Comment
            key={oldComment.id}
            comment={oldComment}
            replies={getReplies(oldComment.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default Comments
