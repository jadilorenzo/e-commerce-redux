const pool = require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express()
const hostValidation = require('host-validation')
const {v4} = require('uuid')
console.log('Server is running...')

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hostValidation({
  hosts: [
    '127.0.0.1:3333',
    '10.0.1.39:3333',
    'localhost:3333'
  ]
}))

app.get('/', (req, res) => {
  res.json("Hello World")
  console.log("Hello World");
})

const databases = ["posts"]

databases.map(name => {
  app.get(`/get/${name}`, (req, res) => {
    pool.query('SELECT * FROM posts;', (q_err, q_res) => {
      console.log(q_res.rows);
      res.json(q_res.rows)
    })
  })
  if (name === 'posts') {
    app.post(`/post/${name}`, (req, res) => {
      pool.query('INSERT INTO posts (pid, title, body) VALUES ($1, $2, $3);', [v4(), req.body.title, req.body.body], (q_err, q_res) => {
        console.log(req.body);
        res.json({type: 'Success', body: req.body})
      })
    })
  }
})

app.listen(3333)
