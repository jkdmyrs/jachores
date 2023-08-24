import buildAsync from './build.mjs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function askQuestion(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve)
  })
}

async function iterativeBuild(firstBuild) {
  if (!firstBuild) await buildAsync()
  await askQuestion('Press enter to build...')
  await iterativeBuild(false)
}
await iterativeBuild(true)
