/**************************************
* Module which maps a id to a coffee 
* pot 
*
**************************************/
module.exports = function (bus) {
    console.log("Mapping Module loaded"); 
    
    const INCOMMING_POT_NOTIFICATION_EVENT = 'incommingPotNotification';
    const START_COUNTDOWN_EVENT = 'startCountdown';
    const MAP_EVENT = 'map';
  
    /* Map function */
    function mapper(tagId) {
        switch (tagId) {
            case '0000028C028C':
                console.log("Kanne 1 da");
                bus.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 1 });
                bus.post({ type: START_COUNTDOWN_EVENT, time: 10, potId: 1 });
                break;
            case '000002E6A743':
                console.log("Kanne 2 da");
                bus.post({ type: INCOMMING_POT_NOTIFICATION_EVENT, potId: 2 });
                bus.post({ type: START_COUNTDOWN_EVENT, time: 15, potId: 2 });
                break;
            default:
                console.log("Kanne nicht bekannt");
                break;
        }
    }
    
    /* Events */
    bus.subscribe({ type: MAP_EVENT }, function(msg) { 
        mapper(msg.tagId);
    });
};