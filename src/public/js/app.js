const socket = new WebSocket(`ws://${window.location.host}`);

const messageList = document.querySelector("ul");
const messageForm = document.querySelector("#message");
const nickForm = document.querySelector("#nick");


socket.addEventListener("open", () => {
  console.log("Connected to server");
});

socket.addEventListener("message", message => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
});

socket.addEventListener("close", () => {
  console.log("unConnected to server");
});

messageForm.addEventListener("submit", function handleMessageSubmit(event) {
  event.preventDefault();
  const input = messageForm.querySelector("input");
  socket.send(input.value);
  input.value = "";
});

nickForm.addEventListener("submit", function handleNickSubmit(event) {
  event.preventDefault();
  const input = nickForm.querySelector("input");
  socket.send({
    // 같은 input을 하면 동시에 전부 받아지게 됨 그래서 json형태로 바꾸고 차이를 둘거임
    type: "nickname",
    payload: input.value, //이걸 다시 parsing하려면 console에서 json.strungify를 사용해서 찾는게 가능(parse)
  });
});
