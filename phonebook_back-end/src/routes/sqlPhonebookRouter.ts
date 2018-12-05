import { NextFunction, Request, Response, Router } from "express";

import PhonebookController from "../controllers/phonebookController";
import MysqlModel from "../models/mysqlModel";

class Root {
    public router: Router;

    private controller: PhonebookController;
    private model:      MysqlModel;

    public constructor() {
        this.router     = Router();
        this.model      = new MysqlModel(require("../../config/mysql.connect.json"));
        this.controller = new PhonebookController<MysqlModel>(this.model);
        this.init();
    }

    private init() {
        this.router.get("/",           (req: Request, res: Response) => this.controller.getAllContract(req, res));
        this.router.get("/:id",        (req: Request, res: Response) => this.controller.getContractByID(req, res));
        this.router.get("/name/:name", (req: Request, res: Response) => this.controller.getContractByName(req, res));
        this.router.post("/",          (req: Request, res: Response) => this.controller.newContract(req, res));
        this.router.put("/:id",        (req: Request, res: Response) => this.controller.editContract(req, res));
        this.router.delete("/:id",     (req: Request, res: Response) => this.controller.deleteContract(req, res));
    }
}

const rootRoutes = new Root();
export default rootRoutes.router;
