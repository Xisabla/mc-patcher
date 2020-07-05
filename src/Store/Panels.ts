import { action, observable } from 'mobx'

/**
 * Stores all panels and the current (active) one
 */
export class PanelStore {
    @observable panels: string[]
    @observable current: string

    constructor() {
        this.init()
    }

    /**
     * Get a panel by it's id
     * @param id Panel id
     * @returns The found panel, can be undefined
     */
    private getPanel(id: string): string {
        return this.panels.find(
            (panel) => panel.toLowerCase() === id.toLowerCase()
        )
    }

    /**
     * Initialize the panels store with default values
     */
    @action private init(): void {
        this.panels = []
        this.current = 'none'
    }

    /**
     * Set the current panel
     * @param id The new current panel
     * @returns true if the panel exists, false otherwise
     */
    @action setCurrent(id = 'none'): boolean {
        const panel = this.getPanel(id)

        if (panel) {
            this.current = panel

            return true
        }

        return false
    }

    /**
     * Add a panel in the panel store
     * @param id Panel id
     * @returns false if the panel already exists, true otherwise
     */
    @action add(id: string): boolean {
        if (this.getPanel(id)) return false

        this.panels.push(id)

        return true
    }
}
