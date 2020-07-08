// Generated JSON Schema: https://git.io/JJIB6 (outdated)

/**
 * Patch Manifest content
 */
export interface PatchManifest {
    /** Imported from a JSON, it may (or may not) contain a $schema field */
    $schema?: string
    /** Name of the patch */
    name: string
    /** Description the the patch */
    description?: string
    /** Version of the patch, can be used to check for update */
    version: number
    // minecraftVersion: string
    /** Author of the patch */
    author?: string
    /** Optional settings, can override user settings if allowed */
    settings?: PatchManifestSettings
    /** Actions to run */
    patch: PatchManifestAction[]
}

/**
 * Those settings can override the user settings only if the options "allowSettingsOverride" is set on true for the user
 */
export interface PatchManifestSettings {
    /** URL to the up-to-date PatchManifest */
    updateUrl?: string
    /** If set on true, will always erase existing file */
    forceReplace?: boolean | PatchManifestActionName | PatchManifestActionName[]
    /** Stop on all action type failure, or specific one, or if unset/set to false, will not stop on any action failure. true means stop on any action failure */
    stopOnActionFailure?:
        | boolean
        | PatchManifestActionName
        | PatchManifestActionName[]
    /** Will create all missing directories for the given actions (false = none, true = all) */
    createInexistentDirs?:
        | boolean
        | PatchManifestActionName
        | PatchManifestActionName[]
}

/**
 * All actions
 */
export type PatchManifestAction =
    | PatchManifestActionBase
    | PatchManifestActionDefault
    | PatchManifestActionDownload
    | PatchManifestActionCopy
    | PatchManifestActionDelete
    | PatchManifestActionMove
    | PatchManifestActionOld
    | PatchManifestActionRestore
    | PatchManifestActionCompress
    | PatchManifestActionExtract

/**
 * All available PatchAction action field values
 */
export type PatchManifestActionName =
    | 'copy'
    | 'download'
    | 'delete'
    | 'move'
    | 'old'
    | 'restore'
    | 'compress'
    | 'extract'

/** PatchAction src field (string for path) */
export type PatchManifestActionSrc = string
/** PatchAction dist field (string for path) */
export type PatchManifestActionDist = string

/**
 * Default PatchAction: If src is an url, it will cast a PatchActionDownload, otherwise will cast a PatchActionCopy
 */
export type PatchManifestActionDefault = PatchManifestActionBase

/**
 * PatchAction: Download - Download a file from url (src) to a specific location (dist)
 */
export interface PatchManifestActionDownload extends PatchManifestActionBase {
    action: 'download'
    dist: PatchManifestActionDist
}

/**
 * PatchAction: Copy - Copy a file (src) to a specific location (dist)
 */
export interface PatchManifestActionCopy extends PatchManifestActionBase {
    action: 'copy'
    dist: PatchManifestActionDist
}

/**
 * PatchAction: Delete - Delete a given file (src) if exists
 */
export interface PatchManifestActionDelete extends PatchManifestActionBase {
    action: 'delete'
}

/**
 * PatchAction: Move - Move a given file (src) to a specific location (dist)
 */
export interface PatchManifestActionMove extends PatchManifestActionBase {
    action: 'move'
    dist: PatchManifestActionDist
}

/**
 * PatchAction: Old - Add a '.old' suffix at the end of a file (src)
 */
export interface PatchManifestActionOld extends PatchManifestActionBase {
    action: 'old'
    dist: PatchManifestActionDist
}

/**
 * PatchAction: Restore - "Unold" (remove the .old suffix) of a file (src) if it is found
 */
export interface PatchManifestActionRestore extends PatchManifestActionBase {
    action: 'restore'
}

/**
 * PatchAction: Compress - Compress content from a specific directory (src) to an archive file (dist)
 */
export interface PatchManifestActionCompress extends PatchManifestActionBase {
    action: 'compress'
}

/**
 * PatchAction: Extract - Extract content from an archive file (src) to a specific directory (dist)
 */
export interface PatchManifestActionExtract extends PatchManifestActionBase {
    action: 'extract'
    dist: PatchManifestActionDist
}

/**
 * Base for PatchAction, contains source and destination path and a facultative action field
 */
export interface PatchManifestActionBase {
    action?: PatchManifestActionName
    src: PatchManifestActionSrc
    dist?: PatchManifestActionDist
}

// url --> check for valid url
// path --> check for valid path
