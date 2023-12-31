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

import { HashRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'

import path from 'path'
import process from 'process'
function App() {
  window.home_dir = path.join(
    process.platform === 'win32' ? process.env['APPDATA'] : process.env['HOME'],
    '.pimi-launcher'
  )
  return (
    <HashRouter>
      <Routes>
        <Route path="/" exact Component={Main} />
      </Routes>
    </HashRouter>
  )
}

export default App
