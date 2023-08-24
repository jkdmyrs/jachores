const { ContainerClient } = require("@azure/storage-blob")
const env = require('../../../../env.js')

function createContainerClient(containerName) {
  return new ContainerClient(env.storageConnectionString, containerName)
}

module.exports = {
  createContainerClient
}