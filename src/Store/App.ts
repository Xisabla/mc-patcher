import { action, observable } from 'mobx'

import pkg from '../../package.json'

/**
 * Store global data for the Application
 */
export class AppStore {
    @observable version: string

    constructor() {
        this.init()
    }

    /**
     * Initialize app store with default values
     */
    @action private init(): void {
        this.version = pkg.version
    }
}
