// Create web server
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const { Comment } = require('./models')

app.use(bodyParser.json())

// Create a comment
app.post('/comments', (req, res) => {
  const comment = new Comment(req.body)
  comment.save()
    .then(comment => {
      res.status(201).send(comment)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Get all comments
app.get('/comments', (req, res) => {
  Comment.find()
    .then(comments => {
      res.status(200).send(comments)
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Get a comment by id
app.get('/comments/:id', (req, res) => {
  Comment.findById(req.params.id)
    .then(comment => {
      if (!comment) {
        res.status(404).send({
          message: 'Comment not found'
        })
      } else {
        res.status(200).send(comment)
      }
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Update a comment by id
app.put('/comments/:id', (req, res) => {
  Comment.findByIdAndUpdate(req.params.id, req.body)
    .then(comment => {
      if (!comment) {
        res.status(404).send({
          message: 'Comment not found'
        })
      } else {
        res.status(200).send({
          message: 'Comment updated'
        })
      }
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

// Delete a comment by id
app.delete('/comments/:id', (req, res) => {
  Comment.findByIdAndRemove(req.params.id)
    .then(comment => {
      if (!comment) {
        res.status(404).send({
          message: 'Comment not found'
        })
      } else {
        res.status(200).send({
          message: 'Comment deleted'
        })
      }
    })
    .catch(err => {
      res.status(400).send(err)
    })
})

app.listen(port, () => {
  console.log(`Server started on port ${port}`)
})