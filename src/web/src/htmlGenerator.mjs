import { promises as fs } from 'fs'

const generatedHtmlWarning = `
<!-- THIS HTML IS GENERATED -->
<!-- DO NOT EDIT THIS HTML -->
`

async function writeFile(filePath, data) {
  try {
    await fs.writeFile(filePath, data, 'utf-8')
    console.log(`Successfully wrote to ${filePath}`)
  } catch (error) {
    console.error('Error writing file:', error)
  }
}

export function generateHtml() {
  generatePage('./src/', 'index', true)
  generatePage('./src/', 'jack', false)
  generatePage('./src/', 'alex', false)
}

export function generatePage(dir, name, showPerson) {
  const personHeader = `<th class="col-4" scope="col">Person</th>`
  const html = generatedHtmlWarning + `
<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Jack + Alex Chores!</title>
  <link rel="stylesheet" href="www/scss/styles.scss">
  <script type="module" src="www/js/${name}.js"></script>

  <link rel="apple-touch-icon" sizes="180x180"
    href="https://jachores.z13.web.core.windows.net/cdn/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32"
    href="https://jachores.z13.web.core.windows.net/cdn/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16"
    href="https://jachores.z13.web.core.windows.net/cdn/favicon-16x16.png">
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="./index.html">Chores!</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <a class="nav-link" href="./alex.html">Alex</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="./jack.html">Jack</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container">
    <table class="table table-striped table-hover">
      <thead class="table-success">
        <tr>
          <th class="col-6" scope="col">Today's Chores</th>
          ${showPerson ? personHeader : ""}
          <th class="col-${showPerson ? "2" : "4"}" scope="col"></th>
        </tr>
      </thead>
      <tbody id="dailyChores">
      </tbody>
    </table>
  </div>

  <div class="container">
    <table class="table table-striped table-hover">
      <thead class="table-success">
        <tr>
          <th class="col-6" scope="col">This Week's Chores</th>
          ${showPerson ? personHeader : ""}
          <th class="col-${showPerson ? "2" : "4"}" scope="col"></th>
        </tr>
      </thead>
      <tbody id="otherChores">
      </tbody>
    </table>
  </div>
</body>

</html>
  `
  writeFile(dir + name + ".html", html)
}