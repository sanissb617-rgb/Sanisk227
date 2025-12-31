// 1. Aika Sako zuwa Group
function sendMsg() {
    const msgInput = document.getElementById('group-input');
    const message = msgInput.value;
    const user = auth.currentUser;

    if (message.trim() !== "" && user) {
        // Adana sako a Database
        const chatRef = db.ref('group_chats');
        chatRef.push({
            sender: user.email.split('@')[0], // Lambar wayar mutum
            text: message,
            timestamp: Date.now()
        });
        msgInput.value = ""; // Share wajen rubutu
    }
}

// 2. Sauraran Sabbin Sakonni (Real-time Listener)
function listenForMessages() {
    const msgBox = document.getElementById('msg-box');
    db.ref('group_chats').on('value', (snapshot) => {
        let html = "";
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const isMe = data.sender === auth.currentUser.email.split('@')[0];
            
            // Tsarin yadda sako zai fito (WhatsApp Style)
            html += `
                <div style="display: flex; flex-direction: column; align-items: ${isMe ? 'flex-end' : 'flex-start'}; margin-bottom: 10px;">
                    <div style="background: ${isMe ? '#dcf8c6' : 'white'}; padding: 8px 12px; border-radius: 10px; max-width: 70%; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">
                        <small style="color: #075e54; font-weight: bold;">${data.sender}</small><br>
                        <span>${data.text}</span>
                    </div>
                </div>
            `;
        });
        msgBox.innerHTML = html;
        msgBox.scrollTop = msgBox.scrollHeight; // Kai tsaye zuwa kasa
    });
}

// Kira wannan aikin lokacin da mutum ya shiga (Login)
auth.onAuthStateChanged((user) => {
    if (user) {
        listenForMessages();
    }
});
                                              
