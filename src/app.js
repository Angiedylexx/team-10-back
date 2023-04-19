import express from "express";
import mongoose from "mongoose"; 
import { port, mongodb_uri } from "./config/index.js";

//Establece const
const app = express();

app.get("/", (request, response, error) => {
  response.send("Status:OK")
})

//Base de Datos
mongoose
.connect(mongodb_uri) 
.then(() => console.log("Database is Connected")) 
.catch((error) => console.error(error));


app.listen(port, (error) => 

  if(error) {
    console.log("Server Error: Failed");
    process.exit(1);
  }
  console.log("Server listening in port " + port);
})

