import express from "express"; 
import { port } from "./config/index.js"; 
import "./config/dbConnection.js"; 
import bodyParser from "body-parser"; 
import middlewareErrors from "./api/errors/errors.js";
import usersRouter from "./api/users/routers/index.js";
import videosRouter from "./api/videos/routers/index.js";
import qualificationRouter from "./api/qualification/routers/index.js";
import { preordain } from "./api/users/controllers/get.js";
import { serverRead } from "./api/users/controllers/get.js";

const app = express(); 

//API´s
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
app.get("/", serverRead);
app.use("/api", usersRouter);
app.use("/api", videosRouter);
app.use("/api", qualificationRouter);

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