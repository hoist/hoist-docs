#Bouncer API

Generating tokens to use with connectors can be done through the portal or by constructing the URI yourself. This is only required for 'public' or 'oauth' style connectors. If you're using a private connector which is tied to one organisation or account in the third party service, you can skip this step.

## Creating a URL in your application

Authenticating your users against a service takes two steps. 
- Creating the initate URL
- Exchange that for a bounce URL
- Directing your user to that bounce URL

### Creating the initate URL

Start with building up the base url. 
`https://bouncer.hoist.io/initiate/{organisationSlug}/{applicationSlug}/{connectorKey}`

Then, add the querystring parameters to tell Hoist what to do with the Hoist connection token. 

- `bucketKey={bucketKey}` will add the token to the bucket's meta object (if your connector is 'con', the bucket meta will contain {authToken.con}). If you set a bucket key that doesn't exist, it will create it on the fly.
- `returnUrl={returnUrl}` will send the user back to your application on complete. If you don't provide a return url or a bucketKey, the token will be displayed in a generic web page ready to be copied out. 


### Exchange that for a bounce URL

To get the bounce URL, simply perform a GET request to the initiate URL, and the '302' redirect will contain a new URL to send your user to. This simply means you don't expose your organisationSlug and applicationSlug to your users.


### Directing your user to that bounce 

Send your user to the bounce URL and Hoist will handle the authentication steps from there. 

## Creating tokens in the portal
Once you've set up a connector that requires tokens, you'll see a button under the 'Keys' heading in the Settings block labelled 'Generate Authentication URL'. 

Once you select this, you can select to attach the authentication to a bucket, to a user or neither. If you choose not to attach the token to a user or bucket, the last step of the authentication flow will give you a token. Save this token wherever you intend to store it. 



