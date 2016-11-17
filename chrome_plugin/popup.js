document.addEventListener('DOMContentLoaded', function() {
  // Get select element
  var potSelect = document.getElementById('selectedPot');
  
  // Get selected pot nr
  var potNr = localStorage.getItem("potNr");

  // Set select value
  if(potNr && potNr > 0) 
  {
      potSelect.value = potNr.toString();
  }

  // Change event of select element
  potSelect.addEventListener('change', function() {
      // Get selected value from select field
      var potId = parseInt(potSelect.options[potSelect.selectedIndex].value);
      
      // Store selected value
      localStorage.setItem("potNr", potId);
      potNr = potId;
  }, false);
}, false);