import React, {useEffect, useState} from 'react'
import Markdown from 'markdown-to-jsx';
import {useParams} from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux"
import {getPosts} from "../../modules/posts.js"

const Post = () => {
  const {posts} = useSelector(state => state.posts)
  const {pid} = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPosts())
  }, [])

  return (
    <>
      <h1 class='title'>
        {(posts.length > 0) ? posts.filter((x) => {
          console.log(x);
          return x.pid === pid
        })[0].title : ''}
      </h1>
      <Markdown>
        {(posts.length > 0) ? posts.filter(x => x.pid === pid)[0].body : ''}
      </Markdown>
    </>
  )
}

export default Post;
