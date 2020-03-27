import React from "react"
import {useSelector, useDispatch} from "react-redux"
import {addPost, getPosts, setPostTitle, setPostBody} from "../../modules/posts.js"
import DropZone from 'react-drop-zone'

function App(props) {
    const {posts, title, body} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    return (
        <div>
            <ul>{posts.map(x => <li>{x.title}</li>)}</ul>
            <button onClick={() => dispatch(getPosts())}>Get Posts</button>
            
            <div>
              <input onChange={(e) => dispatch(setPostTitle(e.target.value))}/>
              <DropZone onDrop={(file, text) => dispatch(setPostBody(text))}>
                {
                  ({ over, overDocument }) =>
                    <span>
                      {
                        over ?
                          'file is over element' :
                        (body !== '') ?
                          'file downloaded' :
                          'no markdown file'
                      }
                    </span>
                }
              </DropZone>
              <button
                onClick={async () => {
                  await dispatch(addPost(title, body))
                  await dispatch(getPosts())
                }}
              >Add Posts</button>
            </div>
        </div>
    )
}

export default App
