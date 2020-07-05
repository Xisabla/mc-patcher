import { configure } from 'mobx'

import { AppStore } from './App'
import { PanelStore } from './Panels'

// Only use actions to edit store values
configure({ enforceActions: 'always' })

/**
 * Object containing all the stores
 */
export interface GlobalStore {
    app: AppStore
    panels: PanelStore
}

/**
 * Default global store
 */
const store: GlobalStore = {
    app: new AppStore(),
    panels: new PanelStore()
}

export { AppStore, PanelStore }
export { store }
