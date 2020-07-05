import React from 'react'

import { PanelStore } from '../../Store/Panels'
import { Panel } from './Panel'

export interface PatcherPanelProps {
    panels: PanelStore
}

export class PatcherPanel extends React.Component<PatcherPanelProps> {
    render(): JSX.Element {
        const { panels } = this.props
        return (
            <Panel panels={panels} id="patcher" active>
                <h1>Patcher</h1>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea
                delectus eaque veritatis sit rem consequatur quia dignissimos
                debitis. Expedita rerum dolorem adipisci blanditiis eos sint
                ipsam odit et quisquam assumenda.
            </Panel>
        )
    }
}
