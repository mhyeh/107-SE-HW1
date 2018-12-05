import Model from "../models/Model";
export default class PhonebookRepository<ModelType extends Model = Model> {
    private model: ModelType;

    constructor(model: ModelType) {
        this.model = model;
    }

    public async getAllContract() {
        try {
            return await this.model.select();
        } catch (e) {
            throw e;
        }
    }

    public async getContractByID(id: number) {
        try {
            return await this.model.select({ where: { col: "id", val: id } });
        } catch (e) {
            throw e;
        }
    }

    public async getContractByName(name: string) {
        try {
            return await this.model.select({ where: { col: "name", val: name } });
        } catch (e) {
            throw e;
        }
    }

    public async newContract(data: { name: string, phone: string}) {
        try {
            const conteact = await this.getContractByName(data.name);
            if (typeof conteact[0] !== "undefined") {
                throw new Error("same name");
            }
            return await this.model.insert(data);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    public async editContract(id: number, data: { name?: string, phone?: string}) {
        try {
            return await this.model.update({ newData: data, where: { col: "id", val: id } });
        } catch (e) {
            throw e;
        }
    }

    public async deleteContract(id: number) {
        try {
            return await this.model.delete({ where: { col: "id", val: id } });
        } catch (e) {
            throw e;
        }
    }
}
