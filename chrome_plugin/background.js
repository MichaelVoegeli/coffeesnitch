// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

var INCOMMING_POT_EVENT = "incommingPot";
var POT_READY_EVENT = "potReady";
var WS_URL = "ws://127.0.0.1:9000"

// Initial connect
tryConnect();

/**
 * Try to connect to websocket
 */
function tryConnect() {
    var connection = new WebSocket(WS_URL);

    connection.onopen = function(evt) { onOpen(evt) };
    connection.onmessage = function(evt) { onMessage(evt) };
    connection.onerror = function(evt) { onError(evt) };
    connection.onclose = function(evt) { onClose(evt) };
}

/**
 * On open 
 */
function onOpen() {
    console.log("CONNECTED");
};

/**
 * On Error 
 */
function onError(error) {
    console.log("Server not available");
};

/**
 * On Message 
 */
function onMessage(message) {
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

/**
 * On Close try to reconnect again 
 */
function onClose(evt)
{
    console.log("DISCONNECTED");
    // Wait 10 seconds before try to reconnect 
    setTimeout(function() {
        tryConnect();
    }, 10000);
}

