import express from "express"; 
const qualificationRouter = express.Router();

import qualificationEdit from "../controllers/patch.js";

qualificationRouter.patch("/:id", qualificationEdit);

export default qualificationRouter;