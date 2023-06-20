import { Client, Authenticator } from 'pimi-launcher-core'

async function launch(version, setProgress, setDownload, setGameStarted, setStarted) {
  console.log(version)
  const launcher = new Client()

  let opts = {
    authorization: Authenticator.getAuth(
      localStorage.getItem('name') || 'Steve',
      localStorage.getItem('password') || ''
    ),
    root: './.pimi',
    version: {
      number: version.id,
      type: version.type
    },
    memory: {
      max: '6G',
      min: '4G'
    }
  }

  launcher.on('progress', (e) => setProgress(e))
  launcher.on('download', (e) => setDownload(e))
  launcher.on('debug', (e) => console.log(e))
  launcher.on('data', (e) => console.log(e))

  launcher.on('arguments', () => setGameStarted(true))
  launcher.on('close', () => {
    setGameStarted(false)
    setStarted(false)
  })
  await launcher.launch(opts)
}

export { launch }
