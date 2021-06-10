function getRoomList() {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "chat", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    reject(response)
                }
                response.json().then(response => {
                    resolve(response)
                })
            })
            .catch(err => {
                reject(err)
            });
    })

}

function createRoom(receiver) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "chat/createRoom/" + receiver, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    reject(response)
                }
                response.json().then(response => {
                    console.log(response);
                    resolve(response)
                })
            })
            .catch(err => {
                reject(err)
            });
    })
}

function getRoomMessages(roomId) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "chat/" + roomId, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    reject(response);
                }
                response.json().then(response => {
                    console.log(response);
                    resolve(response);
                })
            })
            .catch(err => {
                reject(err)
            });
    })
}

function renderChatList(recipient, lastDate, lastMsg, roomId) {
    return `                <div class="chat_list" onclick="handleOpenRoom(${roomId})" id="room-${roomId}">
                                <div class="chat_people">
                                    <div class="chat_ib">
                                        <h5>${recipient} <span class="chat_date">${lastDate}</span></h5>
                                        <p>${lastMsg}</p>
                                    </div>
                                </div>
                            </div>
    `
}

function sendMessage(roomId, msg) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "chat/" + roomId, {
            "method": "POST",
            "body": msg,
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed");
                    reject(response);
                }
                response.json().then(response => {
                    console.log(response);
                    resolve(response);
                })
            })
            .catch(err => {
                reject(err)
            });
    })
}

function renderIncomingMsgHtml(msg, time) {
    return `                <div class="incoming_msg">
                                <div class="received_msg">
                                    <div class="received_withd_msg">
                                        <p>${msg}</p>
                                        <span class="time_date">${time}</span></div>
                                </div>
                            </div>`
}

function renderOutgoingMsgHtml(msg, time) {
    return `                <div class="outgoing_msg">
                                <div class="sent_msg">
                                    <p>${msg}</p>
                                    <span class="time_date">${time}</span> </div>
                            </div>`
}


function renderMsgList(roomId) {
    return new Promise((resolve, reject) => {
        getRoomMessages(roomId).then(data => {
            let htmlData = "";

            data.sort(function (a,b) {
                    return a?.timeStamp - b?.timeStamp
            })

            for(let i = 0; i < data.length; i++) {
                const obj = data[i];
                if (obj?.sender?.id == getUserUid()) htmlData += renderOutgoingMsgHtml(obj.message, obj.timeStamp);
                else htmlData += renderIncomingMsgHtml(obj.message, obj.timeStamp);

            }
            resolve(htmlData);

        })
    })
}

function renderChatRoom() {
    return new Promise((resolve, reject) => {
        getRoomList().then(data => {
            let htmlData = "";

            data.sort(function (a,b) {
                if (!a?.lastSentMessage?.timeStamp) {
                    return -1
                } else if (!b?.lastSentMessage?.timeStamp) {
                    return 1
                } else {
                    return a?.lastSentMessage?.timeStamp - b?.lastSentMessage?.timeStamp
                }
            })

            for(let i = 0; i < data.length; i++) {
                const obj = data[i];
                let recipient = "";
                if (obj?.participantA?.id == getUserUid()) recipient = obj?.participantB?.name;
                else recipient = obj?.participantA?.name;
                console.log(obj)

                if (obj?.lastSentMessage)  htmlData += renderChatList(recipient, obj?.lastSentMessage?.timeStamp, obj?.lastSentMessage?.message, obj?.id);
                else htmlData += renderChatList(recipient, "-", "No Message Yet", obj?.id);
            }
            resolve(htmlData);
        })

    })
}