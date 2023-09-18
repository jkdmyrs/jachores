const { TableClient } = require("@azure/data-tables")
const env = require('../../../../env_server.js')


function createTableClient(tableName) {
  return TableClient.fromConnectionString(env.storageConnectionString, tableName)
}

module.exports = {
  createTableClient
}