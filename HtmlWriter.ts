import { EOL } from "node:os";
import { IWritable } from "./IWritable ";
import { writeFile } from "node:fs/promises";

interface MenuItems {
    type: string; 
    name: string; 
    quantity: string; 
    price: string
}

export class HtmlWriter implements IWritable {
    private filename: string;
    public results: string;

    constructor(filename: string) {
        this.filename = filename;
        this.results = "";
    }

    async write(menuItems: MenuItems[]) {
        this.tagData(menuItems);

        await writeFile(this.filename, this.results);
    }

    private tagData(menuItems: MenuItems[]) {
        const uniqueMealType: string[] = [];

        menuItems.forEach((items) => {
            if (!uniqueMealType.includes(items.type)) {
                uniqueMealType.push(items.type);
            }
        });
        uniqueMealType.forEach((mealType) => {
            this.results += `
            <!DOCTYPE html>
            <html>
            <head>
            <title>${mealType} Menu</title>
            </head>
            <body>
            `;
            this.results += `<table border="1">`;
            this.results += `<tr><th colspan="3">****${mealType}****</th></tr>${EOL}`;
            this.results += `<tr><th>Price</th><th>Name</th><th>Quantity</th></tr>${EOL}`;

            menuItems.forEach((items) => {
                if (items.type === mealType) {
                    this.results += `<tr><td>${items.price}</td><td>${items.name}</td><td>${items.quantity}</td></tr>${EOL}`;
                }
            });

            this.results += `</table>${EOL}`;
            this.results += `
            </body>
            </html>
            `;
        });
    }
}