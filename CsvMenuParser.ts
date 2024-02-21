import { EOL } from "node:os";
import { IWritable } from "./IWritable ";
import { readFile } from "node:fs/promises";
import { HtmlWriter } from "./HtmlWriter";
import { TextWriter } from "./TextWriter";

class CsvMenuParser {
    private csvData: string[] = [];

    private constructor(data: string[]) {
        this.csvData = data;
    }

    static async buildMenu(filename: string) {
        const data = await readFile(filename, "utf8");
        return new CsvMenuParser(data.split(EOL))
    }

    async writeMenu(writer: IWritable) {
        writer.write(this.csvData.join(EOL));
    }
}

async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv");
    await menu.writeMenu(new TextWriter("menu.txt"));
    await menu.writeMenu(new HtmlWriter("menu.html"));
}
main()