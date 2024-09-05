const ask = require('../../utils/ask.js')
const asyncExec = require('../../utils/asyncExec.js')
const checkInternet = require('../../utils/internetConnection.js')

const error = require('../../utils/error.js')
const success = require('../../utils/success.js')
const nuetral = require('../../utils/nuetral.js')

const config = require('../../config.json')
const accessToken = config[0].accessToken
const userName = config[0].userName

const deleteRepo = async () => {
  let internet = await checkInternet()
  if(internet){
    let remoteName = await ask('Name of repository')
    if(remoteName !== '' || remoteName !== null){
      let sure = await ask(`Do you really want to delete remote repp ${remoteName} (yes/no)`)
      if(sure.toLowerCase() === 'yes'){
        console.log('deleting remote repo....')
        let deletE = await asyncExec(`
          curl -X DELETE -H "Authorization: token ${accessToken}" \
          https://api.github.com/repos/${userName}/${remoteName}
        `)
        console.log(deletE)
      }
    }
  }else{
    error('Can\'t delete a repo without internet connection')
  }
}

module.exports = deleteRepo