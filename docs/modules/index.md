#Building Modules

Modules are node and have full access to npm modules using the 'require' statement. 

For example, to use lodash in your module, you can write this: 
'var _ = require('lodash');`

All modules need to be contained in your application, so before requiring a module, make sure to install it using `npm --save`:
```bash
npm install lodash --save
```

There is a global Hoist variable which gives you access to the [Module API](/docs/api/module).

This Hoist object/API is already setup with the correct context (application/user/bucket) so should be able to make calls from within your code directly to the Hoist Foundation Infrastructure.

i.e. you can do `Hoist.data('Developers').save({name:'Josh'})` to save an object the API keys are already set up.

## Logging to Loggly

You can also do loggly logging:

`Hoist.log('message');`

this gives you access to logs from within your javascript modules but you should make sure that your application is set up with Loggly credentials