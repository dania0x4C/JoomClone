import { Socket } from "dgram";
import express from "express";
import http from "http";

import { Server } from "socket.io";

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const httpServer = http.createServer(app); //서버에서 http 사용
//const wss = new WebSocketServer({ server }); // 서버에서 http+webSocket 동시 사용(protocol 두개 사용)
const wsServer = new Server(httpServer);

wsServer.on("connection", socket => {
  socket.on("enter_room", (roomName, done) => {// 이 방식은 함수를 front에서 실행시킴 그렇게 해서 보안 문제를 해결
    // 간단하게 emit한 정보를 받아올 수 있음
    console.log(roomName);
    setTimeout(() => {
      done("TimeOut!");
    }, 10000);
  });
});


// function onSocketClose() {
// console.log("Disconnected from the Browser");
// }
//on(eventName, (payload, function))// 중간에 추가 가능   

// const sockets = [];
// wss.on("connection", socket => {//socket.on은 call
//   sockets.push(socket);//프론트로 data Push
//   socket["nickname"] = "Anon"; // socket의 key값을 []로 지정
//   console.log("Connected to browser");
//   socket.on("close", onSocketClose);// 연결을 끊어주기
//   socket.on("message", message => {
//     const parsed = json.parse(message); //여기가 이해가 안 됨 parse의 역할
//     switch (message.type) {
//       case "new_message":
//         sockets.forEach(aSocket =>
//           aSocket.send(
//             `${socket.nickname}: ${message.payload.toString("utf8")}` // 다른 브라우저에 message 보내기
//           )
//         );
//       case "nickname":
//         socket["nickname"] = message.payload; //socket에 정보를 추가하는 방법
//     }
//   });
// }); //wss연결되었을때 작동하는 함수

httpServer.listen(3000, handleListen);
