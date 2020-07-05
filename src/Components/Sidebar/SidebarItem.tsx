import { observer } from 'mobx-react'
import React from 'react'
import { ListGroupItem } from 'react-bootstrap'

import { PanelStore } from '../../Store'

export interface SidebarItemProps {
    /** Panels Store */
    panels: PanelStore
    /** ID of the Panel triggered by the SidebarItem */
    panelId?: string
    /** Set on true to force the SidebarItem to trigger the Panel on initial render */
    default?: boolean
}

@observer
export class SidebarItem extends React.Component<SidebarItemProps> {
    constructor(props: SidebarItemProps) {
        super(props)

        this.click = this.click.bind(this)

        if (props.default) {
            this.setCurrentPanel()
        }
    }

    /**
     * Set the current panel in the panels store to Item panelId prop (if it exists)
     * @returns true if the panelId exists, false otherwise
     */
    private setCurrentPanel(): boolean {
        const { panels, panelId } = this.props

        if (panelId) {
            // Use a 0ms timeout to make sure the action will be performed after panels.init()
            setTimeout(() => panels.setCurrent(panelId))
            return true
        }

        return false
    }

    /**
     * Perform click action on the SidebarItem, will change the panel if Item has a panelId prop
     * @param event React Mouse Event from click
     */
    private click(event: React.MouseEvent): void {
        if (this.setCurrentPanel()) event.preventDefault()
    }

    public render(): JSX.Element {
        const { current } = this.props.panels
        const { panelId } = this.props
        const active = current === panelId

        return (
            <ListGroupItem active={active} action onClick={this.click}>
                {this.props.children}
            </ListGroupItem>
        )
    }
}
