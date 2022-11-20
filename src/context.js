import React, { useState, useContext, useEffect } from 'react'
import { getComments } from './data'

const AppContext = React.createContext()

export const AppProvider = ({ children }) => {
  const currentUserId = '1'

  const initialText = ''

  const parentId = null

  const [commentList, setCommentList] = useState([]) // data.js teki commentleri tutan state ve yeni olusturulacak commentlerin eklenecekleri liste

  const [activeComment, setActiveComment] = useState(null) // editleme yada yanitlama esnasindaki aktif durumu tutan state

  const [text, setText] = useState(initialText)

  const oldComments = commentList.filter((comment) => comment.parentId === null)

  useEffect(() => {
    getComments().then((data) => {
      setCommentList(data)
    })
  }, [])

  const getReplies = (commentId) =>
    commentList
      .filter((backendComment) => backendComment.parentId === commentId)
      .sort(
        (a, b) =>
          new Date(a.createdTime).getTime() - new Date(b.createdTime).getTime()
      )
  const createCommentApi = async (text, parentId = null) => {
    return {
      id: Math.random().toString(36).substr(2, 9),
      body: text,
      parentId,
      userId: '1',
      username: 'Me',
      createdTime: new Date().toISOString(),
    }
  }

  const updateCommentApi = async (text) => {
    return { text }
  }

  const deleteCommentApi = async () => {
    return {}
  }

  const addComment = (text, parentId) => {
    createCommentApi(text, parentId).then((comment) => {
      setCommentList([comment, ...commentList])
      setActiveComment(null)
    })
  }

  const updateComment = (text, commentId) => {
    updateCommentApi(text).then(() => {
      const updatedBackendComments = commentList.map((backendComment) => {
        if (backendComment.id === commentId) {
          return { ...backendComment, body: text }
        }
        return backendComment
      })
      setCommentList(updatedBackendComments)
      setActiveComment(null)
    })
  }

  const deleteComment = (commentId) => {
    if (window.confirm('Are you sure you want to remove your comment?')) {
      deleteCommentApi().then(() => {
        const updatedBackendComments = commentList.filter(
          (backendComment) => backendComment.id !== commentId
        )
        setCommentList(updatedBackendComments)
      })
    }
  }

  return (
    <AppContext.Provider
      value={{
        currentUserId,
        oldComments,
        getReplies,
        createCommentApi,
        updateCommentApi,
        deleteCommentApi,
        setCommentList,
        setActiveComment,
        commentList,
        text,
        setText,
        addComment,
        updateComment,
        deleteComment,
        parentId,
        activeComment,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}
