import { Router } from "express"
import { getAllStrings, createString, getString } from "../controllers/strings.controller.js";

const stringsRouter = Router();

stringsRouter.get('/:string_value', getString)
stringsRouter.get('/', getAllStrings);
stringsRouter.post('/', createString)

export default stringsRouter;