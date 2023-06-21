import { Client, Authenticator } from 'pimi-launcher-core'
async function launch(
  version,
  setProgress,
  setDownload,
  setGameStarted,
  setStarted,
  setTerminalLines
) {
  const launcher = new Client()
  let terminalLines = []

  let opts = {
    authorization: Authenticator.getAuth(
      localStorage.getItem('name') || 'Steve',
      localStorage.getItem('password') || ''
    ),
    root: window.home_dir,
    version: {
      number: version.id,
      type: version.type
    },
    memory: {
      max: '6G',
      min: '4G'
    }
  }

  launcher.launch(opts)

  launcher.on('progress', (e) => setProgress(e))
  launcher.on('download', (e) => setDownload(e))
  launcher.on('debug', (e) => {
    terminalLines = terminalLines.concat(e)
    setTerminalLines(terminalLines)
  })
  launcher.on('data', (e) => {
    terminalLines = terminalLines.concat(e)
    setTerminalLines(terminalLines)
  })

  launcher.on('arguments', () => setGameStarted(true))
  launcher.on('close', () => {
    setGameStarted(false)
    setStarted(false)
    setTerminalLines([])
  })
}

export { launch }
