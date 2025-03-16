const socket = io(); // Connects to backend

const chatBox = document.getElementById("chat-box");
const messageInput = document.getElementById("message-input");

socket.on("message", (message) => {
    const msgDiv = document.createElement("div");
    msgDiv.textContent = message;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit("message", message);
        messageInput.value = "";
    }
}

messageInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
});
