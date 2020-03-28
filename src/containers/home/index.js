import React, {useState} from "react"
import {Link} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {addPost, getPosts, setPostTitle, setPostBody} from "../../modules/posts.js"
import DropZone from 'react-drop-zone'
import Switch from "react-switch";

function App(props) {
    const [checked, setChecked] = useState(false)
    const {posts, title, body} = useSelector(state => state.posts)
    const dispatch = useDispatch()

    return (
        <div>
            <ul>{posts.map(x => <li><Link to={`/posts/${x.pid}`}>{x.title} - {x.pid}</Link></li>)}</ul>
            <button onClick={() => dispatch(getPosts())}>Get Posts</button>

            <div>
              <input onChange={(e) => dispatch(setPostTitle(e.target.value))}/>
              <div>
                Markdown File
                <Switch onChange={() => setChecked(check => !check)} checked={checked} />
              </div>
              {checked ? <DropZone onDrop={(file, text) => dispatch(setPostBody(text))}>
                {
                  ({ over, overDocument }) =>
                    <div>
                      {
                        over ?
                          'file is over element' :
                        (body !== '') ?
                          'file downloaded' :
                          'no markdown file'
                      }
                    </div>
                }
              </DropZone> : <div><input onChange={(e) => dispatch(setPostBody(e.target.value))}/></div>}
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
