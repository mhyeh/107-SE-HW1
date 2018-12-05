import * as fs from "fs";
import * as path from "path";

import Model from "./Model";

export default class TxtModel extends Model {
    private static id: number = 0;
    private path: string;
    constructor(config: any) {
        super();
        this.connect(config);
    }

    public connect(config: any): void {
        this.path = path.join(path.dirname(require.main.filename), "../", config.path);
    }

    public select(data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const file = JSON.parse(fs.readFileSync(this.path).toString());
            if (typeof data === "undefined") {
                resolve(file);
            } else if (typeof data.where !== "undefined") {
                const res = [];
                for (const contract of file) {
                    if (contract[data.where.col] === data.where.val) {
                        res.push(contract);
                    }
                }
                resolve(res);
            }
        });
    }

    public insert(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const file = JSON.parse(fs.readFileSync(this.path).toString());
            const insertData = {
                id: TxtModel.id,
                name: data.name,
                phone: data.phone,
            };
            file.push(insertData);
            fs.writeFileSync(this.path, JSON.stringify(file));
            TxtModel.id++;
            resolve();
        });
    }

    public update(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const file = JSON.parse(fs.readFileSync(this.path).toString());
            for (const id in file) {
                if (file[id][data.where.col] === data.where.val) {
                    if (!(typeof data.newData.name === "undefined")) {
                        file[id].name = data.newData.name;
                    }
                    if (!(typeof data.newData.phone === "undefined")) {
                        file[id].phone = data.newData.phone;
                    }
                }
            }
            fs.writeFileSync(this.path, JSON.stringify(file));
            resolve();
        });
    }

    public delete(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            const file = JSON.parse(fs.readFileSync(this.path).toString());
            const res = [];
            for (const contact of file) {
                if (contact[data.where.col] !== data.where.val) {
                    res.push(contact);
                }
            }
            fs.writeFileSync(this.path, JSON.stringify(res));
            resolve();
        });
    }
}
