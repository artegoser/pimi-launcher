import { useState } from 'react'
import { utils } from 'pimi-launcher-core'
function Main() {
  const [versions, setVersions] = useState(false)

  utils.getVersions().then((data) => {
    setVersions(data)
  })

  if (versions)
    return versions.map((version) => {
      return (
        <div key={version.id} className="text-3xl font-bold">
          {version.id}
        </div>
      )
    })
  else return <></>
}

export default Main
