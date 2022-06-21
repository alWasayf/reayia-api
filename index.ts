import {server} from './server';

server.listen({ port:3000 }).catch((err:any)=>{
    server.log.error(err);
    process.exit(1);
});