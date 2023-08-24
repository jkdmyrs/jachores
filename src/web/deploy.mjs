import * as containerClientService from '../infrastructure/src/azure/blobStorage/containerClientService.js'
import * as fs from 'fs'
import * as path from 'path'

const distPath = './dist'
const containerClient = containerClientService.createContainerClient("$web")

let blobs = containerClient.listBlobsFlat()
for await (let blob of blobs) {
  if (!blob.name.startsWith('cdn/')) {
    await containerClient.deleteBlob(blob.name)
    console.log(`Deleted blob with name: ${blob.name}`)
  }
}

const files = fs.readdirSync(distPath)
for (const file of files) {
  const filePath = path.join(distPath, file)
  const blobName = file

  const blockBlobClient = containerClient.getBlockBlobClient(blobName)
  await blockBlobClient.uploadFile(filePath, {
    blobHTTPHeaders: {
      blobContentType: blobName.includes(".html")
        ? "text/html"
        : blobName.includes(".css") ? "text/css" : "text/javascript"
    }
  })

  console.log(`Uploaded blob with name: ${blobName}`)
}