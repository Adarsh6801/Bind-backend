import { Secret } from "jsonwebtoken";

declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT:any;
            MONGO_URI:string;
            NODE_ENV:"development" | "production";
            JWT_SECREAT_KEY:Secret;
            EMAIL_OTP:string;
            APP_PASSWORD_EMAIL:string;
            CLOUD_NAME:string;
            API_KEY:string;
            API_SECRET:string
        }
    }
}
export{}
