const serverSite = 'http://localhost:3333'

export const ADD_POST = 'posts/ADD_POSTS'
export const GET_POSTS = 'posts/GET_POSTS'

const initialState = {
  posts: [],
  isAddingPost: false
}

export default (state = initialState, action) => {
  console.log(state);
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

export const addPost = () => {
  return async dispatch => {
    const response = await fetch(`http://localhost:3333/post/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: 'Post', body: 'Hello World!'})
    });
    const body = response.json()
    console.log(body);

    dispatch({
      type: ADD_POST
    })
  }
}
