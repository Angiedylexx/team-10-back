import VideoProject from "../../../models/video.js";

const videoDelete = async (request, response, next) => { 
  const id = request.params.id
  try { 
     const videoDelete = await VideoProject.findByIdAndDelete(id);
     response.status(200).json({
       delete:("Ok"),
       data: videoDelete
     })
   } catch (error) { 
     next (error);
   };
 }

export default videoDelete;