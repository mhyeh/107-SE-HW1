import { Request, Response } from "express";

import Model from "../models/Model";
import PhonebookRepository from "../Repositories/phonebookRepository";

export default class PhonebookController<ModelType extends Model = Model> {
    private phonebookRepository: PhonebookRepository;

    constructor(model: ModelType) {
        this.phonebookRepository = new PhonebookRepository<ModelType>(model);
    }

    public async getAllContract(req: Request, res: Response) {
        try {
            const contract = await this.phonebookRepository.getAllContract();
            res.status(200).json({ data: contract });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    public async getContractByID(req: Request, res: Response) {
        try {
            const contract = await this.phonebookRepository.getContractByID(Number(req.params.id));
            res.status(200).json({ data: contract });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    public async getContractByName(req: Request, res: Response) {
        try {
            const contract = await this.phonebookRepository.getContractByName(req.params.name);
            res.status(200).json({ data: contract });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    public async newContract(req: Request, res: Response) {
        try {
            await this.phonebookRepository.newContract(req.body);
            res.status(200).json({ data: "success" });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    public async editContract(req: Request, res: Response) {
        try {
            await this.phonebookRepository.editContract(Number(req.params.id), req.body);
            res.status(200).json({ data: "success" });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }

    public async deleteContract(req: Request, res: Response) {
        try {
            await this.phonebookRepository.deleteContract(Number(req.params.id));
            res.status(200).json({ data: "success" });
        } catch (e) {
            res.status(400).json({ error: e });
        }
    }
}
