import express from "express"
import {createRoom,checkRoomBooked,bookRoom,getAllRoomStatus} from "./helper.js"

export const roomRoute = express.Router()

roomRoute.post("/create",express.json(),async (req,res)=>{
    const roomData = req.body;
    // const roomName = roomData.name; 
    const response = await createRoom(roomData)
    res.send(response)
})

roomRoute.post("/book",express.json(),async (req,res)=>{
    const roomData = req.body;
    const response = await bookRoom(roomData);
    res.send(response)
})

roomRoute.get("/roomstatus",async (req,res)=>{
    const response = await getAllRoomStatus()
    res.send(response)
})

