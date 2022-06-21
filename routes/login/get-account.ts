
import { FastifyInstance } from "fastify";
import { server } from "../../server"; 
//profile user
export function addLoginRoutes(server:FastifyInstance){
    server.get('/login', async (request:any,reply:any)=>{
        return {hey:"you are logged in "}
   });

}
