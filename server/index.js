/* Create the event bus */
var simplebus = require('simplebus');
var bus = simplebus.createBus(1000);

/* Load json adapter */
var JsonAdapter = require("./adapter/JsonAdapter");
var json = new JsonAdapter(bus);

/* Load mapping module */
var MappingModule = require("./modules/MappingModule");
var mapping = new MappingModule(bus);

/* Load countdown module */
var CountownModule = require("./modules/CountdownModule");
var coundown = new CountownModule(bus);

/* Load mapping module */
var BrowserExtensionNotificationModule = require("./modules/BrowserExtensionNotificationModule");
var benm = new BrowserExtensionNotificationModule(bus);
