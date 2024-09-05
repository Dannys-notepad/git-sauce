const ask = require('../../utils/ask.js')
const asyncExec = require('../../utils/asyncExec.js')
const checkInternet = require('../../utils/internetConnection.js')

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')

const config = require('../../config.json')
const accessToken = config[0].accessToken

const lazyRepo = async () => {
  let internet = await checkInternet()
  if(internet){
    let remoteName = await ask('Name of repository')
    let remoteDes = await ask('Repo description')
    if((remoteName !== '' || remoteName !== null) && (remoteDes !== '' || remoteDes !== null)){
      console.log('creating remote repo....')
      let create = await asyncExec(`
        curl -X POST \
        https://api.github.com/user/repos \
        -H 'Authorization: Bearer ${accessToken}' \
        -H 'Content-Type: application/json' \
        -d '{"name":"${remoteName}","description":"${remoteDes}"}'
      `)
      console.log(create)
    }
  }else{
    error('Can\'t create a repo without internet connection')
  }
}

module.exports = lazyRepo