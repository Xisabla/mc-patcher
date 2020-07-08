import { DownloadAction } from './Actions/DownloadAction'
import {
    PatchManifest,
    PatchManifestAction,
    PatchManifestActionName
} from './Manifest'
import { PatchAction, PatchActionCollection } from './PatchAction'

// TODO: Create and use a mobx store, to store the current patcher information that are useful for the user (patch progress, validation state, patch uptodate, ...)

export interface PatcherSettings {
    /** If set on true, the patcher will always check for update before patching and then update if there is a new version */
    checkForManifestUpdate: boolean
    /** If set on true, actions will replace existing files if they already exists */
    forceReplace: boolean
    /** List of actions for which ones the patcher will totally stop if they fail, can be only one action or boolean (false = none, true = all) */
    stopOnActionFailure:
        | boolean
        | PatchManifestActionName
        | PatchManifestActionName[]
    /** List of actions for which ones the patcher will create all missing directories, can be only one action or boolean (false = none, true = all) */
    createInexistentDirs:
        | boolean
        | PatchManifestActionName
        | PatchManifestActionName[]
    /** If set on true, settings from the manifest will override the settings from the user (be really careful if set on true) */
    manifestSettingsOverrideUser: boolean
}

export const defaultPatcherSettings: PatcherSettings = {
    checkForManifestUpdate: true,
    forceReplace: true,
    stopOnActionFailure: true,
    createInexistentDirs: true,
    manifestSettingsOverrideUser: false
}

export class Patcher {
    /** Complete patch manifest object */
    private _manifest: PatchManifest
    /** Minecraft Directory where will the patch be applied */
    private _minecraftDirectory: string
    /** Patcher actions */
    private _actions: PatchActionCollection
    /** Patcher Settings */
    private _settings: PatcherSettings

    constructor(
        manifest: PatchManifest,
        minecraftDirectory: string,
        settings?: Partial<PatcherSettings>
    ) {
        this._manifest = manifest
        this._minecraftDirectory = minecraftDirectory
        this._actions = new PatchActionCollection()
        this._settings = defaultPatcherSettings

        if (settings) this._settings = Object.assign(this._settings, settings)

        this.initializeActions()
    }

    /**
     * Register all actions and set default one
     */
    private initializeActions(): void {
        const actions: PatchAction[] = [new DownloadAction()]

        this._actions.registerActions(actions)
        this._actions.setDefault('download')
    }

    /**
     * Fetch the last version of the manifest and tell if the current one is up to date
     * @returns True if the manifest is up to date or if the fetch failed, false otherwise
     */
    public isManifestUpToDate(): Promise<boolean> {
        return Promise.resolve(true)
    }

    /**
     * Fetch the last version of the manifest and update the current one if it is outdated
     * @returns True if the manifest is fetched successfully (even if it is already up to date), false otherwise
     */
    public updateManifest(): Promise<boolean> {
        return Promise.resolve(false)
    }

    /**
     * Check if the manifest is valid
     * @returns True if the manifest is valid
     */
    public validateManifest(): boolean {
        return false
    }

    /**
     * Check if the manifest can be applied
     * @returns True if the manifest is valid and if actions can be performed on the target dir (directories exists/createInexistentDirs set to true)
     */
    public validate(): boolean {
        return this.validateManifest()
    }

    /**
     * Apply the patch actions from the manifest to the minecraft directory
     * @returns false if an action failed or if the validation failed, true otherwise
     */
    public patch(): Promise<boolean> {
        /*if (!this.validate() || !this.validateManifest())
            return Promise.resolve(false)*/

        // todo: use a promise queue to deal with "stopOnActionFailure" set on false

        const actions = this._manifest.patch.map(
            (readAction: PatchManifestAction) => {
                const action =
                    this._actions.getAction(readAction.action) ||
                    this._actions.getDefault()

                const { src, dist } = readAction

                action.setParams(src, dist)

                return action.run(this._minecraftDirectory, this._settings)
            }
        )

        return Promise.all(actions).then((actionStates) =>
            actionStates.reduce(
                (previousState, currentState) => previousState && currentState
            )
        )
    }
}
