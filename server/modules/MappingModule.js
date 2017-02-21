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
        console.log(tagId)
        switch (tagId) {
            case '0000029E0995':
            case '000002E6A743':
                console.log("Kanne 1 da");
                client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 1 });
                client.post({ type: START_COUNTDOWN_EVENT, time: 580, potId: 1 }); // set countdown for 8 minutes
                break;
            case '000002D0A775':
            case '000002DE835F':
                console.log("Kanne 2 da");
                client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 2 });
                client.post({ type: START_COUNTDOWN_EVENT, time: 580, potId: 2 });
                break;
            case '000002EC0BE5':
            case '000002E537D0':
                console.log("Kanne 3 da");
                client.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 3 });
                client.post({ type: START_COUNTDOWN_EVENT, time: 580, potId: 3 });
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
