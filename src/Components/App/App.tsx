import { observer } from 'mobx-react'
import React from 'react'
import { Container, Row } from 'react-bootstrap'

import { GlobalStore } from '../../Store'
import { PanelContainer } from '../Panel/PanelContainer'
import { Sidebar } from '../Sidebar/Sidebar'

export interface AppProps {
    store: GlobalStore
}

@observer
export class App extends React.Component<AppProps> {
    constructor(props: AppProps) {
        super(props)
    }

    render(): JSX.Element {
        const { app, panels } = this.props.store

        return (
            <Container fluid>
                <Row>
                    <Sidebar app={app} panels={panels} />
                    <PanelContainer app={app} panels={panels} />
                </Row>
            </Container>
        )
    }
}
