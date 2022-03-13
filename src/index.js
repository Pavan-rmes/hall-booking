import {MongoClient} from "mongodb"
import express from "express"
import dotenv from "dotenv"
import {roomRoute} from "./routes/roomgen.js"

dotenv.config()

const app = express()

app.listen(process.env.PORT,()=>console.log(`Server listening on port ${process.env.PORT}`))
console.log(process.env.MONGO_DB)
async function createConnection(){
    const client = new MongoClient(process.env.MONGO_DB)
    await client.connect();
    console.log("DB connected")
    return client;
}

app.use("/room",roomRoute)

app.get("/",(req,res)=>{
    res.send("hello")
})

export const client  = await createConnection()
