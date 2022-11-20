import React from 'react'
import { useGlobalContext } from '../context'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

const CommentForm = ({
  handleSubmit,
  submitLabel,
  hasCancelButton = false,
  handleCancel,
}) => {
  const { text, setText } = useGlobalContext()

  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(text)
    setText('')
  }

  const isTextareaDisabled = text.length === 0
  return (
    <form onSubmit={onSubmit}>
      <TextField
        sx={{ my: '10px' }}
        fullWidth
        value={text}
        onChange={(e) => setText(e.target.value)}
        id="outlined-multiline-static"
        label="Write Comment"
        multiline
        rows={4}
      />

      <Button
        variant="contained"
        className="comment-form-button"
        disabled={isTextareaDisabled}
        onClick={onSubmit}
      >
        {submitLabel}
      </Button>
      {hasCancelButton && (
        <Button sx={{ ml: '10px' }} variant="outlined" onClick={handleCancel}>
          CANCEL
        </Button>
      )}
    </form>
  )
}

export default CommentForm
