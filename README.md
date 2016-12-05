## Synopsis

**TBD**

## Code Example

**TBD**

## Motivation

**TBD**

## Installation

### Chrome Extension
Open Chrome browser and open link: https://chrome.google.com/webstore/detail/fnt-coffee-pot-tracking-p/iondigdoncdlbdmcandbpocpkffdnnod.
Click on Add.

This extension try's to connect to WS connection, which is started by node server.

### Server 
You need node.js to use this server. If not installed yet go to https://nodejs.org/en/ and install node.js. 

Go to directory `server`.

Install node dependencies: 
```
npm install
```

To start the server type: 
```
node index.js
```
Try connection: 
* Open Postman
* Select POST
* URL:0000028C028C http://localhost:8083
* Add Header: `Content-Type`: `application/json`
* Add Body: ```{
  "type": "incommingPot",
  "tagId": "0000028C028C"
}```
* Click Send

## Tests

**TBD**

## Contributors

Contributors are the members of the **"FNT Coffeesnitch Lab Team"**.

## License

[![MIT License](http://img.shields.io/badge/license-MIT-green.svg) ](./LICENSE)
