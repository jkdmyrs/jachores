import { Parcel } from '@parcel/core'
import { generateHtml } from './src/htmlGenerator.mjs'
import fs from 'fs'
import path from 'path'

function deleteAllFilesInDirectory(directoryPath) {
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`)
      return
    }
    for (const file of files) {
      const filePath = path.join(directoryPath, file)
      fs.unlink(filePath, err => {
        if (err) {
          console.error(`Error deleting file ${filePath}: ${err}`)
        } else {
          console.log(`Deleted ${filePath}`)
        }
      })
    }
  })
}

async function buildAsync() {
  deleteAllFilesInDirectory('./.parcel-cache')
  deleteAllFilesInDirectory('./dist')
  generateHtml()

  let bundler = new Parcel({
    entries: './src/index.html',
    defaultConfig: '@parcel/config-default'
  })

  try {
    let { bundleGraph, buildTime } = await bundler.run()
    let bundles = bundleGraph.getBundles()
    console.log(`✨ Built ${bundles.length} bundles in ${buildTime}ms!`)
  } catch (err) {
    console.log(err.diagnostics)
  }
}
await buildAsync()

export default buildAsync