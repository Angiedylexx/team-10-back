import User from "../../../models/user.js";
import {schemaUpdate} from "./validation.js";

/**
 * @openapi 
 *  components:
 *   schemas:
 *    UserUpate:
 *     type: object
 *     properties:
 *      firstName:
 *        type: string
 *      lastName:
 *        type: string
 *      email:
 *        type: string
 *      rol:
 *        type: string
 *     required:
 *      - firstName
 *      - lastName
 *     example:
 *      firstName: nicole
 *      lastName: castro
 * 
 */

/**
 * @openapi
 * /api/users/{id}:
 *  put:
 *   summary: Update a user
 *   tags: [UserUpate]
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: The user id
*   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/UserUpate'
 *   responses:
 *    201:
 *     description: User Update
 *    400:
 *     description: Something went wrong
 *    404:
 *     description: User Not Found
 *    500:
 *     description: UnKwnown Error 
 */

const userEdit = async (request, response, next) => { 
   const id = request.params.id
   const {error} = schemaUpdate.validate(request.body);
     if (error) { 
     return response.status(400).json({error: error.details[0].message}) 
    }
  
  try { 
     const userUpdate = await User.findByIdAndUpdate(id , { firstName:request.body.firstName.toUpperCase() , lastName:request.body.lastName.toUpperCase() }, {new:true});
     if (!userUpdate) {
      return response.status(404).json({
        message:"User Not Found"})
      }
      return response.status(201).json({
        update:("Ok"),
        data: userUpdate
     })
   } catch (error) { 
     next (error);
   };
 }

export default userEdit;


