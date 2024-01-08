const socket = io(); // back-end의 io와 연결

welcome = document.querySelector("welcome");
form = document.querySelector("form");
function backEndDone(msg){
  console.log(`back_end say:`, msg)
}
function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, backEndDone); //client에게 event 전달
  socket.input = "";
}
//emit("eventName, payload, function")
form.addEventListener("submit", handleRoomSubmit);
