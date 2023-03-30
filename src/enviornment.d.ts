import { Secret } from "jsonwebtoken";

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT:any;
            MONGO_URI:string;
            NODE_ENV:"development" | "production";
            JWT_SECREAT_KEY:Secret;
        }
    }
}
export{}
