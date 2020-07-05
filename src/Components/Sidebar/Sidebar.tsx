import './Sidebar.scss'

import { observer } from 'mobx-react'
import React from 'react'
import { Col, ListGroup } from 'react-bootstrap'

import { AppStore, PanelStore } from '../../Store'
import { SidebarItem } from './SidebarItem'

export interface SidebarProps {
    app: AppStore
    panels: PanelStore
}

@observer
export class Sidebar extends React.Component<SidebarProps> {
    constructor(props: SidebarProps) {
        super(props)
    }

    render(): JSX.Element {
        const { panels } = this.props
        const { version } = this.props.app

        return (
            <Col className="sidebar" md={2}>
                <ListGroup variant="flush">
                    <SidebarItem panels={panels} panelId="patcher" default>
                        Patcher
                    </SidebarItem>
                    <SidebarItem panels={panels} panelId="settings">
                        Settings
                    </SidebarItem>
                    <SidebarItem panels={panels} panelId="test">
                        Test
                    </SidebarItem>
                    <SidebarItem panels={panels} panelId="test2">
                        Test #2
                    </SidebarItem>
                </ListGroup>
                <div className="version">mc-patcher v{version}</div>
            </Col>
        )
    }
}
