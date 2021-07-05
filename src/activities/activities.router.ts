/**
 * Required External Modules and Interfaces
 */
 import express, { Request, Response } from "express";
 import * as ActivityService from "./activities.service";
 import { IActivity } from "./activity.model";
 
 import { checkJwt } from "../middleware/authz.middleware";
 
 /**
  * Router Definition
  */
 export const activitiesRouter = express.Router();
 
 /**
  * Controller Definitions
  */
 //  Authorize
 // valuesRouter.use(checkJwt);
 
 // GET values
 activitiesRouter.get("/", async (req: Request, res: Response) => {
     try {
         const activities: IActivity[] = await ActivityService.findAll();
 
         res.status(200).send(activities);
     } catch (e) {
         res.status(500).send(e.message);
     }
 });
 
 // GET values/:id
 activitiesRouter.get("/:id", async (req: Request, res: Response) => {
     const id: string = req.params.id;
 
     try {
         const activity: IActivity = await ActivityService.find(id);
 
         if (activity) {
             return res.status(200).send(activity);
         }
 
         res.status(404).send("Activity not found");
     } catch(e) {
         res.status(500).send(e.message);
     }
 });
 
 // POST values
 activitiesRouter.post("/", async (req: Request, res: Response) => {
     try {
         const activity: IActivity = req.body;
         const newActivity = await ActivityService.create(activity);
 
         res.status(201).json(newActivity);        
     } catch (e) {
         res.status(500).send(e.message);
     }
 });
 
 // PUT values/:id
 activitiesRouter.put("/:id", async (req: Request, res: Response) => {
     const id: string = req.params.id;
 
     try {
         const activityUpdate: IActivity = req.body;
 
         const existingActivity: IActivity = await ActivityService.find(id);
 
         if (existingActivity) {
             const updatedActivity = await ActivityService.update(id, activityUpdate);
             return res.status(200).json(updatedActivity);            
         }
 
         const newActivity = await ActivityService.create(activityUpdate);
 
         res.status(201).json(newActivity);
     } catch (e) {
         res.status(500).send(e.message);
     }
 });
 
 // DELETE values/:id
 activitiesRouter.delete("/:id", async (req: Request, res: Response) => {
     try {
         const id: string = req.params.id;
         await ActivityService.remove(id);
         
         res.sendStatus(204);
     } catch (e) {
         res.status(500).send(e.message);
     }
 });