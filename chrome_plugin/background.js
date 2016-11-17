// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

var INCOMMING_POT_EVENT = "incommingPot";
var POT_READY_EVENT = "potReady";
var WS_URL = "ws://127.0.0.1:9000"

var connection = new WebSocket(WS_URL);

connection.onopen = function () {
    console.log("connection oppened");
};

connection.onerror = function (error) {
    console.log("Server not available");
};

connection.onmessage = function (message) {
    // try to decode json (I assume that each message from server is json)
    try {
        var json = JSON.parse(message.data);
    } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
    }

    // Get the selected pot nr
    var potNr = localStorage.getItem("potNr");

    // Set extension icon 
    if(json.type == INCOMMING_POT_EVENT && json.potId == potNr)
    {
        chrome.browserAction.setIcon({path : {
            "19": "icons/progress/progress19x.png",
            "38": "icons/progress/progress38x.png"
        }});
    }
    else if(json.type == POT_READY_EVENT && json.potId == potNr)
    {
        chrome.browserAction.setIcon({path : {
            "19": "icons/ready/ready19x.png",
            "38": "icons/ready/ready38x.png"
        }});
    }
};