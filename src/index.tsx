import React from 'react'
import { render } from 'react-dom'

import { App } from './Components'
import { store } from './Store'

render(<App store={store} />, document.getElementById('root'))
