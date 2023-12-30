const socket = new WebSocket(`ws://${window.location.host}`);

socket.addEventListener("open", () => {
  console.log("Connected to server");
});

socket.addEventListener("message", message => {
  console.log("I got", message.data, "from server");
});

socket.addEventListener("close", () => {
  console.log("unConnected to server");
});

setTimeout(()=>{
    socket.send("hello from to browser")
}, 1000);