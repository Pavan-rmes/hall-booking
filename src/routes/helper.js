import { client } from "../index.js";


async function createRoom(roomData){
    const response = await client.db("node-task2").collection('rooms').insertOne(roomData)
    return response;
}

async function bookRoom(roomData){
    const getRoom = await client.db("node-task2").collection("rooms").findOne({id:roomData.id})
    if(getRoom){
        const response = await client.db("node-task2").collection("booked").insertOne(roomData)
        return response;
    }
    return {status:"Room dosen't exist"}
}

async function checkRoomBooked(roomData){
    const getRoomDataFromDb = await client.db("node-task2").collection("rooms").find({id:roomData.id}).toArray()
    console.log(getRoomDataFromDb);
    return true;
}
async function getAllRoomStatus(){
    const getRoomDataFromDb = await client.db("node-task2").collection("rooms").find().toArray()
    return getRoomDataFromDb;
}

export {createRoom,bookRoom,checkRoomBooked,getAllRoomStatus}
