import http from "http";
import { SocketIO } from "socket.io";
import express from "express";

const appVideo = express();

appVideo.get("/*", (_,res) => res.redirect("/"));

const httpServer = http.createServer(appVideo);

const wsServer = SocketIO(httpServer);

wsServer.on("connection", socket => {
    socket.on("join_room", (roomName, done) => {
        socket.join(roomName);
        done();
        socket.to(roomName).emit("welcome");
    });
    socket.on("offer", (offer, roomName)=>{
        socket.to(roomName).emit("offer", offer);
    });
});

const handleListen = () => {
    console.log(`Listening on http://localhost:3000`);
}
httpServer.listen(3000, handleListen);