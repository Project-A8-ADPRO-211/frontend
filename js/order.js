

function loadOrdersByBuyer(){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/all?strategy=buyer", {
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

function loadOrdersbySeller(){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/all?strategy=seller", {
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

function createOrder(seller_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/checkout", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Authorization": "JWT " + getToken()
            },
            "body": {
                "idSeller": seller_id
            }
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

function postItem(order_id, qty, product_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/create-item", {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
            },
            "body": {
                "quantity":qty,
                "productId":product_id
            }
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

function confirmOrder(order_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/confirm", {
            "method": "PUT",
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
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function cancelOrder(order_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/cancel", {
            "method": "PUT",
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
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function shipOrder(order_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/ship", {
            "method": "PUT",
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
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}

function deliverOrder(order_id){
    return new Promise((resolve, reject) => {
        fetch(authBaseUrl + "order/" + order_id + "/deliver", {
            "method": "PUT",
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
                    return resolve({'status': response.status});
                })
            })
            .catch(err => {
                return reject({'error': err});
            });
    })
}
