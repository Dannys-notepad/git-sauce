const fs = require('fs')
const error = require('./error.js')
const nuetral = require('./nuetral.js')

const changeDir = async (filePath) => {
  try {
    const pathExits = await fs.existsSync(filePath)
    if(pathExits){
      process.chdir(filePath)
      return true
    }else{
      nuetral('seems path doesn\'t exist')
    }
  } catch (e) {
    error(e)
  }
}

module.exports = changeDir