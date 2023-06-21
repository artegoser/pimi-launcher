import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui'
import PropTypes from 'prop-types'

function MinecraftTerminal({ lines, height = '300px' }) {
  const terminalLineData = lines.map((line, index) => (
    <TerminalOutput key={index}>{line}</TerminalOutput>
  ))

  return (
    <Terminal name="Minecraft Console" height={height} colorMode={ColorMode.Light}>
      {terminalLineData}
    </Terminal>
  )
}

MinecraftTerminal.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string),
  height: PropTypes.string
}

export default MinecraftTerminal
