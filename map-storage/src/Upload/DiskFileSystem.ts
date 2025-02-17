import { FileSystemInterface } from "./FileSystemInterface";
import * as fs from "fs-extra";
import path from "path";
import { NextFunction, Response } from "express";
import { Archiver } from "archiver";
import { StreamZipAsync, ZipEntry } from "node-stream-zip";

export class DiskFileSystem implements FileSystemInterface {
    public constructor(private baseDirectory: string) {}

    async deleteFiles(directory: string): Promise<void> {
        const fullPath = this.getFullPath(directory);
        if (await fs.pathExists(fullPath)) {
            await fs.emptyDir(fullPath);
        }
    }

    async writeFile(zipEntry: ZipEntry, targetFilePath: string, zip: StreamZipAsync): Promise<void> {
        const fullPath = this.getFullPath(targetFilePath);
        const dir = path.dirname(fullPath);
        await fs.mkdirp(dir);
        await zip.extract(zipEntry, this.getFullPath(targetFilePath));
    }

    private getFullPath(filePath: string) {
        if (filePath.includes("..")) {
            throw new Error("Invalid path.");
        }
        return path.resolve(path.join(this.baseDirectory, filePath));
    }

    serveStaticFile(virtualPath: string, res: Response, next: NextFunction): void {
        (async () => {
            const fullPath = this.getFullPath(virtualPath);
            if (await fs.pathExists(fullPath)) {
                res.sendFile(fullPath, (err) => {
                    if (err) {
                        next(err);
                    }
                });
            } else {
                next();
            }
        })().catch((e) => {
            next(e);
        });
    }

    readFileAsString(virtualPath: string): Promise<string> {
        const fullPath = this.getFullPath(virtualPath);
        return fs.readFile(fullPath, {
            encoding: "utf-8",
        });
    }

    writeStringAsFile(virtualPath: string, content: string): Promise<void> {
        const fullPath = this.getFullPath(virtualPath);
        return fs.writeFile(fullPath, content, {
            encoding: "utf-8",
        });
    }

    archiveDirectory(archiver: Archiver, virtualPath: string): Promise<void> {
        const fullPath = this.getFullPath(virtualPath);
        archiver.directory(fullPath, false);
        return Promise.resolve();
    }
}
