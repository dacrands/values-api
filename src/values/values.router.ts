/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ValueService from "./values.service";
import { BaseValue, Value } from "./value.interface";

import { checkJwt } from "../middleware/authz.middleware";

/**
 * Router Definition
 */
export const valuesRouter = express.Router();

/**
 * Controller Definitions
 */
//  Authorize
valuesRouter.use(checkJwt);

// GET items
valuesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const values: Value[] = await ValueService.findAll();

        res.status(200).send(values);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// GET items/:id
valuesRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const value: Value = await ValueService.find(id);

        if (value) {
            return res.status(200).send(value);
        }

        res.status(404).send("Value not found");
    } catch(e) {
        res.status(500).send(e.message);
    }
});

// POST items
valuesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const value: BaseValue = req.body;
        console.log(value);
        const newValue = await ValueService.create(value);

        res.status(201).json(newValue);        
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// PUT items/:id
valuesRouter.put("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);

    try {
        const valueUpdate: Value = req.body;

        const existingValue: Value = await ValueService.find(id);

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

// DELETE items/:id
valuesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await ValueService.remove(id);
        
        res.sendStatus(204);
    } catch (e) {
        res.status(500).send(e.message);
    }
});