#Salesforce Post Contact integration

This works for a Private connector (where you've only tied your connector to one Salesforce organisation)

- Create a connector in the portal to Salesforce called  `salesforce`
- Upload the two files below

To run the integration

- Endpoint Method: Do a POST request to the URL found on your application's dashboard (https://endpoint.hoi.io/{org-slug}/{app-slug}/new-customer) with "FirstName" and "LastName" set as fields in the body
- Event Method: Use one of the SDKs to raise an event called "CUSTOMER:NEW" with the payload {"FirstName": "", "LastName" : ""}

### send.js

```js
module.exports = function(event, done) {

  var salesforce = Hoist.connector("salesforce");

  return salesforce.post("Contact", {
      FirstName: event.payload.FirstName,
      LastName: event.payload.LastName
    })
    .catch(function(err) {
      return Hoist.log("Error", err);
    })
    .then(done);

};
```

### hoist.json

```json
{
  "modules" : {
    "name" : "sendToSalesforce",
    "src" : "send.js"
  },
  "on" : {
    "CUSTOMER:NEW" : {
      "modules" : ["sendToSalesforce"]  
    }
  },
  "endpoints" : {
    "/new-customer" : {
      "methods" : ["POST"],
      "event" : "CUSTOMER:NEW"
    }
  }
}
```