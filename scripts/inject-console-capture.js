const fs = require('fs')
const path = require('path')

function findHtmlFiles(dir, fileList) {
  fileList = fileList || []
  const files = fs.readdirSync(dir)
  files.forEach(function (file) {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      findHtmlFiles(filePath, fileList)
    } else if (file.endsWith('.html')) {
      fileList.push(filePath)
    }
  })
  return fileList
}

function injectScript(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  const scriptTag = '<script src="/dashboard-console-capture.js"></script>'

  if (content.indexOf('dashboard-console-capture.js') !== -1) {
    return
  }

  if (content.indexOf('</head>') !== -1) {
    content = content.replace('</head>', scriptTag + '</head>')
    fs.writeFileSync(filePath, content, 'utf8')
    console.log('Injected console capture script into ' + filePath)
  }
}

function main() {
  const targetDirs = ['.next/server/pages', '.next/server/app', 'out']

  targetDirs.forEach(function (dir) {
    const fullPath = path.join(process.cwd(), dir)
    if (fs.existsSync(fullPath)) {
      const htmlFiles = findHtmlFiles(fullPath)
      htmlFiles.forEach(injectScript)
    }
  })
}

main()