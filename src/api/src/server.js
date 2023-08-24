const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const env = require('../../env.js')

const taskService = require('./tasks/taskService.js')

const app = express()
const port = 80

app.use(cors({
  origin: env.corsUrl
}))

app.use(bodyParser.text())

app.get('/', (_, res) => {
  res.send('OK')
})

app.get('/chores/tasks', (_, res) => {
  taskService
    .getAsync()
    .then(tasks => res.send(tasks.map(x => x.code)))
})

app.post('/chores/tasks', (req, res) => {

  const code = req.body
  taskService
    .addAsync(code)
    .then(_ => res.send())
    .catch(_ => {
      res.status(400)
      res.send()
    })
})

app.listen(port)