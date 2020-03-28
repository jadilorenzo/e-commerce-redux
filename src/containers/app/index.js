import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Post from '../post'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
    </header>

    <main>
      <Route exact path="/">
        <Home/>
      </Route>
      <Route exact path="/posts/:pid">
        <Post />
      </Route>
      <Route exact path="/about-us" component={About} />
    </main>
  </div>
)

export default App
