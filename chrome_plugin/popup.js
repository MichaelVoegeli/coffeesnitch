document.addEventListener('DOMContentLoaded', function() {
  // Get select element
  var potSelect = document.getElementById('selectedPot');
  var connectBtn = document.getElementById('connectBtn');
  var ipAddressInput = document.getElementById('ipAddress');
  var portInput = document.getElementById('port');
  
  // Get selected pot nr
  var potNr = localStorage.getItem("potNr");
    
  // Get selected ip address
  var ipAddr = localStorage.getItem("ipAddress");
    
  // Get selected port
  var port = localStorage.getItem("port");

  // Set select value
  if(potNr && potNr > 0) 
  {
      potSelect.value = potNr.toString();
  }
  else {
      // In case pot is not selected set a empty pot id
      var potId = "";
      localStorage.setItem("potNr", potId);
  }
    
  // Set ip address
  if(ipAddr && ipAddr != '') 
  {
      ipAddressInput.value = ipAddr.toString();
  }
    
    
  // Set port
  if(port && port != '') 
  {
      portInput.value = port.toString();
  }

  // Change event of select element
  potSelect.addEventListener('change', function() {
      // Get selected value from select field
      var potId = parseInt(potSelect.options[potSelect.selectedIndex].value);
      
      // Store selected value
      localStorage.setItem("potNr", potId);
      potNr = potId;
  }, false);
    
  connectBtn.addEventListener('click', function() {
      var ip = ipAddressInput.value;
      var portNr = portInput.value;
      
      if(ip && portNr) {
        console.log("Connect on: ", ip);
        localStorage.setItem("ipAddress", ip);
        localStorage.setItem("port", portNr);
          
        chrome.runtime.sendMessage({tryConnect: true}, function(response) {
        });
      }
  }, false);
    
}, false);