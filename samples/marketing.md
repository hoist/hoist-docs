# Marketing website integration

When a user signs up to Hoist, their details are sent to Hubspot, Campaign Monitor and Slack. We use this integration to send the details around the place.

## package.json

All Hoist integrations are node modules, so the package.json is used to include the `request-promise` library.

```json
{
  "name": "marketing-integration",
  "dependencies": {
    "request-promise": "^0.4.1"
  }
}
```

## hoist.json

This specifies the three modules, `slack`, `campaignMonitor` and `hubspot`, an event which will trigger them to run (`NEWUSER`) and an endpoint, to post data to.

```json
{
  "modules" : [
    { "name": "slack", "src" : "./slack.js" },
    { "name": "campaignMonitor", "src" : "./cm.js" },
    { "name": "hubspot", "src" : "./hubspot.js" }
  ],
  "on" : {
    "NEWUSER" : {
      "modules" : ["slack", "campaignMonitor", "hubspot"]
    }
  },
  "endpoints" : {
    "/new-user" : {
      "methods" : ["POST"],
      "event" : "NEWUSER"
    }
  }
}
```

## slack.js

To post to slack, set up a slack connector in the portal, create a key under the bucket 'live', and replace `<channel>` with the channel you want to post your signup messages to. 

```js
module.exports = function(event, done) {

  return Hoist.bucket.set('live').then(function() {

    var channel = '<channel>';

    var slack = Hoist.connector('slack');
    
    var queryParams = {
      channel: channel,
      text: event.payload.name + " (" + event.payload.email + ") just signed up (" + event.payload.source + ")",
      username: 'Accounts',
      icon_emoji: ':tada:'
    };

    return slack.get('/chat.postMessage', queryParams);

  });

}
```

## hubspot.js

To post to hubspot, simply replace `<api-key>` with the Api Key rom the hubspot web portal.

```js
var request = require('request-promise');

module.exports = function(event, done) {

  var apiKey = "<api-key>";

  var data = {
    properties: [
      { property: "email", value: event.payload.email },
      { property: "firstname", value: event.payload.firstName },
      { property: "lastname", value: event.payload.lastName },
      { property: "source", value: event.payload.source },
      { property: "phone", value: event.payload.phone }
    ]
  };
  
  return request.post({
    uri: 'https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/' + event.payload.email + '?hapikey=' + apiKey,
    json: data
  });

};
```

## cm.js

Post to campaign monitor by adding your Api Key and the ID of the subscriber list to this script.

```js
var request = require('request-promise');

module.exports = function(event, done) {

  var apiKey = '<api-key>';
  var subscriberList = '<list-id>';

  var newSubscriber = {
    "EmailAddress": event.payload.email,
    "Name": event.payload.name,
    "Resubscribe": true,
    "CustomFields": [
    {
        "Key": "Source",
        "Value": event.payload.source
    }]
  };
  
  return request.post({
    uri: 'https://' + apiKey + ':x@api.createsend.com/api/v3.1/subscribers/' + subscriberList + '.json',
    json: newSubscriber
  });

};
```