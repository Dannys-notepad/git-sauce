const fs = require('fs')
const path = require('path')
const { exec } = require("child_process")

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')
const config = require('../../config.json')
const dirPath = config[0].path
const gitDir = path.resolve(__dirname, dirPath)

const addToGit = (filePath) => {
  const relativePath = path.relative(dirPath, filePath)
  relativePath
  exec(`git add "${relativePath}"`, { cwd: dirPath }, (err, stdout, stderr) => {
    if (err) {
      error(`Error executing git add: ${err}`)
      return
    }
    if (stderr) {
      error(`stderr: ${stderr}`)
      return
    }
    success(`Added to git: ${relativePath}`)
  })
}

const watchDirectory = (watchPath) => {
  if (path.basename(watchPath) === '.git') {
    return
  }

  fs.watch(watchPath, (eventType, filename) => {
    if (filename) {
      const fullPath = path.join(watchPath, filename)
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          error(`Error getting stats for file ${fullPath}: ${err}`)
          return
        }
        if (stats.isDirectory()) {
          nuetral(`Directory detected: ${fullPath}`)
          watchDirectory(fullPath)
        } else if ((eventType === 'change' || eventType === 'rename') && !stats.isDirectory()) {
          nuetral(`Change detected in file: ${fullPath}`)
          fullPath
          addToGit(fullPath)
        }
      })
    } else {
      nuetral('Directory change detected')
    }
  })

  fs.readdir(watchPath, (err, files) => {
    if (err) {
      error(`Error reading directory ${watchPath}: ${err}`)
      return
    }
    files.forEach(file => {
      const fullPath = path.join(watchPath, file)
      fs.stat(fullPath, (err, stats) => {
        if (err) {
          error(`Error getting stats for file ${fullPath}: ${err}`)
          return
        }
        if (stats.isDirectory()) {
          watchDirectory(fullPath)
        }
      })
    })
  })
}

const watch = () => {
  const watchPath = config[0].path
  watchDirectory(watchPath)
}

module.exports = watch