import * as Knex from "knex";

import Model from "./Model";

export default class MysqlModel extends Model {
    private client: Knex;
    constructor(config: any) {
        super();
        this.connect(config);
    }

    public connect(config: any): void {
        this.client = Knex(config);
    }

    public select(data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            if (typeof data === "undefined") {
                this.client.select("*").from("phonebook").then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            } else if (typeof data.where !== "undefined") {
                this.client.select("*").from("phonebook").where(data.where.col, data.where.val).then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    }

    public insert(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client("phonebook").insert(data)
            .then(() => resolve())
            .catch((err) => reject(err));
        });
    }

    public update(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client("phonebook").update(data.newData).where(data.where.col, data.where.val)
            .then(() => resolve())
            .catch((err) => reject(err));
        });
    }

    public delete(data: any): Promise<void> {
        return new Promise((resolve, reject) => {
            this.client("phonebook").where(data.where.col, data.where.val).del()
            .then(() => resolve())
            .catch((err) => reject(err));
        });
    }
}
