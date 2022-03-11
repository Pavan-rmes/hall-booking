import { client } from "../index.js";


async function createRoom(roomData){
    const response = await client.db("node-task2").collection('rooms').insertOne(roomData)
    return response;
}

function getTime(date,time){
    return new Date(`${date} ${time}`)
}

async function bookRoom(roomData){
    const getRoom = await client.db("node-task2").collection("rooms").findOne({roomid:roomData.roomid})
    let startDate = new Date(`${roomData.date} ${roomData.start}`);let endDate = new Date(`${roomData.date} ${roomData.end}`)
    if(!getRoom){
        return {status:"Room dosen't exist"}
    }
    if(startDate.toString() === "Invalid Date" || endDate.toString() === "Invalid Date"){
        return {status:"Invalid Date range"}
    }
    if(!roomData.customerName){
        return {status:"Customer name is compulsory"}
    }
    if(await checkRoomBooked(roomData,startDate,endDate)){
        return {status:"Room not available for booking at this time"};
    }
    const response = await client.db("node-task2").collection("booked").insertOne(roomData)
    return response;
}

async function checkRoomBooked(roomData,startDate,endDate){
    const getRoomDataFromDb = await client.db("node-task2").collection("booked").find({roomid:roomData.roomid}).toArray()
    const isRoomBooked = getRoomDataFromDb.filter((room)=>{
        if(startDate >= getTime(room.date,room.start) && startDate < getTime(room.date,room.end)){
            return true;
        }
        else if(endDate > getTime(room.date,room.start) && endDate <= getTime(room.date,room.end)){
            return true;
        }
        else{
            return false
        }
    })
    return isRoomBooked.length;
}
async function getAllRoomStatus(){
    const getRoomDataFromDb = await client.db("node-task2").collection("rooms").find().toArray()
    return getRoomDataFromDb;
}

export {createRoom,bookRoom,checkRoomBooked,getAllRoomStatus}
