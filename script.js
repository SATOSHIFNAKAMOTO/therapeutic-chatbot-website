let OPENAI_API_KEY_PART_1 = 'sk-uRhIYgh'; // Replace with your actual key part 1
let OPENAI_API_KEY_PART_2 = '51Z6a38KtA5MOT3BlbkFJyqzbz3F3TO8U6f8ffant'; // Replace with your actual key part 2

function sendMessage() {
    let message = document.getElementById("messageInput").value;
    document.getElementById("messageInput").value = ""; 

    displayMessage(message, 'user-message'); 

    fetch('https://api.openai.com/v1/chat/completions', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY_PART_1 + OPENAI_API_KEY_PART_2}`  
        },
        body: JSON.stringify({
            model: "gpt-4-turbo-preview", 
            messages: [{ role: "user", content: message }], 
            max_tokens: 100,  
            temperature: 0.7
        })
    })
    .then(response => response.json())
    .then(data => {
        // You might need to adjust this line based on the response structure
        displayMessage(data.choices[0].message.content.trim(), 'bot-message');  
    })
    .catch(error => console.error('Error:', error));  
}

function displayMessage(message, messageClass) {
    const chatMessages = document.querySelector('.chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', messageClass);
    messageDiv.innerText = message;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight; 
}
