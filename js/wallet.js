function getWalletData() {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "wallet", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return PromiseRejectionEvent({'status':response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    return resolve(response);
                })
            })
                .catch(err => {
                    return reject({'error':err});
                })
    })
}

function getTransactionData() {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "wallet/" + "transaction", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            }
        })
            .then(response => {
                if (response.status !== 200) {
                    console.error("Failed")
                    return PromiseRejectionEvent({'status':response.status});
                }
                response.json().then(response => {
                    console.log(response);
                    return resolve(response);
                })
            })
                .catch(err => {
                    return reject({'error':err});
                })
    })
}

function withdraw(amount, noRek) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "wallet/" + "withdraw", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            },
            // "body": '{\n' + 
            //     '"amount: "' + amount + ',\n' +
            //     '"noRekening"' + noRek +
            //     '\n}'
            "body": JSON.stringify({
                amount,
                noRekening : noRek
            })
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

function topup(amount, noRek) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "wallet/" + "topup?strategy=ATM", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            },
            // "body": '{\n' + 
            //     '"amount: "' + amount + ',\n' +
            //     '"noRekening"' + noRek +
            //     '\n}'
            "body": JSON.stringify({
                amount,
                noRekening : noRek
            })
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

function topup(amount, noCC, noCVV) {
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "wallet/" + "topup?strategy=CC", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            },
            // "body": '{\n' + 
            //     '"amount: "' + amount + ',\n' +
            //     '"noRekening"' + noRek +
            //     '\n}'
            "body": JSON.stringify({
                amount,
                noKartu : noCC,
                cvv : noCVV 
            })
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
   