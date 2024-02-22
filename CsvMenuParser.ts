import { EOL } from "node:os";
import { IWritable } from "./IWritable ";
import { readFile } from "node:fs/promises";
import { HtmlWriter } from "./HtmlWriter";
import { TextWriter } from "./TextWriter";

interface MenuItems {
    type: string; 
    name: string; 
    quantity: string; 
    price: string
}

class CsvMenuParser {
    private csvData: string[] = [];
    private menuItems: MenuItems[] = [];

    private constructor(data: string[], menuItems: MenuItems[]) {
        this.csvData = data;
        this.menuItems = menuItems;
    }

    static async buildMenu(filename: string) {
        const data = await readFile(filename, "utf8");
        const splitData = data.split(EOL)
        console.log(splitData)
        const menuItems = splitData.map((menu) => {
            const [mealType, mealName, mealQuantity, price] = menu.split(",");
            return { type: mealType, name: mealName, quantity: mealQuantity, price: price };
        });
        return new CsvMenuParser(data.split(EOL), menuItems)
    }

    async writeMenu(writer: IWritable) {
        writer.write(this.menuItems);
    }
}

async function main() {
    const menu = await CsvMenuParser.buildMenu("menu.csv");
    await menu.writeMenu(new TextWriter("menu.txt"));
    await menu.writeMenu(new HtmlWriter("menu.html"));
}
main()