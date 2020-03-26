import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {addPost, getPosts} from "../../modules/posts.js"

function App(props) {
    const {posts} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    return (
        <div>
            <h1>{posts.map(x => x.title)}</h1>
            <button onClick={() => dispatch(getPosts())}>Get Posts</button>
            <button onClick={() => dispatch(addPost())}>Add Posts</button>
        </div>
    )
}

export default App
