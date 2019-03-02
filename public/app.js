const status = document.getElementById('status');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');


const ws = new WebSocket('ws://localhost:3000');


function setStatus(value) {
    status.innerHTML = value;
}

function printMessage(value) {
    const li = document.createElement('li');

    li.innerHTML = value;
    messages.appendChild(li);
}


form.addEventListener("submit", event => {
    if (input.value === 'open') {
      location.reload()
    } else {
        event.preventDefault()
    }

    ws.send(input.value)
    input.value = ''
})


ws.onopen = (op) => {
    setStatus('Online')
    console.log(op)
};

ws.onclose = (close) => {
    setStatus('Offline')
    console.log('close',close)
};

ws.onmessage = res => {
    printMessage(res.data)
    console.log(res,'res')
};