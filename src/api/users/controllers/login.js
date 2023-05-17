import User from "../../../models/user.js";
import { schemaLogin } from "./validation.js";

const login = async (request, response, next) => {

  // Login
  const {error} = schemaLogin.validate(request.body);
  if (error) { 
  return response.status(400).json({error: "Bad Request"}) 
  };

  //Acceso
  const userValidation = await User.findOne({ email:request.body.email , rol:request.body.rol }) 
  if (!userValidation) return response.status(400).json({error: "Unauthorized Access"});
   response.status(200).json("Welcome " + userValidation.name)

 next (error);
}

export default login ;