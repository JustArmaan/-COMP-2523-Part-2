import { IWritable } from "./IWritable ";
import { writeFile } from "node:fs/promises";

export class HtmlWriter implements IWritable {
    private filename: string;
    
    constructor(filename: string) {
        this.filename = filename;
    }

    async write(data: string) {
        const htmlTagData = this.tagData(data)
        await writeFile(this.filename, htmlTagData);
    }

    private tagData(data: string) {
        
        return ""
    }

}