/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ValueService from "./values.service";
import { IValue } from "./value.model";

import { checkJwt } from "../middleware/authz.middleware";

/**
 * Router Definition
 */
export const valuesRouter = express.Router();

/**
 * Controller Definitions
 */
//  Authorize
// valuesRouter.use(checkJwt);

// GET values
valuesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const values: IValue[] = await ValueService.findAll();

        res.status(200).send(values);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET values/:id
valuesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const value: IValue = await ValueService.find(id);

        if (value) {
            return res.status(200).send(value);
        }

        res.status(404).send("Value not found");
    } catch(e) {
        res.status(500).send(e.message);
    }
});

// POST values
valuesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const value: IValue = req.body;
        const newValue = await ValueService.create(value);

        res.status(201).json(newValue);        
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT values/:id
valuesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: string = req.params.id;

    try {
        const valueUpdate: IValue = req.body;

        const existingValue: IValue = await ValueService.find(id);

        if (existingValue) {
            const updatedValue = await ValueService.update(id, valueUpdate);
            return res.status(200).json(updatedValue);            
        }

        const newValue = await ValueService.create(valueUpdate);

        res.status(201).json(newValue);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE values/:id
valuesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: string = req.params.id;
        await ValueService.remove(id);
        
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});