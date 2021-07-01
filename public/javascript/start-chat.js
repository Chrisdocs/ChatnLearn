async function chatStartHandler(event) {
    event.preventDefault();

    fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    
    console.log('click')
}

document.querySelector('#chat-btn').addEventListener('click', chatStartHandler);