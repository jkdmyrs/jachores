const adt = require('../../../infrastructure/src/azure/tableStorage/tableClientService.js')
const Task = require('../../../domain/src/task.js')

async function getAsync() {
  var client = adt.createTableClient('tasks')
  let tasksIter = client.listEntities()
  const tasks = []
  for await (const task of tasksIter) {
    tasks.push(new Task(task.rowKey))
  }
  return tasks
}

async function addAsync(code) {
  var client = adt.createTableClient('tasks')
  const task = new Task(code)
  await client.createEntity(task.toTableEntity())
}

module.exports = {
  getAsync,
  addAsync
}