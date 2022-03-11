import express from "express"
import {createRoom,checkRoomBooked,bookRoom,getAllRoomStatus} from "./helper.js"

export const roomRoute = express.Router()

roomRoute.post("/create",express.json(),(req,res)=>{
    const roomData = req.body;
    // const roomName = roomData.name; 
    const response = createRoom(roomData)
    res.send(response)
})

roomRoute.post("/book",(req,res)=>{
    const roomData = req.body;
    if(checkRoomBooked(roomData)){
        res.send({status:"Room not available for booking at this time"});
        return;
    }
    const response = bookRoom(roomData);
    res.send(response)
})

roomRoute.get("/roomstatus",async (req,res)=>{
    const response = await getAllRoomStatus()
    res.send(response)
})

