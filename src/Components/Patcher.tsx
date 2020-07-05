import {
    faCheck,
    faFileCode,
    faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Form, FormGroup, FormLabel, InputGroup } from 'react-bootstrap'

import { PanelStore } from '../Store/Panels'
import { Panel } from './Panel/Panel'

export interface PatcherProps {
    panels: PanelStore
}

export class Patcher extends React.Component<PatcherProps> {
    render(): JSX.Element {
        const { panels } = this.props

        return (
            <Panel panels={panels} id="patcher" active>
                <h1>Patcher</h1>

                <Form>
                    <FormGroup>
                        <FormLabel>
                            <h3>Minecraft instance</h3>
                        </FormLabel>
                        <InputGroup className="mb-2">
                            <Form.Control placeholder="Path/to/.minecraft" />
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    title="Browse folders"
                                    style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faFolderOpen} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>
                            <h3>Patch manifest</h3>
                        </FormLabel>
                        <InputGroup className="mb-2">
                            <Form.Control placeholder="Patch file/url" />
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    title="Browse manifests"
                                    style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faFileCode} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <InputGroup.Prepend>
                                <InputGroup.Text
                                    title="Validate patch manifest"
                                    style={{ cursor: 'pointer' }}>
                                    <FontAwesomeIcon icon={faCheck} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                        </InputGroup>
                    </FormGroup>
                </Form>
            </Panel>
        )
    }
}
