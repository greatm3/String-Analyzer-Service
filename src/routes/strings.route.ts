import express from "express"
import { getAllStrings } from "../controllers/strings.controller.js";

const stringsRouter = express.Router();

stringsRouter.get('/', getAllStrings)

export default stringsRouter;