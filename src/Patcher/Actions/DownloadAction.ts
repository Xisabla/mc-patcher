import fs, { WriteStream } from 'fs'
import path from 'path'
import request from 'request'

import { PatchAction } from '../PatchAction'
import { PatcherSettings } from '../Patcher'

export class DownloadAction extends PatchAction {
    private download(uri: string, file: WriteStream): Promise<boolean> {
        return new Promise((resolve, reject) => {
            request({
                uri,
                headers: {
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Cache-Control': 'max-age=0',
                    Connection: 'keep-alive'
                },
                gzip: true
            })
                .pipe(file)
                .on('finish', () => resolve(true))
                .on('error', (error) => reject(error))
        })
    }

    public run(
        minecraftDirectory: string,
        settings: PatcherSettings,
        flags?: { [property: string]: any }
    ): Promise<boolean> {
        const uri = this._src
        const out = path.join(minecraftDirectory, this._dist)
        const outDir = path.dirname(out)

        return this.assertDirectoryExists(outDir, settings).then(() => {
            const file = fs.createWriteStream(out)

            return this.download(uri, file)
        })
    }

    public get name(): string {
        return 'download'
    }

    public get requiresDist(): boolean {
        return true
    }
}
