/**************************************
* Module which maps a id to a coffee
* pot
*
**************************************/
module.exports = function () {
    console.log("Mapping Module loaded");

    const INCOMMING_POT_NOTIFICATION_EVENT = 'incommingPotNotification';
	const POT_READY_NOTIFICATION_EVENT = 'potReadyNotification';
    const START_COUNTDOWN_EVENT = 'startCountdown';
    const MAP_EVENT = 'map';

    var simplebus = require('simplebus');
    var client = simplebus.createClient(8181);

	var startedCountdowns = [];
	
    /* Map function */
    function mapper(tagId) {
        console.log(tagId)
        switch (tagId) {
            case '0000029E0995':
            case '000002E6A743':
                console.log("Kanne 1 da");
				if(startedCountdowns.indexOf(1) == -1) {
					startedCountdowns.push(1);
					client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 1 });
					client.post({ type: START_COUNTDOWN_EVENT, time: 480, potId: 1 }); // set countdown for 8 minutes
				}
                break;
            case '000002B00BB9':
            case '000002D82EF4':
                console.log("Kanne 2 da");
				if(startedCountdowns.indexOf(2) == -1) {
					startedCountdowns.push(2);
					client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 2 });
					client.post({ type: START_COUNTDOWN_EVENT, time: 480, potId: 2 });
				}
                break;
            case '000002EC0BE5':
            case '000002E537D0':
                console.log("Kanne 3 da");
				if(startedCountdowns.indexOf(3) == -1) {
					startedCountdowns.push(3);
					client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 3 });
					client.post({ type: START_COUNTDOWN_EVENT, time: 480, potId: 3 });
				}
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
		client.subscribe({ type: POT_READY_NOTIFICATION_EVENT }, function(msg) { 
        	var index = startedCountdowns.indexOf(msg.potId);
			startedCountdowns.splice(index, 1);
    	});
    });
};
