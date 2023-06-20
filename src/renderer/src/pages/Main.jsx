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

import { useState, useEffect } from 'react'
import { utils } from 'pimi-launcher-core'
import { launch } from '../components/utils'
import Select from 'react-select'
import path from 'path'
import fs from 'fs'
function Main() {
  const [versions, setVersions] = useState(false)
  const [version, setVersion] = useState(false)
  const [download, setDownload] = useState(false)
  const [progress, setProgress] = useState(false)
  const [started, setStarted] = useState(false)
  const [gameStarted, setGameStarted] = useState(false)
  const [installed_versions, setInstalledVersions] = useState(false)

  useEffect(() => {
    if (!versions) {
      utils.getVersions().then((data) => {
        setVersions(data.filter((v) => v.type === 'release'))
        setVersion(data[0])
        setInstalledVersions(fs.readdirSync(path.join(window.home_dir, 'versions')))
      })
    }
  })

  console.log('hi')

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
          <Select
            onChange={(e) => {
              setVersion(versions[e.value])
            }}
            defaultValue={{ value: versions[0], label: versions[0].id }}
            options={versions.map((version, index) => {
              return {
                value: index,
                label: version.id,
                type: version.type,
                installed: installed_versions?.includes(version.id)
              }
            })}
            styles={{
              control: (styles) => ({
                ...styles,
                backgroundColor: 'white'
              }),
              option: (styles, { data, isFocused }) => ({
                ...styles,
                backgroundColor: isFocused ? '#c9d2e7' : data.installed ? '#cccccc' : 'white'
              })
            }}
          />
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
            disabled={started}
          />
        </div>

        {started && gameStarted && (
          <>
            <div className="text-2xl font-bold">Minecraft launches...</div>
          </>
        )}
        {started && !gameStarted && (
          <>
            <div className="text-2xl font-bold">Downloading{'.'.repeat(progress.task % 3)}</div>
            <div className="break-words text-2xl font-bold">
              {download || 'please wait'} {`(${progress.type})` || ''}
            </div>
            <div className="text-2xl font-bold">
              {((progress.task / progress.total) * 100 || 0).toFixed(2)}%
            </div>
          </>
        )}
      </div>
    )
  )
}

export default Main
