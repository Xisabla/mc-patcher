import React from 'react'
import { Col } from 'react-bootstrap'

import { AppStore } from '../../Store'
import { PanelStore } from '../../Store/Panels'

export interface PanelContainerProps {
    app: AppStore
    panels: PanelStore
}

import './PanelContainer.scss'

import { Panel } from './Panel'
import { PatcherPanel } from './PatcherPanel'

export class PanelContainer extends React.Component<PanelContainerProps> {
    public render(): JSX.Element {
        const { panels } = this.props

        return (
            <Col className="panel-container" md={10}>
                <PatcherPanel panels={panels} />
                <Panel panels={panels} id="settings">
                    <h2>Settings</h2>
                </Panel>
            </Col>
        )
    }
}
