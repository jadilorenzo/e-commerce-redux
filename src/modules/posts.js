import {v4} from 'uuid'

const serverSite = 'http://localhost:3333'

export const ADD_POST = 'posts/ADD_POSTS'
export const GET_POSTS = 'posts/GET_POSTS'
export const SET_POST_TITLE = 'posts/SET_POST_TITLE'
export const SET_POST_BODY = 'posts/SET_POST_BODY'

const initialState = {
  posts: [],
  isAddingPost: false,
  title: '',
  body: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        isAddingPost: true
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        isAddingPost: false
      }
    case SET_POST_TITLE:
      return {
        ...state,
        title: action.payload
      }
    case SET_POST_BODY:
      return {
        ...state,
        body: action.payload
      }
    default:
      return state
  }
}

export const getPosts = () => {
    return async dispatch => {
      const posts = await fetch(`${serverSite}/get/posts`).then(posts => posts.json())
      dispatch({
        type: GET_POSTS,
        payload: posts
      })
    }
}

export const addPost = (title, postBody) => {
  return async dispatch => {
    const pid = v4()
    const response = await fetch(`http://localhost:3333/post/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({pid, title, body:postBody})
    });
    const body = response.json()

    dispatch({
      type: ADD_POST,
      payload: pid
    })
  }
}

export const setPostTitle = (title) => {
  return async dispatch => {
    dispatch({
      type: SET_POST_TITLE,
      payload: title,
    })
  }
}

export const setPostBody = (body) => {
  return async dispatch => {
    dispatch({
      type: SET_POST_BODY,
      payload: body,
    })
  }
}
