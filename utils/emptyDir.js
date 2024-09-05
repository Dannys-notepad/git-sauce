const fs = require('fs')

const emptyDir = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, (err, files) => {
      if(err){
        reject(err)
      }else{
        if(files.length-1 !== 0){
          resolve(true)
        }else{
          reject(false)
        }
      }
    })
  }).catch((err) => {
    return err
  })
}

module.exports = emptyDir