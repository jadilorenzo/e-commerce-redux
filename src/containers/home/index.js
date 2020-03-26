import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {addPost, getPosts} from "../../modules/posts.js"

function App(props) {
    const {posts} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    return (
        <div>
            <ul>{posts.map(x => <li>{x.title}</li>)}</ul>
            <button onClick={() => dispatch(getPosts())}>Get Posts</button>
            <button onClick={async () => {
                await dispatch(addPost())
                await dispatch(getPosts())
            }}>Add Posts</button>
        </div>
    )
}

export default App
