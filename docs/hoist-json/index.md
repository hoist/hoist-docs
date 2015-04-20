# hoist.json Reference

## Modules

```json
"modules": [
  {
    "name": "saveChargifyPaymentDetails",
    "src": "./_hoist/scripts/saveChargifyPaymentDetails.js"
  }
]
```

The modules section is where you set up the modules you want to be available to the Hoist event bus. Give the module a name, a src location and a default context for accessing Hoist services.

## On

```json
"on": {
  "chargify:payment:success": {
    "modules": ["saveChargifyPaymentDetails"]
  }
}
```

The 'on' section allows you to call modules when events are fired. These events may be synthetic events from your connectors (such a `chargify.payment.success` in this example), from your schedule or from within other modules (by calling `Hoist.raise("eventname", { /* event data */ });`).

## Endpoints

```json
"endpoints": {
  "/payment/success": {
    "methods":["POST"],
    "event":"chargify:payment:success",
    "authenticated":true
  }
}
```

The endpoints section allows you to trigger events when a URL is called. The key is the URL to be called, and the value is an object containing 

- `methods` to specify which methods the endpoint will be active on, 
- `event` to specify the event, 
- `authenticated` to specify whether there needs to be an active session and

## Schedules

```json
"schedules": {
  "0 0 * * *": {
    "events": [
      "nightly:batch:start"
    ]
  }
}
```

The schedules section allows events to be fired using cronjob timing. In this sample, the `nightly.batch.start` event is fired at midnight every night.

You can also use English language for the schedule so putting in ‘10 minutes’ would fire every 10 minutes. ‘Day’ would fire once per day.

Cron schedules are in UTC too so midnight is midnight UTC.
