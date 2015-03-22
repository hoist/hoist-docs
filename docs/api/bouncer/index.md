#Bouncer API

Generating tokens to use with connectors can be done through the portal or by constructing the URI yourself. 

## Creating tokens in the portal
Once you've set up a connector that requires multiple tokens, you'll see a button under the 'Keys' heading in the Settings block labelled 'Generate Authentication URL'. 

Once you select this, you can select to attach the authentication to a bucket, to a user or neither. If you choose not to attach the token to a user or bucket, the last step of the authentication flow will give you a token. Save this token wherever you intend to store it. 

## Building a connection URI
Bounce URIs are constructed like this: 

```javascript
https://bouncer.hoist.io/initiate/{organisationSlug}/{applicationSlug}/{connectorKey}
```

with the optional querystring parameters

```javascript
bucketKey={bucketKey}
userId={userId}
returnUrl={returnUrl}
```



