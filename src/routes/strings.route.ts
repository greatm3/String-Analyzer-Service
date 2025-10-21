import { Router } from "express"
import { getAllStrings, createString, getString, deleteString } from "../controllers/strings.controller.js";

const stringsRouter = Router();

stringsRouter.get('/:string_value', getString)
stringsRouter.get('/', getAllStrings);
stringsRouter.post('/', createString)
stringsRouter.delete('/:string_value', deleteString)

export default stringsRouter;