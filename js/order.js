const testing = !!(location.href.includes("localhost") || location.href.includes("127.0.0.1"))

const authBaseUrl = testing ? "http://localhost:8080/" : "https://adpros8-prod.herokuapp.com/"

let userRole = "not logged in";

function getOrderUserRole(){
    return userRole;
}
function setOrderUserRole(role){
    userRole = role;
}

function loadOrdersbyBuyer(token){
    $.ajax({
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        },
        url: authBaseUrl + "order/all?strategy=buyer",
        success: function(orders){
            console.log('success', orders);

        }
    })
}

function loadOrdersbySeller(token){
    $.ajax({
        method:"GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "JWT " + token
        },
        url: authBaseUrl + "order/all?strategy=seller",
        success: function(orders){
            console.log('success', orders);

        }
    })
}
