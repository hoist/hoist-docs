var request = require('request-promise');

module.exports = function(event) {
  
  return request({
      uri: 'https://yourwebapp.com/webhook/incoming-invoice',
      data: event.payload,
      json: true
    })
    .catch(function(err) {
      return Hoist.log(err.message);  
    });
   
};
