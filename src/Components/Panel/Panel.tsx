import { IValueDidChange, observe } from 'mobx'
import { observer } from 'mobx-react'
import React from 'react'
import { Container } from 'react-bootstrap'

import { PanelStore } from '../../Store/Panels'

export interface PanelProps {
    /** Panel Store */
    panels: PanelStore
    /** ID of the panel */
    id: string
    /** Trigger that runs when the panel shows */
    onShow?: (panel: Panel) => void
    /** Trigger that runs when the panel hides */
    onHide?: (panel: Panel) => void
    /** Trigger that runs either when the panel shows or hides (runs after 'onShow' or 'onHide') */
    onToggle?: (panel: Panel, type: 'show' | 'hide') => void
    /** Set on true to force the current Panel to be the active one (current in the store then) */
    active?: boolean
}

@observer
export class Panel extends React.Component<PanelProps> {
    constructor(props: PanelProps) {
        super(props)

        // Register the panel id
        props.panels.add(props.id)

        this.changeHooks = this.changeHooks.bind(this)

        // Run triggers on change on 'current' field of the panel store
        observe(props.panels, 'current', this.changeHooks)

        if (props.active) props.panels.setCurrent(props.id)
    }

    /**
     * @returns true if the current panel in the store is this one (according to props.id)
     */
    private doesDisplay(): boolean {
        const { panels, id } = this.props

        return panels.current.toLowerCase() === id.toLowerCase()
    }

    /**
     * Trigger the good 'onShow', 'onHide' or 'onToggle' hook(s) when the panel shows/hides
     * @param change Mobx change status
     */
    private changeHooks(change: IValueDidChange<string>): void {
        const { props } = this
        const id = this.props.id.toLowerCase()

        // Is showing
        if (change.newValue.toLowerCase() === id) {
            if (props.onShow) props.onShow(this)
            if (props.onToggle) props.onToggle(this, 'show')
        }

        // Is hiding
        if (change.oldValue.toLowerCase() === id) {
            if (props.onHide) props.onHide(this)
            if (props.onToggle) props.onToggle(this, 'hide')
        }
    }

    public render(): JSX.Element {
        const display = this.doesDisplay() ? 'block' : 'none'

        return <Container style={{ display }}>{this.props.children}</Container>
    }
}
