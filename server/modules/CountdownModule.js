/**************************************
* Module which start a countdown 
*
**************************************/
module.exports = function () {
    console.log("Countdown Module loaded");
    
    var simplebus = require('simplebus');
    var client = simplebus.createClient(8181);

    
    const POT_READY_NOTIFICATION_EVENT = 'potReadyNotification';
    const START_COUNTDOWN_EVENT = 'startCountdown';
    
    /* Timer function */
    function startTimer(duration, potId) {
        var timer = duration, minutes, seconds;
        var intervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            /* Display timeout */
            console.log(minutes + ":" + seconds);

            if (--timer < 0) {
                console.log("Kaffee fertig!");
                client.post({ type: POT_READY_NOTIFICATION_EVENT, potId: potId });
                clearInterval(intervalId);
            }
        }, 1000);
    }
  
    /* Events */
    client.start(function(){
    	console.log("Client started");
    	client.subscribe({ type: START_COUNTDOWN_EVENT }, function(msg) { 
		console.log(msg);
        	console.log("starte Countdown...");
        	startTimer(msg.time, msg.potId);
    	});
    });
};
