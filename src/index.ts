/**
 * Required External Modules
 */
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { valuesRouter } from "./values/values.router";
import { activitiesRouter } from "./activities/activities.router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/values", valuesRouter);
app.use("/api/activities", activitiesRouter);

app.use(errorHandler);
app.use(notFoundHandler);

/**
 *  DB Configuration
 */
 mongoose.connect(process.env.MONGO_URI!, { useNewUrlParser: true, useFindAndModify: false }); 
 
 //Get the default connection
 const db = mongoose.connection;
 
 //Bind connection to error event (to get notification of connection errors)
 db.on('error', console.error.bind(console, 'MongoDB connection error:'));

/**
 * Server Activation
 */
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});