const testing = !!(location.href.includes("localhost") || location.href.includes("127.0.0.1"))

const authBaseUrl = testing ? "http://localhost:8080/" : "https://adpros8-prod.herokuapp.com/"

let loginState = false;
let loginAccType = "";
let userUID;

let firstLoad = true;

function signOutGoogle() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}

function getLoggedInStatus() {
    return loginState;
}

function getUserUid() {
    return loginState ? userUID : -1;
}

function getUserAccType() {
    return loginState ? loginAccType : "";
}

function isAdmin() {
    return loginState && (loginAccType === "admin");
}

function isSeller() {
    return loginState && (loginAccType === "seller");
}

function isBuyer() {
    return loginState && (loginAccType === "buyer");
}

function getToken() {
    return localStorage.getItem("token");
}

function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenData");
    loginState = false;
    $('#orderbtn').hide();
    $('#checkoutbtn').hide();
    $('#profilebtn').hide();
    $('#walletbtn').hide();
    $('#logoutbtn').hide();
}

function logout() {
    removeToken();
    signOutGoogle();
    localStorage.setItem("cart", "[]")
    location.reload();
}

function loadLoginData() {
    tokenData = localStorage.getItem("tokenData");
    if (tokenData != null) {
        tokenData = JSON.parse(tokenData);
        if (tokenData.exp < (Date.now() / 1000)) {
            return removeToken();
        }
        loginAccType = tokenData["type"];
        userUID = tokenData["sub"]
        loginState = true;
        if (firstLoad && !location.href.includes("chat")) {
            jQuery('body').append("    <a onclick=\"openChatWindowReal()\" class=\"float-container bg-purple-500 hover:no-underline\">\n" +
                "        <i class=\"icon-chat float-btn\"><span class=\"font-medium\">chat</span></i>\n" +
                "    </a>")
            firstLoad = false;
        }
    } else {
        return removeToken();
    }
    $('#signupbtn').hide();
    $('#loginbtn').hide();

}


function openChatWindowReal(productId) {
    const chatWindow = window.open("chat.html", "Chat", "menubar=no,width=1142,height=706");
    if (productId != null) {
        setTimeout(function () {
            chatWindow.postMessage({"cmd": "new", "destination": productId});
        }, 1000);
    }
}

function getProfileData() {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "account", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    return resolve(response);
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function saveUser(token) {
    const decoder = new jwt_decode(token);
    console.log(decoder);
    localStorage.setItem("token", token);
    localStorage.setItem("tokenData", JSON.stringify(decoder));
    loadLoginData();
}

function signupGoogle(email, token, accType) {
    console.log(email, token);
    return new Promise(((resolve, reject) => {
        fetch(authBaseUrl + "signup/oauth", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": '{\n' +
                '\t"token": "' + token + '",\n' +
                '\t"accType": "' + accType + '"\n' +
                '}'
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    }))
}

function signupReg(name, email, password, type) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "signup", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": '{\n' +
                '\t"name": "' + name + '",\n' +
                '\t"email": "' + email + '",\n' +
                '\t"password": "' + password + '",\n' +
                '\t"type": "' + type + '"\n' +
                '}'
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function googleLogin(email, token) {
    if (getLoggedInStatus()) return;
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "login?strategy=google", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "{\"email\":\"" + email + "\",\"token\":\"" + token + "\"}"
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    saveUser(response.token);
                    return resolve({'loginState': loginState, 'accountType': loginAccType, 'accountOid': userUID});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    });

}

function passwordLogin(email, password) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "login?strategy=password", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            "body": "{\"email\":\"" + email + "\",\"password\":\"" + password + "\"}"
        })
            .then(response => {
                if (response.status !== 200) {
                    return reject({'status': response.status});
                }
                response.json().then(response => {
                    saveUser(response.token);
                    return resolve({'loginState': loginState, 'accountType': loginAccType, 'accountOid': userUID});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    });

}

window.gapi_onload = function () {
    gapi.load('auth2', function () {
        gapi.auth2.init();
    });
}
