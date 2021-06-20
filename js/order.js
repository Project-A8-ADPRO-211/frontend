

function loadOrdersByBuyer(){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/all?strategy=buyer", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
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

function loadOrdersBySeller(){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/all?strategy=seller", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
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

function postOrder(seller_id){
    let payloadObj = {
        "idSeller": Number(seller_id)
    }
    let payloadJson = JSON.stringify(payloadObj)
    let requestStatus = 0
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/checkout", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + getToken()
            },
            "body": payloadJson
        })
            .then(response => {
                requestStatus = response.status
                console.log("req status:", requestStatus)
                console.log(response)
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': requestStatus});
                }
                response.json().then(data => {
                    console.log("req status next:", requestStatus)
                    console.log(data);
                    console.log(data.status)
                    return resolve({'status': requestStatus, 'id':data.id});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function postItem(order_id, qty, product_id){
    let payloadObj = {
        "quantity": Number(qty),
        "productId": Number(product_id)
    }
    let payloadJson = JSON.stringify(payloadObj)
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/create-item", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": payloadJson
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

function getOrderById(orderId){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + orderId, {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
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

function confirmOrder(order_id){
    let requestStatus = 0
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/confirm", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                requestStatus = response.status
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': requestStatus});
                }
                response.json().then(data => {
                    console.log(data);
                    return resolve({'status': requestStatus, 'id': data.id});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function cancelOrder(order_id){
    let requestStatus = 0
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/cancel", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                requestStatus = response.status
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': requestStatus});
                }
                response.json().then(data => {
                    console.log(data);
                    return resolve({'status': requestStatus, 'id': data.id});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function shipOrder(order_id){
    let requestStatus = 0
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/ship", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                requestStatus = response.status
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': requestStatus});
                }
                response.json().then(data => {
                    console.log(data);
                    return resolve({'status': requestStatus, 'id': data.id});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function deliverOrder(order_id){
    let requestStatus = 0
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/deliver", {
            "method": "PUT",
            "headers": {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                requestStatus = response.status
                if (response.status !== 200) {
                    console.error("Failed")
                    return reject({'status': requestStatus});
                }
                response.json().then(data => {
                    console.log(data);
                    return resolve({'status': requestStatus, 'id': data.id});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}
