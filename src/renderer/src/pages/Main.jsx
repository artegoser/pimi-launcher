// Copyright (c) 2023 artegoser (Artemy Egorov)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <https://www.gnu.org/licenses/>.

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
