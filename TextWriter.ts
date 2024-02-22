import { EOL } from "node:os";
import { IWritable } from "./IWritable ";
import { writeFile } from "node:fs/promises";

interface MenuItems {
    type: string;
    name: string;
    quantity: string;
    price: string;
}

export class TextWriter implements IWritable {
    private filename: string;
    public results: string;

    constructor(filename: string) {
        this.filename = filename;
        this.results = "";
    }

    async write(menuItems: MenuItems[]) {
        this.format(menuItems);

        await writeFile(this.filename, this.results);
    }

    private format(menuItems: MenuItems[]): void {
        const uniqueMealType: string[] = [];

        menuItems.forEach((items) => {
            if (!uniqueMealType.includes(items.type)) {
                uniqueMealType.push(items.type);
            }
        });
        uniqueMealType.forEach((mealType) => {
            this.results += `****${mealType.toUpperCase()}**** ${EOL}`;
            menuItems.forEach((items) => {
                if (items.type === mealType) {
                    this.results += `${items.price} ${items.name} ${items.quantity} ${EOL}`;
                }
            });
        });
    }
}
// interface Menu {
//     [key: string]: string[];
// }

// private format(data: string): string {
//     const split = data.split(EOL);
//     const lunchMenu: string[] = [];
//     const dinnerMenu: string[] = [];
//     const desertMenu: string[] = [];
//     lunchMenu.push("*****LUNCH******")
//     dinnerMenu.push("*****DINNER******")
//     desertMenu.push("*****DESERT******") // not very dynamic :(
//     split.forEach(menuItem => {
//         if (menuItem.includes("lunch")) {
//             lunchMenu.push(this.organizeMenuItems(menuItem));
//         } else if (menuItem.includes("dinner")) {
//             dinnerMenu.push(this.organizeMenuItems(menuItem));
//         } else if (menuItem.includes("desert")) {
//             desertMenu.push(this.organizeMenuItems(menuItem));
//         }
//     });
//     const formattedResult = `${lunchMenu.join('\n')}\n\n${dinnerMenu.join('\n')}`;
//     return formattedResult;
// }

// private newMenuItem(menuItem: string, menu: string[]) {
//     menu.push(this.organizeMenuItems(menuItem));
// }

// private format(data: string): string {
//     const split = data.split(EOL);
//     const menuList: Menu = {};

//     for (let i = 0; i < split.length; i++) {
//         const menuItem = split[i];
//         const mealType = menuItem.split(',', 1);
//         if (!menuList[mealType[0]]) {
//             menuList[mealType[0]] = [`*****${mealType}******`];
//         }
//         this.newMenuItem(menuItem, menuList[mealType[0]]);
//         console.log(mealType);
//     }

//     const formattedResult = Object.keys(menuList).map(mealType => `${menuList[mealType].join('\n')}`).join('\n\n');
//      //const formattedResult = `${lunchMenu.join('\n')}\n\n${dinnerMenu.join('\n')}`;
//     return formattedResult;
// }
