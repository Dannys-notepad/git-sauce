/*
  Git-sauce v2.0.0
  from Dannysnotepad
 */
 
 const { exec } = require('child_process')
 
 //Commands
const gitInit = require('../lib/commands/gitInit.js')
const pullRefs = require('../lib/commands/pullChanges.js')
const watch = require('../lib/commands/watcher.js')
const commitChanges = require('../lib/commands/commitChanges.js')
const lazyRepo = require('../lib/commands/lazyRepo.js')
const deleteRepo = require('../lib/commands/deleteRepo.js')

//utils
const ask = require('../utils/ask.js')
const asyncExec = require('../utils/asyncExec.js')
const changeDir = require('../utils/changeDir.js')
const checkGit = require('../utils/checkGit.js')
const checkCurl = require('../utils/checkCurl.js')
const error = require('../utils/error.js')
const success = require('../utils/success.js')
const nuetral = require('../utils/nuetral.js')

//config
const config = require('../config.json')
const filePath = config[0].path

const centerText = (text) => {
  const terminalWidth = process.stdout.columns
  const textWidth = text.length
  const padding = Math.floor((terminalWidth - textWidth) / 2);
  return ' '.repeat(padding) + text
}

const repeatText = (text) => {
  const terminalWidth = process.stdout.columns
  const textWidth = text.length
  const repeatCount = Math.floor(terminalWidth / textWidth)
  return text.repeat(repeatCount)
}


const startGitSauce = async () => {
  console.clear()
  let gitInstalled = await checkGit()
  let curlInstalled = await checkCurl()
  if(gitInstalled && curlInstalled){
    let dir = await changeDir(config[0].path)
    if(dir){
      let exe = await asyncExec('pwd')
      exe = exe.split('/')
      let name = centerText('Git-sauce v2.0.0')
      console.log(repeatText('='))
      console.log(`\x1b[1m${name}\x1b[0m`)
      console.log(repeatText('='))
        console.log(`Current Directory ./${exe[exe.length-1]}`)
      let git = await gitInit()
      console.log('Commands:\n')
      console.log('[*] watch       Watches for file changes and sends them to the staging area\n')
      console.log('[*] status      Displays git\'s status in current directory\n')
      console.log('[*] pull        Pull refs and merges them into the local repo\n')
      console.log('[*] commit      Commits changes to your remote repository\n')
      console.log('[*] lazyrepo    Creates a remote repository with entered data\n')
      console.log('[*] delete      Deletes a remote repository\n')
      console.log('[*] exit        Exits the program\n')
      
      while(true){
        let command = await ask('Enter a command')
        switch (command) {
          case 'watch':
            console.log('watching....\n')
            let watcher = await watch()
            break
          case 'status':
            console.log('checking stats....')
            let stat = await asyncExec('git status')
            console.log(stat)
            break
          case 'pull':
            console.log('pulling....')
            let pull = await pullRefs()
            break
          case 'commit':
            console.log('commiting changes....')
            let commit = await commitChanges()
            break
          case 'lazyrepo':
            let lazy = await lazyRepo()
            break
          case 'delete':
            let deletE = await deleteRepo()
            break
          case 'exit':
            console.log('exiting program....')
            process.exit(0)
            break
          default:
            console.log('The entered command does not exist try again')
        }
      }
    }else{
      error('Dir does not exist')
      process.exit(0)
    }
  }else{
    error('You must have git and curl installed to run this program')
    process.exit(0)
  }
}

startGitSauce()