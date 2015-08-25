# Draft Draft Draft Slack Integration

So you want your users to be able to integrate with Slack? With Hoist you can achieve it in just 5 minutes. 

## Setup Hoist

Create an application in Hoist, 

## Your application

### The integrations page

First off, you'll need a page in your application for Integrations (if you don't already) and a section for Slack. 

- Create a route and view for https://yourapp.com/integrations
- Create another route for https://yourapp.com/integrations/slack-connected

Secondly, you'll need a field stored against the user to determine whether they're connectd to Slack. Make it a text field that will accept ACTIVE or INACTIVE. 

Third, we'll add a switch to the slack integration page that either shows a Connect button or a 'Connected' label. 

### Import the Hoist SDK and set the API Key

Follow the instructions for each SDK on how to set the API key. For Node, it looks like this: `Hoist.apiKey("<apiKey>");`

### Sending the user to Slack

When the user clicks Connect, send them to a method that uses the Hoist SDK to generate a URL to authenticate them with. 

```js
redirect(Hoist.bouncer({
  connector: "slack", 
  bucketKey: session.user.id,
  returnUrl: config.appUrl + 'integrations/slack-connected'
}));
```

In the `slack-connected` method, set the user to be ACTIVE. 

### Raising an event

When the user does something in your application that you want to send to Slack, raise an event:

```js
Hoist.event.raise("SLACKMESSAGE", {
  message: "Send this thing to Slack!"
}, {bucketKey: session.user.id});
```

## Building your Hoist integration

### Connect to Slack

Log into the portal, in your application create a new connector for Slack. Set it up following the instructions and set the key to be 'slack'. 

### Writing your hoist.json

Create a hoist.json with the following 

```json
{
  "modules": [{
    "name": "slack",
    "src": "./slack.js"
  }],
  "on": {
    "SLACKMESSAGE": {
      "modules": ["slack"]
    }
  }
}
```

### Writing your logic module

Create slack.js with the following 

```js
module.exports = function() {

  return Hoist.connector("slack").get("/chat.postMessage", {
      channel: event.payload.channel,
      text: event.payload.message,
      username: 'Your App Bot',
      icon_emoji: ':tada:'
    });

};
```

### Deploy to Hoist

Deploy your integration to hoist by adding your git remote (found on the dashboard) and git pushing to that remote. 

## Congratulations

How, when a user does an action, and you raise your Hoist event, they can 

