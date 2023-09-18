const { ContainerClient } = require("@azure/storage-blob")
const env = require('../../../../env_server.js')

function createContainerClient(containerName) {
  return new ContainerClient(env.storageConnectionString, containerName)
}

module.exports = {
  createContainerClient
}