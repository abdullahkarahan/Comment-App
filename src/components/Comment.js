import React from 'react'
import CommentForm from './CommentForm'
import { useGlobalContext } from '../context'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ReplyIcon from '@mui/icons-material/Reply'
import EditIcon from '@mui/icons-material/Edit'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useState } from 'react'

const Comment = ({ comment, replies }) => {
  const {
    setActiveComment,
    deleteComment,
    currentUserId,
    activeComment,
    parentId,
    addComment,
    updateComment,
  } = useGlobalContext()

  const [likeCount, setLikeCount] = useState(0)

  const isEditing =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'editing'

  const isReplying =
    activeComment &&
    activeComment.id === comment.id &&
    activeComment.type === 'replying'

  const fiveMinutes = 300000

  // after 5 minutes user can't change the comment
  const timePassed = new Date() - new Date(comment.createdTime) > fiveMinutes

  const canDelete =
    currentUserId === comment.userId && replies.length === 0 && !timePassed

  // if currentUserId null is false if currentUserId has an id it will be true
  const canReply = Boolean(currentUserId)

  const canEdit = currentUserId === comment.userId && !timePassed

  const replyId = parentId ? parentId : comment.id

  const createdTime = new Date(comment.createdTime).toLocaleDateString()

  return (
    <div key={comment.id} className="comment">
      <div className="comment-list">
        <div className="comment-content">
          <div className="comment-author">{comment.username}</div>
          <span>{createdTime}</span>
        </div>

        {/* Editing */}
        {!isEditing && <div className="comment-text">{comment.body}</div>}
        {isEditing && (
          <CommentForm
            submitLabel="Update"
            hasCancelButton
            initialText={comment.body}
            handleSubmit={(text) => updateComment(text, comment.id)}
            handleCancel={() => {
              setActiveComment(null)
            }}
          />
        )}
        {/* Comment Actions */}
        <div className="comment-actions">
          <div className="favorite-action">
            {likeCount < 1 ? (
              <FavoriteBorderIcon
                className="favoriteBtn"
                onClick={() => setLikeCount(likeCount + 1)}
              />
            ) : (
              <FavoriteIcon
                className="favoriteBtn"
                onClick={() => setLikeCount(likeCount - 1)}
              />
            )}
            <span className="favoriteNum">{likeCount}</span>
          </div>
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: 'replying' })
              }
            >
              <ReplyIcon sx={{ color: '#457b9d' }} />
            </div>
          )}
          {canEdit && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment({ id: comment.id, type: 'editing' })
              }
            >
              <EditIcon />
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
              onClick={() => deleteComment(comment.id)}
            >
              <DeleteOutlineIcon sx={{ color: '#bf0603' }} />
            </div>
          )}
        </div>

        {/* Replying */}
        {isReplying && (
          <CommentForm
            hasCancelButton
            submitLabel="Reply"
            handleSubmit={(text) => addComment(text, replyId)}
            handleCancel={() => {
              setActiveComment(null)
            }}
          />
        )}

        {replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                updateComment={updateComment}
                deleteComment={deleteComment}
                addComment={addComment}
                parentId={comment.id}
                replies={[]}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Comment
