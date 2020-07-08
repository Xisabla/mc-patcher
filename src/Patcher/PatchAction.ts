/* eslint-disable @typescript-eslint/no-explicit-any */

import fs from 'fs'

import {
    PatchManifestActionDist,
    PatchManifestActionName,
    PatchManifestActionSrc
} from './Manifest'
import { PatcherSettings } from './Patcher'

export abstract class PatchAction {
    protected _src: PatchManifestActionSrc
    protected _dist?: PatchManifestActionDist

    constructor() {
        this._src = null
        this._dist = null
    }

    public setParams(
        src: PatchManifestActionSrc,
        dist?: PatchManifestActionDist
    ): void {
        this._src = src
        this._dist = dist
    }

    protected assertDirectoryExists(
        dir: string,
        settings: PatcherSettings
    ): Promise<boolean> {
        const exists = fs.existsSync(dir)

        if (!exists) {
            if (settings.createInexistentDirs) {
                fs.mkdirSync(dir, { recursive: true })

                return Promise.resolve(true)
            }

            return Promise.reject()
        }

        return Promise.resolve(true)
    }

    /**
     * Runs the action in the given minecraftDirectory
     * @param minecraftDirectory Directory in which the action will perform
     * @param settings Settings of the Patcher
     * @param flags Specific flags for the action, can be empty
     * @param onprogress Function that will run on Action progress
     */
    public abstract run(
        minecraftDirectory: string,
        settings: PatcherSettings,
        flags?: { [property: string]: any }
        // ,onprogress?: (/* this may change */) => void
    ): Promise<boolean>

    /** Name of the action */
    public abstract get name(): string

    // todo: make sure that it is useful
    /** Might be overridden, will be used to know if the action need a "dist" parameter */
    public get requiresDist(): boolean {
        return false
    }
}

export class PatchActionCollection {
    /** Registered actions */
    private _actions: PatchAction[]
    /** Default action */
    private _default: PatchAction | null

    constructor(params?: PatchAction | PatchAction[]) {
        this._actions = []
        this._default = null

        if (params) {
            if (params instanceof PatchAction) {
                this.registerAction(params)
            } else {
                this.registerActions(params)
            }
        }
    }

    /**
     * Register an action inside the Collection
     * @param action The action to register
     * @param override If set on true, will override existing action by the given one (default: true)
     * @returns true if the action is registered, false otherwise
     */
    public registerAction(action: PatchAction, override = true): boolean {
        const found = this.getAction(action.name)

        if (!found) {
            this._actions.push(action)

            return true
        }

        if (found !== null && override) {
            this._actions = this._actions.filter(
                (elem) => elem.name !== action.name
            )

            return this.registerAction(action)
        }

        return false
    }

    /**
     * Register multiple actions inside the Collection
     * @param actions Actions to register
     * @param override If set on true, will override all exiting actions (default: true)
     * @returns True if all the actions are registered, false otherwise
     */
    public registerActions(actions: PatchAction[], override = true): boolean {
        return actions
            .map((action) => this.registerAction(action, override))
            .reduce(
                (previousResult, currentResult) =>
                    previousResult && currentResult
            )
    }

    /**
     * Set the given action by default
     * @param action action (or just it's name) to set by default
     * @returns True if the action is correctly set by default, false otherwise
     */
    public setDefault(action: PatchAction | PatchManifestActionName): boolean {
        // todo: Allow to given a function (callback) that returns the default action, by given the action array and the current action parameters
        //  something like: (actions: PatchAction[], params: any) => PatchAction; store it in a property
        // then, allow "getDefault" to take the params argument that will give the selector
        const name = action instanceof PatchAction ? action.name : action
        const found = this.getAction(name)

        if (found) {
            this._default = found
        } else if (action instanceof PatchAction) {
            this.registerAction(action)

            return this.setDefault(action)
        }

        return false
    }

    /**
     * Find an action within the Collection
     * @param name Name of the action
     * @returns The found action (or null)
     */
    public getAction(
        name: PatchManifestActionName | string
    ): PatchAction | null {
        return this._actions.find(
            (action) => action.name.toLowerCase() === name.toLowerCase()
        )
    }

    /**
     * Get the default action
     * @returns The default action or null if none defined
     */
    public getDefault(): PatchAction | null {
        return this._default
    }
}
