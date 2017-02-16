// if user is running mozilla then use it's built-in WebSocket
window.WebSocket = window.WebSocket || window.MozWebSocket;

var INCOMMING_POT_EVENT = "incommingPot";
var POT_READY_EVENT = "potReady";
var connectedToServer = false;
var readyNotification = "ready-notification";

// Initial connect
tryConnect();

/**
 * Try to connect to websocket
 */
function tryConnect() {
    // Get the selected ip and port
    var ipAddr = localStorage.getItem("ipAddress");
    var port = localStorage.getItem("port");
    
    if(ipAddr && port) {
      var WS_URL = 'ws://' + ipAddr + ':' + port;
    
      console.log("TRY CONNECT TO: ", WS_URL);
    
      var connection = new WebSocket(WS_URL);

      connection.onopen = function(evt) { onOpen(evt) };
      connection.onmessage = function(evt) { onMessage(evt) };
      connection.onerror = function(evt) { onError(evt) };
      connection.onclose = function(evt) { onClose(evt) };
    }
    else {
        console.error("IP OR PORT NOT SPECIFIED!");
        chrome.browserAction.setIcon({path : {
            "19": "icons/notConnected/notConnected19b.png"
        }});
    }
}

/**
 * On open 
 */
function onOpen() {
    console.log("CONNECTED");
    connectedToServer = true;
    chrome.browserAction.setIcon({path : {
        "19": "icons/ready/ready19b.png",
        "38": "icons/ready/ready38b.png"
    }});
};

/**
 * On Error 
 */
function onError(error) {
    console.log("Server not available");
    connectedToServer = false;
    chrome.browserAction.setIcon({path : {
        "19": "icons/notConnected/notConnected19b.png"
    }});
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
            "19": "icons/empty/empty19.png",
            "38": "icons/empty/empty38.png"
        }});

        chrome.notifications.create('incommingPot', {
            type: 'basic',
            iconUrl: 'icons/empty/empty64.png',
            title: 'Kanne ' + potNr + ' wird befüllt!',
            message: 'Kanne ' + potNr + ' wird momentan befüllt.'
        }, function(notificationId) {});
    }
    else if(json.type == POT_READY_EVENT && json.potId == potNr)
    {
        chrome.browserAction.setIcon({path : {
            "19": "icons/ready/ready19b.png",
            "38": "icons/ready/ready38b.png"
        }});

        chrome.notifications.create('potReady', {
            type: 'basic',
            iconUrl: 'icons/ready/ready64b.png',
            title: 'Kanne ' + potNr + ' fertig!',
            message: 'Die Kanne ' + potNr + ' kann abgeholt werden.'
        }, function(notificationId) {});
    }
    else {
        console.error('POT NOT KNOWN OR SET');
    }
};

/**
 * On Close try to reconnect again 
 */
function onClose(evt)
{
  console.log("DISCONNECTED");
  connectedToServer = false;
  chrome.browserAction.setIcon({path : {
    "19": "icons/notConnected/notConnected19b.png"
  }});
    // Wait 10 seconds before try to reconnect 
    /*setTimeout(function() {
        tryConnect();
    }, 10000);*/
}

/**
 * Listen to events sent by popup.js
 */
chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
  if (msg.tryConnect) {
    tryConnect();
  }
});

chrome.browserAction.onClicked.addListener(()=> {
  var clearing = browser.notifications.clear(cakeNotification);
  clearing.then(() => {
    console.log("cleared");
  });
});

chrome.notifications.onButtonClicked.addListener((id, index) => {
  browser.notifications.clear(id);
  console.log("You chose: " + buttons[index].title);
});

