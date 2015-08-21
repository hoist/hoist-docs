#Salesforce post contact module

- Create a connector in the portal to Salesforce called  `salesforce`
- If it's a public connector, click the 'Create Key' button after the conncetor has been saved, and set the bucket key to `default`
- Upload the two files below
- Do a POST request to the URL found on your application's dashboard (https://endpoint.hoi.io/<org-slug>/<app-slug>/new-customer) with "FirstName" and "LastName" set as fields in the body

### send.js (for a Private connector)

If the connector is only tied to one organisation, you don't need to set the bucket.

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

### send.js (for a Public connector)

If the connector is onbehalf of multiple users, you need to set the bucket (replace `default` with userId if you have multiple users using this module)

```js
module.exports = function(event, done) {

  return Hoist.bucket.set("default").then(function() {

      var salesforce = Hoist.connector("salesforce").authorize();

      return salesforce.post("Contact", {
          FirstName: event.payload.FirstName,
          LastName: event.payload.LastName
        });

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