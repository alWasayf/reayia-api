
import fastify from "fastify";
import { addLoginRoutes } from "./routes/login/get-account";
import { addbabySitter } from "./routes/babySitter/add-babySitter";
// Require the framework and instantiate it
export  const server= require('fastify')({ logger: true })

// Declare a route
server.get('/', async (request:any, reply:any) => {
  return { hello: 'world' }
});
addLoginRoutes(server);
addbabySitter(server);
/*
server.post('/login',async (request:any, reply:any)=>{
          const contacts = ['Ahmad','Ali','Amani','Hadi'];
          return contacts;
});
server.get('/login',async (request:any, reply:any)=>{
  const contacts = ['Ahmad','Ali','Amani','Hadi'];
  return contacts;
});*/

// Run the server!
