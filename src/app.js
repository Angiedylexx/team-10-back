import express from "express"; 
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { port } from "./config/index.js"; 
import "./config/dbConnection.js"; 
import bodyParser from "body-parser"; 
import { openApiSpecification } from "./config/swagger.js";
import middlewareErrors from "./api/errors/errors.js";
import usersRouter from "./api/users/routers/index.js";
import videosRouter from "./api/videos/routers/index.js";
import { preordain } from "./api/users/controllers/get.js";
import { serverRead } from "./api/users/controllers/get.js";

const app = express(); 

//API´s
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.use(cors());
app.get("/", serverRead);
app.use("/docs", swaggerUi.serve);
app.get("/docs", swaggerUi.setup(openApiSpecification));
app.use("/api", usersRouter);
app.use("/api", videosRouter);

//Errores
app.use(middlewareErrors);

//Dejar siempre de ultimas
app.use("*", preordain); 

app.listen(port, (error) => { 
  if(error) {
    console.log("Server Error: Failed");
    process.exit(1);
  }
  console.log("Server listening in port " + port);
});

//URL
//https://team-10-back.onrender.com/