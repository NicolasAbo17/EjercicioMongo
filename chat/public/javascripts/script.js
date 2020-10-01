const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (msg) => {
  renderMessages(JSON.parse(msg.data));
};

const renderMessages = (data) => {
  if (!data[0]["author"]) {
    document.getElementById("err").innerHTML = `<h4> ${data}</h4>`;
  } else {
    const html = data
      .map(
        (message) => `<h4>${message.author}: </h4> <p>${message.message}</p>`
      )
      .join(" ");
    document.getElementById("messages").innerHTML = html;
  }
};

const handleSubmit = (evt) => {
  evt.preventDefault();
  const author = document.getElementById("author");
  const message = document.getElementById("message");
  ws.send(JSON.stringify({ author: author.value, message: message.value }));
  message.value = "";
};

const form = document.getElementById("form");
form.addEventListener("submit", handleSubmit);