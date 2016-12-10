/**************************************
* Module for notifying browser plugins 
*
**************************************/
module.exports = function () {
    console.log("Browser Eextension notification module loaded"); 
    
    const INCOMMING_POT_NOTIFICATION_EVENT = 'incommingPotNotification';
    const POT_READY_NOTIFICATION_EVENT = 'potReadyNotification';
    const INCOMMING_POT_EVENT = 'incommingPot';
    const POT_READY_EVENT = 'potReady';

    var simplebus = require('simplebus');
    var client = simplebus.createClient(8181);
    
    var WebSocketServer = require("websocketserver");
    var server = new WebSocketServer("all", 9000);
    
    server.on("connection", function(id) {
        console.log("User connected id: "+ id);
    });
    
    server.on("closedconnection", function(id) {
        console.log("Connection " + id + " has left the server");
    });
    
    /* Events */  
    client.start(function(){
    	client.subscribe({ type: INCOMMING_POT_NOTIFICATION_EVENT }, function(msg) { 
        	server.sendMessage("all", JSON.stringify({type: INCOMMING_POT_EVENT, potId: msg.potId}));
    	});
    
    	client.subscribe({ type: POT_READY_NOTIFICATION_EVENT }, function(msg) { 
       	 	server.sendMessage("all", JSON.stringify({type: POT_READY_EVENT, potId: msg.potId}));
    	});
    });
};
