const asyncExec = require('./asyncExec.js')
const error = require('./error.js')

const internetConnection = async () => {
  try{
    let internet = await asyncExec('curl -s --head http://www.google.com | head -n 1')
    //let response = internet.replace(/\s+(?!$)/g, '')
    let response = internet.split(' ')
    if(response.includes('302') || internet === ''){
      return false
    }else if(response.includes('200')){
      return true
    }
  }catch(e){
    error(e)
  }
}

module.exports = internetConnection