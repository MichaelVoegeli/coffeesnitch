/**************************************
* Module which maps a id to a coffee 
* pot 
*
**************************************/
module.exports = function () {
    console.log("Mapping Module loaded"); 
    
    const INCOMMING_POT_NOTIFICATION_EVENT = 'incommingPotNotification';
    const START_COUNTDOWN_EVENT = 'startCountdown';
    const MAP_EVENT = 'map';

    var simplebus = require('simplebus');
    var client = simplebus.createClient(8181);
  
    /* Map function */
    function mapper(tagId) {
        switch (tagId) {
            case '0000028C028C':
                console.log("Kanne 1 da");
                client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 1 });
                client.post({ type: START_COUNTDOWN_EVENT, time: 10, potId: 1 });
                break;
            case '000002E6A743':
                console.log("Kanne 2 da");
                client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 2 });
                client.post({ type: START_COUNTDOWN_EVENT, time: 15, potId: 2 });
                break;
            default:
                console.log("Kanne nicht bekannt");
                break;
        }
    }
    
    /* Events */
    client.start(function(){
    	console.log("Client started");
    	client.subscribe({ type: MAP_EVENT }, function(msg) { 
        	mapper(msg.tagId);
    	});
    });
};
