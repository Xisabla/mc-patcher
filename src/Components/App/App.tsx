import { observer } from 'mobx-react'
import React from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'

import { GlobalStore } from '../../Store'
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
        const { current } = this.props.store.panels

        return (
            <Container fluid>
                <Row>
                    {/* Sidebar */}
                    <Sidebar app={app} panels={panels} />
                    {/* Panels */}
                    {/* Todo: remove this and use <Panels> */}
                    <Col md={10} className="mt-3">
                        <Jumbotron>
                            <h1>Current panel: {current}</h1>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
        )
    }
}
