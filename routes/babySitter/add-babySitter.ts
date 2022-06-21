import { FastifyInstance } from "fastify";
import { request } from "http";

//Add a babySitter appointment
export function addbabySitter(server:FastifyInstance){
    server.put('/babySitter/appointment',(request,reply)=>{
        return{hi:"You add a babySitter appointment"};
    });
}
