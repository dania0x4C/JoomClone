import express from "express";
import { WebSocketServer } from "ws";
import http from "http";
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));

const handleListen = () => console.log(`Listening on http://localhost:3000`);

const server = http.createServer(app); //서버에서 http 사용

const wss = new WebSocketServer({ server }); // 서버에서 http+webSocket 동시 사용(protocol 두개 사용)

function onSocketClose() {
  console.log("Disconnected from the Browser");
}

const sockets = [];

wss.on("connection", socket => {
  sockets.push(socket);
  console.log("Connected to browser");
  socket.on("close", onSocketClose);
  socket.on("message", message => {
    sockets.forEach(aSocket => aSocket.send(message.toString("utf8")));
  });
}); //wss연결되었을때 작동하는 함수

server.listen(3000, handleListen);
