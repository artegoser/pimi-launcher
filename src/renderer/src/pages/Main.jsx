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
import { launch } from '../components/utils'
function Main() {
  const [versions, setVersions] = useState(false)
  const [version, setVersion] = useState(false)
  const [download, setDownload] = useState(false)
  const [progress, setProgress] = useState(false)
  const [started, setStarted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)

  utils.getVersions().then((data) => {
    setVersions(data)
    setVersion(data[0])
  })

  return (
    versions && (
      <div className="grid grid-cols-3 gap-4 m-5">
        <div>
          <input
            type="text"
            id="name"
            className="inputs"
            placeholder="Your name"
            defaultValue={localStorage.getItem('name') || 'Steve'}
            onChange={(e) => {
              localStorage.setItem('name', e.target.value)
            }}
          />
        </div>
        <div>
          <select
            name="pets"
            id="pet-select"
            className="inputs"
            onChange={(e) => {
              setVersion(versions[e.target.value])
            }}
          >
            {versions.map((version, index) => {
              return (
                <option key={index} value={index} className="text-1xl font-bold underline">
                  {version.id}
                </option>
              )
            })}
          </select>
        </div>
        <div>
          <input
            type="button"
            value="Start"
            className="inputs"
            onClick={() => {
              launch(version, setProgress, setDownload, setGameStarted, setStarted)
              setStarted(true)
            }}
          />
        </div>

        {started && gameStarted && (
          <>
            <div>Minecraft launches...</div>
          </>
        )}
        {started && !gameStarted && (
          <>
            <div>Downloading{'.'.repeat(progress.task % 3)}</div>
            <div>
              {download || 'please wait'} {`(${progress.type})` || ''}
            </div>
            <div>{((progress.task / progress.total) * 100 || 0).toFixed(2)}%</div>
          </>
        )}
      </div>
    )
  )
}

export default Main
