import React from 'react'
import { render } from 'react-dom'

import { App } from './Components'
import { store } from './Store'

/**

<App> --> contains global store and provide
    <Sidebar>
        <SidebarItem panelId="panelId" default?>Item</SidebarItem>
    <Panels>
        <Panel id="patcher">
        <Panel id="patcher">
        <Panel id="panelId" onShow?={} onHide?={} onToggle?={}>
            <h1>Panel Content</h1>
        </Panel>
    </Panels>

 */

// <SidebarItem panelId="patcher" name="Hello World">

// Note: Those panels will be added on Panel JSX Element constructor
store.panels.add('settings')
store.panels.add('patcher')
store.panels.add('test')

render(<App store={store} />, document.getElementById('root'))
