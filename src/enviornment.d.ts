declare global{
    namespace NodeJS{
        interface ProcessEnv{
            PORT:number;
            MONGO_URI:string;
            NODE_ENV:"development" | "production";
        }
    }
}
export{}
